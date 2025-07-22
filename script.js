// Function to fetch recipe
function searchRecipe() {
    let loading = document.getElementById("loading");
    let container = document.getElementById("recipeContainer");
    let query = document.getElementById("searchInput").value.trim();
    if (!query) {
        alert("Please enter a dish name!");
        return;
    }

    loading.classList.remove("hidden");
    container.classList.add("hidden");

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            loading.classList.add("hidden");
            let container = document.getElementById("recipeContainer");
            container.innerHTML = ""; // Purana data clear karna

            if (data.meals) {
                data.meals.forEach(meal => {
                    let recipeDiv = document.createElement("div");
                    recipeDiv.classList.add("p-4", "bg-white", "rounded", "shadow", "mt-4");

                    recipeDiv.innerHTML = `
                       <div class="flex justify-between items-center w-full">
    <h2 class="text-xl font-semibold text-gray-900">${meal.strMeal}</h2>
    <span class="text-sm text-gray-400"> ${meal.strArea}</span>
</div>

                        <img src="${meal.strMealThumb}" class="w-full mt-2 rounded" alt="Recipe Image">
                        <p class="mt-2 text-gray-700">${meal.strInstructions.slice()}</p>

<div class=" ">
  <a href="${meal.strYoutube}" target="_blank" class="block mt-2 text-red-600">
                            <i class="fab fa-youtube text-2xl font-bold">
                            </i><span class="text-2xl font-bold"> Watch on YouTube</span>
                        </a></div>
                    `;

                    container.appendChild(recipeDiv);
                    console.log(recipeDiv);
                });

                container.classList.remove("hidden");
            } else {
                alert("⚠ No recipes found! Try another dish.");
            }
        })
        .catch(error => console.error("❌ Error fetching recipe:", error));
}

// ✅ Add event listener for Enter key
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchRecipe();
    }
});
