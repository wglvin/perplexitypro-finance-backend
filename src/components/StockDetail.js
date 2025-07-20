import React, { useState, useEffect } from "react";
import NewsFeed from "./NewsFeed";
import PredictionChart from "./PredictionChart";
import { getStockData } from "../services/stockAPI";
import { Paper, Typography, CircularProgress } from "@mui/material";

export default function StockDetail({ ticker }) {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    getStockData(ticker).then(setStockData);
  }, [ticker]);

  if (!ticker) return <Typography>Pick a stock to view details.</Typography>;
  if (!stockData) return <CircularProgress />;
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5">{ticker}</Typography>
      <PredictionChart ticker={ticker} history={stockData.history} />
      <NewsFeed ticker={ticker} />
    </Paper>
  );
}
