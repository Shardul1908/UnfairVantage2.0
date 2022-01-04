import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const Password_Resets = sequelize.define('password_resets', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: null,
    }
}, {
    timestamps: false
});

export default Password_Resets;