$(document).ready(function () {
    // Load categories dynamically from XML
    $.ajax({
        type: "GET",
        url: "category.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('category').each(function () {
                const categoryName = $(this).attr('name');

                // Manually format category name by adding spaces before uppercase letters
                let formattedCategory = '';
                for (let i = 0; i < categoryName.length; i++) {
                    const char = categoryName.charAt(i);
                    if (char === char.toUpperCase() && i > 0) {
                        formattedCategory += ' '; // Add a space before uppercase letters
                    }
                    formattedCategory += char;
                }

                // Append formatted category name to dropdown
                $('#category-select').append(
                    `<option value="${categoryName}">${formattedCategory}</option>`
                );
            });
        },
        error: function () {
            alert('Failed to load categories. Please try again.');
        }
    });

    // Handle Start Quiz button click
    $('#start-quiz').click(function () {
        const selectedCategory = $('#category-select').val(); // Gets the selected category

        if (!selectedCategory) {
            confirm('Please select a category to start the quiz.');
            return;
        }

        // Redirect to quiz.html with the selected category as a query parameter
        window.location.href = `quiz.html?category=${selectedCategory}`;
    });
});
