import express from "express";
import cors from "cors";

import { queryCustomersGRAPHQL } from "./Queries/CustomerQueries.js";
import { queryOrdersGRAPHQL } from "./Queries/OrderQueries.js";
import { queryOrderItemsGRAPHQL } from "./Queries/OrderItemsQueries.js";
import { fetch_customers_using_filters, fetch_customers_all } from "./Queries/SelectQueries.js";
import { registerShop } from "./Queries/RegisterShop.js";
import { createShopifyObject } from "./global.js";
import Charges from "./Models/Charges/charges.js";
import Datasync_Status from "./Models/Datasync_Status/Datasync_Status.js";
import Failed_Jobs from "./Models/Failed_Jobs/Failed_Jobs.js";
import Migration from "./Models/Migrations/Migrations.js";
import Password_Resets from "./Models/Password_Resets/Password_Reset.js";
import Plan from "./Models/Plans/plans.js";
import User from "./Models/Users/user.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { queryTotalCount } from "./Queries/TotalCount.js";
import { Op } from "sequelize";

//express init
const app = express();
const port = 9000;

//socket
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Connected with socket id " + socket.id);

  socket.on("testevent", (payload) => {
    console.log("This is the payload: ", payload);
  })
});

httpServer.listen(9000, function () {
  console.log("Listening for incoming connections on 9000...");
});

//middleware
app.use(express.json());
app.use(cors());

app.get("/ping",(_,res) => {
  res.status(200).send("Server ready!!!!");
}); 

app.post("/count_data", async function (req, res){
  const shop = req.body.shop;
  const result = await User.findOne({
    where: {
      shop_email: {
        [Op.eq]: shop
      }
    }
  });

  const shopify = createShopifyObject(shop, result.password);
  const total_count = await queryTotalCount(shopify);
  res.status(200).send(total_count + "");
});

app.post("/customers/fetch/with_filters", async function (req, res) {
  const filters = req.body.filters;
  const columnFilters = req.body.columnFilters;
  const pageSize = req.body.pageSize;
  const pageIndex = req.body.pageIndex;
  const shop = req.body.shop;

  const result = await User.findOne({
    where: {
      shop_email: {
        [Op.eq]: shop
      }
    }
  });
  let shop_id = result.shop_id;

  let customers = await fetch_customers_using_filters(filters, columnFilters, pageSize, pageIndex, shop_id);
  res.status(200).send(customers);
});

app.post("/customers/fetch/all", async function (req, res) {
  const filters = req.body.filters;
  const columnFilters = req.body.columnFilters;
  const shop = req.body.shop;

  const result = await User.findOne({
    where: {
      shop_email: {
        [Op.eq]: shop
      }
    }
  });
  console.log(result);
  let shop_id = result.shop_id;

  let customers = await fetch_customers_all(filters, columnFilters, shop_id);
  res.status(200).send(customers);
});

app.post("/sync_data_customers", async function (req, res) {
  Migration.create({
    "migration": `customers_data_synced`,
    "batch": 1
  });

  const shop = req.body.shop;
  const result = await User.findOne({
    where: {
      shop_email: {
        [Op.eq]: shop
      }
    }
  });

  const shopify = createShopifyObject(shop, result.password);
  await queryCustomersGRAPHQL(shopify,result.shop_id, io);
  res.status(200).send("Customers Data Synced.");
});

app.post("/sync_data_orders", async function (req, res) {
  Migration.create({
    "migration": `orders_data_synced`,
    "batch": 1
  });

  const shop = req.body.shop;
  const result = await User.findOne({
    where: {
      shop_email: {
        [Op.eq]: shop
      }
    }
  });

  const shopify = createShopifyObject(shop, result.password);
  await queryOrdersGRAPHQL(shopify,result.shop_id);
  res.status(200).send("Orders Data Synced.");
});

app.post("/sync_data_order_items", async function (req, res) {
  Migration.create({
    "migration": `orderItems_data_synced`,
    "batch": 1
  });

  const shop = req.body.shop;
  const result = await User.findOne({
    where: {
      shop_email: {
        [Op.eq]: shop
      }
    }
  });

  const shopify = createShopifyObject(shop, result.password);
  await queryOrderItemsGRAPHQL(shopify,result.shop_id, io);
  res.status(200).send("Order Items Data Synced.");
});

app.post("/registerShop", async function (req, res) {
  let shopEmail = req.body.shopEmail;
  let accessToken = req.body.accessToken;

  await registerShop(shopEmail, accessToken, io);

  res.status(200).send("Welcome 💥💥💥");
});

//express listen
// app.listen(port, () => {
//   console.log(`\nConnected to express server at port ${port}!!`.green);
// });

//temp
Charges.sync({ force: true });
Datasync_Status.sync({ force: true });
Failed_Jobs.sync({ force: true });
Migration.sync({ force: true });
Password_Resets.sync({ force: true });
Plan.sync({ force: true });
User.sync({force: true});