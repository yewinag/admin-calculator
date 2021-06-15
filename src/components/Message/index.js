import React, { useContext, useState } from "react";
import ResourceContext from '../../context';
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
      {!!cart && (
        <Alert isOpen={visible} color="success" className="success-alert">
          <p>{cart && cart.statusText}</p>
          <Button className="alert-close" onClick={() => onDismiss()} close />
        </Alert>
      )}
      {!!selectedLocationList.length > 0 &&
      selectedLocationList[0].hasOwnProperty("isErr") ? (
        <>
          {selectedLocationList.map((item, index) => (
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
