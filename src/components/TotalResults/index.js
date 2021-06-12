import React, { useContext } from "react";
import { ResourceContext } from "../../containers/Home";
import { getTotalCost, getTotalUnit } from "../../utils/helper";
import "../../styles/total-results.scss";

function TotalResults() {
  const resources = useContext(ResourceContext);
  const { selectedLocationList } = resources.state;
  return (
    <div className="total-result-card">
      <div className="result-item">
        <p className="label">Units</p>
        <p className="value">{getTotalUnit(selectedLocationList.data)}</p>
      </div>
      <div className="result-item">
        <p className="label">Costs</p>
        <p className="value">{getTotalCost(selectedLocationList.data)}</p>
      </div>
    </div>
  );
}

export default TotalResults;
