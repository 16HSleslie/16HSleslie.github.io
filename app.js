const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

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


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

