import Search from './models/Search';
import { toUnicode } from 'punycode';

// Selectors
const searchForm = document.querySelector('.search');


/* Global state object
- Search Object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {
    //1. Get query from view
    const query = 'pizza'; //todo

    if (query) {
        //2. new search object an add to state
        state.search = new Search(query);

        //3. prepare UI for results

        //4 Search for recipes
        await state.search.getResults();

        //5. render results on UI
        console.log(state.search.result);
    }

};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
console.log(search);
