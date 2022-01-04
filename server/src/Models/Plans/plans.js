import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const Plan = sequelize.define('plans', {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
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
});