import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import cors from "@koa/cors";
import json from "koa-json";
import koaBody from "koa-body";
import axios from "axios";

import { queryCustomersGRAPHQL } from "./Queries/CustomerQueries.js";
import { queryOrdersGRAPHQL } from "./Queries/OrderQueries.js";
import { queryOrderItemsGRAPHQL } from "./Queries/OrderItemsQueries.js";
import {
  fetch_customers_using_filters,
  fetch_customers_all,
  fetch_save_segments,
  fetch_save_segments_with_id,
  create_rfm_scorecard,
  table_sizes,
} from "./Queries/SelectQueries.js";
import { registerShop } from "./Queries/RegisterShop.js";
import { createShopifyObject } from "./global.js";
import Migration from "./Models/Migrations/Migrations.js";
import User from "./Models/Users/user.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { queryTotalCount } from "./Queries/TotalCount.js";
import { saveTheSegment } from "./Queries/SaveSegment.js";
import { Op } from "sequelize";

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: ["read_products", "read_customers", "read_orders"],
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const app = new Koa();
  const router = new Router();

  app.keys = [Shopify.Context.API_SECRET_KEY];

  app.use(cors());
  app.use(json());
  app.use(koaBody());

  const server = createServer(app.callback());
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected with socket id " + socket.id);

    socket.on("testevent", (payload) => {
      console.log("This is the payload: ", payload);
    });
  });

  app.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;

        await registerShop(shop, accessToken);
        console.log("Welcome 💥💥💥");

        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear

  router.get("/api/ping", async (ctx) => {
    ctx.status = 200;
    ctx.body = { body: "API Ready!!!" };
  });

  router.post("/api/rfm", async (ctx) => {
    const shop = ctx.request.body.shop;
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });
    let shop_id = result.shop_id;

    let rfm_score = await create_rfm_scorecard(shop_id);

    ctx.status = 200;
    ctx.body = rfm_score;
  });

  router.post("/api/initialize_app", async(ctx) => {
    const shop = ctx.request.body.shop;
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });
    let shop_id = result.shop_id;

    let table_size = await table_sizes(shop_id);

    ctx.status = 200;
    ctx.body = table_size;
  });

  router.post("/api/fetch_saved_segments", async (ctx) => {
    const shop = ctx.request.body.shop;
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });
    let shop_id = result.shop_id;

    let saved_segments = await fetch_save_segments(shop_id);

    ctx.status = 200;
    ctx.body = saved_segments;
  });

  router.post("/api/fetch_saved_segments_with_id", async (ctx) => {
    const shop = ctx.request.body.shop;
    const segment = ctx.request.body.segment;

    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });
    let shop_id = result.shop_id;

    let segments = await fetch_save_segments_with_id(shop_id, segment);

    ctx.status = 200;
    ctx.body = segments;
  });

  router.post("/api/save_segment", async (ctx) => {
    const shop = ctx.request.body.shop;
    const title = ctx.request.body.title;
    const dateRange = ctx.request.body.dateRange;
    const noOfCustomers = ctx.request.body.noOfCustomers;
    const customFilters = ctx.request.body.customFilters;

    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });
    let shop_id = result.shop_id;

    let startDate = dateRange[0];
    let endDate = dateRange[1];

    let save_new_segment = await saveTheSegment(
      shop_id,
      startDate,
      endDate,
      title,
      noOfCustomers,
      customFilters
    );

    ctx.status = 200;
    ctx.body = { body: "Saved The Segment" };
  });

  router.post("/api/count_data", async (ctx) => {
    const shop = ctx.request.body.shop;
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });

    const shopify = createShopifyObject(shop, result.password);
    const total_count = await queryTotalCount(shopify);

    ctx.status = 200;
    ctx.body = { total: total_count + "" };
  });

  router.post("/api/customers/fetch/with_filters", async (ctx) => {
    const filters = ctx.request.body.filters;
    const columnFilters = ctx.request.body.columnFilters;
    const pageSize = ctx.request.body.pageSize;
    const pageIndex = ctx.request.body.pageIndex;
    const shop = ctx.request.body.shop;
    const segment = ctx.request.body.segment;
    const dateRange = ctx.request.body.dateRange;
    
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });
    let shop_id = result.shop_id;

    let customers = await fetch_customers_using_filters(
      filters,
      columnFilters,
      pageSize,
      pageIndex,
      shop_id,
      segment,
      dateRange
    );

    ctx.status = 200;
    ctx.body = customers;
  });

  router.post("/api/customers/fetch/all", async (ctx) => {
    const filters = ctx.request.body.filters;
    const columnFilters = ctx.request.body.columnFilters;
    const shop = ctx.request.body.shop;
    const segment = ctx.request.body.segment;
    const dateRange = ctx.request.body.dateRange;

    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });
    let shop_id = result.shop_id;

    let customers = await fetch_customers_all(filters, columnFilters, shop_id,segment, dateRange);

    ctx.status = 200;
    ctx.body = customers;
  });

  router.post("/api/sync_data_customers", async (ctx) => {
    Migration.create({
      migration: `customers_data_synced`,
      batch: 1,
    });

    const shop = ctx.request.body.shop;
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });

    const shopify = createShopifyObject(shop, result.password);
    await queryCustomersGRAPHQL(shopify, result.shop_id, io);

    ctx.status = 200;
    ctx.body = { body: "Customers Data Synced." };
  });

  router.post("/api/sync_data_orders", async (ctx) => {
    Migration.create({
      migration: `orders_data_synced`,
      batch: 1,
    });

    const shop = ctx.request.body.shop;
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });

    const shopify = createShopifyObject(shop, result.password);
    await queryOrdersGRAPHQL(shopify, result.shop_id, io);

    ctx.status = 200;
    ctx.body = { body: "Orders Data Synced." };
  });

  router.post("/api/sync_data_order_items", async (ctx) => {
    Migration.create({
      migration: `orderItems_data_synced`,
      batch: 1,
    });

    const shop = ctx.request.body.shop;
    const result = await User.findOne({
      where: {
        shop_email: {
          [Op.eq]: shop,
        },
      },
    });

    const shopify = createShopifyObject(shop, result.password);
    await queryOrderItemsGRAPHQL(shopify, result.shop_id, io);
    ctx.status = 200;
    ctx.body = { body: "Order Items Data Synced." };
  });

  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  app.use(router.allowedMethods());
  app.use(router.routes());

  server.listen(port, () => {
    console.log(`> Client Ready on http://localhost:${port}`);
  });
});
