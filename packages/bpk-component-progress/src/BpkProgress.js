import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bpkColorWhite } from 'bpk-tokens/tokens/base.es6';
import clamp from 'lodash.clamp';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-progress.scss';

const getClassName = cssModules(STYLES);

const isTransitionEndSupported = () => !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

const renderSteps = (numberOfSteps, stepColor) => {
  const steps = [];
  for (let i = 1; i <= numberOfSteps; i += 1) {
    const left = `${100 * (i / (numberOfSteps + 1))}%`;
    const backgroundColor = stepColor;
    steps.push(
      <div
        key={`bpk-progress__step-${i}`}
        className={getClassName('bpk-progress__step')}
        style={{ left, backgroundColor }}
      />,
    );
  }
  return steps;
};

class BpkProgress extends Component {
  constructor() {
    super();

    this.handleCompleteTransitionEnd = this.handleCompleteTransitionEnd.bind(this);
  }

  componentDidUpdate(previousProps) {
    const { value, max } = this.props;
    if (value >= max && value !== previousProps.value) {
      this.props.onComplete();

      if (!isTransitionEndSupported() && this.props.onCompleteTransitionEnd) {
        this.props.onCompleteTransitionEnd();
      }
    }
  }

  handleCompleteTransitionEnd() {
    const { onCompleteTransitionEnd, value, max } = this.props;
    if (value >= max && onCompleteTransitionEnd) {
      onCompleteTransitionEnd();
    }
  }

  render() {
    const {
      min,
      max,
      value,
      small,
      stepped,
      className,
      getValueText,
      stepColor,
      ...rest
    } = this.props;
    const classNames = [getClassName('bpk-progress')];
    if (className) { classNames.push(className); }
    if (small) { classNames.push(getClassName('bpk-progress--small')); }

    const adjustedValue = clamp(value, min, max);
    const percentage = 100 * (adjustedValue / (max - min));
    const numberOfSteps = stepped ? (max - min - 1) : 0;

    delete rest.onComplete;
    delete rest.onCompleteTransitionEnd;

    return (
      <div
        className={classNames.join(' ')}
        role="progressbar"
        aria-valuetext={getValueText ? getValueText(value, min, max) : null}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex="0"
        {...rest}
      >
        <div
          className={getClassName('bpk-progress__value')}
          style={{ width: `${percentage}%` }}
          onTransitionEnd={this.handleCompleteTransitionEnd}
        />
        { renderSteps(numberOfSteps, stepColor) }
      </div>
    );
  }
}

BpkProgress.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  stepped: PropTypes.bool,
  stepColor: PropTypes.string,
  small: PropTypes.bool,
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onCompleteTransitionEnd: PropTypes.func,
  getValueText: PropTypes.func,
};

BpkProgress.defaultProps = {
  className: null,
  stepped: false,
  stepColor: bpkColorWhite,
  small: false,
  onComplete: () => null,
  onCompleteTransitionEnd: () => null,
  getValueText: null,
};

export default BpkProgress;
