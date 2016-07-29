import React from 'react';
import ReactDOM from 'react-dom';
import ReactPasswordStrength from "../dist/index";

const inputProps = {
  placeholder: "Try a password...",
  id: "inputPassword",
  autoFocus: true,
};

ReactDOM.render(
  <div>
    <label htmlFor="inputPassword">Password</label>
    <ReactPasswordStrength inputProps={inputProps} />
  </div>,
  document.getElementById("example")
);
