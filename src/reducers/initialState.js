const initialState = {
    products: {
      isFetching: false,
      data: [],
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
  export default initialState;