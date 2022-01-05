import express from "express";
import cors from "cors";

import { queryCustomersGRAPHQL } from "./Queries/CustomerQueries.js";
import { queryOrdersGRAPHQL } from "./Queries/OrderQueries.js";
import { queryOrderItemsGRAPHQL } from "./Queries/OrderItemsQueries.js";
import { fetch_customers_using_filters, fetch_customers_all } from "./Queries/SelectQueries.js";
import { registerShop, shopId } from "./Queries/RegisterShop.js";
import { createShopifyObject } from "./global.js";
import Charges from "./Models/Charges/charges.js";
import Datasync_Status from "./Models/Datasync_Status/Datasync_Status.js";
import Failed_Jobs from "./Models/Failed_Jobs/Failed_Jobs.js";
import Customer from "./Models/Customers/customer.js";
import Migration from "./Models/Migrations/Migrations.js";
import OrderItem from "./Models/Order_Items/order_item.js";
import Order from "./Models/Orders/order.js";
import Password_Resets from "./Models/Password_Resets/Password_Reset.js";
import Plan from "./Models/Plans/plans.js";
import User from "./Models/Users/user.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { queryTotalCount } from "./Queries/TotalCount.js";

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

httpServer.listen(4444, function () {
  console.log("Listening for incoming connections on 4444...");
});

//middleware
app.use(express.json());
app.use(cors());

app.post("/count_data", async function (req, res){
  const shopify = createShopifyObject(req.body.shop, req.body.accessToken);
  const total_count = await queryTotalCount(shopify);
  res.status(200).send(total_count + "");
});

app.post("/customers/fetch/with_filters", function (req, res) {
  const filters = req.body.filters;
  const columnFilters = req.body.columnFilters;
  const pageSize = req.body.pageSize;
  const pageIndex = req.body.pageIndex;

  fetch_customers_using_filters(filters, columnFilters, pageSize, pageIndex, res);
});

app.post("/customers/fetch/all", function (req, res) {
  const filters = req.body.filters;
  const columnFilters = req.body.columnFilters;

  fetch_customers_all(filters, columnFilters, res);
});

app.post("/sync_data_customers", async function (req, res) {
  Migration.create({
    "migration": `${shopId}_customers_data_synced`,
    "batch": 1
  });

  Customer.sync({force:true});

  const shopify = createShopifyObject(req.body.shop, req.body.accessToken);
  await queryCustomersGRAPHQL(shopify, io);
  res.status(200).send("Customers Data Synced.");
});

app.post("/sync_data_orders", async function (req, res) {
  Migration.create({
    "migration": `${shopId}_orders_data_synced`,
    "batch": 1
  });

  Order.sync({force: true});

  const shopify = createShopifyObject(req.body.shop, req.body.accessToken);
  await queryOrdersGRAPHQL(shopify, io);
  res.status(200).send("Orders Data Synced.");
});

app.post("/sync_data_order_items", async function (req, res) {
  Migration.create({
    "migration": `${shopId}_orderItems_data_synced`,
    "batch": 1
  });

  OrderItem.sync({force: true});

  const shopify = createShopifyObject(req.body.shop, req.body.accessToken);
  await queryOrderItemsGRAPHQL(shopify, io);
  res.status(200).send("Order Items Data Synced.");
});

app.post("/registerShop", (req, res) => {
  res.status(200).send("Welcome 💥💥💥");
  const shopify = createShopifyObject(req.body.name, req.body.accessToken);
  registerShop(shopify);
});

//express listen
app.listen(port, () => {
  console.log(`\nConnected to express server at port ${port}!!`.green);
});


//temp
Charges.sync({force: true});
Datasync_Status.sync({force: true});
Failed_Jobs.sync({force: true});
Migration.sync({force: true});
Password_Resets.sync({force: true});
Plan.sync({force: true});
User.sync({force: true});