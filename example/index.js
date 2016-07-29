import React from 'react';
import ReactDOM from 'react-dom';
import ReactPasswordStrength from "../dist/index";

const inputProps = {
  placeholder: "Password here..."
};

ReactDOM.render(
  <ReactPasswordStrength inputProps={inputProps} />,
  document.getElementById("example")
);
