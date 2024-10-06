import { TProduct } from "@/types";

type State = {
  products: TProduct;
};

type Action = {
  type: string;
  payload: TProduct;
};

const productReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product: TProduct) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product)=> product.id !== action.payload.id),
      };
    default:
      return state; // trả về state ban đầu
  }
};
