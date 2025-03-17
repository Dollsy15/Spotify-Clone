document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".fa-circle-play");
    const bottomPlayButton = document.querySelector(".bottom .fa-circle-play");
    const audioPlayer = document.getElementById("audioPlayer");
    let currentPlayingButton = null;

    playButtons.forEach(button => {
        button.addEventListener("click", () => {
            const songSrc = button.getAttribute("data-src");

            if (currentPlayingButton === button) {
                // If the same button is clicked, toggle play/pause
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    button.classList.replace("fa-circle-play", "fa-circle-pause");
                    bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
                } else {
                    audioPlayer.pause();
                    button.classList.replace("fa-circle-pause", "fa-circle-play");
                    bottomPlayButton.classList.replace("fa-circle-pause", "fa-circle-play");
                }
            } else {
                // If a different button is clicked, stop the previous song and play a new one
                if (currentPlayingButton) {
                    currentPlayingButton.classList.replace("fa-circle-pause", "fa-circle-play");
                }
                audioPlayer.src = songSrc;
                audioPlayer.play();
                button.classList.replace("fa-circle-play", "fa-circle-pause");
                bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
                currentPlayingButton = button;
            }
        });
    });

    bottomPlayButton.addEventListener("click", () => {
        if (audioPlayer.paused && audioPlayer.src) {
            audioPlayer.play();
            bottomPlayButton.classList.replace("fa-circle-play", "fa-circle-pause");
            if (currentPlayingButton) {
                currentPlayingButton.classList.replace("fa-circle-play", "fa-circle-pause");
            }
        } else {
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
    });
});
