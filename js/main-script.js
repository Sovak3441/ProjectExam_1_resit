//const apiBaseUrl = 'http://localhost:1337';
const apiBaseUrl = 'https://seahorse-app-7ei8d.ondigitalocean.app'
const apiEndpoint = '/api';
const apiUrl = apiBaseUrl + apiEndpoint;

const mobileBtn = document.querySelector("#mobilebutton");
mobileBtn.addEventListener("click", () => {
  document.querySelector(".menu, .action").style.display = "block";
});

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
        <p>${currentRecipe.description}</p>
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
        <p>${currentRecipe.description}</p>
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
  const userId = localStorage.getItem("gfm_user_id");
  const favoriteElement = document.querySelector("#favorites_list");
  let returnElement = "";

  let i = 0;
  /*
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
  */
  //favoriteElement.innerHTML = returnElement;
}

const listDetails = () => {
  const detailsElement = document.querySelector("#recipe-details");
  const recipeId = new URLSearchParams(window.location.search).get('recipe');
  const data = JSON.parse(localStorage.getItem("gfm_recipes"));

  let returnElement = "";
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
  const currentUser = localStorage.getItem("gfm_user_id");
  const userToken = localStorage.getItem("gfm_jwt");
  let fetchInit = {};
  if (currentUser) {
    fetchInit = {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${userToken} `,
        'Content-Type': 'application/json'
      }
    }
  }

  if (!lastLoad || Date.now() > (parseInt(lastLoad) + parseInt(15000))) {
    try {
      const response = await fetch(apiUrl + '/recipes?populate=*', fetchInit);
      const jsonData = await response.json();
      console.log(jsonData);
      localStorage.setItem("gfm_recipes", JSON.stringify(jsonData.data));
      localStorage.setItem("gfm_recipesLastLoad", Date.now());
    } catch (e) {
      console.log('Error: ', e);
    }
  }
}

const loginActionBtn = document.querySelector("#login-btn");
loginActionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(loginActionBtn.textContent === "Log Out") {
    logout();
  } else {
    logIn();
  }
});

const logIn = async (e) => {
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

const logout = () => {
  localStorage.removeItem("gfm_jwt");
  localStorage.removeItem("gfm_user_id");
  localStorage.removeItem("gfm_user_name");
  window.location.href = "index.html";
}


const isLoggedIn = () => {
  const authenticated = localStorage.getItem("gfm_user_id");
  if (authenticated) {
    const loginActionButton = document.querySelector("#login-btn");
    loginActionButton.textContent = "Log Out"
    return true;
  }
}


// Page specific handling

if (document.location.pathname === "contact.html") {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const contactSubmitBtn = document.querySelector("#contact_submit");
  let contactError = false;

  const validMail = (address) => {
    return String(address)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  name.addEventListener("change", () => {
    if (name.value.length < 8) {
      name.style.border = "red solid 1px";
      document.querySelector("#name_error").textContent = "Name too short. Min 8 chars";
      contactError = true;
    } else {
      name.style.border = "";
      document.querySelector("#name_error").textContent = "";
      contactError = false;
    }
  });

  email.addEventListener("change", () => {
    if (!validMail(email.value)) {
      email.style.border = "red solid 1px";
      document.querySelector("#email_error").textContent = "Invalid email format!";
      contactError = true;
    } else {
      email.style.border = "";
      document.querySelector("#email_error").textContent = "";
      contactError = false;
    }
  });

  message.addEventListener("change", () => {
    if (message.value.length < 25) {
      message.style.border = "red solid 1px";
      document.querySelector("#message_error").textContent = "Message too short. Min 25 chars";
      contactError = true;
    } else {
      message.style.border = "";
      document.querySelector("#message_error").textContent = "";
      contactError = false;
    }
  });

  contactSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!contactError) {
      const success = document.querySelector(".contact-success");
      success.textContent = "Your message have been sent. We will be in touch as soon as possible. You will now be redirected to the homepage in 3 seconds.";
      success.style.display = "block";
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000);
    }
  });
}

if (document.location.pathname === "login.html") {
  const loginButton = document.querySelector(".submit-button");
  loginButton.addEventListener("click", logIn);
}

if (document.location.pathname === "recipe.html") {
  listDetails();
}

requestAll();
isLoggedIn();



