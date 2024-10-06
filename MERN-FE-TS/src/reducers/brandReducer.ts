/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBrands } from "@/types";

type State = {
  brands: IBrands[];
};

type Action =
  | {
      type: "GET_BRANDS";
      payload: IBrands[];
    }
  | {
      type: "ADD_BRANDS";
      payload: IBrands;
    }
  | {
      type: "UPDATE_BRANDS";
      payload: IBrands;
    }
  | {
      type: "REMOVE_BRANDS";
      payload: string;
    }
  | {
      type: "CHANGE_STATUS";
      payload: { _id: string; status: boolean };
    };

const brandReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "ADD_BRANDS":
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };
    case "UPDATE_BRANDS":
      return {
        ...state,
        brands: state.brands.map((brand) =>
          brand._id === action.payload._id ? action.payload : brand
        ),
      };
    case "REMOVE_BRANDS":
      return {
        ...state,
        brands: state.brands.filter((brand) => {
          brand._id !== action.payload;
        }),
      };
    case "CHANGE_STATUS":
      return {
        brands: state.brands.map((brand) =>
          brand._id === action.payload._id
            ? { ...brand, status: action.payload.status }
            : brand
        ),
      };
    default:
      return state;
  }
};

export default brandReducer;
