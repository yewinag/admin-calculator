export const initialState = {
    products: {
      isFetching: false,
      data: [],
      status: null,
    },
    locations: {
      isFetching: false,
      data: [],
    },
    selected: {
      product: null,
      location: null,
      date: null,
    },
    selectedLocationList: {
      data: [],
    },
    cart: {
      isSubmitting: false,
      data: null,
    },
  };

export  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_PRODUCT":
        return { ...state, ...{ products: { isFetching: true } } };
      case "RECEIVE_PRODUCT":
        return {
          ...state,
          ...{
            products: {
              isFetching: false,
              data: action.payload.data,
              status: action.payload.status,
            },
          },
        };
      case "RECEIVE_PRODUCT_ERR":
        return {
          ...state,
          ...{ products: { isFetching: false, status: action.payload } },
        };
      case "FETCH_LOCATIONS":
        return { ...state, ...{ locations: { isFetching: true } } };
      case "RECEIVE_LOCATIONS":
        return {
          ...state,
          ...{
            locations: {
              isFetching: false,
              data: action.payload.data,
              status: action.payload.status,
            },
          },
        };
      case "RECEIVE_LOCATIONS_ERR":
        return {
          ...state,
          ...{ locations: { isFetching: false, status: action.payload } },
        };
      case "SELECT_PRODUCT":
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
      case "SELECTED_DATE":
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
      case "SELECT_LOCATION":
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
      case "ADD_LOCATION_ITEM":
        return {
          ...state,
          ...{
            selectedLocationList: {
              data: [...state.selectedLocationList.data, action.payload],
            },
          },
        };
      case "CLEAR_LOCATION_ITEM":
        return {
          ...state,
          ...{
            selectedLocationList: {
              data: [],
            },
          },
        };
      case "REMOVE_SELECTED_LOCATION_ITEM":
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
      case "SUBMITTING":
        return {
          ...state,
          ...{
            cart: {
              isSubmitting: true,
            },
          },
        };
      case "SENT_CART":
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