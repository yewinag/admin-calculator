import React, { useState } from 'react';
import { Alert, Button } from 'reactstrap';
import '../../styles/warning-alert.scss';
const WarningAlert = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert className="alert-layout" color="warning" isOpen={visible} >
      <p>{props.item.msg}</p>
      <Button className="warning-close" onClick={()=> onDismiss()} close/>
    </Alert>
  );
}
export default WarningAlert;