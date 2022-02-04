import { getId, isString } from "../global.js";
import customerTableInit from "../Models/Customers/customer.js";
import orderTableInit from "../Models/Orders/order.js";
import orderItemTableInit from "../Models/Order_Items/order_item.js";
import User from "../Models/Users/user.js";
import { createShopifyObject } from "../global.js";

async function registerShop(shopEmail,accessToken) {
  const shopify = createShopifyObject(shopEmail,accessToken);

  const getStoreIdAndEmail = `query{
    shop {
      id
      name
      email
    }
  }`;

  var date_ob = new Date();

  let resultSet = await shopify.graphql(getStoreIdAndEmail);
  let shopId = getId(resultSet.shop.id);
  let shopName = "";
  let partnerEmail = "";

  if (isString(resultSet.shop.name)) {
    shopName = resultSet.shop.name;
  }

  if (isString(resultSet.shop.email)) {
    partnerEmail = resultSet.shop.email;
  }

  let user = {
    shop_id: shopId,
    name: shopName,
    shop_email : shopEmail,
    partner_email: partnerEmail,
    email_verified_at: date_ob,
    password: accessToken,
    created_at: date_ob,
    updated_at: date_ob
  }

  await User.sync({force: true});
  await User
    .create(user)
    .catch((err) => {
      console.log(err);
    });
  
  const Customer = customerTableInit(shopId);
  await Customer.sync();

  const Order = orderTableInit(shopId);
  await Order.sync();

  const OrderItem = orderItemTableInit(shopId);
  await OrderItem.sync();
}

export { registerShop }
