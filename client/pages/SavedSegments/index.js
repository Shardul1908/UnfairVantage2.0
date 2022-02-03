import { Heading, Page } from "@shopify/polaris";
import styles from "../../styles/saved_segments.module.css";
import { Card } from "react-bootstrap";
import Link from "next/link";

function Index() {
  const data = [
    { no: 1, name: "Teju" },
    { no: 2, name: "tejusss" },
    { no: 3, name: "yahallo" },
    { no: 4, name: "tejyo!" },
    { no: 5, name: "bhaula!" },
  ];

  const [segment, setSegment] = React.useState([]);

  React.useEffect(function () {
    setSegment(data);
  }, []);

  return (
    <>
      <div className={styles.saved_segments_div}>
        {segment.map((card) => (
          <div className={styles.save_segments_cards}>
            <Card>
              <Card.Header>
                <Card.Title>Segment {card.no}</Card.Title>
              </Card.Header>
              <Card.Body>{card.name}</Card.Body>
              <Card.Footer>Dive Deep</Card.Footer>
            </Card>
          </div>
        ))}
        {/* <h1>Saved Segments</h1> */}
      </div>
    </>
  );
}
export default Index;
