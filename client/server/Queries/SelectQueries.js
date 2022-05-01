import customerTableInit from "../Models/Customers/customer.js";
import orderTableInit from "../Models/Orders/order.js";
import orderItemTableInit from "../Models/Order_Items/order_item.js";
import { Op } from "sequelize";
import SavedSegmentsInit from "../Models/Saved_Segments/Saved_Segments.js";
import { getNoOfDays, get_ranked_array } from "../global.js";

export async function fetch_customers_using_filters(
  filters,
  columnFilters,
  pageSize,
  pageIndex,
  shop_id,
  segment
) {
  let conditions = createConditions(filters, columnFilters,segment);

  const Customer = customerTableInit(shop_id);
  await Customer.sync();
  const { count, rows } = await Customer.findAndCountAll({
    where: conditions,
    offset: (pageIndex - 1) * pageSize,
    limit: pageSize,
  });

  let toSend = {
    total: `${count}`,
    pageData: rows,
  };

  return toSend;
}

export async function fetch_customers_all(filters, columnFilters, shop_id, segment) {
  let conditions = createConditions(filters, columnFilters, segment);

  const Customer = customerTableInit(shop_id);
  await Customer.sync();

  const customers = await Customer.findAll({ where: conditions });
  return customers;
}

function createConditions(filters, columnFilters, segment) {
  let conditions = {};

  let savedFilters = [];
  if(segment === "top") {
    conditions["segment"] = {
      [Op.eq]: "Top Customer"
    }
  } else if(segment === "high") {
    conditions["segment"] = {
      [Op.eq]: "High Value Customer"
    }
  } else if(segment === "med") {
    conditions["segment"] = {
      [Op.eq]: "Medium Value Customer"
    }
  } else if(segment === "low") {
    conditions["segment"] = {
      [Op.eq]: "Low Value Customer"
    }
  } else if(segment === "lost") {
    conditions["segment"] = {
      [Op.eq]: "Lost Customer"
    }
  } else if(segment === "all") {
    // nothing to do
  } else {

  }
  
  //column conditions
  let names = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "ordersCount",
    "state",
    "totalSpent",
    "acceptsMarketing",
    "averageOrderAmountV2_amount",
    "averageOrderAmountV2_currencyCode",
    "totalSpentV2_amount",
    "totalSpentV2_currencyCode",
    "tags",
    "defaultAddress_city",
    "defaultAddress_province",
    "defaultAddress_country",
    "defaultAddress_zip",
    "defaultAddress_phone",
    "createdAt",
    "updatedAt",
  ];

  for (let i = 0; i < names.length; i++) {
    if (columnFilters[names[i]] !== undefined) {
      if (
        names[i] === "firstName" ||
        names[i] === "lastName" ||
        names[i] === "email" ||
        names[i] === "state" ||
        names[i] === "averageOrderAmountV2_currencyCode" ||
        names[i] === "totalSpentV2_currencyCode" ||
        names[i] === "tags" ||
        names[i] === "defaultAddress_city" ||
        names[i] === "defaultAddress_province" ||
        names[i] === "defaultAddress_country" ||
        names[i] === "defaultAddress_zip" ||
        names[i] === "createdAt" ||
        names[i] === "updatedAt"
      ) {
        conditions[names[i]] = {
          [Op.like]: columnFilters[names[i]].data + "%",
        };
      } else if (names[i] === "defaultAddress_phone" || names[i] === "phone") {
        conditions[names[i]] = {
          [Op.like]: "+" + columnFilters[names[i]].data + "%",
        };
      } else if (names[i] === "ordersCount") {
        conditions[names[i]] = {
          [Op.eq]: parseInt(columnFilters[names[i]].data),
        };
      } else if (
        names[i] === "totalSpent" ||
        names[i] === "averageOrderAmountV2_amount" ||
        names[i] === "totalSpentV2_amount"
      ) {
        conditions[names[i]] = {
          [Op.eq]: parseFloat(columnFilters[names[i]].data),
        };
      } else if (names[i] === "acceptsMarketing") {
        conditions[names[i]] = {
          [Op.eq]: columnFilters[names[i]].data,
        };
      }
    }
  }

  let accountstates = [];
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].name === "AOV") {
      conditions["averageOrderAmountV2_amount"] = {
        [Op.between]: [filters[i].data.aov_min, filters[i].data.aov_max],
      };
    }
    if (filters[i].name === "acceptsMarketing") {
      conditions["acceptsMarketing"] = {
        [Op.eq]: [filters[i].data],
      };
    }
    if (filters[i].name === "AccountState") {
      accountstates.push({ [Op.eq]: filters[i].data });
    }
    if (filters[i].name === "MinSpend") {
      conditions["totalSpent"] = {
        [Op.gte]: [filters[i].data],
      };
    }
  }

  for (let i = 0; i < accountstates.length; i++) {
    conditions["state"] = {
      [Op.or]: accountstates,
    };
  }
  return conditions;
}

export async function table_sizes(shop_id) {
  const Customer = customerTableInit(shop_id);
  await Customer.sync();

  const Order = orderTableInit(shop_id);
  Order.sync();

  const OrderItem = orderItemTableInit(shop_id);
  OrderItem.sync();

  let customer_count = await Customer.count();
  let order_count = await Order.count();
  let orderItem_count = await OrderItem.count();

  let toSend = {
    customer_count,
    order_count,
    orderItem_count
  }

  return toSend;
}

export async function create_rfm_scorecard(shop_id) {
  const Customer = customerTableInit(shop_id);
  await Customer.sync();

  const customers = await Customer.findAll();

  let customer_ids = [];

  const today = new Date();
  const recency = [];
  const frequency = [];
  const monetary = [];

  let n = customers.length;

  for(let i = 0;i<n;i++) {
    if((customers[i].lastPurchasedDate) !== null) {
      const cust_lastPurchase = new Date(customers[i].lastPurchasedDate);
      let days = getNoOfDays(cust_lastPurchase, today);
      recency.push(days);
    }else {
      recency.push(0);
    } 

    frequency.push(customers[i].ordersCount);
    monetary.push(customers[i].totalSpent);

    customer_ids.push(customers[i].customer_id);
  }

  let ranked_recency;
  for(let i = 0;i<n;i++) {
    ranked_recency = get_ranked_array(recency,false);
  }

  let ranked_frequency;
  for(let i = 0;i<n;i++) {
    ranked_frequency = get_ranked_array(frequency,true);
  }

  let ranked_monetary;
  for(let i = 0;i<n;i++) {
    ranked_monetary = get_ranked_array(monetary,true);
  }

  let ranked_norm_recency = [];
  let recency_rank_max = Math.max(...ranked_recency);
  for(let i = 0;i<n;i++) {
    ranked_norm_recency.push((ranked_recency[i]/recency_rank_max)*100);
  }

  let ranked_norm_frequency = [];
  let frequency_rank_max = Math.max(...ranked_frequency);
  for(let i = 0;i<n;i++) {
    ranked_norm_frequency.push((ranked_frequency[i]/frequency_rank_max)*100);
  }

  let ranked_norm_monetary = [];
  let monetary_rank_max = Math.max(...ranked_monetary);
  for(let i = 0;i<n;i++) {
    ranked_norm_monetary.push((ranked_monetary[i]/monetary_rank_max)*100);
  }

  let rfm_score = [];
  for(let i = 0;i<n;i++) {
    rfm_score.push((0.15 * ranked_norm_recency[i]) + (0.28 * ranked_norm_frequency[i]) + (0.57 * ranked_norm_monetary[i]));
  }

  for(let i = 0;i<n;i++) {
    rfm_score[i] = rfm_score[i]*0.05;
    rfm_score[i] = round(rfm_score[i],2);
  }

  let segments = [];
  for(let i = 0;i<n;i++) {
    if(rfm_score[i] > 4.50) {
      segments.push("Top Customer");
    }else if(rfm_score[i] <= 4.50 && rfm_score[i] > 4.00) {
      segments.push("High Value Customer");
    }else if(rfm_score[i] <= 4.00 && rfm_score[i] > 3.00) {
      segments.push("Medium Value Customer");
    }else if(rfm_score[i] <= 3.00 && rfm_score[i] > 1.60) {
      segments.push("Low Value Customer");
    }else {
      segments.push("Lost Customer");
    }
  }

  for(let i = 0;i<n;i++) {
    Customer.update(
    { segment: segments[i] },
    { where: { customer_id: customer_ids[i] } }
    );
  }

  const toSend = {
    rfm_score,segments
  }

  return toSend;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export async function fetch_save_segments(shop_id) {
  const Segments = SavedSegmentsInit(shop_id);
  await Segments.sync();

  const segments = await Segments.findAll();
  return segments;
}

export async function fetch_save_segments_with_id(shop_id, segment) {
  const Segments = SavedSegmentsInit(shop_id);
  await Segments.sync();

  const segments = await Segments.findAll({ where: {
    "id": segment,
  }});

  return segments;
}
