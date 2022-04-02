
var admin = require("firebase-admin");

var serviceAccount = require("./config/comision18135-firebase-adminsdk-3e1h7-65badbf096.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
