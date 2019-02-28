import { combineReducers } from "redux";
import { recipeDetailReducer } from "../pages/RecipeDetail/reducer";
import { recipeListReducer } from "../pages/RecipesList/reducer";

const rootReducer = combineReducers({
  recipeList: recipeListReducer,
  recipeDetail: recipeDetailReducer
});

export default rootReducer;
