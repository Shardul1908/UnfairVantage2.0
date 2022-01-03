import React from 'react'
import styles from '../styles/create_segments.module.css';
import { Button } from 'react-bootstrap';
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import Link from 'next/link';
import * as dateFns from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import SaveSegments from "../public/SaveSegments.svg"
import Image from 'next/image';

function CreateSegmentsNavbar({ setShow, customFilters, setCustomFilters }) {

    //Shantnu's Code
    const [tags, setTags] = React.useState([]);

    React.useEffect(() => {
        setTags(customFilters);
    }, [customFilters]);

    function ResetFilter() {
        setCustomFilters([]);
    }

    //Save Segment
    const [disabledButton, setDisableButton] = React.useState(true);
    function handleDisableButton(saveSegmentDisable) {
        setDisableButton(saveSegmentDisable);
    }

    function filterTags() {
        return (
            <div className={styles.filterTag_main_div}>
                {tags.map((tag) => (
                    <div
                        className={styles.filterTag_text_div}
                        style={{
                            backgroundColor: "#CCCCCC",
                            padding: "5px",
                            fontSize: "12px",
                            border: "1px solid black",
                            width: "fit-content",
                            borderRadius: "5px",
                            margin: "3px",
                        }}>
                        {tag.display}
                        <AiOutlineCloseSquare className={styles.filterTag_Icon} size={23} />
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
            console.log(set);
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
            // let newStardDate = startDate.replace(/\s/g, "-");
        }
    }

    return (
        <div className={styles.createSegments_navBar_div}>
            <div className={styles.nav_left}>
                <Button onClick={function () {
                    setShow(true);
                }}
                    className={styles.customFilter_button}>
                    Custom Filters
                </Button>
                <div className={styles.vertical_line}></div>
                <div className={styles.date_dynamic_and_static}>
                    <DateRangePicker
                        onOk={function (set) {
                            handleDateChange(set);
                        }}
                        // value={dateChange}
                        // onChange={setDateChange}
                        // onOk={handleDateChange()}
                        appearance="subtle"
                        placeholder="Select Date Range"
                        ranges={dynamicRanges}
                        format="d MMM yyyy"
                        style={{ color: "#ffffff" }}
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
                    <Image
                        src="/SaveSegments.png"
                        className={styles.saveSegments_logo}
                        alt="star-icon"
                        width="21" height="21"
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
    )
}

export default CreateSegmentsNavbar