import { TextField } from "@material-ui/core";
import React from "react";
import { Button, Modal, Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/create_segments.module.css";
import axios from "axios";

// Save Segment Modal Design Component
function SaveSegmentsModel(props) {
  const {
    showModal,
    handleCloseModal,
    dateRange,
    customersCount,
    customFilters,
    handleDisableButton,
    shop,
  } = props;

  let segment_title, titleToSend, titleArray = [];

  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  // const [title, setTitle] = React.useState();

  function handleTitle(set) {
    let setName = set.target.name;
    if (setName === "title") {
      if (set.target.value !== "") {
        segment_title = set.target.value;
        titleArray.push(segment_title);
      }
    }
  }

  function save() {
    if (titleArray.length !== 0) {
      titleToSend = titleArray[titleArray.length - 1];
    }

    titleArray.splice(0, titleArray.length);
    axios
      .post("http://localhost:8081/api/save_segment", {
        shop: shop,
        title: titleToSend,
        dateRange: dateRange,
        noOfCustomers: customersCount,
        customFilters: customFilters
      })
      .then(function (res) {
        console.log("Saved Segment Successfulllllyy");
      })
      .catch(function (err) {
        console.log(err);
      });

    handleDisableButton();
    handleCloseModal();
  }

  React.useEffect(() => {
    let startDate = dateRange[0];
    let endDate = dateRange[1];

    if (startDate !== null && endDate !== null) {
      let startMonth = startDate.getMonth() + 1;
      let endMonth = endDate.getMonth() + 1;
      setStart(
        startDate.getDate() + "-" + startMonth + "-" + startDate.getFullYear()
      );
      setEnd(endDate.getDate() + "-" + endMonth + "-" + endDate.getFullYear());
    }
    if (startDate === null && endDate === null) {
      setStart("Date Range was not mentioned");
      setEnd("");
    }
    // console.log(start);
  }, [dateRange]);

  return (
    <>
      <div>
        <Modal show={showModal} onHide={handleCloseModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Save Your Segment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <div className={styles.segments_modal_span}>
                    {/* <TextField
                    required
                    id="segment_name"
                    label="Title"
                    variant="standard"
                    className={styles.input_field_text}
                  /> */}
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Title of Segment"
                      onChange={function (set) {
                        handleTitle(set);
                      }}
                      className={styles.input_field_text}
                    />
                  </div>
                  <div className={styles.segments_modal_span}>
                    <span>Date Range: </span>&nbsp;
                    <span>{start} </span>&nbsp;
                    <span>To</span>&nbsp;
                    <span>{end}</span>
                  </div>
                  <div className={styles.segments_modal_span}>
                    <span>No. of Cutomers: {customersCount} </span>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={save}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default SaveSegmentsModel;
