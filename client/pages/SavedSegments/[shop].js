import React from "react";
import { useRouter } from 'next/router'
import { Heading, Page } from "@shopify/polaris";
import styles from "../../styles/saved_segments.module.css";
import { Card } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";

function Index() {
  const router = useRouter();
  const { shop } = router.query;

  React.useEffect(() => {
    axios.post("http://localhost:8081/api/fetch_save_segments", {
      shop:shop
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  // const [segment, setSegment] = React.useState([]);

  // React.useEffect(function () {
  //   setSegment(data);
  // }, []);

  return (
    // <>
    //   <div className={styles.saved_segments_div}>
    //     {segment.map((card) => (
    //       <div className={styles.save_segments_cards}>
    //         <Card>
    //           <Card.Header>
    //             <Card.Title>Segment {card.no}</Card.Title>
    //           </Card.Header>
    //           <Card.Body>{card.name}</Card.Body>
    //           <Card.Footer>Dive Deep</Card.Footer>
    //         </Card>
    //       </div>
    //     ))}
    //   </div>
    //   {/* <h1>Saved Segments</h1> */}
    // </>

    <div>
      Segments Saved by {shop}
    </div>
  );
}

export default Index;
