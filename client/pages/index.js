import React from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
// import Datatable from "../Components/Datatable/Datatable.js"
// import FilterForms from "../Components/FilterForms/FilterForms.js";
// import styles from "../styles/create_segments.module.css";


const Index = (props) => {
  const { shop } = props;
  return (
      <CreateSegmentsNavbar shop={shop} />
  )
};

export default Index;
