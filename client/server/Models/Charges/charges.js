import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

//almost done neede some makeup
const Charge = sequelize.define(`charges`, {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
        type: Sequelize.STRING,
        defaultValue: null,
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    terms: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
    },
    interval: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        defaultValue: null,
    },
    reference_charge: {
        type: Sequelize.BIGINT(20),
        defaultValue: null,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    updated_at: {
        type: Sequelize.DATE,
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
}, {
    timestamps: false
});

export default Charge;