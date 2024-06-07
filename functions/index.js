const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUser = functions.https.onCall(async (data, context) => {
    const { uid, email, displayName } = data;
    try {
        await admin.firestore().collection('users').doc(uid).set({
            email,
            displayName,
        });
        return { message: 'User added successfully' };
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Error adding user', error);
    }
});

exports.getUser = functions.https.onCall(async (data, context) => {
    const { uid } = data;
    try {
        const userDoc = await admin.firestore().collection('users').doc(uid).get();
        if (userDoc.exists) {
            return userDoc.data();
        } else {
            throw new functions.https.HttpsError('not-found', 'User not found');
        }
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Error getting user', error);
    }
});

exports.updatePortfolio = functions.https.onCall(async (data, context) => {
    const { uid, portfolio } = data;
    try {
        await admin.firestore().collection('users').doc(uid).update({
            portfolio,
        });
        return { message: 'Portfolio updated successfully' };
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Error updating portfolio', error);
    }
});

exports.getStockData = functions.https.onCall(async (data, context) => {
    const { symbol } = data;
    // Пример запроса к стороннему API для получения данных о акциях
    // В реальном проекте вам нужно будет заменить это на ваш собственный код
    try {
        const stockData = await fetch(`https://api.example.com/stocks/${symbol}`);
        const stockJson = await stockData.json();
        return stockJson;
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Error getting stock data', error);
    }
});
