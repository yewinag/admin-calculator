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

  const [visible, setVisible] = useState(true);
  const [isErrVisible, setErrVisible] = useState(true);
  const onDismiss = () => setVisible(false);
  const onDismissErr = () => setErrVisible(false);
  const handleClearError = () => {
    onDismissErr();
    dispatch({ type: types.REMOVE_ERROR_MSG });
  };
  return (
    <>
      {!!cart && (
        <Alert isOpen={visible} color="success" className="success-alert">
          <p>{cart && cart.statusText}</p>
          <Button className="alert-close" onClick={() => onDismiss()} close />
        </Alert>
      )}
      {!!error.length > 0 && (
        <>
          {error.map((item, index) => (
            <Alert
              key={index}
              isOpen={isErrVisible}
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
