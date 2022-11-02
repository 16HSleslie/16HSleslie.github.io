const express = require('express');
const bp = require('body-parser')
const app = express();
const path = require('path');
const fs = require('fs');
var multer = require('multer');
var upload = multer();
const dataPath = path.join(__dirname, 'gameData.json');

const hostname = '127.0.0.1';
const port = 3000;

const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = 'utf8'
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fileData,
  callback,
  filePath = dataPath,
  encoding = 'utf8'
) => {
  fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
      throw err;
    }

    callback();
  });
};

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(upload.array()); 
app.use(express.static('public'));

app.get('/', (req, res) => {
  const route = path.join(__dirname, '/pages/index.html');
  res.sendFile(route, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent: index.html');
    }
  });
});

app.get('/game.html', (req, res) => {
  const route = path.join(__dirname, '/pages/game.html');
  res.sendFile(route, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent: index.html');
    }
  })
});

app.get('/songs.html', (req, res) => {
  const route = path.join(__dirname, '/pages/songs.html');
  res.sendFile(route, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent: songs.html');
    }
  })
});

app.get('/getSongs', (req, res) => {
  const data = fs.readFileSync('data.json')
  const song = JSON.parse(data);
  console.log('Sent: song data');
  res.send(JSON.stringify(song));
});

app.get('/getHighScore', (req, res) => {
  const highScores = fs.readFileSync('gameData.json')
  const scores = JSON.parse(highScores);
  console.log('Sent: High Scores');
  res.send(JSON.stringify(scores));
});


app.post('/sendData', (req, res) => {
  readFile(data => {
    const newUserId = Date.now().toString();
    data[newUserId] = req.body;
    writeFile(JSON.stringify(data, null, 2), () => {
      console.log(`New score added`);
      res.status(204).send();
    });
  }, true);
});


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

