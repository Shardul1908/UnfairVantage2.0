import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

//Order Item Table Defination
function orderItemTableInit(shopId) {

  const OrderItem = sequelize.define(`${shopId}_order_items`, {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: Sequelize.STRING,
    },
    product_id: {
      type: Sequelize.STRING,
    },
    sku: {
      type: Sequelize.STRING,
      allowNull: true
    },
    product_title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    currentQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    product_type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    product_tags: {
      type: Sequelize.STRING,
      allowNull: true
    },
    variant_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    variant_displayName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    vendor: {
      type: Sequelize.STRING,
      allowNull: true
    },
  }, {
    timestamps: false,
  });

  return OrderItem;
}

export default orderItemTableInit;