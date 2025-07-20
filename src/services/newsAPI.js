import axios from "axios";

// Replace YOUR_API_KEY with a Finnhub key (free tier)
const FINNHUB_API_KEY = "YOUR_API_KEY";

export async function getStockNews(ticker) {
  // Call Finnhub API for news
  try {
    let res = await axios.get(
      `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2025-07-10&to=2025-07-20&token=${FINNHUB_API_KEY}`
    );
    return res.data.map(a => ({
      headline: a.headline,
      url: a.url,
      source: a.source
    }));
  } catch {
    // Fallback: demo news
    return [
      { headline: "Major announcement for " + ticker, url: "https://news.com", source: "News.com" }
    ];
  }
}
