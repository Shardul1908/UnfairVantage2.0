import Sequelize from "sequelize";
import { sequelize } from "../../Global/global.js";

const Customer = sequelize.define(`customers`, {
  sr_no: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  ordersCount: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  totalSpent: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  acceptsMarketing: {
    type: Sequelize.STRING,
    allowNull: true
  },
  averageOrderAmountV2_amount: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  averageOrderAmountV2_currencyCode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  totalSpentV2_amount: {
    type: Sequelize.STRING,
    allowNull: true
  },
  totalSpentV2_currencyCode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tags: {
    type: Sequelize.STRING,
    allowNull: true
  },
  defaultAddress_city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  defaultAddress_province: {
    type: Sequelize.STRING,
    allowNull: true
  },
  defaultAddress_country: {
    type: Sequelize.STRING,
    allowNull: true
  },
  defaultAddress_zip: {
    type: Sequelize.STRING,
    allowNull: true
  },
  defaultAddress_phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

export default Customer;
