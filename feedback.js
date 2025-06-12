document.addEventListener("DOMContentLoaded", function () {
    const feedbackList = document.getElementById("feedback-list");

    // Load feedback from localStorage
    function loadFeedback() {
        const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
        feedbackList.innerHTML = "<h2>Feedback Comments</h2>"; // Reset the feedback list header
        feedbackData.forEach(feedback => {
            const feedbackCard = document.createElement("div");
            feedbackCard.classList.add("feedback-card");
            feedbackCard.innerHTML = `
                <p><strong>Name:</strong> ${feedback.name}</p>
                <p><strong>Email:</strong> ${feedback.email}</p>
                <p><strong>Feedback:</strong> ${feedback.comment}</p>
                <hr>
            `;
            feedbackList.appendChild(feedbackCard);
        });
    }

    // Save feedback to localStorage
    function saveFeedback(feedback) {
        const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
        feedbackData.push(feedback);
        localStorage.setItem("feedback", JSON.stringify(feedbackData));
    }

    // Form submission handling
    const feedbackForm = document.getElementById("feedback-form");
    feedbackForm.addEventListener("submit", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const feedback = document.getElementById("feedback").value;

        // Save the feedback in localStorage
        const newFeedback = { name, email, comment: feedback };
        saveFeedback(newFeedback);

        // Let the form submit naturally and reload the feedback list on page load
    });

    // Load feedback on page load
    loadFeedback();
});
