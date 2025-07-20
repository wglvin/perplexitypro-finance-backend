import React, { useEffect, useState } from "react";
import { getStockNews } from "../services/newsAPI";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function NewsFeed({ ticker }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getStockNews(ticker).then(setArticles);
  }, [ticker]);

  if (!articles.length) return <Typography>No news found.</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Related News</Typography>
      <List>
        {articles.map((article, idx) => (
          <ListItem key={idx} component="a" href={article.url} target="_blank">
            <ListItemText primary={article.headline} secondary={article.source} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
