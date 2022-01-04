import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const Migration = sequelize.define('migrations', {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
    },
    migration: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    batch: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
},{
    timestamps: false,
});