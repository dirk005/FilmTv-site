import React from "react";
import { Route } from "react-router-dom";

import DisplayDetails from "../components/display-details";

const DetailsPage = ({ match }) => {
  return (
    <div className="DetailsPage">     
      <Route path={`${match.path}/:type/:mdbId`} component={DisplayDetails} />
    </div>
  );
};

export default DetailsPage;
