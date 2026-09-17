const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const songs = [
    {
        title: "Song 1",
        artist: "My Favorite Song",
        file: "songs/song1.mp3"
    },
    {
        title: "Song 2",
        artist: "My Favorite Song",
        file: "songs/song2.mp3"
    },
    {
        title: "Song 3",
        artist: "My Favorite Song",
        file: "songs/song3.mp3"
    },
    {
        title: "Song 4",
        artist: "My Favorite Song",
        file: "songs/song4.mp3"
    },
    {
        title: "Song 5",
        artist: "My Favorite Song",
        file: "songs/song5.mp3"
    },
    {
        title: "Song 6",
        artist: "My Favorite Song",
        file: "songs/song6.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;


// Load song
function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.file;

    progress.value = 0;

    document.querySelectorAll(".song").forEach(button => {
        button.classList.remove("active");
    });

    document
        .querySelector(`.song[data-index="${index}"]`)
        .classList.add("active");
}


// Play / Pause
function playSong() {

    if (!audio.src) {
        loadSong(currentSong);
    }

    audio.play();

    isPlaying = true;

    playButton.textContent = "⏸";
}


// Pause
function pauseSong() {

    audio.pause();

    isPlaying = false;

    playButton.textContent = "▶";
}


// Play button
playButton.addEventListener("click", () => {

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});


// Previous song
prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    playSong();

});


// Next song
nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();

});


// Playlist buttons
document.querySelectorAll(".song").forEach(button => {

    button.addEventListener("click", () => {

        currentSong = Number(button.dataset.index);

        loadSong(currentSong);

        playSong();

    });

});


// Update progress bar
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;
    }

    currentTime.textContent =
        formatTime(audio.currentTime);

});


// Load duration
audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// Click progress bar
progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }

});


// Volume
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// Automatically play next song
audio.addEventListener("ended", () => {

    nextButton.click();

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}


// Load first song
loadSong(currentSong);