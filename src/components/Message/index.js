import React, { useContext, useState, useEffect } from "react";
import ResourceContext from "../../context";
import { Alert, Button } from "reactstrap";
import * as types from "../../constants/actionTypes";
import "../../styles/message.scss";

function Message() {
  const {
    state: { cart, error },
    dispatch,
  } = useContext(ResourceContext);
  
  const handleClearError = () => {    
    dispatch({ type: types.REMOVE_ERROR_MSG });
  };
  const isOpenAlert = (cart) => !!cart ? true : false;
  const isOpenMsg = (error) => error.length > 0 ? true : false;

  return (
    <>
      {!!cart && (
        <Alert isOpen={isOpenAlert(cart)} color="success" className="success-alert">
          <p>{cart && cart.statusText}</p>
          <Button className="alert-close" onClick={() => handleClearError()} close />
        </Alert>
      )}
      {!!error.length > 0 && (
        <>
          {error.map((item, index) => (
            <Alert
              key={index}
              isOpen={isOpenMsg(error)}
              color="warning"
              className="success-alert"
            >
              <p>{item.msg}</p>
              <Button
                className="alert-close"
                onClick={handleClearError}
                close
              />
            </Alert>
          ))}
        </>
      )}
    </>
  );
}

export default Message;
