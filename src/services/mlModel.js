const BACKEND_URL = "https://perplexitypro-finance-backend.onrender.com/";
export async function getPrediction(ticker, history = []) {
  const response = await fetch(`${BACKEND_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticker, days_ahead: 7 }),
  });
  if (!response.ok) throw new Error("Prediction failed!");
  const data = await response.json();
  return { prediction: data.prediction };
}
