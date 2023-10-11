
const sdk = require("node-appwrite");
const crypto = require('crypto');
const client = require('../utility/connect').client;
const databases = new sdk.Databases(client);
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');


// const promise = databases.createDocument(
//     '6524f227874d2b78a31d',
//     '6524f22fc76d425dfa66',Z
//     generateUUID(),  // Burada UUID fonksiyonunu kullanıyoruz
//     { "title": "Hamleeet" }
// );

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });

exports.getData = async (req, res, next) => {
    const documentsResponse = await databases.listDocuments('6524f227874d2b78a31d', '6524f22fc76d425dfa66');
    const documents = documentsResponse.documents;
    try {
        res.render('index', {
            title: 'data',
            path: '/',
            documents: documents
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
        return res.redirect("/");

    }
}
ffmpeg.setFfmpegPath(ffmpegPath);
exports.postVideoUpload = async (req, res, next) => {
  
}
