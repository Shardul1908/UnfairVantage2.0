import React from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
import PieChart from "../Components/PieChart/PieChart.js"
import styles from "../styles/homepage.module.css";

const Index = (props) => {
  const { shop } = props;

  return (
    <>
      {/* <PieChart shop={shop} /> */}
      <CreateSegmentsNavbar shop={shop} />
    </>
  )
};

export default Index;