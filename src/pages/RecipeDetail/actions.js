import api from "../../api/api";

export const RECIPE_DETAIL_FETCH = "RECIPE_DETAIL_FETCH";
export const RECIPE_DETAIL_POST = "RECIPE_DETAIL_POST";
export const RECIPE_DETAIL_DELETE = "RECIPE_DETAIL_DELETE";
export const RECIPE_DETAIL_FETCH_FAILURE = "RECIPE_DETAIL_FETCH_FAILURE";
export const RECIPE_DETAIL_FETCH_SUCCESS = "RECIPE_DETAIL_FETCH_SUCCESS";
export const RECIPE_DETAIL_POST_FAILURE = "RECIPE_DETAIL_POST_FAILURE";
export const RECIPE_DETAIL_POST_SUCCESS = "RECIPE_DETAIL_POST_SUCCESS";
export const RECIPE_DETAIL_DELETE_FAILURE = "RECIPE_DETAIL_DELETE_FAILURE";
export const RECIPE_DETAIL_DELETE_SUCCESS = "RECIPE_DETAIL_DELETE_SUCCESS";

export const recipeDetailFetch = () => ({
  type: RECIPE_DETAIL_FETCH
});

export const recipeDetailSuccess = payload => ({
  type: RECIPE_DETAIL_FETCH_SUCCESS,
  payload
});

export const recipeDetailFailure = error => ({
  type: RECIPE_DETAIL_FETCH_FAILURE,
  error
});

export const recipeDetailPost = () => ({
  type: RECIPE_DETAIL_POST
});

export const recipeDetailPostSuccess = payload => ({
  type: RECIPE_DETAIL_POST_SUCCESS,
  payload
});

export const recipeDetailPostFailure = error => ({
  type: RECIPE_DETAIL_POST_FAILURE,
  error
});

export const recipeDetailDelete = () => ({
  type: RECIPE_DETAIL_DELETE
});

export const recipeDetailDeleteSuccess = payload => ({
  type: RECIPE_DETAIL_DELETE_SUCCESS,
  payload
});

export const recipeDetailDeleteFailure = error => ({
  type: RECIPE_DETAIL_DELETE_FAILURE,
  error
});

export const fetchRecipeDetail = slug => dispatch => {
  dispatch(recipeDetailFetch());

  api
    .get(`/recipes/${slug}`)
    .then(
      response => dispatch(recipeDetailSuccess(response.data)),
      error => dispatch(recipeDetailFailure(error))
    );
};

export const resetRecipeDetail = () => dispatch => {
  return dispatch(
    recipeDetailSuccess({
      title: "Nový recept",
      preparationTime: 0,
      servingCount: 0,
      directions: "",
      slug: "",
      ingredients: []
    })
  );
};

export const postRecipe = (id, recipe) => dispatch => {
  dispatch(recipeDetailPost());

  return api
    .post(`/recipes/${id}`, recipe)
    .then(
      response => dispatch(recipeDetailPostSuccess(response.data)),
      error => dispatch(recipeDetailPostFailure(error))
    );
};

export const deleteRecipe = id => dispatch => {
  dispatch(recipeDetailDelete());

  api
    .delete(`/recipes/${id}`)
    .then(
      response => dispatch(recipeDetailDeleteSuccess(response.data)),
      error => dispatch(recipeDetailDeleteFailure(error))
    );
};
