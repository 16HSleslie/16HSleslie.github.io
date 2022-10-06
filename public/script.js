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


//function to fetch the json from api
const apiRequest = async () => {
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

//function to store the json data in a variable and return it

const getSongData = async () => {
  let songData = await apiRequest();
  console.log(songData);
  return songData;
};


let score = 0;
const audioSound = document.getElementById("audioSound");
const answerPicture = document.getElementById("answerPicture");
const albumCover = document.getElementById("albumCover");
const submitButton = document.getElementById("guessSubmitButton");

//A async function to run when the page loads to get the first song and album cover to display.
const onPageLoad = async () => {
  let songResults = await getSongData();
  let randomSong = songResults[Math.floor(Math.random() * songResults.length)];
  audioSound.src = randomSong.song_path;
  audioSound.load();
  albumCover.src = randomSong.photo_path;
  //An event listener for the submit button to run the guessing game function.
  submitButton.addEventListener("click", function () {
    guessingGame(randomSong.song_name);
});
};

//async function for when the button is clicked to check the answer in the input box to the json data.
const guessingGame = async (songPath) => {
  //get the value of the input box
  let input = document.getElementById("guessInputBox").value;
  //check if the value of the input box matches the song path in the json data
  if (input) {
    if (input.toLowerCase() === songPath.toLowerCase()) {
        alert('correct')
        score++;
        alert("that took " + score + " attempts");
        score = 0;
        changeSong();
    } else {
        alert('incorrect')
        alert(songPath);
        score++;
    };
  };
};

//need to  change this to an async function once figured out how to store data.
const changeSong = async () => {
  let songResults = await getSongData();
  let randomSong = songResults[Math.floor(Math.random() * songResults.length)];
  audioSound.src = randomSong.song_path;
  audioSound.load();
  albumCover.src = randomSong.photo_path;
  submitButoon.addEventListener("click", () => {
    guessingGame(randomSong.song_name);
  });
};

