import {
  RECIPE_DETAIL_FETCH_FAILURE,
  RECIPE_DETAIL_FETCH_SUCCESS,
  RECIPE_DETAIL_POST_FAILURE,
  RECIPE_DETAIL_POST_SUCCESS,
  RECIPE_DETAIL_DELETE_FAILURE,
  RECIPE_DETAIL_DELETE_SUCCESS,
  RECIPE_DETAIL_FETCH,
  RECIPE_DETAIL_POST,
  RECIPE_DETAIL_DELETE
} from "./actions";

const initialState = {
  isLoading: true,
  isPosting: true,
  isDeleting: true,
  data: null,
  fetchError: null,
  postError: null,
  deleteError: null
};

export const recipeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPE_DETAIL_FETCH:
      return {
        ...state,
        isLoading: true
      };
    case RECIPE_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case RECIPE_DETAIL_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        fetchError: action.payload
      };
    case RECIPE_DETAIL_POST:
      return {
        ...state,
        isLoading: true
      };
    case RECIPE_DETAIL_POST_SUCCESS:
      return {
        ...state,
        isPosting: false,
        data: action.payload
      };
    case RECIPE_DETAIL_POST_FAILURE:
      return {
        ...state,
        isPosting: false,
        postError: action.payload
      };
    case RECIPE_DETAIL_DELETE:
      return {
        ...state,
        isLoading: true
      };
    case RECIPE_DETAIL_DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        data: action.payload
      };
    case RECIPE_DETAIL_DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
};

export const getRecipeDetail = state => state.recipeDetail.data;
export const isRecipeLoading = state => state.recipeDetail.isLoading;
export const isRecipePosting = state => state.recipeDetail.isPosting;
export const isRecipeDeleting = state => state.recipeDetail.isDeleting;
export const getFetchError = state => state.recipeDetail.fetchError;
export const getPostError = state => state.recipeDetail.postError;
export const getDeleteError = state => state.recipeDetail.deleteError;
