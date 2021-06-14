import * as types from '../constants/actionTypes';

const reducer = (state, action) => {
    switch (action.type) {
      case types.FETCH_PRODUCT:
        return { ...state, ...{ products: { isFetching: true, data: [] } } };
      case types.RECEIVE_PRODUCT:
        return {
          ...state,
          ...{
            products: {
              isFetching: false,
              data: action.payload.data
            },
          },
        };
      case types.RECEIVE_PRODUCT_ERR:
        return {
          ...state,
          ...{ products: { isFetching: false } },
        };
      case types.FETCH_LOCATIONS:
        return { ...state, ...{ locations: { isFetching: true, data: [] } } };
      case types.RECEIVE_LOCATIONS:
        return {
          ...state,
          ...{
            locations: {
              isFetching: false,
              data: action.payload.data
            },
          },
        };
      case types.RECEIVE_LOCATIONS_ERR:
        return {
          ...state,
          ...{ locations: { isFetching: false, } },
        };
      case types.SELECT_PRODUCT:
        return {
          ...state,
          ...{
            selected: {
              product: action.payload,
              date: state.selected.date,
              location: null,
            },
          },
          ...{
            selectedLocationList: {
              data: [],
            },
          },
        };
      case types.SELECTED_DATE:
        return {
          ...state,
          ...{
            selected: {
              product: state.selected.product,
              date: action.payload,
              location: state.selected.location,
            },
          },
        };
      case types.SELECT_LOCATION:
        return {
          ...state,
          ...{
            selected: {
              product: state.selected.product,
              date: state.selected.date,
              location: action.payload,
            },
          },
        };
      case types.ADD_LOCATION_ITEM:
        return {
          ...state,
          ...{
            selectedLocationList: {
              data: [...state.selectedLocationList.data, action.payload],
            },
          },
        };
      case types.CLEAR_LOCATION_ITEM:
        return {
          ...state,
          ...{
            selectedLocationList: {
              data: [],
            },
          },
        };
      case types.REMOVE_SELECTED_LOCATION_ITEM:
        const res = state.selectedLocationList.data.filter(
          (item) => item.id != action.payload
        );
        return {
          ...state,
          ...{
            selectedLocationList: {
              data: res,
            },
          },
        };
      case types.SUBMITTING:
        return {
          ...state,
          ...{
            cart: {
              isSubmitting: true,
            },
          },
        };
      case types.SENT_CART:
        return {
          ...state,
          ...{
            cart: {
              isSubmitting: false,
              data: action.payload,
            },
          },
          ...{
            selected: {
              product: null,
              date: null,
              location: null,
            },
          },
          ...{
            selectedLocationList: {
              data: [],
            },
          },
        };
      default:
        throw new Error();
    }
  }
export default reducer;