import './style.css';

import React from 'react';
import classnames from 'classnames';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';

export default class ReactPasswordStrength extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      isValid: false,
      password: '',
    };
  }

  clear() {
    const { changeCallback } = this.props;

    this.setState({
      score: 0,
      isValid: false,
      password: '',
    }, () => {
      this.refs['ReactPasswordStrength-input'].value = '';

      if (changeCallback !== null) {
        changeCallback(this.state);
      }
    });
  }

  checkValidity(score, length) {
    const { minScore, minLength } = this.props;
    return score >= minScore && length >= minLength;
  }

  handleChange(e) {
    const { changeCallback } = this.props;
    const password = this.refs['ReactPasswordStrength-input'].value;
    const { score } = zxcvbn(password);

    this.setState({
      isValid: this.checkValidity(score, password.length),
      password,
      score,
    }, function() {
      if (changeCallback !== null) {
        changeCallback(this.state);
      }
    });
  }

  render() {
    const { score, password, isValid } = this.state;
    const { scoreWords, inputProps, minLength, className, style } = this.props;

    // hack because template literals can't be used as strings in objects for some reason
    const strengthClass = `is-strength-${score}`;
    const conditionalClasses = {};
    conditionalClasses[strengthClass] = password.length > 0;
    conditionalClasses[className] = className !== '';

    const wrapperClasses = classnames(`ReactPasswordStrength`, conditionalClasses);
    const inputClasses = classnames('ReactPasswordStrength-input', {
      'is-password-valid': isValid,
      'is-password-invalid': isValid === false && password.length > 0,
    });

    return (
      <div className={wrapperClasses} style={style}>
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
  changeCallback: PropTypes.func,
  className: PropTypes.string,
  inputProps: PropTypes.object,
  minLength: PropTypes.number,
  minScore: PropTypes.number,
  scoreWords: PropTypes.array,
  style: PropTypes.object,
};

ReactPasswordStrength.defaultProps = {
  changeCallback: null,
  className: '',
  minLength: 5,
  minScore: 2,
  scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
};
