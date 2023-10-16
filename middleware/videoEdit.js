const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

// ffmpeg'e yolu belirtin
ffmpeg.setFfmpegPath(ffmpegPath);

function videoEdit(videoInputUrl, frameInputUrl, callback) {
    const videoOutput = path.join('uploads', path.basename(videoInputUrl, path.extname(videoInputUrl)) + '-output.mp4');
    
    // Ham videonun geçici yolunu al
    const tempVideoPath = videoInputUrl;

    ffmpeg(tempVideoPath)
        .input(frameInputUrl)
        .complexFilter([ 
            "[0:v][1:v] overlay=W-w-0:H-h-10"
        ])
        .output(videoOutput)
        .on('end', () => {
            console.log(`Video işlendi ve ${videoOutput} olarak kaydedildi.`);
            
            // Ham videonun geçici yolunu sil
            fs.unlink(tempVideoPath, (err) => {
                if (err) {
                    console.error('Ham video silinemedi:', err);
                } else {
                    console.log('Ham video silindi.');
                }
            });
            
            callback(videoOutput);  // işlem tamamlandığında callback fonksiyonunu çağır
        })
        .run();
}

module.exports = videoEdit;
