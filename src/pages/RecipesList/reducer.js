import {
  RECIPE_LIST_FAILURE,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FETCH
} from "./actions";

const initialState = {
  isLoading: true,
  data: null,
  problem: null
};

export const recipeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPE_LIST_FETCH:
      return {
        ...state,
        isLoading: true
      };
    case RECIPE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case RECIPE_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        problem: action.payload
      };
    default:
      return state;
  }
};

export const getRecipeList = state => state.recipeList.data;
export const isListLoading = state => state.recipeList.isLoading;
export const getError = state => state.recipeList.problem;
