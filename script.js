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
    let currentTime = 0; // Store last played time

    function updateProgressBar() {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    }

    function changeSong(index, resume = false) {
        if (currentIndex !== -1) {
            songs[currentIndex].classList.replace("fa-circle-pause", "fa-circle-play");
        }
        currentIndex = index;

        const selectedSong = songs[currentIndex];
        audioPlayer.src = selectedSong.getAttribute("data-src");

        currentSongName.textContent = selectedSong.parentElement.previousElementSibling.textContent; // Update song name
        audioPlayer.currentTime = resume ? currentTime : 0; // Resume or start from 0
        audioPlayer.play();

        selectedSong.classList.replace("fa-circle-play", "fa-circle-pause");
        bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
    }

    playButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (currentIndex === index) {
                if (audioPlayer.paused) {
                    audioPlayer.currentTime = currentTime;
                    audioPlayer.play();
                } else {
                    currentTime = audioPlayer.currentTime;
                    audioPlayer.pause();
                }
            } else {
                changeSong(index);
            }
            button.classList.toggle("fa-circle-play");
            button.classList.toggle("fa-circle-pause");
            bottomPlayButton.classList.toggle("fa-circle-play");
            bottomPlayButton.classList.toggle("fa-circle-pause");
        });
    });

    bottomPlayButton.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.currentTime = currentTime;
            audioPlayer.play();
        } else {
            currentTime = audioPlayer.currentTime;
            audioPlayer.pause();
        }
        bottomPlayButton.classList.toggle("fa-circle-play");
        bottomPlayButton.classList.toggle("fa-circle-pause");
        if (currentIndex !== -1) {
            songs[currentIndex].classList.toggle("fa-circle-play");
            songs[currentIndex].classList.toggle("fa-circle-pause");
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            changeSong(currentIndex - 1);
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < songs.length - 1) {
            changeSong(currentIndex + 1);
        }
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
        if (currentIndex !== -1) {
            songs[currentIndex].classList.replace("fa-circle-pause", "fa-circle-play");
        }
        if (currentIndex < songs.length - 1) {
            changeSong(currentIndex + 1); // Auto-play next song
        } else {
            currentTime = 0;
        }
    });
});
