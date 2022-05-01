//THIS FILE CONTAINS THE CODE THAT RETURNS
//THE TOTAL COUNT OF CUSTOMERS, ORDERS AND ORDER ITEMS.
import Shopify from "shopify-api-node";

const shopify = new Shopify({
  shopName: "onepiecewillbemine",
  accessToken: "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",
  apiVersion: "2021-10"
});


async function queryTotalCount(shopify){

  let counter_graphql_query_customers = `query{
    customers(first:250){
      edges{
        cursor
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }`;

  let counter_graphql_query_orders = `query{
    orders(first:250){
      edges{
        cursor
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }`;

  let counter_graphql_query_order_items = `query {
    orders(first: 250) {
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
  }`

  let counter_cursor_customers = "";
  let counter_hasNextPage_customers = true;
  let counter_isFirstPage_customers = true;
  let counter_cursor_orders = "";
  let counter_hasNextPage_orders = true;
  let counter_isFirstPage_orders = true;
  let counter_cursor_order_items = "";
  let counter_hasNextPage_order_items = true;
  let counter_isFirstPage_order_items = true;
  let total_count_customers = 0;
  let total_count_orders = 0;
  let total_count_order_items = 0;
  let summation_of_count = 0;
  let limit = 1000;

  shopify.on("callGraphqlLimits", (limits) => {
    limit = limits.remaining;
  });
//CUSTOMERS
  while (counter_hasNextPage_customers) {
    if (counter_isFirstPage_customers) {
      counter_isFirstPage_customers = false;
    } else {
      counter_graphql_query_customers = `query{
        customers(first:250, after: "${counter_cursor_customers}"){
          edges{
            cursor
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
          }
        }
      }`;
    }

    const resultSet = await shopify
      .graphql(counter_graphql_query_customers)
      .catch((err) => console.log(err));

    counter_hasNextPage_customers = resultSet.customers.pageInfo.hasNextPage;

    if (limit < 50) {
      console.log(
        `\n(Total Count Customers)Rate limit exceeded(limit = ${limit} )...Waiting for some time\n`
          .yellow
      );
      await new Promise((resolve) => {
        setTimeout(function () {
          resolve("Rate limit wait...");
          console.log(`\n(Total Count Customers)Done Waiting continuing requests\n`.green);
        }, 2000);
      });
    }

    let nc = resultSet.customers.edges.length;
    counter_cursor_customers = resultSet.customers.edges[nc - 1].cursor;
    total_count_customers = total_count_customers + nc;
    console.log("Total count customers: " + total_count_customers);
  }
  
  //ORDERS
  while (counter_hasNextPage_orders) {
    if (counter_isFirstPage_orders) {
      counter_isFirstPage_orders = false;
    } else {
      counter_graphql_query_orders = `query{
        orders(first:250, after: "${counter_cursor_orders}"){
          edges{
            cursor
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
          }
        }
      }`;
    }

    const resultSet = await shopify
      .graphql(counter_graphql_query_orders)
      .catch((err) => console.log(err));

    counter_hasNextPage_orders = resultSet.orders.pageInfo.hasNextPage;

    if (limit < 50) {
      console.log(
        `\n(Total Count Orders)Rate limit exceeded(limit = ${limit} )...Waiting for some time\n`
          .yellow
      );
      await new Promise((resolve) => {
        setTimeout(function () {
          resolve("Rate limit wait...");
          console.log(`\n(Total Count Orders)Done Waiting continuing requests\n`.green);
        }, 2000);
      });
    }

    let no = resultSet.orders.edges.length;
    // console.log("############################################################################################################");
    // console.log("############################################################################################################");
    // console.log(no);
    // console.log("############################################################################################################");
    // console.log("############################################################################################################");
    counter_cursor_orders = resultSet.orders.edges[no - 1].cursor;
    total_count_orders = total_count_orders + no;
    console.log("Total count orders: ", total_count_orders);
  }

  // ORDER ITEMS
  while (counter_hasNextPage_order_items) {
    if (counter_isFirstPage_order_items) {
      counter_isFirstPage_order_items = false;
    } else {
      counter_graphql_query_order_items = `query {
        orders(first: 250, after: "${counter_cursor_order_items}") {
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

    let ordersResultSet = await shopify.graphql(counter_graphql_query_order_items);

    for (let i = 0; i < ordersResultSet.orders.edges.length; i++) {
      let id = ordersResultSet.orders.edges[i].node.id;

      let counter_graphql_query_line_items = `query {
        order(id: "${id}") {
          lineItems(first: 250) {
            edges {
              cursor
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
        }
      }`;

      let counter_cursor_line_items = "";
      let counter_isFirstPage_line_items = true;
      let counter_hasNextPage_line_items = true;

      while (counter_hasNextPage_line_items) {
        if (counter_isFirstPage_line_items) {
          counter_isFirstPage_line_items = false;
        } else {
          counter_graphql_query_line_items = `query {
            order(id: "${id}") {
              lineItems(first: 250, after: "${counter_cursor_line_items}") {
                edges {
                  cursor
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
              }
            }
          }`;
        }

        let lineItemsResultSet = await shopify.graphql(counter_graphql_query_line_items);

        if (limit < 50) {
          console.log(
            `\n(Total Count Order Items)Rate limit exceeded(limit = ${limit} )...Waiting for some time\n`
              .yellow
          );
          await new Promise((resolve) => {
            setTimeout(function () {
              resolve("Rate limit wait...");
              console.log(`\n(Total Count Order Items)Done Waiting continuing requests\n`.green);
            }, 2000);
          });
        }

        counter_hasNextPage_line_items = lineItemsResultSet.order.lineItems.pageInfo.hasNextPage;

        let n = lineItemsResultSet.order.lineItems.edges.length;
        counter_cursor_line_items = lineItemsResultSet.order.lineItems.edges[n - 1].cursor;
        total_count_order_items = total_count_order_items + n;
        console.log("Total count products: ", total_count_order_items);
      }
    }

    if (limit < 50) {
      console.log(
        `\n(Total Count Order Items)Rate limit exceeded(limit = ${limit} )...Waiting for some time\n`
          .yellow
      );
      await new Promise((resolve) => {
        setTimeout(function () {
          resolve("Rate limit wait...");
          console.log(`\n(Total Count Order Items)Done Waiting continuing requests\n`.green);
        }, 2000);
      });
    }

    counter_hasNextPage_order_items = ordersResultSet.orders.pageInfo.hasNextPage;

    let n = ordersResultSet.orders.edges.length;
    counter_cursor_order_items = ordersResultSet.orders.edges[n - 1].cursor;
  }

  summation_of_count = total_count_customers + total_count_orders + total_count_order_items;

  return summation_of_count;

}

export {queryTotalCount};