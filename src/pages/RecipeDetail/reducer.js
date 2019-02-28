import {
  RECIPE_DETAIL_FAILURE,
  RECIPE_DETAIL_SUCCESS,
  RECIPE_DETAIL_FETCH,
  RECIPE_DETAIL_POST,
  RECIPE_DETAIL_DELETE
} from "./actions";

const initialState = {
  isLoading: true,
  data: null,
  problem: null
};

export const recipeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPE_DETAIL_FETCH:
      return {
        ...state,
        isLoading: true
      };
    case RECIPE_DETAIL_POST:
      return {
        ...state,
        isLoading: true
      };
    case RECIPE_DETAIL_DELETE:
      return {
        ...state,
        isLoading: true
      };
    case RECIPE_DETAIL_SUCCESS:

      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case RECIPE_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        problem: action.payload
      };
    default:
      return state;
  }
};

export const getRecipeDetail = state => state.recipeDetail.data;
export const isRecipeLoading = state => state.recipeDetail.isLoading;
export const getError = state => state.recipeDetail.problem;
