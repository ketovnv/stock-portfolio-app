// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getStockData = functions.https.onRequest(async (request, response) => {
    try {
        // Ваш код для получения данных о цене акций
        const stockData = { symbol: 'AAPL', price: 150 };
        response.json(stockData);
    } catch (error) {
        console.error('Error getting stock data:', error);
        response.status(500).send('Internal Server Error');
    }
});