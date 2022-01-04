import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const User = sequelize.define('users', {
  id: {
    type: Sequelize.BIGINT(20).UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
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
    allowNull: false,
  },
  shopify_grandfathered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: '0',
  },
  shopify_namespace: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shopify_freemium: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: '0',
  },
  plan_id: {  
    type: Sequelize.BIGINT(20).UNSIGNED,
    allowNull: false,
  },
  deleted_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  password_updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
  }
});

export default User;