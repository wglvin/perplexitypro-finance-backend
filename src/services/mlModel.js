// src/services/mlModel.js

export async function getPrediction(ticker, history = []) {
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticker, days_ahead: 7 }),
  });
  if (!response.ok) throw new Error("Prediction failed");
  const data = await response.json();
  return { prediction: data.prediction };
}
