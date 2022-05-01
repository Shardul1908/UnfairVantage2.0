import React from "react";
import { useRouter } from 'next/router'
import { Heading, Page } from "@shopify/polaris";
import styles from "../../styles/saved_segments.module.css";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";


function Index() {
  const router = useRouter();
  const { shop } = router.query;

  const [segment, setSegment] = React.useState([]);
  const [startDate, setStartDate] = React.useState(false);
  const [endDate, setEndDate] = React.useState(false);

  function checkStartDate(){
    for(let i = 0;i<segment.length;i++) {
      if (segment.start_date == null) {
        setStartDate(false);
      }
      else {
        setStartDate(true);
      }
    }
  }

  function checkEndDate(){
    for(let i = 0;i<segment.length;i++) {
      if (segment.end_date == null) {
        setEndDate(false);
      }
      else {
        setEndDate(true);
      }
    }
  }

  React.useEffect(() => {
    axios.post("http://localhost:8081/api/fetch_saved_segments", {
      shop:shop
    }).then(res => {
      setSegment(res.data);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  React.useEffect(() => {
    // checkStartDate();
    // checkEndDate();
    // for(let i = 0;i<segment.length;i++) {
    //   setStartDate(segment[i].start_date);
    //   setEndDate(segment[i].end_date);
    // }
    console.table(segment);

  },[segment])

  return (
    <div>
      <div className={styles.saved_segments_div}>
        {segment.map((card) => (
          <div className={styles.save_segments_cards}>
            
            <Card className={styles.cardStyle}>
              <Card.Header style={{backgroundColor: "#484848"}}>
                <Card.Title style={{color: "#FDC500", fontWeight: "bold", fontSize: "16px"}}>{card.title}</Card.Title>
              </Card.Header>
              <Card.Body style={{color: "white", fontSize: "13px"}}>
                <span>CUSTOMER COUNT: {card.number_of_customers}</span><br/><br/>
                {/* {card.start_date?<div><span>START DATE: {card.start_date}</span><br/><br/></div>:<div><span>START DATE: Not Mentioned</span><br/><br/></div>}
                {card.end_date==null}?<div><span>END DATE: {card.end_date}</span><br/><br/></div>:<div><span>START DATE: Not Mentioned</span><br/><br/></div>} */}
                <div><span>START DATE: {card.start_date}</span><br/><br/></div>
                <div><span>END DATE: {card.end_date}</span><br/><br/></div>
              </Card.Body>
              <Card.Footer>
                <Link href={`/CreateSegments/${card.id}/${shop}`}>
                  <Button className={styles.customFilter_button}>OPEN</Button>
                </Link>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
