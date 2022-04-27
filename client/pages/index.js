import { red } from "@material-ui/core/colors";
import React from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
import PieChart from "../Components/PieChart/PieChart.js";
import styles from "../styles/homepage.module.css";
import { Button } from "react-bootstrap";
import { fontWeight } from "@mui/system";





const Index = (props) => {
  const { shop } = props;

  return (
    <div className={styles.homepage}>
      <div className={styles.navbar}>
        <div className={styles.homepage_title}>
          <h3>Home Page</h3>
        </div>
        <Button className={styles.create_segments}>Create Segments</Button>
        <div className={styles.dropdown}>
          <label
            for="cars"
            style={{ color: "#ffffff", fontWeight: "bold", fontSize: "18px" }}
          >
            Category
          </label>
          &nbsp;
          <select name="Categories" id="categories">
            <option value="volvo">Top Valued Customers</option>
            <option value="saab">High Valued Customers</option>
            <option value="mercedes">Medium Valued Customers</option>
            <option value="audi">Low Valued Customers</option>
            <option value="audi">Lost Customers</option>
          </select>
          &nbsp;&nbsp;
          <Button
            style={{
              backgroundColor: "#fdfdfd",
              marginBottom: "4px",
              color: "#000000",
              fontSize: "11px",
              border: "none",
            }}
          >
            Show
          </Button>
        </div>
      </div>
      <div className={styles.flex_container}>
        <div className={styles.homepage_div_piechart}>
          <PieChart shop={shop} />
        </div>
        <div className={styles.stats}>
          <h3 className={styles.customer_count}>3434 Customers </h3>
          <h3 className={styles.order_count}>5673 Orders So Far</h3>
          <h3 className={styles.inventory}>68 Products </h3>
        </div>
      </div>
    </div>
  );
};

export default Index;
