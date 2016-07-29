import './style.css';

import React from 'react';

export default class ReactPasswordStrength extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  handleChange(e) {
    const score = this.refs["ReactPasswordStrength-input"].value.length;

    this.setState({
      score: score > 4 ? 4 : score,
    });
  }

  render() {
    const { score } = this.state;
    const { scoreWords, inputProps } = this.props;

    return (
      <div className="ReactPasswordStrength">
        <input
          className="ReactPasswordStrength-input"
          onChange={this.handleChange.bind(this)}
          ref="ReactPasswordStrength-input"
          type="password"
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
  inputProps: React.PropTypes.object,
  scoreWords: React.PropTypes.array,
};

ReactPasswordStrength.defaultProps = {
  scoreWords: ['Weak', 'Weak', 'Okay', 'Good', 'Strong'],
};
