//const apiBaseUrl = 'http://localhost:1337';
const apiBaseUrl = 'https://seahorse-app-7ei8d.ondigitalocean.app'
const apiEndpoint = '/api';
const apiUrl = apiBaseUrl + apiEndpoint;

const listAllRecipes = () => {
  const data = JSON.parse(localStorage.getItem("gfm_recipes"));

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
        <a href="recipe.html?recipe=${data[i].id}">View Recipe</a>
      </div>
    `;
  }
  recipeElement.innerHTML = returnElement;
}

const listMostViewed = () => {
  const data = JSON.parse(localStorage.getItem("gfm_recipes"));

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
        <a href="recipe.html?recipe=${data[i].id}">View Recipe</a>
      </div>
    `;
  }
  recipeElement.innerHTML = returnElement;
}

const listFavorites = () => {
  const data = JSON.parse(localStorage.getItem("gfm_recipes"));
  const favoriteElement = document.querySelector("#favorites_list");
  let returnElement = "";
  let i = 0;
  for (i; i < 3; i++) {
    const currentRecipe = data[i].attributes;
    const RecipePhotoUrl = data[i].attributes.photo.data.attributes.url;

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

const listDetails = () => {
  const detailsElement = document.querySelector("#recipe-details");
  const recipeId = new URLSearchParams(window.location.search).get('recipe');
  const data = JSON.parse(localStorage.getItem("gfm_recipes"));

  let returnElement = "";
  let searchResult;
  const reqRecipe = data.find((recipe) => parseInt(recipe.id) === parseInt(recipeId));

  const currentRecipe = reqRecipe.attributes;
  const RecipePhotoUrl = reqRecipe.attributes.photo.data.attributes.url;

  returnElement += `
      <div class="details-first">
      <div class="details-photo">
        <img src="${RecipePhotoUrl}" alt="details photo for ${currentRecipe.name}">
      </div>
      <div  class="details-desc">
        <h2>${currentRecipe.name}</h2>
        <p>${currentRecipe.description}</p>
      </div>
    </div>
    <div  class="details-steps details-second">
      <h2>Steps to follow</h2>
      <p>
        ${currentRecipe.recipe}
      </p>
    </div>
    `;
  detailsElement.innerHTML = returnElement;
}

const requestAll = async () => {
  const lastLoad = localStorage.getItem("gfm_recipesLastLoad");

  if (!lastLoad || Date.now() > (parseInt(lastLoad) + parseInt(600000))) {
    try {
      const response = await fetch(apiUrl + '/recipes?populate=*');
      const jsonData = await response.json();
      localStorage.setItem("gfm_recipes", JSON.stringify(jsonData.data));
      localStorage.setItem("gfm_recipesLastLoad", Date.now());
    } catch (e) {
      console.log('Error: ', e);
    }
  }
}

const logIn = async (e) => {
  e.preventDefault();
  const user = document.querySelector("#username").value;
  const passwd = document.querySelector("#password").value;
  await fetch(apiUrl + "/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "identifier": user,
      "password": passwd
    }),
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("gfm_jwt", data.jwt);
      localStorage.setItem("gfm_user_id", data.user.id);
      localStorage.setItem("gfm_user_name", data.user.username);
      window.location.href = "index.html";
    })
    .catch(err => console.error(err));
}

// Page specific handling
if (document.location.pathname === "/login.html") {
  const loginButton = document.querySelector(".submit-button");
  loginButton.addEventListener("click", logIn);
}

if (document.location.pathname === "/ProjectExam_1_resit/recipe.html") {
  listDetails();
}

requestAll();



