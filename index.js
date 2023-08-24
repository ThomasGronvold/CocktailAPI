import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const randomCocktail = await axios.get(API_URL);
    const drinkData = randomCocktail.data.drinks[0];

    res.render("index.ejs", {
        drink: drinkData.strDrink,
        drinkImg: drinkData.strDrinkThumb,
        ingredients: fillIngredientArray(drinkData),
        ingredientsMeasure: fillIngredientMessureArray(drinkData),
        instructions: drinkData.strInstructions
    });
});

app.post("/", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function fillIngredientArray(drinkdata) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        const ingredient = drinkdata[`strIngredient${i}`];

        if (ingredient !== null && ingredient.trim() !== "") {
            ingredients.push(ingredient);
        }
    }
    return ingredients;
}

function fillIngredientMessureArray(drinkdata) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        const ingredient = drinkdata[`strMeasure${i}`];

        if (ingredient !== null && ingredient.trim() !== "") {
            ingredients.push(ingredient);
        }
    }
    return ingredients;
}