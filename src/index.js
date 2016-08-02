import './style.css';

import React from 'react';
import classnames from 'classnames';

export default class ReactPasswordStrength extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      isValid: false,
      password: '',
    };
  }

  handleChange(e) {
    const password = this.refs['ReactPasswordStrength-input'].value;
    const score = password.length;
    const changeCallback = this.props.changeCallback;

    this.setState({
      isValid: score > this.props.minLength,
      password,
      score: score > 4 ? 4 : score,
    });

    if (changeCallback !== null) {
      changeCallback(this.state);
    }
  }

  render() {
    const { score, password, isValid } = this.state;
    const { scoreWords, inputProps, minLength } = this.props;
    const inputClasses = classnames('ReactPasswordStrength-input', {
      'is-password-valid': isValid,
      'is-password-invalid': isValid === false && password.length > 0,
    });

    return (
      <div className="ReactPasswordStrength">
        <input
          className={inputClasses}
          onChange={this.handleChange.bind(this)}
          ref="ReactPasswordStrength-input"
          type="password"
          value={password}
          {...inputProps}
        />

        <div className={`ReactPasswordStrength-strength is-strength-${score}`}>
          {scoreWords[score]}
        </div>
      </div>
    );
  }
}

ReactPasswordStrength.propTypes = {
  changeCallback: React.PropTypes.func,
  inputProps: React.PropTypes.object,
  minLength: React.PropTypes.number,
  scoreWords: React.PropTypes.array,
};

ReactPasswordStrength.defaultProps = {
  changeCallback: null,
  minLength: 5,
  scoreWords: ['Weak', 'Weak', 'Okay', 'Good', 'Strong'],
};
