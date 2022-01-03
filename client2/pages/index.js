import React from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
import Datatable from "../Components/Datatable/Datatable.js"
import FilterForms from "../Components/FilterForms/FilterForms.js";
import styles from "../styles/create_segments.module.css";


const Index = () => {
  //Custom Filter Modal show
  const [show, setShow] = React.useState(false);

  //TBD
  const [customFilters, setCustomFilters] = React.useState({});
  function handleFilterToCreate(filters) {
    setCustomFilters(filters);
    // filterTags();
  }
  //TBD

  function ResetFilter() {
    setCustomFilters([]);
  }

  //Save Segment
  const [disabledButton, setDisableButton] = React.useState(true);
  function handleDisableButton(saveSegmentDisable) {
    setDisableButton(saveSegmentDisable);

    // setDisableButton(!disabledButton);
  }

  return (
    <div className={styles.createSegments_main_div}>
      <CreateSegmentsNavbar setShow={setShow} customFilters={customFilters} setCustomFilters={setCustomFilters}/>
      
      <div>
        <FilterForms
          showCustomFilter={show}
          onHide={function () {
            setShow(false);
          }}
          customFilters={customFilters}
          handleFilterToCreate={handleFilterToCreate}
          handleDisableButton={handleDisableButton}
        />
      </div>

      <div className={styles.server_pagination_table_div}>
        <Datatable filters={customFilters} />
      </div>

    </div>
  )
};

export default Index;
