import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const Failed_Jobs = sequelize.define('failed_job', {
    id: {
        type: Sequelize.BIGINT(20).UNSIGNED,
        allowNull: false,
        primaryKey: true
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
        type: Sequelize.TEXT,
        allowNull: false,
    },
    exception: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    failed_at: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

export default Failed_Jobs;