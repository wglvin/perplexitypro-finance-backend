import React, { useEffect, useState } from "react";
import { getPopularStocks } from "../services/stockAPI";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";

const getFavorites = () => JSON.parse(localStorage.getItem("favs") || "[]");
const setFavorites = (favs) => localStorage.setItem("favs", JSON.stringify(favs));

export default function StockList({ onSelect }) {
  const [stocks, setStocks] = useState([]);
  const [favorites, setFavs] = useState(getFavorites());

  useEffect(() => {
    getPopularStocks().then(setStocks);
  }, []);

  const toggleFavorite = (ticker) => {
    let favs = getFavorites();
    if (favs.includes(ticker)) favs = favs.filter((t) => t !== ticker);
    else favs.push(ticker);
    setFavorites(favs);
    setFavs(favs);
  };

  return (
    <List>
      {stocks.map((stock) => (
        <ListItem
          key={stock.ticker}
          button
          onClick={() => onSelect(stock.ticker)}
          secondaryAction={
            <IconButton onClick={e => { e.stopPropagation(); toggleFavorite(stock.ticker); }}>
              {favorites.includes(stock.ticker) ? <StarIcon color="warning" /> : <StarBorderIcon />}
            </IconButton>
          }
        >
          <ListItemText
            primary={`${stock.ticker}: ${stock.name}`}
            secondary={favorites.includes(stock.ticker) ? "Favorite" : ""}
          />
        </ListItem>
      ))}
    </List>
  );
}
