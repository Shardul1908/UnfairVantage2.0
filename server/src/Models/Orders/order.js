import Sequelize from "sequelize";
import { sequelize } from "../../global.js";

const Order = sequelize.define(`orders`, {
    sr_no: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true    
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customer_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fullyPaid: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    closed: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    currencyCode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    discountCode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: true
    },
    paymentGatewayNames: {
        type: Sequelize.STRING,
        allowNull: true
    },
    subtotalPriceSet_shopMoney_amount: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    totalPriceSet_shopMoney_amount: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    originalTotalPriceSet_shopMoney_amount: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    riskLevel: {
        type: Sequelize.STRING,
        allowNull: true
    },
    billingAddress_city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    billingAddress_province: {
        type: Sequelize.STRING,
        allowNull: true
    },
    billingAddress_country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    billingAddress_zip: {
        type: Sequelize.STRING,
        allowNull: true
    },
    billingAddress_phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    shippingAddress_city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    shippingAddress_province: {
        type: Sequelize.STRING,
        allowNull: true
    },
    shippingAddress_country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    shippingAddress_zip: {
        type: Sequelize.STRING,
        allowNull: true
    },
    shippingAddress_phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.STRING,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

export default Order;