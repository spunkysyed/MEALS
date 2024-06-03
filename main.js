// Variable to store data of the foavourite meals in the form of an array, getting the data from the localStorage
let fav = JSON.parse(localStorage.getItem("favourites")) || [];


// Function to display the meals when there is a change in the search Bar , by making an API call
async function showMealsList() {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const mealName = document.getElementById("search-input").value;

  // This ensure the previous element in the meals container gets deleted
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";

  // If there is nothing in the searchBar then this will run and show
  if (mealName == "") {
    const card = document.createElement("div");
    const text = document.createElement("h6");
    text.className = "text-center";
    text.textContent =
      "Well, well, well... Looks like that dish is taking a siesta. Maybe it's dreaming up some flavor-packed adventures. While it's off on its tasty escapade, why not indulge in something else from our menu?";
    card.appendChild(text);
    mealsContainer.appendChild(card);
  } else {
    const response = await fetch(`${url}${mealName}`);
    const data = await response.json();
    if (data.meals) {
      data.meals.forEach((meal) => {
        const card = document.createElement("div");
        card.className = "card mb-2 p-2 border-0 bg-warning";
        card.style.width = "18rem";

        // Create card image element
        const cardImg = document.createElement("img");
        cardImg.className = "card-img-top rounded-2";
        cardImg.src = meal.strMealThumb;
        cardImg.alt = `${meal.strMeal} image`;

        // Create card body element
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Create card title element
        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = `${meal.strMeal}`;

        // Create card text element
        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = `${meal.strCategory}`;

        // Create card button element
        const cardBodyButtons = document.createElement("div");
        cardBodyButtons.className = "d-flex justify-content-between";
        const cardButton = document.createElement("button");
        cardButton.className = "btn btn-light text-warning";
        cardButton.onclick = () => window.location.href = `MealDetailPage.html?id=${meal.idMeal}`;
        // cardButton.onclick = () => showMoreDetails(meal.idMeal);
        cardButton.textContent = "More Details";

        const favButton = document.createElement("button");
        favButton.id = "fav-button";
        favButton.className = "btn btn-light text-warning";
        favButton.onclick = () =>
          favouriteAddRemove(meal.idMeal, meal.strMeal, meal.strMealThumb);

        favButton.innerHTML = '<i class="fa fa-thumbs-up"></i>';

        cardBodyButtons.appendChild(cardButton);
        cardBodyButtons.appendChild(favButton);

        // Append elements to card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardBodyButtons);

        // Append image and body to card
        card.appendChild(cardImg);
        card.appendChild(cardBody);

        // Append card to the card container in the DOM
        document.getElementById("meals-container").appendChild(card);
      });
    }
  }
}
// Function to add and remove the dish from the favourite list

function favouriteAddRemove(dishId, dishName, dishImage) {
  const found = fav.find((dish) => dish.id === dishId);
  if (!found) {
    fav.push({
      id: dishId,
      name: dishName,
      imageUrl: dishImage,
    });
    alert(`Added ${dishName} to favorites`)
  } else {
    fav = fav.filter((dish) => dish.id !== dishId);
    alert(`Removed ${dishName} from favorites`)
  }
//   Storing the data in the browsers LocalStorange to make it persistent, which means the data wont get lost every time we close or refresh the browser
  localStorage.setItem("favourites", JSON.stringify(fav));
  updateFavourites();
}


// Updating The Favourites List
function updateFavourites() {
  const favouriteItems = document.getElementById("favourite-items");
  favouriteItems.innerHTML = "";
  fav.forEach((dish) => {
    const favItem = document.createElement("div");
    favItem.className = "favourite-item   mb-4 bg-warning rounded-4 p-2";

    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = dish.imageUrl;
    img.alt = `${dish.name} image`;
    img.className = "img-thumbnail bg-warning border-0 rounded-4";
    imgContainer.appendChild(img);

    const titleContainer = document.createElement("div");
    const title = document.createElement("h5");
    title.className="text-center my-2"
    title.textContent = dish.name;
    titleContainer.appendChild(title);

    const buttonContainer = document.createElement("div");
    const detailsButton = document.createElement("button");
    detailsButton.className = "btn btn-light text-warning mx-1";
    detailsButton.textContent = "More Details";
    detailsButton.onclick = () => window.location.href = `MealDetailPage.html?id=${dish.id}`;

    const removeButton = document.createElement("button");
    removeButton.className = " btn btn-danger";
    removeButton.innerHTML = '<i class="fa fa-thumbs-down"></i> Remove';
    removeButton.onclick = () =>
      favouriteAddRemove(dish.id, dish.name, dish.imageUrl);

    buttonContainer.appendChild(detailsButton);
    buttonContainer.appendChild(removeButton);

    favItem.appendChild(imgContainer);
    favItem.appendChild(titleContainer);
    favItem.appendChild(buttonContainer);
    favouriteItems.appendChild(favItem);
  });
}

// To close the Favourite List

function closeFavourite() {
  document.getElementById("favourite-container").style.display = "none";
}
// To Open the favourite List
function openFavourite() {
  document.getElementById("favourite-container").style.display = "block";
}

// All Event Listener
document.getElementById("search-input").addEventListener("input", showMealsList);
document.getElementById("close").addEventListener("click", closeFavourite);
document.getElementById("favourites").addEventListener("click", openFavourite);

document.addEventListener("DOMContentLoaded", () => {
  showMealsList();
  updateFavourites();
});
