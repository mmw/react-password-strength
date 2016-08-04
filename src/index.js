import './style.css';

import React from 'react';
import classnames from 'classnames';
import zxcvbn from 'zxcvbn';

export default class ReactPasswordStrength extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      isValid: false,
      password: '',
    };
  }

  checkValidity(score, length) {
    const { minScore, minLength } = this.props;
    return score >= minScore && length >= minLength;
  }

  handleChange(e) {
    const changeCallback = this.props.changeCallback;
    const password = this.refs['ReactPasswordStrength-input'].value;
    const { score } = zxcvbn(password);

    this.setState({
      isValid: this.checkValidity(score, password.length),
      password,
      score,
    });

    if (changeCallback !== null) {
      changeCallback(this.state);
    }
  }

  render() {
    const { score, password, isValid } = this.state;
    const { scoreWords, inputProps, minLength } = this.props;

    // hack because template literals can't be used as strings in objects for some reason
    const strengthClass = `is-strength-${score}`;
    const conditionalClasses = {};
    conditionalClasses[strengthClass] = password.length > 0;

    const wrapperClasses = classnames(`ReactPasswordStrength` , conditionalClasses);
    const inputClasses = classnames('ReactPasswordStrength-input', {
      'is-password-valid': isValid,
      'is-password-invalid': isValid === false && password.length > 0,
    });

    return (
      <div className={wrapperClasses}>
        <input
          className={inputClasses}
          type="password"
          {...inputProps}
          onChange={this.handleChange.bind(this)}
          ref="ReactPasswordStrength-input"
          value={password}
        />

        <div className="ReactPasswordStrength-strength-bar" />
        <span className="ReactPasswordStrength-strength-desc">{scoreWords[score]}</span>
      </div>
    );
  }
}

ReactPasswordStrength.propTypes = {
  changeCallback: React.PropTypes.func,
  inputProps: React.PropTypes.object,
  minLength: React.PropTypes.number,
  minScore: React.PropTypes.number,
  scoreWords: React.PropTypes.array,
};

ReactPasswordStrength.defaultProps = {
  changeCallback: null,
  minLength: 5,
  minScore: 2,
  scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
};
