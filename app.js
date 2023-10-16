const express = require('express');
const http = require('http');
const socket = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const qrcode = require('qrcode'); 
const app = express();
const server = http.createServer(app);
const io = socket(server);
const videoEdit = require('./middleware/videoEdit');
let videoList = [];

// Multer için yapılandırma
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Sunucu başlatıldığında videolar listesini oluştur
function refreshVideoList() {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      console.error('Unable to scan directory:', err);
    } else {
      videoList = files;
    }
  });
}
refreshVideoList();  // Sunucu başlatıldığında videolar listesini yenile
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/qr/:video', async (req, res) => {
  const video = req.params.video;
  const videoUrl = `http://${req.headers.host}/${video}`;
  try {
      const qrSvg = await qrcode.toDataURL(videoUrl);
      res.json({ qrSvg });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

// app.post('/upload', upload.single('video'), (req, res) => {
//   const videoPath = path.resolve(req.file.path);
//   const framePath = path.resolve(__dirname, 'overlay.png'); // Use __dirname to get the current directory

//   videoEdit(videoPath, framePath, (outputPath) => {
//       // Çıktı dosya yoluyla videoList'i güncelle
//       const outputFilename = path.basename(outputPath);
//       videoList.push(outputFilename);

//       // Yeni video olayını yayınla ve /index2 sayfasına yönlendir
//       io.emit('new_video', outputFilename);
//       res.redirect('/index2');
//   });
// });
app.post('/upload', upload.single('video'), (req, res) => {
  const videoPath = path.resolve(req.file.path);
  const framePath = path.resolve(__dirname, 'overlay.png'); // Use __dirname to get the current directory

  videoEdit(videoPath, framePath, (outputPath) => {
      // Çıktı dosya yoluyla videoList'i güncelle
      const outputFilename = path.basename(outputPath);
      videoList.push(outputFilename);
      // Yeni video olayını yayınla ve /index2 sayfasına yönlendir
      io.emit('new_video', outputFilename);
      res.redirect('/');
  });
});


app.get('/index2', (req, res) => {
  res.render('index2', { videoList: videoList });  // Videolar listesini ileterek render et
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});