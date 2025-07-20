
// Demo: Fetch popular US stocks (static for example)
export function getPopularStocks() {
  return Promise.resolve([
    { ticker: "AAPL", name: "Apple Inc." },
    { ticker: "MSFT", name: "Microsoft Corp." },
    { ticker: "GOOGL", name: "Alphabet Inc." },
    { ticker: "NVDA", name: "NVIDIA Corp." },
    { ticker: "TSLA", name: "Tesla Inc." }
  ]);
}

// Fetch Yahoo historical stock data (for chart)
export async function getStockData(ticker) {
  // Example endpoint below (you must run yfinance in a backend OR use a free stock API as a proxy)
  // For demo, return random data
  let today = new Date();
  let history = [];
  for (let i = 6; i >= 0; i--) {
    let d = new Date(today);
    d.setDate(today.getDate() - i);
    history.push({ date: d.toISOString().slice(0, 10), close: 100 + Math.random() * 30 });
  }
  return { ticker, history };
}
