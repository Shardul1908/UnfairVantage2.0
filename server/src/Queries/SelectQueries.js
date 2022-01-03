import Customer from "../Classes/Customers/customer.js";
import { Op } from "sequelize";

export async function fetch_customers_using_filters(filters, columnFilters, pageSize, pageIndex, res) {
    let conditions = createConditions(filters,columnFilters);
    
    const { count, rows } = await Customer.findAndCountAll({
        where: conditions,
        offset: (pageIndex-1)*pageSize,
        limit: pageSize
    });

    let toSend = {
        total: `${count}`,
        pageData: rows,
    };
    res.status(200).send(toSend);
}

export async function fetch_customers_all(filters, columnFilters, res) {
    let conditions = createConditions(filters,columnFilters);
    const customers = await Customer.findAll({where : conditions});
    res.status(200).send(customers);
}

function createConditions(filters,columnFilters) {
    let conditions = {};

    //column conditions
    let names = ['firstName', 'lastName', 'email', 'phone', 'ordersCount', 'state', 'totalSpent', 'acceptsMarketing', 'averageOrderAmountV2_amount', 'averageOrderAmountV2_currencyCode', 'totalSpentV2_amount', 'totalSpentV2_currencyCode', 'tags', 'defaultAddress_city', 'defaultAddress_province', 'defaultAddress_country', 'defaultAddress_zip', 'defaultAddress_phone', 'createdAt', 'updatedAt'];

    for (let i = 0; i < names.length; i++) {
        if (columnFilters[names[i]] !== undefined) {
            if (
                names[i] === 'firstName' ||  names[i] === 'lastName' || 
                names[i] === 'email' ||  names[i] === 'state' ||
                names[i] === 'averageOrderAmountV2_currencyCode' || names[i] === 'totalSpentV2_currencyCode' ||
                names[i] === 'tags' || names[i] === 'defaultAddress_city' || names[i] === 'defaultAddress_province' ||
                names[i] === 'defaultAddress_country' || names[i] === 'defaultAddress_zip' ||
                names[i] === 'createdAt' || names[i] === 'updatedAt') {
                conditions[names[i]] = {
                    [Op.like]: columnFilters[names[i]].data + '%'
                }
            }else if(names[i] === 'defaultAddress_phone' || names[i] === 'phone') {
                conditions[names[i]] = {
                    [Op.like]: '+' + columnFilters[names[i]].data + '%'
                }
            }else if(names[i] === 'ordersCount') {
                conditions[names[i]] = {
                    [Op.eq]: parseInt(columnFilters[names[i]].data)
                }
            }else if(names[i] === 'totalSpent' || names[i] === 'averageOrderAmountV2_amount' || names[i] === 'totalSpentV2_amount') {
                conditions[names[i]] = {
                    [Op.eq]: parseFloat(columnFilters[names[i]].data)
                }
            }else if(names[i] === 'acceptsMarketing') {
                conditions[names[i]] = {
                    [Op.eq]: columnFilters[names[i]].data
                }
            }
        }
    }

    for(let i = 0;i<filters.length;i++) {
        if(filters[i].name === "AOV") {
            conditions["averageOrderAmountV2_amount"] = {
                [Op.between]: [filters[i].data.aov_min, filters[i].data.aov_max]
            }
        }
        if(filters[i].name === "acceptsMarketing") {
            conditions["acceptsMarketing"] = {
                [Op.eq]: [filters[i].data]
            }
        }
    }

    return conditions;
}