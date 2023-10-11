const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

// ffmpeg'e yolu belirtin
ffmpeg.setFfmpegPath(ffmpegPath);

function videoEdit(videoInputUrl, frameInputUrl, callback) {
    const videoOutput = path.join('uploads', path.basename(videoInputUrl, path.extname(videoInputUrl)) + '-output.mp4');

    ffmpeg(videoInputUrl)
        .input(frameInputUrl) // Burada frameInputUrl olarak iletilen değeri kullanıyoruz.
        .complexFilter([ 
            "[0:v][1:v] overlay=W-w-10:H-h-10"
        ])
        .output(videoOutput)
        .on('end', () => {
            console.log(`Video işlendi ve ${videoOutput} olarak kaydedildi.`);
            callback(videoOutput);  // işlem tamamlandığında callback fonksiyonunu çağır
        })
        .run();
}

module.exports = videoEdit;
