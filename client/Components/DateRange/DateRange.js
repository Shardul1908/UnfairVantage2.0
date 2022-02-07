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
        // console.log(lastDays);
        // let months = {
        //   Jan: "01",
        //   Feb: "02",
        //   Mar: "03",
        //   Apr: "04",
        //   May: "05",
        //   Jun: "06",
        //   Jul: "07",
        //   Aug: "08",
        //   Sep: "09",
        //   Oct: "10",
        //   Nov: "11",
        //   Dec: "12",
        // };

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

        /*if (set != null) {
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
          setCustomFilters([
            ...customFilters,
            {
              name: "Date Range",
              data: { start, end },
              display: `Start: ${start}, End: ${end}`,
            },
          ]);
        }*/
    }

    function handleCloseDateRange() {
        // for (let i = 0; i < customFilters.length; i++) {
        //   if (customFilters[i].name === "Date Range") {
        //     customFilters.splice(i, 1);
        //   }
        // }

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
