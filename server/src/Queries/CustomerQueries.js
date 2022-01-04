import Customer from "../Models/Customers/customer.js";
import {
  getId,
  isFloat,
  isInt,
  isObj,
  isString,
  mysql_connection,
  isBool,
} from "../global.js";
import { shopId } from "./RegisterShop.js";

async function queryCustomersGRAPHQL(shopify) {
  let counter_customers = 0;
  let graphql_customers_query = `query {
    customers(first: 25) {
      edges {
        cursor
        node {
        id
        firstName
        lastName
        email
        phone
        ordersCount
        state
        totalSpent
        acceptsMarketing
        averageOrderAmountV2 {
          amount
          currencyCode
        }
        totalSpentV2 {
          amount
          currencyCode
        }
        tags
        defaultAddress {
          city
          province
          country
          zip
          phone
        }
        createdAt
        updatedAt
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }`;

  let cursor = "";
  let hasNextPage = true;
  let isFirstPage = true;
  let limit = 1000;

  shopify.on("callGraphqlLimits", (limits) => {
    limit = limits.remaining;
  });

  while (hasNextPage) {
    if (isFirstPage) {
      isFirstPage = false;
    } else {
      graphql_customers_query = `query {
        customers(first: 25, after: "${cursor}") {
          edges {
            cursor
            node {
            id
            firstName
            lastName
            email
            phone
            ordersCount
            state
            totalSpent
            acceptsMarketing
            averageOrderAmountV2 {
              amount
              currencyCode
            }
            totalSpentV2 {
              amount
              currencyCode
            }
            tags
            defaultAddress {
              city
              province
              country
              zip
              phone
            }
            createdAt
            updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }`;
    }

    const resultSet = await shopify
      .graphql(graphql_customers_query)
      .catch((err) => console.log(err));

    if (limit < 50) {
      console.log(
        `\n(Customers)Rate limit exceeded(limit = ${limit} )...Waiting for some time\n`
          .yellow
      );
      await new Promise((resolve) => {
        setTimeout(function () {
          resolve("Rate limit wait...");
          console.log(`\n(Customers)Done Waiting continuing requests\n`.green);
        }, 2000);
      });
    }

    let customers = [];
    for (let i = 0; i < resultSet.customers.edges.length; i++) {
      let customer = {};

      customer["id"] = getId(resultSet.customers.edges[i].node.id);

      if (isString(resultSet.customers.edges[i].node.firstName)) {
        customer["firstName"] = resultSet.customers.edges[i].node.firstName;
      }
      if (isString(resultSet.customers.edges[i].node.lastName)) {
        customer["lastName"] = resultSet.customers.edges[i].node.lastName;
      }

      if (isString(resultSet.customers.edges[i].node.email)) {
        customer["email"] = resultSet.customers.edges[i].node.email;
      }

      if (isString(resultSet.customers.edges[i].node.phone)) {
        customer["phone"] = resultSet.customers.edges[i].node.phone;
      }

      if (isInt(resultSet.customers.edges[i].node.ordersCount)) {
        customer["ordersCount"] = parseInt(resultSet.customers.edges[i].node.ordersCount);
      }

      if (isString(resultSet.customers.edges[i].node.state)) {
        customer["state"] = resultSet.customers.edges[i].node.state;
      }

      if (isFloat(resultSet.customers.edges[i].node.totalSpent)) {
        customer["totalSpent"] = parseFloat(resultSet.customers.edges[i].node.totalSpent);
      }

      if (isBool(resultSet.customers.edges[i].node.acceptsMarketing)) {
        customer["acceptsMarketing"] = resultSet.customers.edges[i].node.acceptsMarketing;
      }

      if (isObj(resultSet.customers.edges[i].node.averageOrderAmountV2)) {
        if (isFloat(resultSet.customers.edges[i].node.averageOrderAmountV2.amount)) {
          customer["averageOrderAmountV2_amount"] = parseFloat(resultSet.customers.edges[i].node.averageOrderAmountV2.amount);
        }
        if (isString(resultSet.customers.edges[i].node.averageOrderAmountV2.currencyCode)) {
          customer["averageOrderAmountV2_currencyCode"] = resultSet.customers.edges[i].node.averageOrderAmountV2.currencyCode;
        }
      }

      if (isObj(resultSet.customers.edges[i].node.totalSpentV2)) {
        if (isFloat(resultSet.customers.edges[i].node.totalSpentV2.amount)) {
          customer["totalSpentV2_amount"] = parseFloat(resultSet.customers.edges[i].node.totalSpentV2.amount);
        }
        if (isString(resultSet.customers.edges[i].node.totalSpentV2.currencyCode)) {
          customer["totalSpentV2_currencyCode"] = resultSet.customers.edges[i].node.totalSpentV2.currencyCode;
        }
      }

      if (isString(resultSet.customers.edges[i].node.tags)) {
        customer["tags"] = (resultSet.customers.edges[i].node.tags).toString();
      }

      if (isObj(resultSet.customers.edges[i].node.defaultAddress)) {
        if (isString(resultSet.customers.edges[i].node.defaultAddress.city)) {
          customer["defaultAddress_city"] = resultSet.customers.edges[i].node.defaultAddress.city;
        }
        if (isString(resultSet.customers.edges[i].node.defaultAddress.province)) {
          customer["defaultAddress_province"] = resultSet.customers.edges[i].node.defaultAddress.province;
        }
        if (isString(resultSet.customers.edges[i].node.defaultAddress.country)) {
          customer["defaultAddress_country"] = resultSet.customers.edges[i].node.defaultAddress.country;
        }
        if (isString(resultSet.customers.edges[i].node.defaultAddress.zip)) {
          customer["defaultAddress_zip"] = resultSet.customers.edges[i].node.defaultAddress.zip;
        }
        if (isString(resultSet.customers.edges[i].node.defaultAddress.phone)) {
          customer["defaultAddress_phone"] = resultSet.customers.edges[i].node.defaultAddress.phone;
        }
      }

      if (isString(resultSet.customers.edges[i].node.createdAt)) {
        customer["createdAt"] = resultSet.customers.edges[i].node.createdAt;
      }

      if (isString(resultSet.customers.edges[i].node.updatedAt)) {
        customer["updatedAt"] = resultSet.customers.edges[i].node.updatedAt;
      }

      customers.push(customer);
    }

     Customer
      .bulkCreate(customers)
      .then((result) => {
        counter_customers += result.length;
        console.log(`Successfully ran the query ${counter_customers}`);
      })
      .catch((err) => {
        console.log(err);
      });

    hasNextPage = resultSet.customers.pageInfo.hasNextPage;

    let n = resultSet.customers.edges.length;
    cursor = resultSet.customers.edges[n - 1].cursor;
  }
}

function deleteCustomers() {
  let mysql_customer_delete_query = `DELETE FROM ${shopId}_customers`;
  mysql_connection.query(mysql_customer_delete_query, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });

  let mysql_migration_query = `INSERT INTO migrations(migration,batch) VALUES (?,?)`;
  mysql_connection.query(
    mysql_migration_query,
    [`${shopId}_deleted_customers_table`, 1],
    function (err, result) {
      if (err) throw err;
      console.log("Migration Added");
    }
  );
}

export { queryCustomersGRAPHQL, deleteCustomers };
