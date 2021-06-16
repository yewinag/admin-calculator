import * as types from "../constants/actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT:
      return { ...state, ...{ products: action.payload } };
    case types.FETCH_LOCATIONS:
      return { ...state, ...{ locations: action.payload } };
    case types.SELECT_PRODUCT:
      return {
        ...state,
        ...{
          selectedProduct: action.payload,
        },
        ...{
          selectedLocationList: [],
        },
      };
    case types.SELECTED_DATE:
      return {
        ...state,
        ...{
          selectedDate: action.payload,
        },
      };
    case types.SELECT_LOCATION:
      return {
        ...state,
        ...{
          selectedLocation: action.payload,
        },
      };
    case types.ADD_LOCATION_ITEM:
      return {
        ...state,
        ...{
          selectedLocationList: [...state.selectedLocationList, action.payload],
        },
        ...{
          error: [],
        },
      };
    case types.CLEAR_LOCATION_ITEM:
      return {
        ...state,
        ...{
          selectedLocationList: [],
        },
      };
    case types.REMOVE_LOCATION_ITEM:
      const res = state.selectedLocationList.filter(
        (item) => item.id != action.payload
      );
      return {
        ...state,
        ...{
          selectedLocationList: res,
        },
      };
    case types.SENT_CART:
      return {
        ...state,
        ...{
          cart: action.payload,
        },
        ...{ selectedProduct: null },
        ...{ selectedDate: null },
        ...{ selectedLocation: null },
        ...{
          selectedLocationList: [],
        },
      };
    case types.ADD_ERROR_MSG:
      return {
        ...state,
        ...{
          error: [...state.error, action.payload],
        },
      };
    case types.REMOVE_ERROR_MSG:
      return {
        ...state,
        ...{
          cart: null
        },
        ...{
          error: [],
        },
      };
    default:
      throw new Error();
  }
};
export default reducer;
