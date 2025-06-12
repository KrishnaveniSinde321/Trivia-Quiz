$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("category");
    let timeLeft = 120; // Timer  in seconds (2 minutes)
    const timerElement = $("#timer");

    if (!selectedCategory) {
        if (confirm("No category selected. please select category.")) {
            window.location.href = "category.html";
            return;
        } else {
            window.location.href = "index.html";
            return;
        }
    }

    let correctAnswers = {};
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Function to jumble the questions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            
        }
    }

    // Get player's name and check if it already exists
    function getUniquePlayerName() {
        let username;
        do {
            username = prompt("Enter your name for the leaderboard (try unique):");
            if (!username) {
                alert("Name cannot be empty");
                window.location.href = "index.html";
                return;
            }
            const nameExists = leaderboard.some(entry => entry.name === username);
            if (nameExists) {
                alert("This name already exists on the leaderboard. Please pick another name.");
                username = null;
            }
        } while (!username);
        return username;
    }

    const username = getUniquePlayerName();

    // Load questions for the selected category
    function loadQuestions(category) {
        $("#quiz-container").empty();
        correctAnswers = {};

        // get questions from XML
        $.ajax({
            type: "GET",
            url: "category.xml",
            dataType: "xml",
            success: function (xml) {
                const categoryData = $(xml).find(`category[name="${category}"]`);

                if (!categoryData.length) {
                    alert("No questions available for the selected category.");
                    window.location.href = "category.html";
                    return;
                }

                $("#quiz-container").append(`<h2>${category}</h2>`);

                let questions = [];
                categoryData.find("question").each(function () {
                    const questionText = $(this).find("text").text();
                    let optionsHTML = "";

                    $(this).find("options option").each(function () {
                        const optionValue = $(this).text();
                        optionsHTML += `<label>
                                            <input type="radio" name="${questionText}" value="${optionValue}">
                                            ${optionValue}
                                        </label><br>`;
                    });

                    questions.push(`
                        <div class="question">
                            <p>${questionText}</p>
                            ${optionsHTML}
                        </div>
                    `);
                });

                // Shuffle the questions before displaying
                shuffleArray(questions);

                questions.forEach(questionHTML => {
                    $("#quiz-container").append(questionHTML);
                });

                $("#submit-quiz").show();
                startTimer(); // Start the timer after questions are loaded
            },
            error: function () {
                alert("Failed to load questions. Please try again later.");
            }
        });

        // get the correct answers from JSON
        $.get("ans.json", function (json) {
            if (json[category]) {
                json[category].forEach((item) => {
                    correctAnswers[item.question] = item.answer;
                });
            }
        }).fail(function () {
            alert("Failed to load answers. Please try again later.");
        });
    }

    // Timer function
    function startTimer() {
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Time's up! Your quiz will now be submitted.");
                $("#submit-quiz").trigger("click"); // Auto-submit the quiz
            } else {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerElement.text(`Time left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
            }
        }, 1000);
    }

    // Handle quiz submission
    $("#submit-quiz").click(function () {
        let score = 0;

        // Calculate the score
        $(".question").each(function () {
            const questionText = $(this).find("p").text();
            const selectedAnswer = $(this).find('input[type="radio"]:checked').val();

            if (selectedAnswer && selectedAnswer === correctAnswers[questionText]) {
                score++;
            }
        });

        // Add new entry to the leaderboard
        leaderboard.push({ name: username, category: selectedCategory, score: score });

        // Sort the leaderboard by score
        leaderboard.sort((a, b) => b.score - a.score);

        // Keep only the top 5
        leaderboard = leaderboard.slice(0, 5);

        // Save the updated leaderboard to localStorage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
     alert("You scored : " + score)
        // Redirect to the leaderboard page
        //window.location.href = "results.html";
        window.location.href = `results.html?score=${score}`;
    });

    // Load questions and display the leaderboard
    loadQuestions(selectedCategory);
});
