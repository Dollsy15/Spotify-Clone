document.getElementById("darkModeToggle").addEventListener("click", function(event) {
    event.preventDefault(); 
    document.body.classList.toggle("dark-mode");

    localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

window.onload = function() {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
