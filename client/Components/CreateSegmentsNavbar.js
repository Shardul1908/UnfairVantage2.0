import React from "react";
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

// import Image from "next/image";

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

  //function will remove all the applied custom filters
  function ResetFilter() {
    setCustomFilters([]);
    if (disabledButton === false) {
      setDisableButton(true);
    }
  }

  const [disabledButton, setDisableButton] = React.useState(true);
  function handleSaveSegment() {
    setShowSaveSegments(true);
    // setDisableButton(true);
  }

  //FilterTags Code
  function handleFilterTags(indexToRemove) {
    setCustomFilters(
      customFilters.filter((_, index) => index !== indexToRemove)
    );
    customFilters.splice(indexToRemove, 1);
  }

  //function to show applied custom filters in form of tags
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
          <Button className={styles.reset_filters_button} onClick={ResetFilter}>
            Reset Filters
          </Button>
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
          <Link href={`/SavedSegments/${shop}`}>
            <Button className={styles.show_segments_button}>
              View Saved Segments
            </Button>
          </Link>
        </div>
      </div>
      <div>{filterTagsPop()}</div>
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
      <div className={styles.server_pagination_table_div}>
        <Datatable
          filters={customFilters}
          shop={shop}
          setCustomersCount={setCustomersCount}
          segment={segment}
        />
      </div>
    </div>
  );
}

export default CreateSegments;
