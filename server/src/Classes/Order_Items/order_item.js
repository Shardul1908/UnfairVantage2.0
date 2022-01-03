import Sequelize from "sequelize";
import { sequelize } from "../../Global/global.js";

const OrderItem = sequelize.define(`order_items`, {
  sr_no: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  order_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  product_id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
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
    allowNull: true
  },
  currentQuantity: {
    type: Sequelize.INTEGER,
    allowNull: true
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
});

export default OrderItem;