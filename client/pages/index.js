import { red } from "@material-ui/core/colors";
import React, { useEffect } from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
import PieChart from "../Components/PieChart/PieChart.js";
import styles from "../styles/homepage.module.css";
import { Button } from "react-bootstrap";
import axios from 'axios';
import { fontWeight } from "@mui/system";
import Link from "next/link";


const Index = (props) => {
  const { shop } = props;

  const [customerCount, setCustomerCount] = React.useState(0);
  const [orderCount, setOrderCount] = React.useState(0);
  const [orderItemCount, setOrderItemCount] = React.useState(0); 

  useEffect(() => {
    axios.post("http://localhost:8081/api/initialize_app", {
      shop: shop,
    }).then(res => {
      setCustomerCount(res.data.customer_count);
      setOrderCount(res.data.order_count);
      setOrderItemCount(res.data.orderItem_count);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  return (
    <div className={styles.homepage}>
      <div className={styles.navbar}>
        <div className={styles.homepage_title}>
          <h3>Home Page</h3>
        </div>
        <Link href={`/CreateSegments/all/${shop}`}>
          <Button className={styles.create_segments}>Create Segments</Button>
        </Link>
        
        <div className={styles.dropdown}>
          <label style={{ color: "#ffffff", fontWeight: "bold", fontSize: "18px" }}>
            Category
          </label>
          &nbsp;
          <select name="Categories" id="categories">
            <option value="top">Top Valued Customers</option>
            <option value="high">High Valued Customers</option>
            <option value="med">Medium Valued Customers</option>
            <option value="low">Low Valued Customers</option>
            <option value="lost">Lost Customers</option>
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
          <h3 className={styles.customer_count}>Total Customers: {customerCount} </h3>
          <h3 className={styles.order_count}>Total Orders: {orderCount}</h3>
          <h3 className={styles.inventory}>Told Products Sold: {orderItemCount} </h3>
        </div>
      </div>
    </div>
  );
};

export default Index;
