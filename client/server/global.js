import Shopify from "shopify-api-node";
import pkg from 'colors';
const { Color } = pkg;
import dotenv from 'dotenv'
import Sequelize from 'sequelize';

dotenv.config("../.env");

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
  }
});

function createShopifyObject(name, accessToken) {
  return new Shopify({
    shopName: name,
    accessToken: accessToken,
    apiVersion: "2021-10"
  });
};

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

export { isString, isInt, isFloat, isObj, isBool, getId, createShopifyObject, sequelize, Color };