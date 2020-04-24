import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe () {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.autor = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.publisher_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong')
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng /3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'once', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound' ];
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            })
            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' '); //converting ingredient into an array
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2)); //find index of the unit
            

            let objIng; 
            if (unitIndex > -1) {
                //there is a unit
                const arrCount = arrIng.slice(0,unitIndex); //Ex. 4 1/2 cups, arrCount is ["4", "1/2"];
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join('')
                }

            } else if (parseInt(arrIng[0], 10)) {
                //No unit but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
                else if (unitIndex === -1) {
                //no unit and no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;

        });
        this.ingredients = newIngredients;
    }
}