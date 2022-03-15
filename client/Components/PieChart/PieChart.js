import React from 'react'
import axios from "axios"
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

function PieChart(props) {
    const { shop } = props;
    const [rfmScoreCard, setRfmScoreCard] = React.useState({
        labels: ["Top Customer", "High Value Customer", "Medium Value Customer", "Low Value Customer", "Lost Customer"],
        datasets: [{
            label: "Number of Customers",
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderColor: "black",
            borderWidth: 1,
        }],
    });

    React.useEffect(() => {
        const ping = async () => {
            axios.post("http://localhost:8081/api/rfm", {
                shop: shop,
            }).then(res => {
                let numberOfCustomers = [0, 0, 0, 0, 0];

                let segments = res.data.segments;
                for (let i = 0; i < segments.length; i++) {
                    if (segments[i] === "Top Customer") {
                        numberOfCustomers[0]++;
                    } else if (segments[i] === "High Value Customer") {
                        numberOfCustomers[1]++;
                    } else if (segments[i] === "Medium Value Customer") {
                        numberOfCustomers[2]++;
                    } else if (segments[i] === "Low Value Customer") {
                        numberOfCustomers[3]++;
                    } else if (segments[i] === "Lost Customer") {
                        numberOfCustomers[4]++;
                    }
                }

                let data = {
                    labels: ["Top Customer", "High Value Customer", "Medium Value Customer", "Low Value Customer", "Lost Customer"],
                    datasets: [{
                        label: "Number of Customers",
                        data: numberOfCustomers,
                        backgroundColor: [
                            "darkgreen",
                            "forestgreen",
                            "yellowgreen",
                            "yellow",
                            "red",
                        ],
                        borderColor: "black",
                        borderWidth: 1,
                    }],
                };
                setRfmScoreCard(data);
            }).catch(err => {
                console.log(err);
            });
        }

        ping();
    }, []);

    return (
        <div>
            <Pie
                data={rfmScoreCard}
            />
        </div>
    );
}

export default PieChart