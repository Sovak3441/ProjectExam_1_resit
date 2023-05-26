//const apiBaseUrl = 'http://localhost:1337';
const apiBaseUrl ='https://seahorse-app-7ei8d.ondigitalocean.app'
const apiEndpoint = '/api';
const apiUrl = apiBaseUrl + apiEndpoint;

const listAllRecipes = () => {
  const data = JSON.parse(localStorage.getItem("recipes"));

  const recipeElement = document.querySelector("#all_recipes_list");
  let returnElement = "";

  let i = 0;
  for (i; i < data.length; i++) {
    const currentRecipe = data[i].attributes;
    const RecipePhotoUrl = data[i].attributes.photo.data.attributes.url;

    returnElement += `
      <div class="all-recipe-card">
        <button type="button" data-id="${data[i].id}" title="Add/remove favorites" class="favorite-button"><i class="ri-star-line"></i></button>
        <img src="${RecipePhotoUrl}" alt="Logo Recipe ${currentRecipe.name}">
        <h2>${currentRecipe.name}</h2>
        <p>${currentRecipe.recipe}</p>
        <p class="recipe-category">Lunch</p>
        <p>Prep Time: ${currentRecipe.cooking_time} min.</p>
        <a href="#">View Recipe</a>
      </div>
    `;
  }
  recipeElement.innerHTML = returnElement;
}

const listMostViewed = () => {
  const data = JSON.parse(localStorage.getItem("recipes"));

  const recipeElement = document.querySelector("#most_viewed_list");
  let returnElement = "";

  let i = 0;
  for (i; i < 3; i++) {
    const currentRecipe = data[i].attributes;
    const RecipePhotoUrl = data[i].attributes.photo.data.attributes.url;

    returnElement += `
      <div class="recipe-card">
        <button type="button" data-id="${data[i].id}" title="Add/remove favorites" class="favorite-button"><i class="ri-star-line"></i></button>
        <img src="${RecipePhotoUrl}" alt="Logo Recipe ${currentRecipe.name}">
        <h2>${currentRecipe.name}</h2>
        <p>${currentRecipe.recipe}</p>
        <p class="recipe-category">Lunch</p>
        <p>Prep Time: ${currentRecipe.cooking_time} min.</p>
        <a href="#">View Recipe</a>
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
    const currentRecipe = res[i].attributes;
    const RecipePhotoUrl = res[i].attributes.photo.data.attributes.url;

    returnElement += `
      <div class="recipe-card">
      <button type="button" data-id="${res[i].id}" title="Add/remove favorites" class="favorite-button"><i class="ri-star-line"></i></button>
        <img src="${RecipePhotoUrl}" alt="Logo Recipe ${currentRecipe.name}">
        <h2>${currentRecipe.name}</h2>
        <p>${currentRecipe.description}</p>
        <p class="recipe-category">Lunch</p>
        <p>Prep Time: </p>
        <a class="recipe-view-btn" href="#">View Recipe</a>
      </div>
    `;
  }
  favoriteElement.innerHTML = returnElement;
}

const requestAll = async () => {
  const lastLoad = localStorage.getItem("recipeLastLoad");
  if(!lastLoad || Date.now() > (parseInt(lastLoad) + parseInt(600000))) {
    console.log("Loaded Recipes");
    try {
      const response = await fetch(apiUrl + '/recipes?populate=*');
      const jsonData = await response.json();
      localStorage.setItem("recipes", JSON.stringify(jsonData.data));
      localStorage.setItem("recipeLastLoad", Date.now());
    } catch (e) {
      console.log('Error: ', e);
    }
  }
}
requestAll();



