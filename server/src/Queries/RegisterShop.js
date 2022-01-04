import { getId, mysql_connection, isString } from "../global.js";

var shopId = "60558573822";
var shopEmail = "";

async function registerShop(shopify) {
  const getStoreIdAndEmail = `query{
    shop {
      id
      email
    }
  }`;

  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
  var date = year + "-" + month + "-" + day;

  let resultSet = await shopify.graphql(getStoreIdAndEmail);
  shopId = getId(resultSet.shop.id);
  
  if (isString(resultSet.shop.email)) {
    shopEmail = resultSet.shop.email;
  }

  if (isString(resultSet.shop.name)) {
    shopEmail = resultSet.shop.email;
  }

  const createCustomerTable = `CREATE TABLE \`shopify_db_schema\`.\`${shopId}_customers\` (\`sr_no\` INT(50) NOT NULL AUTO_INCREMENT,\`id\` VARCHAR(50) NOT NULL,\`firstName\` VARCHAR(50),\`lastName\` VARCHAR(50),\`email\` VARCHAR(50),\`phone\` VARCHAR(50),\`ordersCount\` INT(50),\`state\` VARCHAR(50),\`totalSpent\` FLOAT(50),acceptsMarketing BOOLEAN,\`averageOrderAmountV2_amount\` FLOAT(50),\`averageOrderAmountV2_currencyCode\` VARCHAR(50),\`totalSpentV2_amount\` FLOAT(50),\`totalSpentV2_currencyCode\` VARCHAR(50),\`tags\` VARCHAR(50),\`defaultAddress_city\` VARCHAR(50),\`defaultAddress_province\` VARCHAR(50),\`defaultAddress_country\` VARCHAR(50),\`defaultAddress_zip\` VARCHAR(50),\`defaultAddress_phone\` VARCHAR(50),\`createdAt\` VARCHAR(50),\`updatedAt\` VARCHAR(50),PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`

  mysql_connection.query(createCustomerTable, function (err, result) {
    if (err) {
      throw err;
    }
    console.log("Created Customer Table Successfully! ");
  });

  const createOrdersTable = `CREATE TABLE \`shopify_db_schema\`.\`${shopId}_orders\` (\`id\` VARCHAR(50) NOT NULL,\`name\` VARCHAR(50) ,\`customer_id\` VARCHAR(50) NOT NULL,\`email\` VARCHAR(50) ,\`phone\` VARCHAR(50) ,\`fullyPaid\` BOOLEAN ,\`closed\` BOOLEAN,\`currencyCode\` VARCHAR(50) ,\`discountCode\` VARCHAR(50) ,\`tags\` VARCHAR(50),\`paymentGatewayNames\` VARCHAR(50), \`subtotalPriceSet_shopMoney_amount\` FLOAT(50),\`totalPriceSet_shopMoney_amount\` FLOAT(50),\`originalTotalPriceSet_shopMoney_amount\` FLOAT(50),\`riskLevel\` VARCHAR(50),\`billingAddress_city\` VARCHAR(50),\`billingAddress_province\` VARCHAR(50),\`billingAddress_country\` VARCHAR(50),\`billingAddress_zip\` VARCHAR(50),\`billingAddress_phone\` VARCHAR(50),\`shippingAddress_city\` VARCHAR(50),\`shippingAddress_province\` VARCHAR(50),\`shippingAddress_country\` VARCHAR(50),\`shippingAddress_zip\` VARCHAR(50),\`shippingAddress_phone\` VARCHAR(50),\`createdAt\` VARCHAR(50),\`updatedAt\` VARCHAR(50),PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`

  mysql_connection.query(createOrdersTable, function (err, result) {
    if (err) {
      throw err;
    }
    console.log("Created Orders Table Successfully! ");
  });

  const createOrderItemsTable = `CREATE TABLE \`shopify_db_schema\`.\`${shopId}_order_items\` (\`order_id\` VARCHAR(50) NOT NULL, \`product_id\` VARCHAR(50) NOT NULL, \`sku\` VARCHAR(50), \`product_title\` VARCHAR(250), \`quantity\` INT(6), \`currentQuantity\` INT(6), \`product_type\` VARCHAR(100), \`product_tags\` VARCHAR(250), \`variant_id\` VARCHAR(50), \`variant_displayName\` VARCHAR(250), \`vendor\` VARCHAR(100), PRIMARY KEY(\`product_id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`

  mysql_connection.query(createOrderItemsTable, function (err, result) {
    if (err) {
      throw err;
    }
    console.log("Created Order Items Table Successfully! ");
  });

  const insertUser = `INSERT INTO \`users\` (\`id\`, \`name\`, \`email\`, \`email_verified_at\`, \`password\`, \`remember_token\`, \`created_at\`, \`updated_at\`, \`shopify_grandfathered\`, \`shopify_namespace\`, \`shopify_freemium\`, \`plan_id\`, \`deleted_at\`, \`password_updated_at\`) VALUES
  (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

  mysql_connection.query(insertUser, 
    [shopId,
     shopName,
     shopEmail,
     null,
     shopAccessToken,
     null,
     date,
     date,
     0,
     null,
     0,
     null,
     null,
     date],
    function(err, result){
    if(err){
      throw err;
    }
    console.log("Shop Inserted Into Users Table Successfully! ");
  });
}

export {registerShop, shopId}
