import React, { useContext, useState, useEffect } from "react";
import { ResourceContext } from "../../containers/Home";
import { Alert, Button } from 'reactstrap';
import '../../styles/success-alert.scss';

function SuccessAlert() {
  const resources = useContext(ResourceContext);

  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  const { cart } = resources.state;

  return (
    <>
      {
        !!cart.data &&
        <Alert isOpen={visible} color="success" className="success-alert">
          <p>{cart.data && cart.data.statusText}</p>
          <Button className="alert-close" onClick={()=> onDismiss()} close/>
        </Alert>
      }
    </>
  );
}

export default SuccessAlert;