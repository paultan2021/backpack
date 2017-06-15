import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-radio.scss';

const getClassName = cssModules(STYLES);

const BpkRadio = (props) => {
  const classNames = [getClassName('bpk-radio')];
  const { name, label, disabled, white, className, ...rest } = props;

  if (white) { classNames.push(getClassName('bpk-radio--white')); }
  if (disabled) { classNames.push(getClassName('bpk-radio--disabled')); }
  if (className) { classNames.push(className); }

  // This is awkward because the label-has-for rule enforces an 'id' / 'for' pairing
  // when it's not really necessary for nested inputs.
  // See https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/51.
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <label className={classNames.join(' ')}>
      <input
        type="radio"
        className={getClassName('bpk-radio__input')}
        name={name}
        disabled={disabled}
        {...rest}
      />
      {label}
    </label>
  );
  /* eslint-enable */
};

BpkRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
};

BpkRadio.defaultProps = {
  disabled: false,
  white: false,
  className: null,
};

export default BpkRadio;
