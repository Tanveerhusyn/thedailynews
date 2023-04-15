import { Card } from "@mui/material";
import React from "react";
import { Pie } from "react-chartjs-2";

function PieChartNews() {
  const data = {
    labels: ["Sports", "Tech", "Politics"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Card sx={{ height: "30%", width: "100%", padding:"20px" }}>
      <Pie data={data} options={options} />
    </Card>
  );
}

export default PieChartNews;
