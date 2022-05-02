//Columns for datatable

export const COLUMNS = [
  {
    name: "Sr.No",
    selector: (row) => `${row.id}`,
    cell: (row, index, column, id) => {
      row.id = index;
      return ++index;
    }
  },
  {
    name: "ID",
    sortable: true,
    selector: (row) => `${row.customer_id}`,
  },
  {
    name: "First Name",
    sortable: true,
    selector: (row) => `${row.firstName}`,
  },
  {
    name: "Last Name",
    sortable: true,
    selector: (row) => `${row.lastName}`,
  },
  {
    name: "Email",
    sortable: true,
    selector: (row) => `${row.email}`,
  },
  {
    name: "Phone",
    sortable: true,
    selector: (row) => `${row.phone}`,
  },
  {
    name: "Number of Orders",
    sortable: true,
    selector: (row) => `${row.ordersCount}`,
  },
  {
    name: "Account State",
    sortable: true,
    selector: (row) => `${row.state}`,
  },
  {
    name: "Total Spent",
    sortable: true,
    selector: (row) => `${row.totalSpent}`,
  },
  {
    name: "Accepts Marketing",
    sortable: true,
    selector: (row) => `${row.acceptsMarketing}`,
  },
  {
    name: "Average Order Amount Amount",
    sortable: true,
    selector: (row) => `${row.averageOrderAmountV2_amount}`,
  },
  {
    name: "Average Order Amount Currency Code",
    sortable: true,
    selector: (row) => `${row.averageOrderAmountV2_currencyCode}`,
  },
  {
    name: "Total Spent Amount",
    sortable: true,
    selector: (row) => `${row.totalSpentV2_amount}`,
  },
  {
    name: "Total Spent Currency Code",
    sortable: true,
    selector: (row) => `${row.totalSpentV2_currencyCode}`,
  },
  {
    name: "Last Purchase",
    sortable: true,
    selector: (row) => `${row.lastPurchasedDate}`,
  },
  {
    name: "Tags",
    sortable: true,
    selector: (row) => `${row.tags}`,
  },
  {
    name: "Default Address City",
    sortable: true,
    selector: (row) => `${row.defaultAddress_city}`,
  },
  {
    name: "Default Address Province",
    sortable: true,
    selector: (row) => `${row.defaultAddress_province}`,
  },
  {
    name: "Default Address Country",
    sortable: true,
    selector: (row) => `${row.defaultAddress_country}`,
  },
  {
    name: "Default Address Zip",
    sortable: true,
    selector: (row) => `${row.defaultAddress_zip}`,
  },
  {
    name: "Default Address Phone",
    sortable: true,
    selector: (row) => `${row.defaultAddress_phone}`,
  },
  {
    name: "Created At",
    sortable: true,
    selector: (row) => `${row.createdAt}`,
  },
  {
    name: "Updated At",
    sortable: true,
    selector: (row) => `${row.updatedAt}`,
  },
];

export default COLUMNS;