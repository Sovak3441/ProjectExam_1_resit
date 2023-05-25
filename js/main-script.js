//const apiBaseUrl = 'http://localhost:1337/api';
const apiBaseUrl ='https://seahorse-app-7ei8d.ondigitalocean.app'
const apiEndpoint = '/api';
const apiUrl = apiBaseUrl + apiEndpoint;

const listMostViewed = (res) => {
  const recipeElement = document.querySelector("#most_viewed_list");
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
  try {
    const response = await fetch(apiUrl + '/recipes?populate=photo');
    const jsonData = await response.json();
    listMostViewed(jsonData.data);
  } catch (e) {
    console.log('Error: ', e);
  }
}


requestAll();
