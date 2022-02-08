export const COLUMNS = [
  {
    name: "Sr.No",
    selector: (row) => `${row.id}`,
    conditionalCellStyles: [
      {
        when: (row) => row.id % 2 === 1,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
    cell: (row, index, column, id) => {
      row.id = index;
      return index;
    }
  },
  {
    name: "ID",
    sortable: true,
    selector: (row) => `${row.customer_id}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "First Name",
    sortable: true,
    selector: (row) => `${row.firstName}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Last Name",
    sortable: true,
    selector: (row) => `${row.lastName}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Email",
    sortable: true,
    selector: (row) => `${row.email}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Phone",
    sortable: true,
    selector: (row) => `${row.phone}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Number of Orders",
    sortable: true,
    selector: (row) => `${row.ordersCount}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Account State",
    sortable: true,
    selector: (row) => `${row.state}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Total Spent",
    sortable: true,
    selector: (row) => `${row.totalSpent}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Accepts Marketing",
    sortable: true,
    selector: (row) => `${row.acceptsMarketing}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Average Order Amount Amount",
    sortable: true,
    selector: (row) => `${row.averageOrderAmountV2_amount}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Average Order Amount Currency Code",
    sortable: true,
    selector: (row) => `${row.averageOrderAmountV2_currencyCode}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Total Spent Amount",
    sortable: true,
    selector: (row) => `${row.totalSpentV2_amount}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Total Spent Currency Code",
    sortable: true,
    selector: (row) => `${row.totalSpentV2_currencyCode}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Last Purchase",
    sortable: true,
    selector: (row) => `${row.lastPurchasedDate}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Tags",
    sortable: true,
    selector: (row) => `${row.tags}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Default Address City",
    sortable: true,
    selector: (row) => `${row.defaultAddress_city}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Default Address Province",
    sortable: true,
    selector: (row) => `${row.defaultAddress_province}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Default Address Country",
    sortable: true,
    selector: (row) => `${row.defaultAddress_country}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Default Address Zip",
    sortable: true,
    selector: (row) => `${row.defaultAddress_zip}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Default Address Phone",
    sortable: true,
    selector: (row) => `${row.defaultAddress_phone}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Created At",
    sortable: true,
    selector: (row) => `${row.createdAt}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Updated At",
    sortable: true,
    selector: (row) => `${row.updatedAt}`,
    conditionalCellStyles: [
      {
        when: (row) => row.sr_no % 2 === 0,
        style: {
          backgroundColor: "#f1f1f1",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
];

export default COLUMNS;