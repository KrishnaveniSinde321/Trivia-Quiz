function start() {

    document.getElementById("playArea").addEventListener('click', function (event) {
        // Check if the clicked element is an image
        if (event.target.tagName === 'IMG') {
            // Get the game's name from the image's alt attribute or id
            const gameName = event.target.alt || event.target.id;
            let response = confirm(`Wanna play ${gameName}?`);
            if (response) {

                // Redirect to quiz.html with the selected game category as a query parameter
                window.location.href = `quiz.html?category=${gameName}`;
                // window.location.href = "quiz.html"
            }
            //window.location.href="./category.html"
        } else {
            // Actions to perform if the click is outside the images
            confirm('Wanna start Quiz..?') ? window.location.href = "./category.html" : "";
        }
    });


}
window.addEventListener("load", start, false);