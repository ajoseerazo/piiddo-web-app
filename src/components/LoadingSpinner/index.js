import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add([faSpinner]);

const LoadingSpinner = (props) => {
  return <FontAwesomeIcon icon="spinner" {...props} spin />;
};

export default LoadingSpinner;
