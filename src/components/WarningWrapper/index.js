import React, { useContext } from "react";

import { ResourceContext } from "../../containers/Home";
import WarningAlert from "../WarningAlert";
function WarningWrapper(props) {
  const resources = useContext(ResourceContext);
  const { selectedLocationList } = resources.state;

  return (
    <div className="warning-wrapper">
      {selectedLocationList.data.length > 0 &&
      selectedLocationList.data[0].hasOwnProperty("isErr")
        ? selectedLocationList.data.map((item, index) => (
            <WarningAlert key={index} item={item} dispatch={resources.dispatch}/>
          ))
        : null}
    </div>
  );
}

export default WarningWrapper;
