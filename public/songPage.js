import { displayFact, getSongData } from "./api.js";

displayFact();

//Song page stuff

// Create a temporary <div> to load into
var div = document.createElement('div');
div.setAttribute('class', 'someClass');
div.innerHTML = document.getElementById('blockOfStuff').innerHTML;

const inputSongData = async () => {
	const songData = await getSongData();
    document.getElementById('songBox').innerHTML += `
    <div class="song-album-image">
        <img src="/pictures/b-sides.jpg" style="width: 350px; height: auto; border-radius: 10px;">
    </div>
    <div class="song-data" id="songData">
        <b>Song Name:</b> songData[0].song_name)<br>
        <b>Album:</b> songData[0].album<br>
        <b>Release:</b> songData[0].release
    </div>
    `
}

inputSongData();

var div = document.createElement('div');
div.setAttribute('class', 'song-info-box');
div.innerHTML = document.getElementById('blockOfStuff').innerHTML;

// Write the <div> to the HTML container
document.getElementById('songBox').innerHTML += `
<div class="song-album-image">
    <img src="/pictures/b-sides.jpg" style="width: 350px; height: auto; border-radius: 10px;">
</div>
<div class="song-data" id="songData">
    <b>Song Name:</b> {SONG}<br>
    <b>Album:</b> {ALBUM}<br>
    <b>Release:</b> {RELEASE}
</div>
`