const sdk = require("node-appwrite");
const client = new sdk.Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6524df45b1667210dcd2")
    .setKey("083041e670c9bee112a57de39440806c6ce77a229379e83e2aade5b595ef40edb34dae5a8eb90aded54cd804a6722d88eb6ee679c099644dd363e9e7d8fd609350ef506823b0b7a1d01cc6a3eb45f94f416f736e6c6d752b7ff91b1d6fd66b101f27ea409099235803157e6c3bf5601cb7f4e8e610b4efea9a4814d96444c59f"); // Gizlilik için API anahtarınızı gizledim

   
exports.client = client;
 