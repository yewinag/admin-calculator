import React, { useContext } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import axios from "axios";
import { ResourceContext } from "../../containers/Home";
import { getLocationList } from "../../utils/helper";
import { API_URL } from "../../constants";
import * as types from '../../constants/actionTypes';
import '../../styles/submit-button.scss';
function SubmitButton() {
  const {
    state: {selected, cart, selectedLocationList},    
    dispatch,
  } = useContext(ResourceContext);

  const handleSubmit = () => {
    dispatch({ type: types.SUBMITTING });
    const payload = {
      date: moment().format("YYYY MMMM DD"),
      product: selected.product && parseInt(selected.product.id),
      locations: getLocationList(selectedLocationList.data),
    };
    const submitCart = async () => {
      try {
        const res = await axios({
          method: "post",
          url: `${API_URL}/cart`,
          data: payload,
        });
        dispatch({ type: types.SENT_CART, payload: res });
      } catch (error) {
        console.log(error);
      }
    };
    submitCart();
  };
  return (
    <Button
      onClick={() => handleSubmit()}
      className="submit-btn"
      disabled={
        !selected.product ||
        !selected.date ||
        selectedLocationList.data.length == 0
      }
    >
      {cart.isSubmitting ? "loading..." : "Submit"}      
    </Button>
  );
}

export default SubmitButton;
