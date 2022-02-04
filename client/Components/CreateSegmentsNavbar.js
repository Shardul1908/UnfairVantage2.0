import React from "react";
import styles from "../styles/create_segments.module.css";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import * as dateFns from "date-fns";
import { DateRangePicker } from "rsuite";
import Datatable from "./Datatable/Datatable.js";
import FilterForms from "./FilterForms/FilterForms.js";
import SaveSegments from "../public/SaveSegments.svg";
import "rsuite/dist/rsuite.min.css";
import Image from "next/image";

function CreateSegments(props) {
  const { shop } = props;
  //Custom Filter Modal show
  const [show, setShow] = React.useState(false);

  // filterLengthArray is for Save Segment enable disable
  // customFilters is the array for data tables
  // filterDisplayArray is to display applied filters except DateRange
  const [filterLengthArray, setFilterLengthArray] = React.useState([]);
  const [customFilters, setCustomFilters] = React.useState([]);
  const [filterDisplayArray, setFilterDisplayArray] = React.useState([]);

  const [inputData, setInputData] = React.useState([]);

  function ResetFilter() {
    setFilterLengthArray([]);
    setCustomFilters([]);
    setFilterDisplayArray([]);
    if (disabledButton === false) {
      setDisableButton(true);
    }
  }

  const [disabledButton, setDisableButton] = React.useState(true);
  function handleDisableButton() {
    filterLengthArray.splice(0, filterLengthArray.length);
    console.log("After SaveSegments Filter Length Array is:- ");
    console.log(filterLengthArray);
    setDisableButton(true);
    console.log("customFilters");
    console.log(customFilters);
  }

  function enableSaveSegmentButton() {
    if (filterLengthArray.length !== 0) {
      setDisableButton(false);
    }
    if (filterLengthArray.length === 0) {
      setDisableButton(true);
    }
  }

  //FilterTags Code

  function handleFilterTags(indexToRemove) {
    setCustomFilters(
      customFilters.filter((_, index) => index !== indexToRemove)
    );
    customFilters.splice(indexToRemove, 1);

    setFilterDisplayArray(
      filterDisplayArray.filter((_, index) => index !== indexToRemove)
    );
    filterDisplayArray.splice(indexToRemove, 1);

    if (filterLengthArray.length !== 0) {
      setFilterLengthArray(
        filterLengthArray.filter((_, index) => index !== indexToRemove)
      );
      filterLengthArray.splice(indexToRemove, 1);
    }
    if (filterLengthArray.length === 0) {
      for (let i = 0; i < customFilters.length; i++) {
        filterLengthArray.push(customFilters[i]);
      }
    }
    enableSaveSegmentButton();
  }

  function filterTagsPop() {
    return (
      <div className={styles.filterTag_main_div}>
        {filterDisplayArray.map((tags, index) => (
          <div className={styles.filterTag_text_div} key={index}>
            {tags.display}
            <AiOutlineCloseSquare
              className={styles.filterTag_Icon}
              size={23}
              onClick={function () {
                handleFilterTags(index);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  //DateRangePicker
  const dynamicRanges = [
    {
      label: "Yesterday",
      value: [dateFns.addDays(new Date(), -1), dateFns.addDays(new Date(), -1)],
    },
    {
      label: "Today",
      value: [new Date(), new Date()],
    },
    {
      label: "Tomorrow",
      value: [dateFns.addDays(new Date(), 1), dateFns.addDays(new Date(), 1)],
    },
    {
      label: "Last 7 days",
      value: [dateFns.subDays(new Date(), 6), new Date()],
    },
    {
      label: "Last 30 days",
      value: [dateFns.subDays(new Date(), 29), new Date()],
    },
    {
      label: "Last 60 days",
      value: [dateFns.subDays(new Date(), 59), new Date()],
    },
    {
      label: "Last 90 days",
      value: [dateFns.subDays(new Date(), 89), new Date()],
    },
  ];

  const [dateChange, setDateChange] = React.useState([]);
  function handleDateChange(set) {
    let today = [
      dateFns.format(new Date(), "yyyy-MM-dd"),
      dateFns.format(new Date(), "yyyy-MM-dd"),
    ];
    // console.log(today);
    let lastDays = [
      dateFns.format(dateFns.subDays(new Date(), 6), "yyyy-MM-dd"),
      dateFns.format(new Date(), "yyyy-MM-dd"),
    ];
    // console.log(lastDays);
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    if (set != null) {
      let start = set[0].toString();
      let end = set[1].toString();
      let startDate = start.substring(8, 10);
      let endDate = end.substring(8, 10);
      let startYear = start.substring(11, 15);
      let endYear = end.substring(11, 15);
      let startMonth = start.substring(4, 7);
      let endMonth = end.substring(4, 7);
      for (var i = 0; i < Object.keys(months).length; i++) {
        if (Object.keys(months)[i] === startMonth) {
          startMonth = Object.values(months)[i];
        }
        if (Object.keys(months)[i] === endMonth) {
          endMonth = Object.values(months)[i];
        }
      }
      start = startYear.concat("-", startMonth, "-", startDate);
      end = endYear.concat("-", endMonth, "-", endDate);
      console.log("Start Date: " + start);
      console.log("End Date: " + end);
      filterLengthArray.push({
        name: "Date Range",
        data: { start, end },
        display: `Start: ${start}, End: ${end}`,
      });
      customFilters.push({
        name: "Date Range",
        data: { start, end },
        display: `Start: ${start}, End: ${end}`,
      });
      enableSaveSegmentButton();
      console.log(filterLengthArray);
      console.log(customFilters);
      // let newStardDate = startDate.replace(/\s/g, "-");
    }
  }

  function handleCloseDateRange() {
    console.log("On Colse Date Range");
    for (let i = 0; i < filterLengthArray.length; i++) {
      if (filterLengthArray[i].name === "Date Range") {
        filterLengthArray.splice(i, 1);
      }
    }
    for (let i = 0; i < customFilters.length; i++) {
      if (customFilters[i].name === "Date Range") {
        customFilters.splice(i, 1);
      }
    }
    console.log(filterLengthArray);
    console.log(customFilters);
    enableSaveSegmentButton();
  }

  return (
    <div className={styles.createSegments_main_div}>
      <div className={styles.createSegments_navBar_div}>
        <div className={styles.nav_left}>
          <Button
            onClick={function () {
              setShow(true);
            }}
            className={styles.customFilter_button}
          >
            Custom Filters
          </Button>
          <div className={styles.vertical_line}></div>
          <div className={styles.date_dynamic_and_static}>
            <DateRangePicker
              onOk={function (set) {
                handleDateChange(set);
              }}
              appearance="subtle"
              placeholder="Select Date Range"
              ranges={dynamicRanges}
              format="d MMM yyyy"
              style={{ color: "#ffffff" }}
              onClean={handleCloseDateRange}
            />
          </div>
        </div>
        <div className={styles.nav_right}>
          <Button className={styles.reset_filters_button} onClick={ResetFilter}>
            Reset Filters
          </Button>
          <Button
            className={styles.save_segments_button}
            onClick={handleDisableButton}
            disabled={disabledButton}
          >
            <img
              src={SaveSegments}
              className={styles.saveSegments_logo}
              alt="star-icon"
            />
            <span className={styles.save_segment_span}>Save Segments</span>
          </Button>
          <div className={styles.menu_icon}>
            <FaBars />
          </div>
          <Link href="/SavedSegments">
            <Button className={styles.show_segments_button}>
              View Saved Segments
            </Button>
          </Link>
        </div>
      </div>
      <div>{filterTagsPop()}</div>
      <div className={styles.filter_forms}>
        <FilterForms
          showCustomFilter={show}
          onHide={function () {
            setShow(false);
          }}
          filterLengthArray={filterLengthArray}
          customFilters={customFilters}
          filterDisplayArray={filterDisplayArray}
          inputData={inputData}
          setCustomFilters={setCustomFilters}
          enableSaveSegmentButton={enableSaveSegmentButton}
        />
      </div>

      {/* <SavedSegments handleCreateToSavedSegments={segmentData} /> */}
      <div className={styles.server_pagination_table_div}>
        <Datatable filters={customFilters} shop={shop} />
      </div>
    </div>
  );
}

export default CreateSegments;
