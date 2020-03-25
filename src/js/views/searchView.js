import { elements } from './base';

//returning search input value
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; 
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        //retuning the new title
        //Join method concatenate elements in a string with 
        //A separator
        return `${newTitle.join(' ')}...`;
    }
    return title;

};

const renderRecipe = recipe => {
    //rendering results with real data
    const markup = `
    <li>
    <a class="results__link" href="${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>
    `;

    //adding results to html
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
    
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};

