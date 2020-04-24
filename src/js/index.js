import Search from './models/Search';
import { toUnicode } from 'punycode';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';


/* Global state object
- Search Object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput();
    //console.log(`Esto es el query: ${query}`)

    if (query) {
        //2. new search object an add to state
        state.search = new Search(query);

        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4 Search for recipes
            await state.search.getResults();
    
            //5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            clearLoader();
            alert('Error en la busqueda');
        }


        
    }

};

//searsh bar listener
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});





//pagination button listener
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        //extracting page number from fataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        //clearing inputs and results
        searchView.clearResults();
        //showing new pagination results
        searchView.renderResults(state.search.result, goToPage);
    }
})

// RECIPE CONTROLLER

const controlRecipe = async () => {
    //Get the ID from URL
    const id = window.location.hash.replace('#', '');
    

    if (id) {
        //prepare UID for changes

        //create new recipe object
        state.recipe = new Recipe(id);

        //TESTING
        //window.r = state.recipe;

        try {
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
    
            //caculate sevings and time
            state.recipe.calcServings();
            state.recipe.calcTime();
    
            //render the recipe
            console.log(id);
            console.log(state.recipe.ingredients);
        } catch(error) {
            alert('Error processing recipe');
        }
    }
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

//with this i can add two events to one listener.
//first detect the hash change from url
//second, detecting id from hash at page load
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
