import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

function customerTableInit(shopId) {

  const Customer = sequelize.define(`${shopId}_customers`, {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    customer_id: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    firstName: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    lastName: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    phone: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    ordersCount: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    totalSpent: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: '0.00',
    },
    acceptsMarketing: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    averageOrderAmountV2_amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: '0.00',
    },
    averageOrderAmountV2_currencyCode: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    totalSpentV2_amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: '0.00',
    },
    totalSpentV2_currencyCode: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    lastPurchasedDate: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    tags: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    defaultAddress_city: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    defaultAddress_province: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    defaultAddress_country: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    defaultAddress_zip: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    defaultAddress_phone: {
      type: "VARCHAR(250) COLLATE utf8mb4_unicode_ci",
      defaultValue: null,
    },
    segment: {
      type: "VARCHAR(250) COLLATE utf8mb4_unicode_ci",
      defaultValue: null,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    }
  });

  return Customer;
}

export default customerTableInit;
