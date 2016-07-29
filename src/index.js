import './style.css';

import React from 'react';

export default class ReactPasswordStrength extends React.Component {
  render() {
    return (
      <div className="ReactPasswordStrength">
        <input
          className="ReactPasswordStrength-input"
          placeholder={this.props.inputProps.placeholder}
          type="password"
        />

        <div className="ReactPasswordStrength-strength">Weak</div>
      </div>
    );
  }
}

ReactPasswordStrength.propTypes = {
  inputProps: React.PropTypes.object,
};
