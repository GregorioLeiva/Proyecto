document.addEventListener('DOMContentLoaded', function() {
  // sacamos el parametro de comida
  const urlParams = new URLSearchParams(window.location.search);
  const food = urlParams.get('food');
  const TU_API_KEY = '42125001a1334f56aa22b7d4b7f27732';

  // consulta a la api de spoonacular
  fetch(`https://api.spoonacular.com/recipes/search?query=${food}&number=10&apiKey=${TU_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // manipulacion de datos
      const recipesContainer = document.getElementById('recipes-container');

      data.results.forEach(recipe => {
        // creamos los elementos del html
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Hacer una solicitud adicional para obtener detalles de la receta
        fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${TU_API_KEY}`)
          .then(response => response.json())
          .then(details => {
            recipeCard.innerHTML = `
              <h3>${details.title}</h3>
              <img src="${details.image}" alt="${details.title}" />
              <p>${details.summary}</p>
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
