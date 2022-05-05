import orderTableInit from "../Models/Orders/order.js";
import {
  getId,
  isBool,
  isFloat,
  isObj,
  isString,
} from "../global.js";

//Fetching Orders from Shopify Admin API
async function queryOrdersGRAPHQL(shopify, shop_id, io) {
  let counter_orders = 0;
  //graphql orders query
  let graphql_orders_query = `query {
    orders(first: 10) {
      edges {
        cursor
        node {
          id
          name
          customer {
            id
          }
          email
          phone
          fullyPaid
          closed
          currencyCode
          discountCode
          tags
          paymentGatewayNames
          subtotalPriceSet {
            shopMoney {
              amount
            }
          }
          totalPriceSet {
            shopMoney {
              amount
            }
          }
          originalTotalPriceSet {
            shopMoney {
              amount
            }
          }
          riskLevel
          billingAddress {
            city
            province
            country
            zip
            phone
          }
          shippingAddress {
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
    // console.log(limits);
    limit = limits.remaining;
  });

  while (hasNextPage) {
    if (isFirstPage) {
      isFirstPage = false;
    } else {
      graphql_orders_query = `query {
          orders(first: 10, after: "${cursor}") {
            edges {
              cursor
              node {
                id
                name
                customer {
                  id
                }
                email
                phone
                fullyPaid
                closed
                currencyCode
                discountCode
                tags
                paymentGatewayNames
                subtotalPriceSet {
                  shopMoney {
                    amount
                  }
                }
                totalPriceSet {
                  shopMoney {
                    amount
                  }
                }
                originalTotalPriceSet {
                  shopMoney {
                    amount
                  }
                }
                riskLevel
                billingAddress {
                  city
                  province
                  country
                  zip
                  phone
                }
                shippingAddress {
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
    }

    const resultSet = await shopify.graphql(graphql_orders_query);

    if (limit < 70) {
      console.log(
        `\n(Orders)Rate limit exceeded(limit = ${limit} )...Waiting for some time\n`
          .yellow
      );
      await new Promise((resolve) => {
        setTimeout(function () {
          resolve("Rate limit wait...");
          console.log(`\n(Orders)Done Waiting continuing requests\n`.green);
        }, 2000);
      });
    }

    // let my_orders = verifyAndCreateOrders(resultSet);
    // insertOrdersMYSQL(my_orders);
    let orders = [];
    for (let i = 0; i < resultSet.orders.edges.length; i++) {
      let order = {};

      order["order_id"] = getId(resultSet.orders.edges[i].node.id);

      if (isString(resultSet.orders.edges[i].node.name)) {
        order["name"] = resultSet.orders.edges[i].node.name;
      }

      order["customer_id"] = getId(resultSet.orders.edges[i].node.customer.id);

      if (isString(resultSet.orders.edges[i].node.email)) {
        order["email"] = resultSet.orders.edges[i].node.email;
      }

      if (isString(resultSet.orders.edges[i].node.phone)) {
        order["phone"] = resultSet.orders.edges[i].node.phone;
      }

      if (isBool(resultSet.orders.edges[i].node.fullyPaid)) {
        order["fullyPaid"] = resultSet.orders.edges[i].node.fullyPaid;
      }

      if (isBool(resultSet.orders.edges[i].node.closed)) {
        order["closed"] = resultSet.orders.edges[i].node.closed;
      }

      if (isString(resultSet.orders.edges[i].node.currencyCode)) {
        order["currencyCode"] = resultSet.orders.edges[i].node.currencyCode;
      }

      if (isString(resultSet.orders.edges[i].node.discountCode)) {
        order["discountCode"] = resultSet.orders.edges[i].node.discountCode;
      }

      if (isString(resultSet.orders.edges[i].node.tags)) {
        order["tags"] = (resultSet.orders.edges[i].node.tags).toString();
      }

      if (isString(resultSet.orders.edges[i].node.paymentGatewayNames)) {
        order["paymentGatewayNames"] = (resultSet.orders.edges[i].node.paymentGatewayNames).toString();
      }

      if (isObj(resultSet.orders.edges[i].node.subtotalPriceSet)) {
        if (isObj(resultSet.orders.edges[i].node.subtotalPriceSet.shopMoney)) {
          if (isFloat(resultSet.orders.edges[i].node.subtotalPriceSet.shopMoney.amount)) {
            order["subtotalPriceSet_shopMoney_amount"] = parseFloat(resultSet.orders.edges[i].node.subtotalPriceSet.shopMoney.amount);
          }
        }
      }

      if (isObj(resultSet.orders.edges[i].node.totalPriceSet)) {
        if (isObj(resultSet.orders.edges[i].node.totalPriceSet.shopMoney)) {
          if (isFloat(resultSet.orders.edges[i].node.totalPriceSet.shopMoney.amount)) {
            order["totalPriceSet_shopMoney_amount"] = parseFloat(resultSet.orders.edges[i].node.totalPriceSet.shopMoney.amount);
          }
        }
      }

      if (isObj(resultSet.orders.edges[i].node.originalTotalPriceSet)) {
        if (isObj(resultSet.orders.edges[i].node.originalTotalPriceSet.shopMoney)) {
          if (isFloat(resultSet.orders.edges[i].node.originalTotalPriceSet.shopMoney.amount)) {
            order["originalTotalPriceSet_shopMoney_amount"] = parseFloat(resultSet.orders.edges[i].node.originalTotalPriceSet.shopMoney.amount);
          }
        }
      }

      if (isString(resultSet.orders.edges[i].node.riskLevel)) {
        order["riskLevel"] = resultSet.orders.edges[i].node.riskLevel;
      }

      if (isObj(resultSet.orders.edges[i].node.billingAddress)) {
        if (isString(resultSet.orders.edges[i].node.billingAddress.city)) {
          order["billingAddress_city"] = resultSet.orders.edges[i].node.billingAddress.city;
        }
        if (isString(resultSet.orders.edges[i].node.billingAddress.province)) {
          order["billingAddress_province"] = resultSet.orders.edges[i].node.billingAddress.province;
        }
        if (isString(resultSet.orders.edges[i].node.billingAddress.country)) {
          order["billingAddress_country"] = resultSet.orders.edges[i].node.billingAddress.country;
        }
        if (isString(resultSet.orders.edges[i].node.billingAddress.zip)) {
          order["billingAddress_zip"] = resultSet.orders.edges[i].node.billingAddress.zip;
        }
        if (isString(resultSet.orders.edges[i].node.billingAddress.phone)) {
          order["billingAddress_phone"] = resultSet.orders.edges[i].node.billingAddress.phone;
        }
      }

      if (isObj(resultSet.orders.edges[i].node.shippingAddress)) {
        if (isString(resultSet.orders.edges[i].node.shippingAddress.city)) {
          order["shippingAddress_city"] = resultSet.orders.edges[i].node.shippingAddress.city;
        }
        if (isString(resultSet.orders.edges[i].node.shippingAddress.province)) {
          order["shippingAddress_province"] = resultSet.orders.edges[i].node.shippingAddress.province;
        }
        if (isString(resultSet.orders.edges[i].node.shippingAddress.country)) {
          order["shippingAddress_country"] = resultSet.orders.edges[i].node.shippingAddress.country;
        }
        if (isString(resultSet.orders.edges[i].node.shippingAddress.zip)) {
          order["shippingAddress_zip"] = resultSet.orders.edges[i].node.shippingAddress.zip;
        }
        if (isString(resultSet.orders.edges[i].node.shippingAddress.phone)) {
          order["shippingAddress_phone"] = resultSet.orders.edges[i].node.shippingAddress.phone;
        }
      }

      if (isString(resultSet.orders.edges[i].node.createdAt)) {
        order["createdAt"] = resultSet.orders.edges[i].node.createdAt;
      }

      if (isString(resultSet.orders.edges[i].node.updatedAt)) {
        order["updatedAt"] = resultSet.orders.edges[i].node.updatedAt;
      }

      orders.push(order);
    }

    const Order = orderTableInit(shop_id);
    Order
      .bulkCreate(orders)
      .then((result) => {
        counter_orders += result.length;
        io.emit('OrderCount', counter_orders);
        console.log(`Successfully ran the query ${counter_orders}`);
      })
      .catch((err) => {
        console.log(err);
      });

    hasNextPage = resultSet.orders.pageInfo.hasNextPage;

    let n = resultSet.orders.edges.length;
    cursor = resultSet.orders.edges[n - 1].cursor;
  }
}

export { queryOrdersGRAPHQL };