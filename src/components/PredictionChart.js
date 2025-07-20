import React, { useEffect, useState } from "react";
import { getPrediction } from "../services/mlModel";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Typography } from "@mui/material";

export default function PredictionChart({ ticker, history }) {
  const [pred, setPred] = useState(null);

  useEffect(() => {
    getPrediction(ticker, history).then(setPred);
  }, [ticker, history]);

  if (!pred) return <Typography>Generating prediction...</Typography>;

  // Combine history and prediction into a data array for the chart
  const chartData = [
    ...history.map((item) => ({ date: item.date, price: item.close })),
    ...pred.prediction.map((item, i) => ({
      date: `Next${i + 1}`,
      price: item,
      prediction: true,
    })),
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>Price & Next Week Prediction</Typography>
      <LineChart width={550} height={250} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#82ca9d" dot={false} name="Actual"/>
        <Line type="monotone" dataKey="prediction" stroke="#8884d8" dot={false} name="Prediction" />
      </LineChart>
    </>
  );
}

