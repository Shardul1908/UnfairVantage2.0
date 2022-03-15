import { red } from "@material-ui/core/colors";
import React from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
import PieChart from "../Components/PieChart/PieChart.js";
import styles from "../styles/homepage.module.css";

const Index = (props) => {
  const { shop } = props;

  return (
    <div className={styles.homepage_outer_div}>
      <div className={styles.homepage_title}>
        <p>Store Insights</p>
      </div>
      {/* <div className={styles.homepage_div}>
        <div className={styles.homepage_div_piechart}>
          <PieChart shop={shop} />
        </div>
        <div className={styles.homepage_div_stats}>
          <ol className={styles.homepage_ol}>
            <li>Shop Customer Count: 3160</li>
            <li>Shop Order Count: 4060</li>
            <li>Shop Product Count: 5567</li>
          </ol>
        </div>
      </div> */}
    </div>
  );
};

export default Index;
