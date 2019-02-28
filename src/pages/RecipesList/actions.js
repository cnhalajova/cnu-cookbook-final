import api from "../../api/api";

export const RECIPE_LIST_FETCH = "RECIPE_LIST_FETCH";
export const RECIPE_LIST_SUCCESS = "RECIPE_LIST_SUCCESS";
export const RECIPE_LIST_FAILURE = "RECIPE_LIST_FAILURE";

export const recipeListFetch = () => ({
  type: "RECIPE_LIST_FETCH"
});

export const recipeListSuccess = payload => ({
  type: "RECIPE_LIST_SUCCESS",
  payload
});

export const recipeListFailure = error => ({
  type: "RECIPE_LIST_FAILURE",
  error
});

export const fetchRecipeList = () => dispatch => {
  dispatch(recipeListFetch());

  return api
    .get("/recipes")
    .then(
      response => dispatch(recipeListSuccess(response.data)),
      error => dispatch(recipeListFailure(error))
    );
};
