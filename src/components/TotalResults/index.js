import React, { useContext } from "react";
import { ResourceContext } from "../../containers/Home";
import { getTotalCost, getTotalUnit } from "../../utils/helper";
import "../../styles/total-results.scss";

function TotalResults() {
  const {
    state: { selectedLocationList },
  } = useContext(ResourceContext);

  return (
    <div className="total-result-card">
      <div className="result-item">
        <p className="label">Total Units</p>
        <p className="value">{getTotalUnit(selectedLocationList)}</p>
      </div>
      <div className="result-item">
        <p className="label">Total Costs</p>
        <p className="value">{getTotalCost(selectedLocationList)}</p>
      </div>
    </div>
  );
}

export default TotalResults;
