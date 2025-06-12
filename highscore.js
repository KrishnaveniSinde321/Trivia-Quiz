
$(document).ready(function () {
    // Retrieve leaderboard data from localStorage or initialize as an empty array if not available
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Function to display the leaderboard in a table
    function displayLeaderboard(data) {
        const tableBody = $("#leaderboard tbody");
        tableBody.empty(); // Clear any existing rows in the table body

        if (data.length === 0) {
            // Show a message if no scores are available
            tableBody.append(`<tr><td colspan="3">No scores available yet.</td></tr>`);
            return;
        }

        // Populate the leaderboard with data
        data.forEach((entry, index) => {
            tableBody.append(`
                <tr>
                    <td>${index + 1}</td> <!-- Rank -->
                    <td>${entry.name}</td> <!-- Player name -->
                    <td>${entry.category}</td> <!-- Quiz category -->
                    <td>${entry.score}</td> <!-- Player score -->
                </tr>
            `);
        });
    }

    // Display the leaderboard on page load
    displayLeaderboard(leaderboard);

    // Redirect to the category selection page when the Start Quiz button is clicked
    $('#start-quiz').click(function () {
        window.location.href = "category.html";
    });
});
