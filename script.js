document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '5cf126339bec4f118e28113911f2505c';
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=`;

    document.getElementById("search-btn").addEventListener("click", function() {
        const query = document.getElementById("search-input").value;
        if (query) {
            fetchRecipes(query);
        }
    });

    async function fetchRecipes(query) {
        const response = await fetch(`${apiUrl}${query}`);
        const data = await response.json();
        displayRecipes(data.results);
    }

    function displayRecipes(recipes) {
        const recipeResults = document.getElementById("recipe-results");
        recipeResults.innerHTML = '';

        if (recipes.length === 0) {
            recipeResults.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">See Recipe</a>
            `;
            recipeResults.appendChild(recipeCard);
        });
    }
});