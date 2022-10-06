const url = 'https://official-joke-api.appspot.com';
const route = '/jokes/programming/random';

const getFact = async () => {
    const endpoint = url + route;
    let jsonResponse;
    try {
        const response = await fetch(endpoint, {cache: 'no-cache'});
        if (response.ok) {
            jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    } catch(error) {
        console.log(error);
    }
    return jsonResponse;
}

const displayFact = async () => {
    const fact = await getFact();
    console.log(fact);
    document.getElementById('jokeContainer').innerHTML = fact[0].setup + ' ' + fact[0].punchline;
}

displayFact();

const urlTwo = 'http://127.0.0.1:3000';
const routeTwo = '/getSongs';

const getSongs = async () => {
  const endpoint = urlTwo + routeTwo;
  let jsonResponse;
  try {
    const response = await fetch(endpoint, {cache: 'no-cache'});
    if (response.ok) {
      jsonResponse = await response.json();
      console.log(jsonResponse);
    }
  } catch(error) {
    console.log(error);
  }
  return jsonResponse;
}

let songData;

const saveSongData = async () => {
  songData = await getSongs();
  console.log(songData);
};

saveSongData();

let score = 0;
let songChoice = songData[Math.floor(Math.random() * 5)];
const audioSound = document.getElementById("audioSound");
const answerPicture = document.getElementById("answerPicture");
const albumCover = document.getElementById("albumCover");
changeSong();

function changeSong() {
  audioSound.src = songChoice.song_path;
  audioSound.load();
  albumCover.src = songChoice.photo_path;
};

function guessingGame() {
  let input = document.getElementById("guessInputBox").value;
  input = input.toLowerCase();
  if (input) {
    if (input.toLowerCase() === songChoice.song_name.toLowerCase()) {
        alert('correct')
        score++;
        alert("that took " + score + " attempts");
        score = 0;
        changeSong();
    } else {
        alert('incorrect')
        score++;
    }
  }
};



