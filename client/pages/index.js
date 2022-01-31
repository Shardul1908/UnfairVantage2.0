import React, { useEffect } from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
// import Datatable from "../Components/Datatable/Datatable.js"
// import FilterForms from "../Components/FilterForms/FilterForms.js";
// import styles from "../styles/create_segments.module.css";

const Index = (props) => {
  const { shop } = props;

  useEffect(() => {
    const ping = async () => {
      const response = await fetch('http://localhost:8081/api/ping');
      const data = await response.json();
      
      console.log(data);
    }
    
    ping();
  }, []);

  return (
      <CreateSegmentsNavbar shop={shop} />
  )
};

export default Index;