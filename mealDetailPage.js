document.addEventListener('DOMContentLoaded', () => {

    // fetching the id from the url 
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get("id");

    // Function to fetch meal details
    async function fetchMealDetails(mealId) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.meals[0]; // Assuming there's only one meal with this ID
    }

    // Function to display meal details
    async function displayMealDetails() {
        const mealDetailContainer = document.getElementById("foodDetail-container");
        const meal = await fetchMealDetails(mealId);

        const mealDetail=document.createElement('div');
        mealDetail.id='foodItem'
        mealDetail.className='w-100 rounded-4'

        const mealDetailLeft=document.createElement('div')
        mealDetailLeft.className='w-50'

        const mealImage = document.createElement("img");
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealImage.className='w-100 rounded-4'
    
        
        const mealDetailRight=document.createElement('div');
        mealDetailRight.className='w-50 px-4 d-flex flex-column '


        // Create elements for meal details
        const mealTitle = document.createElement("h2");
        mealTitle.className='text-warning'
        mealTitle.textContent = meal.strMeal;

        
        const categoryParagraph = document.createElement("p");
        categoryParagraph.className='text-secondary'
        categoryParagraph.textContent = `Category: ${meal.strCategory}`;

        const areaParagraph = document.createElement("p");
        areaParagraph.className='text-secondary'
        areaParagraph.textContent = `Area: ${meal.strArea}`;

        const instructionsParagraph = document.createElement("p");
        instructionsParagraph.className='mt-5'
        instructionsParagraph.textContent = `Instructions: ${meal.strInstructions}`;

        const videoLinkElement = document.createElement("a");
        videoLinkElement.className='mt-5'
        videoLinkElement.href = meal.strYoutube;

        const watchButton = document.createElement("button");
        watchButton.className = "btn btn-warning";
        watchButton.textContent = "Tutorial";

        videoLinkElement.appendChild(watchButton);

        mealDetailLeft.appendChild(mealImage)

        // Append elements to meal detail container
        mealDetailRight.appendChild(mealTitle)
        mealDetailRight.appendChild(categoryParagraph)
        mealDetailRight.appendChild(areaParagraph)
        mealDetailRight.appendChild(instructionsParagraph)
        mealDetailRight.appendChild(videoLinkElement)
        mealDetail.appendChild(mealDetailLeft)
        mealDetail.appendChild(mealDetailRight)
        mealDetailContainer.appendChild(mealDetail);
    
    }

    // Call the function to display meal details when the DOM is fully loaded
    displayMealDetails();
});