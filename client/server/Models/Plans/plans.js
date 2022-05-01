import Sequelize from "sequelize";
import { sequelize } from "../../global.js";
//orm
const Plan = sequelize.define('plans', {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }, 
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(8,2),
        allowNull: false,
    },
    interval: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    capped_amount: {
        type: Sequelize.DECIMAL(8,2),
        defaultValue: null,
    },
    terms: {    
        type: Sequelize.STRING,
        defaultValue: null,
    },
    trial_days: {
        type: Sequelize.INTEGER(11),
        defaultValue: null,
    },
    test: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
    },
    on_install: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
    }, 
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
    }
}, {
    timestamps: false,
});

export default Plan;