import React from "react";


const LoadingSpinner = () =>
  <div className="loading-block-container">
    {[...Array(3)].map((_, i) =>
      <div key={i} className="loading-block"></div>
    )}
  </div>
;

export default LoadingSpinner;