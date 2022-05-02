import React, { useEffect } from "react";
import styles from "../styles/create_segments.module.css";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import Datatable from "./Datatable/Datatable.js";
import FilterForms from "./FilterForms/FilterForms.js";
import SaveSegments from "../public/SaveSegments.svg";
import SaveSegmentsModel from "./SaveSegmentsModal/SaveSegmentsModel";
import DateRange from "./DateRange/DateRange";
import axios from "axios";

//Create Segment page
function CreateSegments(props) {
  const { shop, segment, filters } = props;
 
  //Custom Filter Modal show
  const [showFilterForms, setShowFilterForms] = React.useState(false);

  //SaveSegments Modal
  const [showSaveSegments, setShowSaveSegments] = React.useState(false);

  // customFilters is the array for data tables
  const [customFilters, setCustomFilters] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([null, null]);

  const [inputData, setInputData] = React.useState([]);
  const [customersCount, setCustomersCount] = React.useState();

  function ResetFilter() {
    setCustomFilters([]);
    if (disabledButton === false) {
      setDisableButton(true);
    }
  }

  //Save the Segment
  const [disabledButton, setDisableButton] = React.useState(true);
  function handleSaveSegment() {
    setShowSaveSegments(true);
  }

  //FilterTags Code
  function handleFilterTags(indexToRemove) {
    setCustomFilters(
      customFilters.filter((_, index) => index !== indexToRemove)
    );
    customFilters.splice(indexToRemove, 1);
  }

  //Click the x on the filter tag to remove filter
  function filterTagsPop() {
    return (
      <div className={styles.filterTag_main_div}>
        {customFilters.map((tags, index) => (
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

  //Apply the RFM filter or the filters saved as a segment
  useEffect(() => {
    if(segment === "all" || segment === "top" || segment === "high" || segment === "med" || segment === "low" || segment === "lost") {
      // console.log("Not From Saved Segments with segment number ", segment);
    }else {
      // console.log("From Saved Segments with segment number ", segment);
      axios.post("http://localhost:8081/api/fetch_saved_segments_with_id", {
        shop: shop,
        segment: segment,
      }).then(res => {
        let filters = res.data[0].filters;
        let start_date = res.data[0].start_date;
        let end_date = res.data[0].end_date;
        start_date = new Date(start_date);
        end_date = new Date(end_date);

        let json_filters = JSON.parse(filters);
        console.log(json_filters);
        setCustomFilters([...customFilters, ...json_filters]);
        setDateRange([start_date, end_date]);
      }).catch(err => {
        console.error(err);
      });
    }
  },[]);

  //Disable Enable Save Segment button
  React.useEffect(() => {
    let filterLength = customFilters.length;

    let startDate = dateRange[0];
    let endDate = dateRange[1];

    if (filterLength !== 0 || (startDate !== null && endDate !== null)) {
      setDisableButton(false);
    }
    if (filterLength === 0 && startDate === null && endDate === null) {
      setDisableButton(true);
    }
  }, [customFilters, dateRange]);

  return (
    <div className={styles.createSegments_main_div}>
      <div className={styles.createSegments_navBar_div}>
        <div className={styles.nav_left}>
          {/* Open Custom Filters Modal */}
          <Button
            onClick={function () {
              setShowFilterForms(true);
            }}
            className={styles.customFilter_button}
          >
            Custom Filters
          </Button>

          <div className={styles.vertical_line}></div>

          <div className={styles.date_dynamic_and_static}>
            <DateRange dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </div>
        <div className={styles.nav_right}>
          {/* Reset Filters Button */}
          <Button className={styles.reset_filters_button} onClick={ResetFilter}>
            Reset Filters
          </Button>
          {/* Save Segment Button */}
          <Button
            className={styles.save_segments_button}
            onClick={handleSaveSegment}
            disabled={disabledButton}
          >
            {/* <img
              src={SaveSegments}
              className={styles.saveSegments_logo}
              alt="star-icon"
            /> */}
            <span className={styles.save_segment_span}>Save Segments</span>
          </Button>
          <div className={styles.menu_icon}>
            <FaBars />
          </div>
          {/* Link to Saved Segments */}
          <Link href={`/SavedSegments/${shop}`}>
            <Button className={styles.show_segments_button}>
              View Saved Segments
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tags Div */}
      <div>{filterTagsPop()}</div>

      {/* Save Segments Modal */}
      <div>
        <SaveSegmentsModel
          showModal={showSaveSegments}
          handleCloseModal={() => {
            setShowSaveSegments(false);
          }}
          dateRange={dateRange}
          customersCount={customersCount}
          customFilters={customFilters}
          handleDisableButton={() => {
            setDisableButton(true);
          }}
          shop={shop}
        />
      </div>

      {/* Filter Forms Modal */}
      <div className={styles.filter_forms}>
        <FilterForms
          showCustomFilter={showFilterForms}
          onHide={function () {
            setShowFilterForms(false);
          }}
          customFilters={customFilters}
          inputData={inputData}
          setCustomFilters={setCustomFilters}
        />
      </div>

      {/* <SavedSegments handleCreateToSavedSegments={segmentData} /> */}
      {/* DataTable div */}
      <div className={styles.server_pagination_table_div}>
        <Datatable
          filters={customFilters}
          shop={shop}
          setCustomersCount={setCustomersCount}
          segment={segment}
          dateRange={dateRange}
        />
      </div>
    </div>
  );
}

export default CreateSegments;
