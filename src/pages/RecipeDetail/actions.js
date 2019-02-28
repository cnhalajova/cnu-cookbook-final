import api from "../../api/api";

export const RECIPE_DETAIL_FETCH = "RECIPE_DETAIL_FETCH";
export const RECIPE_DETAIL_SUCCESS = "RECIPE_DETAIL_SUCCESS";
export const RECIPE_DETAIL_FAILURE = "RECIPE_DETAIL_FAILURE";
export const RECIPE_DETAIL_POST = "RECIPE_DETAIL_POST";
export const RECIPE_DETAIL_DELETE = "RECIPE_DETAIL_DELETE";

export const recipeDetailFetch = () => ({
  type: RECIPE_DETAIL_FETCH
});

export const recipeDetailSuccess = payload => ({
  type: RECIPE_DETAIL_SUCCESS,
  payload
});

export const recipeDetailFailure = error => ({
  type: RECIPE_DETAIL_FAILURE,
  error
});

export const recipeDetailPost = () => ({
  type: RECIPE_DETAIL_POST
});

export const recipeDetailDelete = () => ({
  type: RECIPE_DETAIL_DELETE
});

export const fetchRecipeDetail = slug => dispatch => {
  dispatch(recipeDetailFetch());

  return api
    .get(`/recipes/${slug}`)
    .then(
      response => dispatch(recipeDetailSuccess(response.data)),
      error => dispatch(recipeDetailFailure(error))
    );
};

export const postRecipe = (id, recipe) => dispatch => {
  dispatch(recipeDetailPost());

  api
    .post(`/recipes/${id}`, recipe)
    .then(
      response => dispatch(recipeDetailSuccess(response.data)),
      error => dispatch(recipeDetailFailure(error))
    );
};

export const deleteRecipe = id => dispatch => {
  dispatch(recipeDetailDelete());

  api.delete(`/recipes/${id}`).then(
    response => {
      dispatch(recipeDetailSuccess(response.data));
    },
    error => dispatch(recipeDetailFailure(error))
  );
};
