document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".fa-circle-play");
    const bottomPlayButton = document.getElementById("playPauseBtn");
    const prevButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");
    const audioPlayer = document.getElementById("audioPlayer");
    const progressBar = document.getElementById("myProgressBar");
    const volumeControl = document.getElementById("volumeControl");
    const currentSongName = document.getElementById("currentSongName");

    let songs = [...playButtons]; // Convert NodeList to Array
    let currentIndex = -1;

    function updateProgressBar() {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    }

    function changeSong(index) {
        if (currentIndex !== -1) {
            songs[currentIndex].classList.replace("fa-circle-pause", "fa-circle-play");
        }
        currentIndex = index;
        const selectedSong = songs[currentIndex];
        audioPlayer.src = selectedSong.getAttribute("data-src");
        currentSongName.textContent = selectedSong.parentElement.previousElementSibling.textContent; // Get song name
        audioPlayer.play();
        selectedSong.classList.replace("fa-circle-play", "fa-circle-pause");
        bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
    }

    playButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (currentIndex === index && !audioPlayer.paused) {
                audioPlayer.pause();
                button.classList.replace("fa-circle-pause", "fa-circle-play");
                bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
            } else {
                changeSong(index);
            }
        });
    });

    bottomPlayButton.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
            if (currentIndex !== -1) songs[currentIndex].classList.replace("fa-circle-play", "fa-circle-pause");
        } else {
            audioPlayer.pause();
            bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
            if (currentIndex !== -1) songs[currentIndex].classList.replace("fa-circle-pause", "fa-circle-play");
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) changeSong(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < songs.length - 1) changeSong(currentIndex + 1);
    });

    audioPlayer.addEventListener("timeupdate", updateProgressBar);

    progressBar.addEventListener("input", () => {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });

    volumeControl.addEventListener("input", () => {
        audioPlayer.volume = volumeControl.value;
    });

    audioPlayer.addEventListener("ended", () => {
        bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
        if (currentIndex !== -1) songs[currentIndex].classList.replace("fa-circle-pause", "fa-circle-play");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".fa-circle-play");
    const bottomPlayButton = document.querySelector(".bottom .fa-circle-play");
    const audioPlayer = document.getElementById("audioPlayer");
    let currentPlayingButton = null;
    let currentTime = 0; 

    playButtons.forEach(button => {
        button.addEventListener("click", () => {
            const songSrc = button.getAttribute("data-src");

            if (currentPlayingButton === button) {
                if (audioPlayer.paused) {
                    audioPlayer.currentTime = currentTime; 
                    audioPlayer.play();
                    button.classList.replace("fa-circle-play", "fa-circle-pause");
                    bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
                } else {
                    currentTime = audioPlayer.currentTime; 
                    audioPlayer.pause();
                    button.classList.replace("fa-circle-pause", "fa-circle-play");
                    bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
                }
            } else {
                if (currentPlayingButton) {
                    currentPlayingButton.classList.replace("fa-circle-pause", "fa-circle-play");
                }
                audioPlayer.src = songSrc;
                currentTime = 0; 
                audioPlayer.play();
                button.classList.replace("fa-circle-play", "fa-circle-pause");
                bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
                currentPlayingButton = button;
            }
        });
    });

    bottomPlayButton.addEventListener("click", () => {
        if (audioPlayer.paused && audioPlayer.src) {
            audioPlayer.currentTime = currentTime; 
            audioPlayer.play();
            bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
            if (currentPlayingButton) {
                currentPlayingButton.classList.replace("fa-circle-play", "fa-circle-pause");
            }
        } else {
            currentTime = audioPlayer.currentTime; 
            audioPlayer.pause();
            bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
            if (currentPlayingButton) {
                currentPlayingButton.classList.replace("fa-circle-pause", "fa-circle-play");
            }
        }
    });

    audioPlayer.addEventListener("ended", () => {
        if (currentPlayingButton) {
            currentPlayingButton.classList.replace("fa-circle-pause", "fa-circle-play");
        }
        bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
        currentPlayingButton = null;
        currentTime = 0;
});

});