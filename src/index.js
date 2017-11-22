import React from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';

export default class ReactPasswordStrength extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      isValid: false,
      password: props.defaultValue,
    };
  }

  componentDidMount() {
    const {password} = this.state;

    if (password) { // If a defaultValue was set, call handleChange after mounting
      this.handleChange();
    }
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

  isTooShort(password) {
    return password.length < this.props.minLength;
  }

  handleChange(e) {
    const { changeCallback, minScore, userInputs } = this.props;
    const password = this.refs['ReactPasswordStrength-input'].value;

    let score = 0;
    let result = null;

    // always sets a zero score when min length requirement is not met
    // which avoids unnecessary zxcvbn computations (they require quite lots of CPU)
    if (!this.isTooShort(password)) {
      result = zxcvbn(password, userInputs);
      score = result.score;
    }

    this.setState({
      isValid: score >= minScore,
      password,
      score,
    }, function() {
      if (changeCallback !== null) {
        changeCallback(this.state, result);
      }
    });
  }

  render() {
    require('./style.css');

    const { score, password, isValid } = this.state;

    const {
      scoreWords,
      inputProps,
      className,
      style,
      tooShortWord
    } = this.props;

    const wrapperClasses = [
      'ReactPasswordStrength',
      className ? className : '',
      password.length > 0 ? `is-strength-${score}` : ''
    ];

    const inputClasses = [ 'ReactPasswordStrength-input' ];

    if (isValid === true) {
      inputClasses.push('is-password-valid');
    } else if (password.length > 0) {
      inputClasses.push('is-password-invalid');
    }

    if (inputProps && inputProps.className) {
      inputClasses.push(inputProps.className);
    }

    let strengthDesc;

    if (this.isTooShort(password)) {
      strengthDesc = tooShortWord;
    } else {
      strengthDesc = scoreWords[score];
    }

    return (
      <div className={wrapperClasses.join(' ')} style={style}>
        <input
          type="password"
          {...inputProps}
          className={inputClasses.join(' ')}
          onChange={this.handleChange.bind(this)}
          ref="ReactPasswordStrength-input"
          value={password}
        />

        <div className="ReactPasswordStrength-strength-bar" />
        <span className="ReactPasswordStrength-strength-desc">{strengthDesc}</span>
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
  tooShortWord: PropTypes.string,
  style: PropTypes.object,
  userInputs: PropTypes.array,
  defaultValue: PropTypes.string,
};

ReactPasswordStrength.defaultProps = {
  changeCallback: null,
  className: '',
  minLength: 5,
  minScore: 2,
  scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
  tooShortWord: 'too short',
  userInputs: [],
  defaultValue: '',
};
