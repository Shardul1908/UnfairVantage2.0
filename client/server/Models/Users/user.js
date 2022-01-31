import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const User = sequelize.define('users', {
  id: {
    type: Sequelize.BIGINT(20).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  shop_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shop_email : {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  partner_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email_verified_at: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  remember_token: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  },
  shopify_grandfathered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: '0',
  },
  shopify_namespace: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  shopify_freemium: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: '0',
  },
  plan_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    defaultValue: null,
  },
  deleted_at: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  password_updated_at: {
    type: Sequelize.DATE,
    defaultValue: null,
  }
}, {
  timestamps: false,
});

export default User;