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

export { displayFact, getSongData, getHighScores };