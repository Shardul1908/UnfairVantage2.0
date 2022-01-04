import Shopify from "shopify-api-node";
import mysql from "mysql";
import pkg from 'colors';
const { Color } = pkg;
import dotenv from 'dotenv'
import Sequelize from 'sequelize';

dotenv.config("../.env");

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  define: {
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
  }
});

sequelize
  .sync()
  .then(result => {
    // console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

function createShopifyObject(name, accessToken) {
  return new Shopify({
    shopName: name,
    accessToken: accessToken,
    apiVersion: "2021-10"
  });
};

var db_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
};

//mysql connection
const mysql_connection = mysql.createConnection(db_config);

mysql_connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("\nConnected to MYSQL at port 3306!\n".green);
});
//mysql connection

const isString = function (dataField) {
  if (dataField != null) {
    return true;
  }
  return false;
}

const isInt = function (number) {
  if (number != null) {
    return true;
  }
  return false;
}

const isFloat = function (number) {
  if (number != null) {
    return true;
  }
  return false;
}

const isObj = function (obj) {
  if (obj != null) {
    return true;
  }
  return false;
}

const isBool = function (value) {
  if (value != null) {
    return true;
  }
  return false;
}

const getId = function (id) {
  let start = id.indexOf("/", 14);
  let end = id.length;

  id = id.substring(start + 1, end);

  return id;
}

export { isString, isInt, isFloat, isObj, isBool, getId, createShopifyObject, sequelize, mysql_connection, Color };