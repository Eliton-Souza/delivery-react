import React from "react";
import loadingIcon from "../../../icons/loadingIcon.svg"

const LoadingPage = () => {

  return (
    <div className="position-fixed top-50 start-50 translate-middle">
      <img
        src={loadingIcon}
        width="200"
        className="img-fluid rounded-circle"
        alt=""
      />
    </div>
  );
};

export default LoadingPage;
