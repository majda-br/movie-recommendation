import React from "react";
import { useRouteMatch } from "react-router-dom";

// ref: https://reacttraining.com/react-router/web/guides/quick-start

const GetMovieId = (props) => {
  const routeInformation = useRouteMatch();
  console.log(routeInformation);

  return <div>Open the dev tools to see the content of the routing information</div>;
};

export default GetMovieId;
