import { useState } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const options = {
    elements: {
        point: {
            radius: 1.2,
        },
    },

    scale: {
        ticks: {
            beginAtZero: true,
            display: false,
            max: 1,
            min: 0,
            stepSize: 0.2,
        }, //maxTicksLimit data 최대값의 2배
    },
};

const RadarChart = () => {
    const [chartData, setChartData] = useState({
        labels: ["danceability", "energy", "tempo", "valence", "acousticness"],
        datasets: [
            {
                label: "Track",
                data: [0.755, 0.221, 0.379, 0.698, 0.1018],
                backgroundColor: "rgba(243, 229, 185, 0.2)",
                borderColor: "rgb(255, 183, 0)",
                borderWidth: 1.5,
            },
        ],
    });

    return (
        <div
            style={{
                background: "rgb(238,242,245)",
                padding: "30px 0 20px",
                width: "300px",
            }}
        >
            <Radar data={chartData} options={options} />
        </div>
    );
};

export default RadarChart;
