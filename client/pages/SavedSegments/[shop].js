import React from "react";
import { useRouter } from 'next/router'
import { Heading, Page } from "@shopify/polaris";
import styles from "../../styles/saved_segments.module.css";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import CardDate from "../../Components/CardDate/CardDate";

// Dynamic link to /SavedSegments/[shop]
function Index() {
  const router = useRouter();
  const { shop } = router.query;

  const [segment, setSegment] = React.useState([]);

  React.useEffect(() => {
    axios.post("http://localhost:8081/api/fetch_saved_segments", {
      shop:shop
    }).then(res => {
      setSegment(res.data);
    }).catch(err => {
      console.log(err);
    });
  },[]);

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

                Start Date:<CardDate date={card.start_date}></CardDate>
                End Date:<CardDate date={card.end_date}></CardDate>
                
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
