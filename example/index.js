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
    <h1>React Password Strength Tool</h1>
    <p>Powered by <a href="https://github.com/dropbox/zxcvbn" target="_blank">zxcvbn</a></p>
    <ReactPasswordStrength inputProps={inputProps} />
  </div>,
  document.getElementById("example")
);
