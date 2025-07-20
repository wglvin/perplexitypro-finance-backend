from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "Perplexity Pro Finance ML API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    ticker = data.get("ticker", "AAPL")
    days = data.get("days_ahead", 7)
    if not ticker:
        return jsonify({"error": "No ticker provided"}), 400



    # Pull past 60 days of data
    df = yf.download(ticker, period="3mo", interval="1d")
    if len(df) < 10:
        return jsonify({"error": "Not enough data"}), 400

    # Simple: Predict next N based on linear regression of last N closes
    df = df.reset_index()
    X = np.arange(len(df)).reshape(-1, 1)
    y = df["Close"].to_numpy().reshape(-1, 1)
    model = LinearRegression().fit(X, y)

    future_x = np.arange(len(df), len(df) + days).reshape(-1, 1)
    predicted = model.predict(future_x).flatten().tolist()

    return jsonify({"prediction": predicted})

if __name__ == "__main__":
    app.run(port=5000)
