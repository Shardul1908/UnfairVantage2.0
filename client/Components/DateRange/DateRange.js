import React from 'react';

import { DateRangePicker } from "rsuite";
import * as dateFns from "date-fns";
import update from "react-addons-update";
import "rsuite/dist/rsuite.min.css";

function DateRange(props) {
    const { dateRange, setDateRange } = props;

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

    function handleDateChange(set) {
        setDateRange(
            update(dateRange, {
                [0]: {
                    $set: set[0]
                },
                [1]: {
                    $set: set[1]
                }
            })
        );
    }

    function handleCloseDateRange() {
        setDateRange([null, null]);
    }

    return <>
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
    </>;
}

export default DateRange;