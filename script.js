document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".fa-circle-play");
    const audioPlayer = document.getElementById("audioPlayer");

    playButtons.forEach(button => {
        button.addEventListener("click", () => {
            const songSrc = button.getAttribute("data-src");

            if (audioPlayer.src !== songSrc) {
                // Stop current song and remove playing class from all buttons
                playButtons.forEach(btn => btn.classList.remove("playing"));

                // Set new song and play
                audioPlayer.src = songSrc;
                audioPlayer.play();
                button.classList.add("playing"); // Apply CSS effect
            } else {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    button.classList.add("playing");
                } else {
                    audioPlayer.pause();
                    button.classList.remove("playing");
                }
            }
        });
    });
});
