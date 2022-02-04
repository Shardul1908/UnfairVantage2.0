import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import CsvDownload from "react-json-to-csv";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "react-bootstrap";
import {
  CircularProgress,
  LinearProgress,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";

import { COLUMNS } from "./columns.js";
import styles from "../../styles/datatable.module.css";
import io from "socket.io-client";
import Progress_bar from "../ProgressBar/ProgressBar.js";
import { deepOrange, orange } from "@material-ui/core/colors";

const ENDPOINT = "http://localhost:8081/";
const socket = io(ENDPOINT);

function Datatable(props) {
  const { filters, shop } = props;
  const [tableData, setTableData] = useState({});
  const [exportData, setExportData] = useState({});
  const [page, setPage] = useState(1);
  const [progressPending, setProgressPending] = useState(true);
  const [show, setShow] = React.useState(false);
  let result_total = 0;

  function handleOpenModal() {
    setShow(true);
  }

  function handleCloseModal() {
    setShow(false);
  }

  function handleApplyButtonClicked() {
    const newFilters = fillQuery();

    let res = {};

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
        res[names[i]] = columnFilters[names[i]];
      }
    }
    if (dataFromInput === "") {
      res[inputName] = undefined;
    } else {
      res[inputName] = newFilters[0];
    }

    setColumnFilters(res);
  }

  function handleResetButtonClicked() {
    setColumnFilters({});
  }

  const [dataFromInput, setDataFromInput] = React.useState("");

  const [columnFilters, setColumnFilters] = React.useState({});

  function getText(set) {
    setDataFromInput(set.target.value);
  }

  function fillQuery() {
    const filtersFromText = [];
    if (dataFromInput !== "") {
      filtersFromText.push({
        data: dataFromInput,
      });
    }

    return filtersFromText;
  }

  const [inputName, setInputName] = React.useState("");

  const handleInputName = (event) => {
    setInputName(event.target.value);
  };

  function InputTextField() {
    if (inputName !== "") {
      return (
        <div className={styles.column_filters_input_name}>
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            variant="standard"
            defaultValue=""
            onChange={(set) => getText(set)}
          />
        </div>
      );
    }
  }

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <div className={styles.column_filters}>
        <div>{InputTextField()}</div>
        <div className={styles.column_filters_select_field}>
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Filters</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={inputName}
                label="Filters"
                onChange={handleInputName}
              >
                <MenuItem value={"firstName"}>First Name</MenuItem>
                <MenuItem value={"lastName"}>Last Name</MenuItem>
                <MenuItem value={"email"}>Email</MenuItem>
                <MenuItem value={"phone"}>Phone</MenuItem>
                <MenuItem value={"ordersCount"}>Orders Count</MenuItem>
                <MenuItem value={"state"}>Account State</MenuItem>
                <MenuItem value={"totalSpent"}>Total Spent</MenuItem>
                <MenuItem value={"acceptsMarketing"}>AcceptsMarketing</MenuItem>
                <MenuItem value={"averageOrderAmountV2_amount"}>
                  Average Order Amount
                </MenuItem>
                <MenuItem value={"averageOrderAmountV2_currencyCode"}>
                  Average Order Amount Currency Code
                </MenuItem>
                <MenuItem value={"totalSpentV2_amount"}>
                  Total Spent Amount
                </MenuItem>
                <MenuItem value={"totalSpentV2_currencyCode"}>
                  Total Spent Amount Currency Code
                </MenuItem>
                <MenuItem value={"tags"}>Tags</MenuItem>
                <MenuItem value={"defaultAddress_city"}>
                  Default Address City
                </MenuItem>
                <MenuItem value={"defaultAddress_province"}>
                  Default Address Province
                </MenuItem>
                <MenuItem value={"defaultAddress_country"}>
                  Default Address Country
                </MenuItem>
                <MenuItem value={"defaultAddress_zip"}>
                  Default Address Zip
                </MenuItem>
                <MenuItem value={"defaultAddress_phone"}>
                  Default Address Phone
                </MenuItem>
                <MenuItem value={"createdAt"}>Created At</MenuItem>
                <MenuItem value={"updatedAt"}>Updated At</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className={styles.column_filters_buttons}>
          <Button
            style={{
              color: "#ffffff",
              borderRadius: "6px",
              marginTop: "8px",
              marginBottom: "8px",
              fontSize: "10px",
              width: "100%",
            }}
            onClick={handleApplyButtonClicked}
          >
            Search
          </Button>
          <Button
            style={{
              color: "#ffffff",
              borderRadius: "6px",
              marginTop: "8px",
              marginBottom: "8px",
              fontSize: "10px",
              width: "100%",
            }}
            onClick={handleResetButtonClicked}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }, [inputName, handleApplyButtonClicked]);

  const countPerPage = 10;

  async function syncData() {
    //show popup
    handleOpenModal();
    console.log("Sync Data Clicked");

    result_total = await axios.post("http://localhost:8081/api/count_data", {
      shop: shop,
    });
    console.log(result_total);

    setTotal(parseInt(result_total.data.total));

    let result_customers = await axios.post(
      "http://localhost:8081/api/sync_data_customers",
      {
        shop: shop,
      }
    );
    console.log(result_customers);

    if (result_customers.status === 200) {
      let result_orders = await axios.post(
        "http://localhost:8081/api/sync_data_orders",
        {
          shop: shop,
        }
      );
      console.log(result_orders);

      if (result_orders.status === 200) {
        let result_orderItems = await axios.post(
          "http://localhost:8081/api/sync_data_order_items",
          {
            shop: shop,
          }
        );
        console.log(result_orderItems);
      }
    }

    //hide popup
    handleCloseModal();
  }

  //for socket
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [countCustomers, setCountCustomers] = useState(0);
  const [countOrders, setCountOrders] = useState(0);
  const [countOrderItems, setCountOrderItems] = useState(0);
  const [progress, setProgress] = useState(0);

  socket.on("CustomerCount", (data) => {
    setCountCustomers(data);
  });

  socket.on("OrderCount", (data) => {
    setCountOrders(data);
  });

  socket.on("OrderItemCount", (data) => {
    setCountOrderItems(data);
  });

  useEffect(() => {
    let totalCount = countCustomers + countOrders + countOrderItems;
    setCount(totalCount);

    if (total != 0) {
      let current_progress = parseInt((count / total) * 100);
      setProgress(current_progress);
    }
  }, [countCustomers, countOrders, countOrderItems]);

  useEffect(
    function () {
      function getTableList() {
        setProgressPending(true);
        axios
          .post("http://localhost:8081/api/customers/fetch/with_filters", {
            filters: filters,
            columnFilters: columnFilters,
            pageSize: countPerPage,
            pageIndex: page,
            shop: shop,
          })
          .then(function (res) {
            setTableData(res.data);
            setProgressPending(false);
            console.log("Recieved data from server");
          })
          .catch(function (err) {
            setTableData({});
            setProgressPending(false);
          });
      }
      getTableList();
    },
    [page, filters, columnFilters]
  );

  //For Exporting CSV
  useEffect(
    function () {
      function getExportList() {
        axios
          .post("http://localhost:8081/api/customers/fetch/all", {
            filters: filters,
            columnFilters: columnFilters,
            shop: shop,
          })
          .then(function (res) {
            setExportData(res.data);
            console.log("Received export data from server");
          })
          .catch(function (err) {
            setExportData({});
          });
      }
      getExportList();
    },
    [filters, columnFilters]
  );

  createTheme("solarized", {
    rdt_TableFotter: "10px",
    text: {
      primary: "#090B14",
      secondary: "#95ADC0",
    },
    background: {
      default: "#FCFCFC",
    },
    context: {
      background: "#ffffff",
      text: "#e72b2b",
    },
    divider: {
      default: "#3F3F3F",
    },
  });

  const customStyles = {
    rows: {
      style: {
        minHeight: "35px", // override the row height
        backgroundColor: "#fcfcfc",
        striped: "#fcfcfc",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const LinearIndeterminate = () => {
    const classes = useStyles();

    return (
      <div>
        <LinearProgress />
      </div>
    );
  };

  return (
    <div className={styles.datatable_main_div}>
      <div className={styles.datatable_buttons}>
        <CsvDownload
          data={exportData}
          filename="ExportedData.csv"
          className={styles.csv_download_button}
        >
          Export CSV
        </CsvDownload>
        <Button onClick={syncData}>Sync Now</Button>
      </div>
      <div className={styles.datatable_actual_div}>
        <DataTable
          title="List of Customers"
          theme="solarized"
          customStyles={customStyles}
          columns={COLUMNS}
          data={tableData.pageData}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={tableData.total}
          paginationPerPage={countPerPage}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          onChangePage={function (page) {
            setPage(page);
          }}
          defaultSortFieldId={2}
          progressPending={progressPending}
          progressComponent={<LinearIndeterminate />}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
      </div>

      {/*Modal Code*/}
      <div className={styles.syncModal_progress}>
        <Modal
          show={show}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div className={styles.syncModal_progress_icon}>
              <Progress_bar bgcolor="orange" progress={progress} />
            </div>
            <div className={styles.syncModal_progress_text}>
              Please wait, syncing data...
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Datatable;
