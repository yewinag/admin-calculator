import React, { useContext, useState } from "react";
import { ResourceContext } from "../../containers/Home";
import { Alert, Button } from "reactstrap";
import "../../styles/message.scss";

function Message() {
  const {
    state: { cart, selectedLocationList },
  } = useContext(ResourceContext);

  const [visible, setVisible] = useState(true);
  const [isErrVisible, setErrVisible] = useState(true);
  const onDismiss = () => setVisible(false);
  const onDismissErr = () => setErrVisible(false);
  return (
    <>
      {!!cart.data && (
        <Alert isOpen={visible} color="success" className="success-alert">
          <p>{cart.data && cart.data.statusText}</p>
          <Button className="alert-close" onClick={() => onDismiss()} close />
        </Alert>
      )}
      {!!selectedLocationList.data.length > 0 &&
      selectedLocationList.data[0].hasOwnProperty("isErr") ? (
        <>
          {selectedLocationList.data.map((item, index) => (
            <Alert key={index} isOpen={isErrVisible} color="warning" className="success-alert">
              <p>{item.msg}</p>
              <Button
                className="alert-close"
                onClick={() => onDismissErr()}
                close
              />
            </Alert>
          ))}
        </>
      ) : null}
    </>
  );
}

export default Message;
