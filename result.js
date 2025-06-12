$(document).ready(function () {
    // Fetch query parameters using URLSearchParams
    const urlParams = new URLSearchParams(window.location.search);

    const score = urlParams.get("score");

    // Update the result page dynamically
    if (score) {
        $("#final-score").text(score);
    } else {
        $("#final-score").text("0");
    }

    $('#home1').click(function (){
        window.location.href="highscore.html";
    });
    $('#start-quiz').click(function (){
        window.location.href="category.html";
    });
});
