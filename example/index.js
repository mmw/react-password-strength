import React from 'react';
import ReactDOM from 'react-dom';
import ReactPasswordStrength from "../dist/index";

class App extends React.Component {
  state = {
    passLength: 0,
  }

  changeCallback = state =>
    this.setState({ passLength: state.password.length })

  clear = () => this.ReactPasswordStrength.clear()

  render() {
    const inputProps = {
      placeholder: "Try a password...",
      id: "inputPassword",
      autoFocus: true,
      className: 'another-input-prop-class-name',
    };

    return (
      <div>
        <h1>React Password Strength Tool</h1>
        <p>Powered by <a href="https://github.com/dropbox/zxcvbn" target="_blank">zxcvbn</a></p>

        <ReactPasswordStrength
          ref={ref => this.ReactPasswordStrength = ref}
          minLength={6}
          maxLength={10}
          tooLongWord="woah there"
          inputProps={inputProps}
          changeCallback={this.changeCallback}
        />

        <button onClick={this.clear} disabled={this.state.passLength === 0}>
          Clear
        </button>

        <h3>Password Input with Default Value for password</h3>

        <ReactPasswordStrength
          minLength={6}
          maxLength={10}
          inputProps={{ ...inputProps, id: "inputPassword2" }}
          defaultValue="defaultValue"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("example"));
