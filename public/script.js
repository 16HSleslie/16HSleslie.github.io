const url = 'https://official-joke-api.appspot.com';
const route = '/jokes/programming/random';

const getFact = async () => {
    const endpoint = url + route;
    let jsonResponse;
    try {
        const response = await fetch(endpoint, {cache: 'no-cache'});
        if (response.ok) {
            jsonResponse = await response.json();
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
	return songData;
}

const routeThree = '/getHighScore';

const highScoreRequest = async () => {
	const endpoint = urlTwo + routeThree;
	let jsonResponse
	try {
		const response = await fetch(endpoint, {cache: 'no-cache'})
		if (response.ok) {
			jsonResponse = await response.json();
			console.log(jsonResponse);
			}
	} catch(error) {
		console.log(error);
	}
	return jsonResponse;
}

const getHighScores = async () => {
	let highScores = await highScoreRequest();
	return highScores
}

displayFact();

getHighScores();


let score = 0;
let questionCount = 0;
const audioSound = document.getElementById("audioSound");
const answerPicture = document.getElementById("answerPicture");
const albumCover = document.getElementById("albumCover");
const submitButton = document.getElementById("guessSubmitButton");
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("gameContainer");
const timer = document.getElementById("timer")
const submitScore = document.getElementById("submitScore");
const timeInput = document.getElementById("timeInput");
const highScore = document.getElementById("highScore");
const highScoreScreen = document.getElementById("highScoreContainer");
const name = document.getElementById('name');


//A async function to run when the page loads to get the first song and album cover to display.
const onPageLoad = async () => {
  	let songResults = await getSongData();
  	let randomSong = songResults[Math.floor(Math.random() * songResults.length)];
	audioSound.src = randomSong.song_path;
	audioSound.load();
	albumCover.src = randomSong.photo_path;
	//An event listener for the submit button to run the guessing game function.
	const abortCont = new AbortController(); // Create the AbortController
	submitButton.addEventListener("click", () => {
		guessingGame(randomSong.song_name, abortCont);
	}, { signal: abortCont.signal }); // Pass the AbortController in
};

//async function for when the button is clicked to check the answer in the input box to the json data.
const guessingGame = async (songName, abortCont) => {
  //get the value of the input box
  let input = document.getElementById("guessInputBox").value;
  //check if the value of the input box matches the song path in the json data
  if (input) {
    if (input.toLowerCase() === songName.toLowerCase()) {
        alert('correct');
        score++;
        alert("that took " + score + " attempts");
        score = 0;
        abortCont.abort(); // Remove the event listener
        onPageLoad();
    } else {
        alert('incorrect');
        alert(songName);
        score++;
    }
	questionCount++;
  }
}

const showHighScore = async () => {
	startButton.style.visibility = "hidden";
	highScore.style.visibility = "hidden";
	highScoreScreen.style.visibility = "visible";

}	

function startGame() {
	startButton.style.visibility = "hidden";
	highScore.style.visibility = "hidden";
	gameContainer.style.visibility = "visible";
	var timerVar = setInterval(countTimer, 1000);
	var totalSeconds = 0;
	function countTimer() {
		++totalSeconds;
		var hour = Math.floor(totalSeconds /3600);
		var minute = Math.floor((totalSeconds - hour*3600)/60);
		var seconds = totalSeconds - (hour*3600 + minute*60);
		if(minute < 10)
			minute = "0" + minute;
		if(seconds < 10)
			seconds = "0" + seconds;
		timer.innerHTML = minute + ":" + seconds;
		if (questionCount === 1) {
			clearInterval(timerVar);
			gameContainer.style.visibility = "hidden";
			submitScore.style.visibility = "visible";
			timeInput.value = minute + ":" + seconds;
		}
	}
}

function closeHighScore() {
	highScoreScreen.style.visibility = "hidden";
	startButton.style.visibility = "visible";
	highScore.style.visibility = "visible";
}

function returnHome() {
	submitScore.style.visibility = "hidden";
	startButton.style.visibility = "visible";
}

