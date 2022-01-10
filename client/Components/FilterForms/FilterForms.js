import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Row, Modal, Container } from "react-bootstrap";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file

import { TabPanel, a11yProps } from "./TabPanel.js";
import styles from "../../styles/filter_forms.module.css";

export default function FilterForms(props) {
  const {
    showCustomFilter,
    onHide,
    customFilters,
    filterTagsArray,
    inputData,
    handleFilterToCreate,
    handleDisableButton,
    enableSaveSegmentButton,
    ...rest
  } = props;

  // customFilters.push("Yahallo!!!");
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  //Our Code
  const [dataFromFilters, setDataFromFilters] = React.useState({
    aov_min: "",
    aov_max: "",
    acceptsMarketing: "",
    account_state_declined: false,
    account_state_disabled: false,
    account_state_enabled: false,
    account_state_invited: false,
    last_ordered_days: "",
    min_spend_total: "",
    signed_up_start_date: "",
    signed_up_end_date: "",
    country_India: false,
    country_Sri_Lanka: false,
    country_United_States: false,
    payment_status_paid: "",
    payment_gateway_cod: false,
    payment_gateway_paytm: false,
  });

  let filters = [];
  let aov_min = "Yahallo",
    aov_max = "Halo Halo";
  let declined,
    disabled,
    enabled,
    invited,
    country_India,
    country_Sri_Lanka,
    country_United_States,
    payment_gateway_cod,
    payment_gateway_paytm,
    signed_up_start_date,
    signed_up_end_date;
  let country = ["Yahallo"];

  function radioButtonHandleInput(set) {
    let setName = set.target.name;

    //Customer Acceptance
    if (setName === "customer_acceptance") {
      if (set.target.value !== "") {
        if (set.target.value === "accepted") {
          for (let i = 0; i < customFilters.length; i++) {
            if (customFilters[i].display === "Does Not Acccept Marketing") {
              customFilters.splice(i, 1);
            }
          }
          inputData.push({
            name: "acceptsMarketing",
            data: true,
            display: "Accepts Marketing",
          });
        }
        if (set.target.value === "notAccepted") {
          for (i = 0; i < customFilters.length; i++) {
            if (customFilters[i].display === "Accepts Marketing") {
              customFilters.splice(i, 1);
            }
          }
          inputData.push({
            name: "acceptsMarketing",
            data: false,
            display: "Does Not Acccept Marketing",
          });
        }
      }
    }

    //Payment Status
    if (setName === "payment_status_paid") {
      if (set.target.value !== "") {
        if (set.target.value === "fullyPaid") {
          for (let i = 0; i < customFilters.length; i++) {
            if (customFilters[i].display === "Not Fully Paid") {
              customFilters.splice(i, 1);
            }
          }
          inputData.push({
            query: "payment_status_paid = true",
            display: "Fully Paid",
          });
        }
        if (set.target.value === "notFullyPaid") {
          for (i = 0; i < customFilters.length; i++) {
            if (customFilters[i].display === "Fully Paid") {
              customFilters.splice(i, 1);
            }
          }
          inputData.push({
            query: "payment_status_paid = false",
            display: "Not Fully Paid",
          });
        }
      }
    }
  }

  function handleTextBoxInput(set) {
    let setName = set.target.name;

    //AOV
    if (setName === "aov_min") {
      if (set.target.value !== "") {
        aov_min = set.target.value;
      }
    }

    if (setName === "aov_max") {
      if (set.target.value !== "") {
        aov_max = set.target.value;
      }
    }
    if (aov_min !== "Yahallo" && aov_max !== "Halo Halo") {
      inputData.push({
        name: "AOV",
        data: {
          aov_min,
          aov_max,
        },
        display: `AOV(Total) BETWEEN ${aov_min} and ${aov_max}`,
      });
    }

    //Last Ordered Days
    if (setName === "last_ordered_days") {
      if (set.target.value !== "") {
        inputData.push({
          query: "last_ordered_days =" + parseInt(set.target.value),
          display: "Last Ordered",
        });
      }
    }

    //Min. Spend Total
    if (setName === "min_spend_total") {
      if (set.target.value !== "") {
        inputData.push({
          query: "totalSpentV2_amount >= " + parseFloat(set.target.value),
          display: "Min. Spend Total",
        });
      }
    }
  }

  function checkBoxHandleInput(set) {
    let setName = set.target.name;

    if (setName === "account_state_declined") {
      dataFromFilters.account_state_declined = set.target.checked;
    }
    if (setName === "account_state_disabled") {
      dataFromFilters.account_state_disabled = set.target.checked;
    }
    if (setName === "account_state_enabled") {
      dataFromFilters.account_state_enabled = set.target.checked;
    }
    if (setName === "account_state_invited") {
      dataFromFilters.account_state_invited = set.target.checked;
    }

    //Country
    // if (setName === "country_India") {
    //   country_India = set.target.checked;
    // }
    // if (setName === "country_Sri_Lanka") {
    //   country_Sri_Lanka = set.target.checked;
    // }
    // if (setName === "country_United_States") {
    //   country_United_States = set.target.checked;
    // }
    // if (country_India === true) {
    //   for (let i = 0; i < country.length; i++) {
    //     console.log("Yahallo");
    //     if (country[i] === "Yahallo" || "SRI_LANKA" || "UNITED_STATES") {
    //       country.push("INDIA");
    //     }
    //     console.log(country);
    //   }
    // }
    // if (setName === "country_India") {
    //   country_India = set.target.checked;
    //   if (country_India === true) {
    //     inputData.push({
    //       query: "country_India =" + country_India,
    //       display: "India",
    //     });
    //   }
    // }
    // if (setName === "country_Sri_Lanka") {
    //   country_Sri_Lanka = set.target.checked;
    //   if (country_Sri_Lanka === true) {
    //     inputData.push({
    //       query: "country_Sri_Lanka =" + country_Sri_Lanka,
    //       display: "Sri Lanka",
    //     });
    //   }
    // }
    // if (setName === "country_United_States") {
    //   country_United_States = set.target.checked;
    //   if (country_United_States === true) {
    //     inputData.push({
    //       query: "country_United_States =" + country_United_States,
    //       display: "United States",
    //     });
    //   }
    // }

    //Payment Status
    if (setName === "payment_status_fully_paid") {
      dataFromFilters.payment_status_fully_paid = set.target.checked;
    }

    //Payment Gateway
    if (setName === "payment_gateway_cod") {
      dataFromFilters.payment_gateway_cod = set.target.checked;
    }
    if (setName === "payment_gateway_paytm") {
      dataFromFilters.payment_gateway_paytm = set.target.checked;
    }
  }

  function dateHandleInput(set) {
    let setName = set.target.name;

    if (setName === "signed_up_start_date") {
      signed_up_start_date = set.target.value;
      if (signed_up_start_date !== "") {
        inputData.push({
          query: "signed_up_start_date = " + signed_up_start_date,
          display: "Signed up Start Date",
        });
      }
    }

    if (setName === "signed_up_end_date") {
      signed_up_end_date = set.target.value;
      if (signed_up_end_date !== "") {
        inputData.push({
          query: "signed_up_end_date = " + signed_up_end_date,
          display: "Signed up End Date",
        });
      }
    }
  }

  function accountStateFunction() {
    let accountState = [];

    if (dataFromFilters.account_state_declined === true) {
      accountState.push("state = 'DECLINED'");
    }

    if (dataFromFilters.account_state_disabled === true) {
      accountState.push("state = 'DISABLED'");
    }

    if (dataFromFilters.account_state_enabled === true) {
      accountState.push("state = 'ENABLED'");
    }

    if (dataFromFilters.account_state_invited === true) {
      accountState.push("state = 'INVITED'");
    }

    return accountState;
  }

  function generateDataForServer() {
    //account_state
    let accountState = accountStateFunction();
    // console.log(accountState);
    if (accountState.length === 1) {
      filters.push(accountState[0]);
    } else {
      let query = "";
      for (let i = 0; i < accountState.length; i++) {
        query += accountState[i];
        if (i !== accountState.length - 1) {
          query += " OR ";
        }
      }
      if (query !== "") {
        filters.push(query);
      }
    }

    //Payment Gateway
    if (dataFromFilters.payment_gateway_cod === true) {
      filters.push({
        query: "payment_gateway_cod =" + dataFromFilters.payment_gateway_cod,
        display: "Tagged with COD",
      });
    }
    if (dataFromFilters.payment_gateway_paytm === true) {
      filters.push({
        query:
          "payment_gateway_paytm =" + dataFromFilters.payment_gateway_paytm,

        display: "Tagged with Paytm",
      });
    }

    // console.log(filters);

    handleFilterToCreate(filters);

    for (var i = 0; i < inputData.length; i++) {
      customFilters.push(inputData[i]);
      filterTagsArray.push(inputData[i]);
    }
    inputData.splice(0, inputData.length);

    // handleFilterToCreate(dataFromFilters);

    console.log(customFilters);
    enableSaveSegmentButton();
    onHide();
  }

  return (
    <div>
      <Modal
        show={showCustomFilter}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Row>
            <Container>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  height: 400,
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                  className={styles.vertical_tabs}
                >
                  <Tab
                    label="AOV(Total)"
                    {...a11yProps(0)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Accepts Marketing"
                    {...a11yProps(1)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Account State"
                    {...a11yProps(2)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Customer Tag"
                    {...a11yProps(3)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Last Ordered"
                    {...a11yProps(4)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Min. Spend(Total)"
                    {...a11yProps(5)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Order Source"
                    {...a11yProps(6)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Orders Total"
                    {...a11yProps(7)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Signed Up"
                    {...a11yProps(8)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="First Purchase Product"
                    {...a11yProps(9)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="First Purchase Variant"
                    {...a11yProps(10)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Product Tag"
                    {...a11yProps(11)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Product Title"
                    {...a11yProps(12)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Product Type"
                    {...a11yProps(13)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Product Variant"
                    {...a11yProps(14)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Vendor"
                    {...a11yProps(15)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Country"
                    {...a11yProps(16)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Discount Code"
                    {...a11yProps(17)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Payment Status"
                    {...a11yProps(18)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Payment Gateway"
                    {...a11yProps(19)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Order Paid Status"
                    {...a11yProps(20)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Order Tag"
                    {...a11yProps(21)}
                    className={styles.tabText}
                  />
                  <Tab
                    label="Province(State)"
                    {...a11yProps(22)}
                    className={styles.tabText}
                  />
                </Tabs>

                <TabPanel value={value} index={0} className={styles.tab_panel}>
                  <span className={styles.customFilters_span_responsive}>
                    Minimum AOV
                  </span>
                  <br />
                  <input
                    type="text"
                    name="aov_min"
                    onChange={function (set) {
                      handleTextBoxInput(set);
                    }}
                    placeholder="Enter Amount"
                    className={styles.rounded_input_corners}
                  />
                  <hr />
                  <span>Maximum AOV</span>
                  <br />
                  <input
                    type="text"
                    name="aov_max"
                    onChange={function (set) {
                      handleTextBoxInput(set);
                    }}
                    placeholder="Enter Amount"
                    className={styles.rounded_input_corners}
                  />
                </TabPanel>

                <TabPanel value={value} index={1} className={styles.tab_panel}>
                  <div>
                    <input
                      type="radio"
                      id="acceptsMarketing"
                      name="customer_acceptance"
                      onChange={function (set) {
                        radioButtonHandleInput(set);
                      }}
                      value="accepted"
                    />
                    <span>&nbsp;True</span>
                    <br />
                    <hr />
                    <input
                      type="radio"
                      id="acceptsMarketing"
                      name="customer_acceptance"
                      onChange={function (set) {
                        radioButtonHandleInput(set);
                      }}
                      value="notAccepted"
                    />
                    <span>&nbsp;False</span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={2} className={styles.tab_panel}>
                  {/* <form> */}
                  {/* <input
                                type="text"
                                name="search_filter"
                                placeholder="search filter"
                                ></input>
                                &nbsp;&nbsp;
                                <button>select all</button>&nbsp;&nbsp;
                                <button>clear</button>
                                <br /> */}
                  <div>
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_declined"
                      onChange={function (set) {
                        checkBoxHandleInput(set);
                      }}
                    ></input>
                    <span>Declined</span>
                    <hr />
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_disabled"
                      onChange={function (set) {
                        checkBoxHandleInput(set);
                      }}
                    ></input>
                    <span>Disabled</span>
                    <hr />
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_enabled"
                      onChange={function (set) {
                        checkBoxHandleInput(set);
                      }}
                    ></input>
                    <span>Enabled</span>
                    <hr />
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_invited"
                      onChange={function (set) {
                        checkBoxHandleInput(set);
                      }}
                    ></input>
                    <span>Invited</span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={3} className={styles.tab_panel}>
                  <div>
                    {/* <input
                                        type="text"
                                        name="search_filter"
                                        placeholder="search filter"
                                    ></input>
                                    <button>select all</button>
                                    <button>clear</button>
                                    <br /> */}
                    <div>
                      <input
                        type="checkbox"
                        id="customerTag"
                        name="customer_tag_customer_imported_from_tidio"
                        value="Customer imported from Tidio"
                      ></input>
                      <span>Customer imported from Tidio</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="customerTag"
                        name="customer_tag_mitchell_professionals"
                        value="Mitchell Professionals"
                      ></input>
                      <span>Mitchell Professionals</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="customerTag"
                        name="customer_tag_receiving_updates_in_messenger"
                        value="Receiving updates in Messenger"
                      ></input>
                      <span>Receiving updates in Messenger</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="customerTag"
                        name="customer_tag_whatsapp_customer"
                        value="WhatsApp Customer"
                      ></input>
                      <span>WhatsApp Customer</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="customerTag"
                        name="customer_tag_customer_cleaned_email_spam_protect"
                        value="cleaned-email-spam-protect"
                      ></input>
                      <span>cleaned-email-spam-protect</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="customerTag"
                        name="customer_tag_newsletter"
                        value="newsletter"
                      ></input>
                      <span>newsletter</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="customerTag"
                        name="customer_tag_open_signin"
                        value="open_signin"
                      ></input>
                      <span>open_signin</span>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={4} className={styles.tab_panel}>
                  <div>
                    <span>Last Ordered</span>
                    <br />
                    <input
                      type="text"
                      name="last_ordered_days"
                      placeholder="Enter the number"
                      onChange={function (set) {
                        handleTextBoxInput(set);
                      }}
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={5} className={styles.tab_panel}>
                  <div>
                    <span>Min. Spend(Total)</span>
                    <br />
                    <input
                      type="text"
                      name="min_spend_total"
                      placeholder="Enter Amount"
                      onChange={function (set) {
                        handleTextBoxInput(set);
                      }}
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={6} className={styles.tab_panel}>
                  <div>
                    {/* <input
                                        type="text"
                                        name="search_filter"
                                        placeholder="search filter"
                                    ></input>
                                    <button>select all</button>
                                    <button>clear</button>
                                    <br /> */}
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_multi_channel"
                      value="multi-channel"
                    ></input>
                    <span>Multi-channel</span>
                    <hr />
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_other"
                      value="other"
                    ></input>
                    <span>Other</span>

                    <hr />
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_pos"
                      value="pos"
                    ></input>
                    <span>Pos</span>
                    <hr />
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_web"
                      value="web"
                    ></input>
                    <span>Web</span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={7} className={styles.tab_panel}>
                  <div>
                    <input
                      type="checkbox"
                      id="ordersTotal"
                      name="orders_total_more_than"
                      value="More than this number"
                    ></input>
                    <span>More than this number</span>
                    <br />
                    <input
                      type="number"
                      name="orders_total_more_than_input"
                      className={styles.rounded_input_corners}
                    ></input>
                    <hr />
                    <input
                      type="checkbox"
                      id="ordersTotal"
                      name="orders_total_less_than"
                      value="Less than this number"
                    ></input>
                    <span>Less than this number</span>
                    <br />
                    <input
                      type="number"
                      name="orders_total_less_than_input"
                      className={styles.rounded_input_corners}
                    ></input>
                    <hr />
                    <input
                      type="checkbox"
                      id="ordersTotal"
                      name="orders_total_exact_number"
                      value="This exact number"
                    ></input>
                    <span>This exact number</span>
                    <br />
                    <input
                      type="number"
                      name="orders_total_exact_number_input"
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={8} className={styles.tab_panel}>
                  <div>
                    <span>Start date</span>
                    <br />
                    <input
                      type="date"
                      name="signed_up_start_date"
                      onChange={function (set) {
                        dateHandleInput(set);
                      }}
                      className={styles.rounded_input_corners}
                    ></input>
                    <hr />
                    <span>End date</span>
                    <br />
                    <input
                      type="date"
                      name="signed_up_end_date"
                      onChange={function (set) {
                        dateHandleInput(set);
                      }}
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={9} className={styles.tab_panel}>
                  9
                </TabPanel>

                <TabPanel value={value} index={10} className={styles.tab_panel}>
                  10
                </TabPanel>

                <TabPanel value={value} index={11} className={styles.tab_panel}>
                  11
                </TabPanel>

                <TabPanel value={value} index={12} className={styles.tab_panel}>
                  12
                </TabPanel>

                <TabPanel value={value} index={13} className={styles.tab_panel}>
                  13
                </TabPanel>

                <TabPanel value={value} index={14} className={styles.tab_panel}>
                  14
                </TabPanel>

                <TabPanel value={value} index={15} className={styles.tab_panel}>
                  15
                </TabPanel>

                <TabPanel value={value} index={16} className={styles.tab_panel}>
                  <div>
                    {/* <input
                                        type="text"
                                        name="search_filter"
                                        placeholder="search filter"
                                    ></input>
                                    &nbsp;&nbsp;
                                    <button>select all</button>&nbsp;&nbsp;
                                    <button>clear</button>
                                    <br /> */}
                    <div>
                      <input
                        type="checkbox"
                        id="country"
                        name="country_India"
                        onChange={function (set) {
                          checkBoxHandleInput(set);
                        }}
                      ></input>
                      <span>India</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="country"
                        name="country_Sri_Lanka"
                        onChange={function (set) {
                          checkBoxHandleInput(set);
                        }}
                      ></input>
                      <span>Sri Lanka</span>
                      <hr />
                      <input
                        type="checkbox"
                        id="country"
                        name="country_United_States"
                        onChange={function (set) {
                          checkBoxHandleInput(set);
                        }}
                      ></input>
                      <span>United States</span>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={17} className={styles.tab_panel}>
                  17
                </TabPanel>

                <TabPanel value={value} index={18} className={styles.tab_panel}>
                  <div>
                    <input
                      type="radio"
                      id="paymentStatus"
                      name="payment_status_paid"
                      onChange={function (set) {
                        radioButtonHandleInput(set);
                      }}
                      value="fullyPaid"
                    ></input>
                    <span>Fully Paid</span>
                    <hr />
                    <input
                      type="radio"
                      id="paymentStatus"
                      name="payment_status_paid"
                      onChange={function (set) {
                        radioButtonHandleInput(set);
                      }}
                      value="notFullyPaid"
                    ></input>
                    <span>Not Fully Paid</span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={19} className={styles.tab_panel}>
                  <div>
                    <input
                      type="checkbox"
                      id="paymentGateway"
                      name="payment_gateway_cod"
                      onChange={function (set) {
                        checkBoxHandleInput(set);
                      }}
                    ></input>
                    <span>Cash on Delivery</span>
                    <hr />
                    <input
                      type="checkbox"
                      id="paymentGateway"
                      name="payment_gateway_paytm"
                      onChange={function (set) {
                        checkBoxHandleInput(set);
                      }}
                    ></input>
                    <span>Paytm</span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={20} className={styles.tab_panel}>
                  20
                </TabPanel>

                <TabPanel value={value} index={21} className={styles.tab_panel}>
                  21
                </TabPanel>

                <TabPanel value={value} index={22} className={styles.tab_panel}>
                  22
                </TabPanel>
              </Box>
            </Container>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} className={styles.customFilter_cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={generateDataForServer}
            className={styles.customFilter_applyButton}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
