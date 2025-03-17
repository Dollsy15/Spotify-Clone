document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".fa-circle-play");
    const bottomPlayButton = document.querySelector(".bottom .fa-circle-play");
    const audioPlayer = document.getElementById("audioPlayer");
    let currentPlayingButton = null;
    let currentTime = 0; // Variable to store playback position

    playButtons.forEach(button => {
        button.addEventListener("click", () => {
            const songSrc = button.getAttribute("data-src");

            if (currentPlayingButton === button) {
                // If the same button is clicked, toggle play/pause
                if (audioPlayer.paused) {
                    audioPlayer.currentTime = currentTime; // Resume from last position
                    audioPlayer.play();
                    button.classList.replace("fa-circle-play", "fa-circle-pause");
                    bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
                } else {
                    currentTime = audioPlayer.currentTime; // Save playback position
                    audioPlayer.pause();
                    button.classList.replace("fa-circle-pause", "fa-circle-play");
                    bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
                }
            } else {
                // If a different button is clicked, stop previous song and play the new one from start
                if (currentPlayingButton) {
                    currentPlayingButton.classList.replace("fa-circle-pause", "fa-circle-play");
                }
                audioPlayer.src = songSrc;
                currentTime = 0; // Reset time for new song
                audioPlayer.play();
                button.classList.replace("fa-circle-play", "fa-circle-pause");
                bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
                currentPlayingButton = button;
            }
        });
    });

    bottomPlayButton.addEventListener("click", () => {
        if (audioPlayer.paused && audioPlayer.src) {
            audioPlayer.currentTime = currentTime; // Resume from last position
            audioPlayer.play();
            bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
            if (currentPlayingButton) {
                currentPlayingButton.classList.replace("fa-circle-play", "fa-circle-pause");
            }
        } else {
            currentTime = audioPlayer.currentTime; // Save playback position
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
        currentTime = 0; // Reset time when song ends
    });
});
