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

const getNoOfDays = function(date1, date2) {
  let difference_in_time = date2.getTime() - date1.getTime();
  let difference_in_days = difference_in_time / (1000 * 3600 * 24);

  return parseInt(difference_in_days);
}

const get_ranked_array = function(arr,ascending) {
  let sorted;
  if(ascending) {
    sorted = arr.slice().sort(function(a,b) {
      return a-b;
    });
  }else {
    sorted = arr.slice().sort(function(a,b) {
      return b-a;
    });
  }
  let ranks = arr.map(function(v){ 
    if(v === 0 || v === "0.00") {
      return 0;
    }
    return sorted.indexOf(v)+1 
  });

  return ranks;
}

export { isString, isInt, isFloat, isObj, isBool, getId, getNoOfDays, get_ranked_array, createShopifyObject, sequelize, Color };