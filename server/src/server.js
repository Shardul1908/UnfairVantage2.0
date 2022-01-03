import express from "express";
import cors from "cors";
import {
  deleteCustomers,
  queryCustomersGRAPHQL,
} from "./Queries/CustomerQueries.js";
import { deleteOrders, queryOrdersGRAPHQL } from "./Queries/OrderQueries.js";
import {
  deleteOrderItems,
  queryOrderItemsGRAPHQL,
} from "./Queries/OrderItemsQueries.js";
import {
  fetch_customers_using_filters,
  fetch_customers_all,
} from "./Queries/SelectQueries.js";

import { registerShop, shopId } from "./Queries/RegisterShop.js";
import { createShopifyObject, mysql_connection } from "./Global/global.js";

//express init
const app = express();
const port = 9000;

//middleware
app.use(express.json());
app.use(cors());

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
  let mysql_migration_query = `INSERT INTO migrations(migration,batch) VALUES (?,?)`;
  mysql_connection.query(
    mysql_migration_query,
    [`${shopId}_sync_data_customers`, 1],
    function (err, result) {
      if (err) throw err;
      console.log("Migration Added");
    }
  );

  const shopify = createShopifyObject(req.body.shop, req.body.accessToken);

  await queryCustomersGRAPHQL(shopify);

  res.status(200).send("Customers Data Synced.");
});

app.post("/sync_data_orders", async function (req, res) {
  let mysql_migration_query = `INSERT INTO migrations(migration,batch) VALUES (?,?)`;
  mysql_connection.query(
    mysql_migration_query,
    [`${shopId}_sync_data_orders`, 1],
    function (err, result) {
      if (err) throw err;
      console.log("Migration Added");
    }
  );

  const shopify = createShopifyObject(req.body.shop, req.body.accessToken);

  await queryOrdersGRAPHQL(shopify);

  res.status(200).send("Orders Data Synced.");
});

app.post("/sync_data_order_items", async function (req, res) {
  let mysql_migration_query = `INSERT INTO migrations(migration,batch) VALUES (?,?)`;
  mysql_connection.query(
    mysql_migration_query,
    [`${shopId}_sync_data_order_items`, 1],
    function (err, result) {
      if (err) throw err;
      console.log("Migration Added");
    }
  );

  const shopify = createShopifyObject(req.body.shop, req.body.accessToken);
  
  await queryOrderItemsGRAPHQL(shopify);

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
