import React from 'react';
import ReactDOM from 'react-dom';
import ReactPasswordStrength from "../dist/index";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      passLength: 0,
    };
  }

  changeCallback(state) {
    this.setState({ passLength: state.password.length });
  }

  clear() {
    this.refs.passComponent.clear();
  }

  render() {
    const inputProps = {
      placeholder: "Try a password...",
      id: "inputPassword",
      autoFocus: true,
    };

    return (
      <div>
        <h1>React Password Strength Tool</h1>
        <p>Powered by <a href="https://github.com/dropbox/zxcvbn" target="_blank">zxcvbn</a></p>
        <ReactPasswordStrength
          ref="passComponent"
          inputProps={inputProps}
          changeCallback={this.changeCallback.bind(this)}
        />
        <button
          onClick={this.clear.bind(this)}
          disabled={this.state.passLength === 0}
        >
          Clear
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("example"));
