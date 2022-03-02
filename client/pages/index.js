import React from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
import PieChart from "../Components/PieChart/PieChart.js"
import styles from "../styles/homepage.module.css";

const Index = (props) => {
  const { shop } = props;

  return (
    <>
      <div className={styles.navbar_home}>

      </div>

      <div className={styles.analytics}>
        {/* <div className={styles.analytics_pie}>
          
        </div> */}
        <PieChart shop={shop} />
        <div className={styles.analytics_nos}>
          <h3>Total Customers</h3>
          <h3>Top Customers</h3>
          <h3>High Customers</h3>
          <h3>Medium Customers</h3>
          <h3>Low Customers</h3>
          <h3>Lost Customers</h3>
        </div>
      </div>
    </>
    // <CreateSegmentsNavbar shop={shop} />
  )
};

export default Index;