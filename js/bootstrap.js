//import {authenticate, isLoggedin} from "./authHandler";

//const apiBaseUrl = 'http://localhost:1337/api';
const apiBaseUrl ='https://seahorse-app-7ei8d.ondigitalocean.app/api'

const listMostViewed = (res) => {
  const recipeElement = document.querySelector("#most_viewed_list");
  let returnElement = "";

  let i = 0;
  for (i; i < 3; i++) {
    const currentRecipe = res[i];
    returnElement += `
      <div class="recipe-card">
        <img src="http://localhost:1337${currentRecipe.attributes.cover_photo.data.attributes.url}" alt="Logo Recipe ${currentRecipe.attributes.name}">
        <h2>${currentRecipe.attributes.name}</h2>
        <p>${currentRecipe.attributes.recipe}</p>
        <p class="recipe-category">Lunch</p>
        <p>Prep Time: </p>
        <a href="#">View Recipe</a>
        <a href="#">Add Favorite</a>
      </div>
    `;
  }
  recipeElement.innerHTML = returnElement;
}

const listFavorites = (res) => {
  const favoriteElement = document.querySelector("#favorites_list");
  let returnElement = "";

  let i = 0;
  for (i; i < 3; i++) {
    const currentRecipe = res[i];
    console.log(currentRecipe);
    returnElement += `
      <div class="recipe-card">
        <img src="http://localhost:1337${currentRecipe.attributes.cover_photo.data.attributes.url}" alt="Logo Recipe ${currentRecipe.attributes.name}">
        <h2>${currentRecipe.attributes.name}</h2>
        <p>${currentRecipe.attributes.description}</p>
        <p class="recipe-category">Lunch</p>
        <p>Prep Time: </p>
        <a href="#">View Recipe</a>
        <a href="#">Remove Favorite</a>
      </div>
    `;
  }
  favoriteElement.innerHTML = returnElement;
}

const requestAll = async () => {
  try {
    const response = await fetch(apiBaseUrl + '/recipes?populate=cover_photo');
    const jsonData = await response.json();
    listMostViewed(jsonData.data);
    //listFavorites(jsonData.data);
  } catch (e) {
    console.log('Error: ', e);
  }

}

requestAll();
