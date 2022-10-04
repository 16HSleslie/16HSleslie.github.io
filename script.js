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

class Song {
  constructor(name, songLink, albumCover) {
    this._name = name;
    this._songLink = songLink;
    this._albumCover = albumCover;
  }

  get songName() {
    return this._name;
  }

  get songLink() {
    return this._songLink;
  }

  get albumCover() {
    return this._albumCover;
  }
};

const alcoholic = new Song('alcoholic', '/songs/homebrewski-alcoholic.mp3', '/pictures/home-brew.jpg');
const blowingSmoke = new Song('blowing smoke', '/songs/homeBrewski-blowingSmoke.mp3', '/pictures/b-sides.jpg');
const listenToUs = new Song('listen to us', '/songs/homebrewski-listenToUs.mp3', '/pictures/home-brew.jpg');
const stateOfMind = new Song('state of mind', '/songs/homebrewski-stateOfMind.mp3', '/pictures/home-brew.jpg');
const sunday = new Song('sunday', '/songs/homebrewski-sunday.mp3', '/pictures/last-week.jpg');
const songs = [alcoholic, blowingSmoke, listenToUs, stateOfMind, sunday];

let score = 0;
var songChoice = Math.ceil(Math.random() * 5);
const audioSound = document.getElementById("audioSound");
const answerPicture = document.getElementById("answerPicture");
const albumCover = document.getElementById("albumCover");
audioSound.src = songs[songChoice].songLink;
audioSound.load();
albumCover.src = songs[songChoice].albumCover;

function changeSong() {
  songChoice = Math.ceil(Math.random() * 5);
  audioSound.src = songs[songChoice].songLink;
  audioSound.load();
  albumCover.src = songs[songChoice].albumCover;
};

function removeVisibility() {
  answerPicture.src = "hidden";
};

function guessingGame() {
  let input = document.getElementById("guessInputBox").value;
  input = input.toLowerCase();
  if (input) {
    if (input === songs[songChoice].songName) {
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



