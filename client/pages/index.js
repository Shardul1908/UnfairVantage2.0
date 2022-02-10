import axios from "axios";
import React, { useEffect } from "react";
import CreateSegmentsNavbar from "../Components/CreateSegmentsNavbar.js";
// import Datatable from "../Components/Datatable/Datatable.js"
// import FilterForms from "../Components/FilterForms/FilterForms.js";
// import styles from "../styles/create_segments.module.css";

const Index = (props) => {
  const { shop } = props;

  useEffect(() => {
    const ping = async () => {
      axios.post("http://localhost:8081/api/rfm", {
        shop: shop,
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
    
    ping();
  }, []);

  return (
    <CreateSegmentsNavbar shop={shop} />
  )
};

export default Index;