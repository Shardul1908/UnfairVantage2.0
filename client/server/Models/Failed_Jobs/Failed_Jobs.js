import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

//Failed Jobs Table Defination
const Failed_Jobs = sequelize.define('failed_job', {
    id: {
        type: Sequelize.BIGINT(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    connection: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    queue: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    payload: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
    },
    exception: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
    },
    failed_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    }
}, {
    timestamps: false,
});

export default Failed_Jobs;