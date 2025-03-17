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