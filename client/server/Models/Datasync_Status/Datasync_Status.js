import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const Datasync_Status = sequelize.define('datasync_status', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    shopid: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    model: {
        type: Sequelize.STRING(50),
        defaultValue: null,
    },
    totalrows: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: '0',
    },
    processedrows: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: '0',
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
    },
    link_next: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    start_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    end_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    },
}, {
    timestamps: false,
});

export default Datasync_Status;