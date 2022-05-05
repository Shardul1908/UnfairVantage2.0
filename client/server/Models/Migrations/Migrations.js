import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

//Migration Table Defination
const Migration = sequelize.define('migrations', {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    migration: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    batch: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
}, {
    timestamps: false,
});

export default Migration;