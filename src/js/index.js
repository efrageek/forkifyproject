import Search from './models/Search';
import { toUnicode } from 'punycode';
import * as searchView from './views/searchView';
import { elements } from './views/base';

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

    if (query) {
        //2. new search object an add to state
        state.search = new Search(query);

        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        //4 Search for recipes
        await state.search.getResults();

        //5. render results on UI
        searchView.renderResults(state.search.result);
    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

