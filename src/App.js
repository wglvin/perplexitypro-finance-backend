import React, { useState } from "react";
import Navbar from "./components/Navbar";
import StockList from "./components/StockList";
import StockDetail from "./components/StockDetail";
import { Grid, Paper } from "@mui/material";

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <StockList onSelect={setSelected} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <StockDetail ticker={selected} />
        </Grid>
      </Grid>
    </>
  );
}
