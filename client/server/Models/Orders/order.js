import Sequelize from "sequelize";
import { sequelize } from "../../global.js";
//order table init
function orderTableInit(shopId) {
    
    const Order = sequelize.define(`${shopId}_orders`, {
        id: {
            type: Sequelize.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        order_id: {
            type: Sequelize.STRING,    
        },
        name: {
            type: Sequelize.STRING,
        },
        customer_id: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
        fullyPaid: {
            type: Sequelize.TINYINT(4),
            allowNull: false,
            defaultValue: '0'
        },
        closed: {
            type: Sequelize.TINYINT(4),
            allowNull: false,
            defaultValue: '0'
        },
        currencyCode: {
            type: Sequelize.STRING,
        },
        discountCode: {
            type: Sequelize.STRING,
        },
        tags: {
            type: Sequelize.STRING,
        },
        paymentGatewayNames: {
            type: Sequelize.STRING,
        },
        subtotalPriceSet_shopMoney_amount: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },
        totalPriceSet_shopMoney_amount: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },
        originalTotalPriceSet_shopMoney_amount: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: '0.00'
        },
        riskLevel: {
            type: Sequelize.STRING,
        },
        billingAddress_city: {
            type: Sequelize.STRING,
        },
        billingAddress_province: {
            type: Sequelize.STRING,
        },
        billingAddress_country: {
            type: Sequelize.STRING,
        },
        billingAddress_zip: {
            type: Sequelize.STRING,
        },
        billingAddress_phone: {
            type: Sequelize.STRING,
        },
        shippingAddress_city: {
            type: Sequelize.STRING,
        },
        shippingAddress_province: {
            type: Sequelize.STRING,
        },
        shippingAddress_country: {
            type: Sequelize.STRING,
        },
        shippingAddress_zip: {
            type: Sequelize.STRING,
        },
        shippingAddress_phone: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        }
    });
    
    return Order;
}

export default orderTableInit;