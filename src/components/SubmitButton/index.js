import React, { useContext, useState } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import axios from "axios";
import ResourceContext from '../../context';
import { getLocationList } from "../../utils/helper";
import { API_URL } from "../../constants";
import * as types from "../../constants/actionTypes";
import "../../styles/submit-button.scss";

function SubmitButton() {
  const [isSubmit, submittingCart] = useState(false)
  const { state: { selectedProduct, selectedDate, selectedLocationList }, dispatch } =
    useContext(ResourceContext);

  const handleSubmit = () => {
    const payload = {
      date: moment().format("YYYY MMMM DD"),
      product: selectedProduct && parseInt(selectedProduct.id),
      locations: getLocationList(selectedLocationList),
    };
    submittingCart(true)
    const submitCart = async () => {
      try {
        const res = await axios({
          method: "post",
          url: `${API_URL}/cart`,
          data: payload,
        });
        dispatch({ type: types.SENT_CART, payload: res });
        submittingCart(false)
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
        !selectedProduct || !selectedDate || selectedLocationList.length == 0
      }
    >
      {isSubmit ? "loading..." : "Submit"}
    </Button>
  );
}

export default SubmitButton;
