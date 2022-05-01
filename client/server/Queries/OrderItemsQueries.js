import orderItemTableInit from "../Models/Order_Items/order_item.js";
import {
  getId,
  isInt,
  isString,
  isObj,
} from "../global.js";
//graphql products query
async function queryOrderItemsGRAPHQL(shopify, shop_id, io) {
  let counter_orderItems = 0;
  let graphql_orders_query = `query {
    orders(first: 30) {
      edges {
        cursor
        node {
          id
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }`;

  let ordersCursor = "";
  let ordersIsFirstPage = true;
  let ordersHasNextPage = true;

  let limit = 1000;

  shopify.on("callGraphqlLimits", (limits) => {
    limit = limits.remaining;
  });

  while (ordersHasNextPage) {
    if (ordersIsFirstPage) {
      ordersIsFirstPage = false;
    } else {
      graphql_orders_query = `query {
        orders(first: 30, after: "${ordersCursor}") {
          edges {
            cursor
            node {
              id
            }
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
          }
        }
      }`;
    }

    let ordersResultSet = await shopify.graphql(graphql_orders_query);

    for (let i = 0; i < ordersResultSet.orders.edges.length; i++) {
      let id = ordersResultSet.orders.edges[i].node.id;

      let graphql_lineitems_query = `query {
        order(id: "${id}") {
          lineItems(first: 15) {
            edges {
              cursor
              node {
                id
                sku
                title
                quantity
                currentQuantity
                product{
                  productType
                  tags
                }
                variant{
                  id
                  displayName
                }
                vendor
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
        }
      }`;

      let lineItemsCursor = "";
      let lineItemsIsFirstPage = true;
      let lineItemsHasNextPage = true;

      while (lineItemsHasNextPage) {
        if (lineItemsIsFirstPage) {
          lineItemsIsFirstPage = false;
        } else {
          graphql_lineitems_query = `query {
            order(id: "${id}") {
              lineItems(first: 15, after: "${lineItemsCursor}") {
                edges {
                  cursor
                  node {
                    id
                    sku
                    title
                    quantity
                    currentQuantity
                    product{
                      productType
                      tags
                    }
                    variant{
                      id
                      displayName
                    }
                    vendor
                  }
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
              }
            }
          }`;
        }

        let lineItemsResultSet = await shopify.graphql(graphql_lineitems_query);

        if (limit < 50) {
          console.log(
            `\n(Order Items)Rate limit exceeded(limit = ${limit} )...Waiting for some time\n`
              .yellow
          );
          await new Promise((resolve) => {
            setTimeout(function () {
              resolve("Rate limit wait...");
              console.log(`\n(Order Items)Done Waiting continuing requests\n`.green);
            }, 2000);
          });
        }

        let order_items = [];
        for (let i = 0; i < lineItemsResultSet.order.lineItems.edges.length; i++) {
          let order_item = {};

          order_item["order_id"] = getId(id);

          order_item["product_id"] = getId(lineItemsResultSet.order.lineItems.edges[i].node.id);

          if (isString(lineItemsResultSet.order.lineItems.edges[i].node.sku)) {
            order_item["sku"] = lineItemsResultSet.order.lineItems.edges[i].node.sku;
          }

          if (isString(lineItemsResultSet.order.lineItems.edges[i].node.title)) {
            order_item["product_title"] = lineItemsResultSet.order.lineItems.edges[i].node.title;
          }

          if (isInt(lineItemsResultSet.order.lineItems.edges[i].node.quantity)) {
            order_item["quantity"] = parseInt(lineItemsResultSet.order.lineItems.edges[i].node.quantity);
          }

          if (isInt(lineItemsResultSet.order.lineItems.edges[i].node.currentQuantity)) {
            order_item["currentQuantity"] = parseInt(lineItemsResultSet.order.lineItems.edges[i].node.currentQuantity);
          }

          if (isObj(lineItemsResultSet.order.lineItems.edges[i].node.product)) {
            if (isString(lineItemsResultSet.order.lineItems.edges[i].node.product.productType)) {
              order_item["product_type"] = lineItemsResultSet.order.lineItems.edges[i].node.product.productType;
            }
            if (isString(lineItemsResultSet.order.lineItems.edges[i].node.product.tags)) {
              order_item["product_tags"] = (lineItemsResultSet.order.lineItems.edges[i].node.product.tags).toString();
            }
          }

          if (isObj(lineItemsResultSet.order.lineItems.edges[i].node.variant)) {
            order_item["variant_id"] = getId(lineItemsResultSet.order.lineItems.edges[i].node.variant.id);
            if (isString(lineItemsResultSet.order.lineItems.edges[i].node.variant.displayName)) {
              order_item["variant_displayName"] = lineItemsResultSet.order.lineItems.edges[i].node.variant.displayName;
            }
          }

          if (isString(lineItemsResultSet.order.lineItems.edges[i].node.vendor)) {
            order_item["vendor"] = lineItemsResultSet.order.lineItems.edges[i].node.vendor;
          }

          order_items.push(order_item);

        }

        const OrderItem = orderItemTableInit(shop_id);
        OrderItem
          .bulkCreate(order_items)
          .then((result) => {
            counter_orderItems += result.length;
            io.emit('OrderItemCount', counter_orderItems);
            console.log(`Successfully ran the query ${counter_orderItems}`)
          })
          .catch((err) => {
            console.log(err);
          });

        lineItemsHasNextPage = lineItemsResultSet.order.lineItems.pageInfo.hasNextPage;

        let n = lineItemsResultSet.order.lineItems.edges.length;
        lineItemsCursor = lineItemsResultSet.order.lineItems.edges[n - 1].cursor;
      }
    }

    if (limit < 50) {
      console.log(
        `\nRate limit exceeded(limit = ${limit} )...Waiting for some time\n`
          .yellow
      );
      await new Promise((resolve) => {
        setTimeout(function () {
          resolve("Rate limit wait...");
          console.log(`\nDone Waiting continuing requests\n`.green);
        }, 2000);
      });
    }

    ordersHasNextPage = ordersResultSet.orders.pageInfo.hasNextPage;

    let n = ordersResultSet.orders.edges.length;
    ordersCursor = ordersResultSet.orders.edges[n - 1].cursor;
  }
}

export { queryOrderItemsGRAPHQL };