document.addEventListener('DOMContentLoaded', function() {
  // sacamos el parametro de comida
  const urlParams = new URLSearchParams(window.location.search);
  const food = urlParams.get('food');
  const { API_KEY: apiKey } = import.meta.env;

  // consulta a la api de spoonacular
  fetch(`https://api.spoonacular.com/recipes/search?query=${food}&number=10&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // manipulacion de datos
      const recipesContainer = document.getElementById('recipes-container');

      data.results.forEach(recipe => {
        // creamos los elementos del html
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Hacer una solicitud adicional para obtener detalles de la receta
        fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${TapiKey}`)
          .then(response => response.json())
          .then(details => {
            recipeCard.innerHTML = `
            <div class="card-recipes">
              <h3>${details.title}</h3>
              <img src="${details.image}" alt="${details.title} class="img-recipes"" />
              <p>${details.summary}</p>
              </div>
            `;
            recipesContainer.appendChild(recipeCard);
          })
          .catch(error => {
            console.error('Error al recuperar detalles de la receta:', error);
          });
      });
    })
    .catch(error => {
      console.error('Error al recuperar Recetas:', error);
    });
});
