import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Row, Modal, Container } from "react-bootstrap";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { TabPanel, a11yProps } from "./TabPanel.js";
import styles from "../../styles/filter_forms.module.css";

export default function FilterForms(props) {
  const {
    showCustomFilter,
    onHide,
    customFilters,
    filterDisplayArray,
    inputData,
    setCustomFilters,
    ...rest
  } = props;

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  let aov_min,
    aov_max,
    declined,
    last_ordered,
    min_spend,
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

  const [AOV, setAOV] = React.useState([]);
  function handelAOV(set) {
    let setName = set.target.name;

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
    if (aov_min !== "" && aov_max !== "") {
      AOV.push({
        name: "AOV",
        data: {
          aov_min,
          aov_max,
        },
        display: `AOV(Total) BETWEEN ${aov_min} and ${aov_max}`,
      });
    }
  }

  const [AcceptsMarketing, setAcceptsMarketing] = React.useState([]);
  function handleAcceptsMarketting(set) {
    let setName = set.target.name;
    if (setName === "customer_acceptance") {
      if (set.target.value !== "") {
        if (set.target.value === "accepted") {
          AcceptsMarketing.push({
            name: "acceptsMarketing",
            data: true,
            display: "Accepts Marketing",
          });
        }
        if (set.target.value === "notAccepted") {
          AcceptsMarketing.push({
            name: "acceptsMarketing",
            data: false,
            display: "Does Not Acccept Marketing",
          });
        }
      }
    }
  }

  const [AccountState, setAccountState] = React.useState([]);
  function handleAccountState(set) {
    let setName = set.target.name;
    if (setName === "account_state_declined") {
      if (set.target.checked === true) {
        declined = set.target.checked;
      } else {
        declined = false;
      }
      if (declined === true) {
        AccountState.push({
          name: "AccountState",
          display: "AccountState: Declined",
          data: "DECLINED",
        });
      } else if (declined === false) {
        for (let i = 0; i < AccountState.length; i++) {
          if (AccountState[i].display === "AccountState: Declined") {
            AccountState.splice(i, 1);
          }
        }
      }
    }
    if (setName === "account_state_disabled") {
      if (set.target.checked === true) {
        disabled = set.target.checked;
      } else {
        disabled = false;
      }
      if (disabled === true) {
        AccountState.push({
          name: "AccountState",
          display: "AccountState: Disabled",
          data: "DISABLED",
        });
      } else if (disabled === false) {
        for (let i = 0; i < AccountState.length; i++) {
          if (AccountState[i].display === "AccountState: Disabled") {
            AccountState.splice(i, 1);
          }
        }
      }
    }
    if (setName === "account_state_enabled") {
      if (set.target.checked === true) {
        enabled = set.target.checked;
      } else {
        enabled = false;
      }
      if (enabled === true) {
        AccountState.push({
          name: "AccountState",
          display: "AccountState: Enabled",
          data: "ENABLED",
        });
      } else if (enabled === false) {
        for (let i = 0; i < AccountState.length; i++) {
          if (AccountState[i].display === "AccountState: Enabled") {
            AccountState.splice(i, 1);
          }
        }
      }
    }
    if (setName === "account_state_invited") {
      if (set.target.checked === true) {
        invited = set.target.checked;
      } else {
        invited = false;
      }
      if (invited === true) {
        AccountState.push({
          name: "AccountState",
          display: "AccountState: Invited",
          data: "INVITED",
        });
      } else if (invited === false) {
        for (let i = 0; i < AccountState.length; i++) {
          if (AccountState[i].display === "AccountState: Invited") {
            AccountState.splice(i, 1);
          }
        }
      }
    }
    // for (let i = 0; i < AccountState.length; i++) {
    //   if (AccountState[i].display === "AccountState: Declined") {
    //     declinedCounter++;
    //     if (declinedCounter > 1) {
    //       // console.log("state parat spadla");
    //       AccountState.splice(i, 1);
    //       declinedCounter--;
    //       console.log(declinedCounter);
    //     }
    //   }
    // }
  }

  const [LastOrdered, setLastOrdered] = React.useState([]);
  function handleLastOrdered(set) {
    let setName = set.target.name;
    if (setName === "last_ordered_days") {
      if (set.target.value !== "") {
        last_ordered = set.target.value;
        LastOrdered.push({
          data: parseInt(last_ordered),
          // query: "last_ordered_days =" + parseInt(set.target.value),
          name: "Last Ordered",
          display: `Last Ordered is ${last_ordered}`,
        });
      }
    }
  }

  const [MinSpendTotal, setMinSpendTotal] = React.useState([]);
  function handleMinSpendTotal(set) {
    let setName = set.target.name;
    if (setName === "min_spend_total") {
      if (set.target.value !== "") {
        min_spend = set.target.value;
        MinSpendTotal.push({
          data: parseFloat(min_spend),
          // query: "totalSpentV2_amount >= " + parseFloat(set.target.value),
          name: "MinSpend",
          display: `Minimum Spend ${min_spend} INR`,
        });
      }
    }
  }

  const [PaymentStatus, setPaymentStatus] = React.useState([]);
  function handlePaymentStatus(set) {
    let setName = set.target.name;
    if (setName === "payment_status_paid") {
      if (set.target.value !== "") {
        if (set.target.value === "fullyPaid") {
          PaymentStatus.push({
            name: "paymentStatus",
            query: "payment_status_paid = true",
            display: "Fully Paid",
          });
        }
        if (set.target.value === "notFullyPaid") {
          PaymentStatus.push({
            name: "paymentStatus",
            query: "payment_status_paid = false",
            display: "Not Fully Paid",
          });
        }
      }
    }
  }

  function checkBoxHandleInput(set) {
    let setName = set.target.name;

    //Country
    if (setName === "country_India") {
      country_India = set.target.checked;
      if (country_India === true) {
        inputData.push({
          query: "country_India =" + country_India,
          display: "India",
        });
      }
    }
    if (setName === "country_Sri_Lanka") {
      country_Sri_Lanka = set.target.checked;
      if (country_Sri_Lanka === true) {
        inputData.push({
          query: "country_Sri_Lanka =" + country_Sri_Lanka,
          display: "Sri Lanka",
        });
      }
    }
    if (setName === "country_United_States") {
      country_United_States = set.target.checked;
      if (country_United_States === true) {
        inputData.push({
          query: "country_United_States =" + country_United_States,
          display: "United States",
        });
      }
    }

    //Payment Gateway
    if (setName === "payment_gateway_cod") {
      payment_gateway_cod = set.target.checked;
      if (payment_gateway_cod === true) {
        inputData.push({
          query: "payment_gateway_cod =" + payment_gateway_cod,
          display: "Tagged with COD",
        });
      }
    }
    if (setName === "payment_gateway_paytm") {
      payment_gateway_paytm = set.target.checked;
      if (payment_gateway_paytm === true) {
        inputData.push({
          query: "payment_gateway_paytm =" + payment_gateway_paytm,
          display: "Tagged with Paytm",
        });
      }
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
          display: "Aigned up End Date",
        });
      }
    }
  }

  function generateDataForServer() {
    let filters = [];

    let accountStateCounterCustom = 0,
      accountStateCounterFilter = 0;

    //AOV
    if (AOV.length !== 0) {
      for (let i = 0; i < customFilters.length; i++) {
        if (customFilters[i].name === "AOV") {
          customFilters.splice(i, 1);
        }
      }
      filters.push(AOV[AOV.length - 1]);
      AOV.splice(0, AOV.length);
    }

    //Accepts Marketting
    if (AcceptsMarketing.length !== 0) {
      for (let i = 0; i < customFilters.length; i++) {
        if (customFilters[i].name === "acceptsMarketing") {
          customFilters.splice(i, 1);
        }
      }
      filters.push(AcceptsMarketing[AcceptsMarketing.length - 1]);
      AcceptsMarketing.splice(0, AcceptsMarketing.length);
    }

    //Account State
    if (AccountState.length !== 0) {
      for (let i = 0; i < customFilters.length; i++) {
        if (customFilters[i].name === "AccountState") {
          accountStateCounterFilter++;
        }
      }
      for (let i = 0; i < customFilters.length; i++) {
        if (customFilters[i].name === "AccountState") {
          customFilters.splice(i, accountStateCounterFilter);
        }
      }
      for (let i = 0; i < AccountState.length; i++) {
        filters.push(AccountState[i]);
      }
      AccountState.splice(0, AccountState.length);
      accountStateCounterCustom = 0;
      accountStateCounterFilter = 0;
    }

    //Last Ordered
    if (LastOrdered.length !== 0) {
      for (let i = 0; i < customFilters.length; i++) {
        if (customFilters[i].name === "Last Ordered") {
          customFilters.splice(i, 1);
        }
      }
      filters.push(LastOrdered[LastOrdered.length - 1]);
      LastOrdered.splice(0, LastOrdered.length);
    }

    //Min Spend Total
    if (MinSpendTotal.length !== 0) {
      for (let i = 0; i < customFilters.length; i++) {
        if (customFilters[i].name === "MinSpend") {
          customFilters.splice(i, 1);
        }
      }
      filters.push(MinSpendTotal[MinSpendTotal.length - 1]);
      MinSpendTotal.splice(0, MinSpendTotal.length);
    }

    //Payment Status
    if (PaymentStatus.length !== 0) {
      for (let i = 0; i < customFilters.length; i++) {
        if (customFilters[i].name === "paymentStatus") {
          customFilters.splice(i, 1);
        }
      }
      filters.push(PaymentStatus[PaymentStatus.length - 1]);
      PaymentStatus.splice(0, PaymentStatus.length);
    }

    setCustomFilters([...customFilters, ...filters]);
    inputData.splice(0, inputData.length);
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
                  <div className={styles.textAlign}>
                    <span className={styles.customFilters_span_responsive}>
                      Minimum AOV
                    </span>
                    <br />
                    <input
                      type="text"
                      name="aov_min"
                      onChange={function (set) {
                        handelAOV(set);
                      }}
                      placeholder="Enter Amount"
                      className={styles.rounded_input_corners}
                    />
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <span className={styles.customFilters_span_responsive}>
                      Maximum AOV
                    </span>
                    <br />
                    <input
                      type="text"
                      name="aov_max"
                      onChange={function (set) {
                        handelAOV(set);
                      }}
                      placeholder="Enter Amount"
                      className={styles.rounded_input_corners}
                    />
                  </div>
                </TabPanel>

                <TabPanel value={value} index={1} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <input
                      type="radio"
                      id="acceptsMarketing"
                      name="customer_acceptance"
                      onChange={function (set) {
                        handleAcceptsMarketting(set);
                      }}
                      value="accepted"
                    />
                    <span className={styles.customFilters_span_responsive}>
                      &nbsp;True
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="radio"
                      id="acceptsMarketing"
                      name="customer_acceptance"
                      onChange={function (set) {
                        handleAcceptsMarketting(set);
                      }}
                      value="notAccepted"
                    />
                    <span className={styles.customFilters_span_responsive}>
                      &nbsp;False
                    </span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={2} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_declined"
                      onChange={function (set) {
                        handleAccountState(set);
                      }}
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Declined
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_disabled"
                      onChange={function (set) {
                        handleAccountState(set);
                      }}
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Disabled
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_enabled"
                      onChange={function (set) {
                        handleAccountState(set);
                      }}
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Enabled
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="accountState"
                      name="account_state_invited"
                      onChange={function (set) {
                        handleAccountState(set);
                      }}
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Invited
                    </span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={3} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="customerTag"
                      name="customer_tag_customer_imported_from_tidio"
                      value="Customer imported from Tidio"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Customer imported from Tidio
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="customerTag"
                      name="customer_tag_mitchell_professionals"
                      value="Mitchell Professionals"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Mitchell Professionals
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="customerTag"
                      name="customer_tag_receiving_updates_in_messenger"
                      value="Receiving updates in Messenger"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Receiving updates in Messenger
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="customerTag"
                      name="customer_tag_whatsapp_customer"
                      value="WhatsApp Customer"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      WhatsApp Customer
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="customerTag"
                      name="customer_tag_customer_cleaned_email_spam_protect"
                      value="cleaned-email-spam-protect"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Cleaned-email-spam-protect
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="customerTag"
                      name="customer_tag_newsletter"
                      value="newsletter"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Newsletter
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="customerTag"
                      name="customer_tag_open_signin"
                      value="open_signin"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Open_signin
                    </span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={4} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <span className={styles.customFilters_span_responsive}>
                      Last Ordered
                    </span>
                    <br />
                    <input
                      type="text"
                      name="last_ordered_days"
                      placeholder="Enter the number"
                      onChange={function (set) {
                        handleLastOrdered(set);
                      }}
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={5} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <span className={styles.customFilters_span_responsive}>
                      Min.Spend(Total)
                    </span>
                    <br />
                    <input
                      type="text"
                      name="min_spend_total"
                      placeholder="Enter Amount"
                      onChange={function (set) {
                        handleMinSpendTotal(set);
                      }}
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={6} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_multi_channel"
                      value="multi-channel"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Multi-channel
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_other"
                      value="other"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Other
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_pos"
                      value="pos"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Pos
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="orderSource"
                      name="order_source_web"
                      value="web"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Web
                    </span>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={7} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="ordersTotal"
                      name="orders_total_more_than"
                      value="More than this number"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      More than this number
                    </span>
                    <br />
                    <input
                      type="number"
                      name="orders_total_more_than_input"
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="ordersTotal"
                      name="orders_total_less_than"
                      value="Less than this number"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      Less than this number
                    </span>
                    <br />
                    <input
                      type="number"
                      name="orders_total_less_than_input"
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="checkbox"
                      id="ordersTotal"
                      name="orders_total_exact_number"
                      value="This exact number"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      This exact number
                    </span>
                    <br />
                    <input
                      type="number"
                      name="orders_total_exact_number_input"
                      className={styles.rounded_input_corners}
                    ></input>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={8} className={styles.tab_panel}>
                  <div className={styles.textAlign}>
                    <span className={styles.customFilters_span_responsive}>
                      Start date
                    </span>
                    <br />
                    <input
                      type="date"
                      name="signed_up_start_date"
                      onChange={function (set) {
                        dateHandleInput(set);
                      }}
                      className={styles.rounded_input_corners}
                    ></input>
                    <br />
                    <br />
                    <span className={styles.customFilters_span_responsive}>
                      End date
                    </span>
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
                  <div className={styles.textAlign}>
                    <input
                      type="radio"
                      id="paymentStatus"
                      name="payment_status_paid"
                      onChange={function (set) {
                        handlePaymentStatus(set);
                      }}
                      value="fullyPaid"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      &nbsp;Fully Paid
                    </span>
                  </div>
                  <br />
                  <div className={styles.textAlign}>
                    <input
                      type="radio"
                      id="paymentStatus"
                      name="payment_status_paid"
                      onChange={function (set) {
                        handlePaymentStatus(set);
                      }}
                      value="notFullyPaid"
                    ></input>
                    <span className={styles.customFilters_span_responsive}>
                      &nbsp;Not Fully Paid
                    </span>
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
