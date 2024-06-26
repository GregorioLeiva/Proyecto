document.addEventListener('DOMContentLoaded', function() {
  // Obtener el parámetro de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const food = urlParams.get('food');
  const TU_API_KEY = '42125001a1334f56aa22b7d4b7f27732';

  // Consultar la API de Spoonacular para obtener recetas
  fetch(`https://api.spoonacular.com/recipes/search?query=${food}&number=10&apiKey=${TU_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // Manipular los datos de las recetas obtenidas
      const recipesContainer = document.getElementById('recipes-container');

      data.results.forEach(recipe => {
        // Crear elementos HTML para mostrar cada receta
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
          <h3>${recipe.title}</h3>
          <p>${recipe.summary}</p>
        `;
        recipesContainer.appendChild(recipeCard);
      });
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
});