/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategories } from "@/types";

type State = {
  categories: ICategories[];
};

type Action = {
  type: string;
  payload: any;
};

const cateogryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    case "CHANGE_STATUS":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id
            ? { ...category, status: action.payload.status }
            : category
        ),
      };
    default:
      return state;
  }
};

export default cateogryReducer;
