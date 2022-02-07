import { TextField } from '@material-ui/core';
import React from 'react';
import { Button, Modal, Container, Col } from "react-bootstrap";
import styles from "../../styles/create_segments.module.css";

function SaveSegmentsModel(props) {
    const { showModal, handleCloseModal } = props;

    return <div>
        <Modal show={showModal} onHide={handleCloseModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Save Your Segment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Col>
                        <div className={styles.segments_modal_span}>
                            <TextField required id='segment_name' label="Title" variant='standard' />
                        </div>
                        <div className={styles.segments_modal_span}>
                            <span>Date Range </span>
                        </div>
                        <div className={styles.segments_modal_span}>
                            <span>No. of Customers </span>
                        </div>
                    </Col>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCloseModal}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;
}

export default SaveSegmentsModel;
