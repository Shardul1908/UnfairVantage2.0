import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const Charge = sequelize.define(`charges`, {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    charge_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    test: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
    },
    status: {
        type: "VARCHAR(255) COLLATE utf8mb4_unicode_ci",
        defaultValue: null,
    },
    name: {
        type: "VARCHAR(255) COLLATE utf8mb4_unicode_ci",
        defaultValue: null,
    },
    terms: {
        type: "VARCHAR(255) COLLATE utf8mb4_unicode_ci",
        defaultValue: null,
    },
    type: {
        type: "VARCHAR(255) COLLATE utf8mb4_unicode_ci",
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
    },
    interval: {
        type: "VARCHAR(255) COLLATE utf8mb4_unicode_ci",
        defaultValue: null,
    },
    capped_amount: {
        type: Sequelize.DECIMAL(8, 2),
        defaultValue: null,
    },
    trial_days: {
        type: Sequelize.INTEGER(11),
        defaultValue: null,
    },
    billing_on: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    activated_on: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    trial_ends_on: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    cancelled_on: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    expires_on: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    plan_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: null,
    },
    description: {
        type: "VARCHAR(255) COLLATE utf8mb4_unicode_ci",
        defaultValue: null,
    },
    reference_charge: {
        type: Sequelize.BIGINT(20),
        defaultValue: null,
    },
    deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    user_id: {
        type: Sequelize.BIGINT(20).UNSIGNED,
        allowNull: false,
    },
});

export default Charge;