/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {
  animationDurationSm,
  borderRadiusPill,
  colorGray200,
  colorWhite,
  spacingSm,
  paginationDotSizeSm,
  paginationDotSizeMd,
  paginationDotSizeBase,
} from 'bpk-tokens/tokens/base.react.native';
import { Animated, StyleSheet, type AnimatedValue } from 'react-native';

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colorGray200,
    borderRadius: borderRadiusPill,
    marginHorizontal: spacingSm / 2,
  },
  indicatorSelected: {
    backgroundColor: colorWhite,
  },
});

export const INDICATOR_SIZES = {
  base: 'base',
  md: 'md',
  sm: 'sm',
  invisible: 'invisible',
};

const indicatorDimensions = {
  [INDICATOR_SIZES.base]: paginationDotSizeBase,
  [INDICATOR_SIZES.md]: paginationDotSizeMd,
  [INDICATOR_SIZES.sm]: paginationDotSizeSm,
  [INDICATOR_SIZES.invisible]: 0,
};

type Props = {
  selected: boolean,
  size: $Keys<typeof INDICATOR_SIZES>,
};

class BpkPaginationDotsIndicator extends React.Component<Props, {}> {
  size: AnimatedValue;

  static propTypes = {
    selected: PropTypes.bool,
    size: PropTypes.oneOf(Object.keys(INDICATOR_SIZES)),
  };

  static defaultProps = {
    selected: false,
    size: INDICATOR_SIZES.base,
  };

  constructor(props: Props) {
    super(props);

    this.size = new Animated.Value(indicatorDimensions[this.props.size]);
  }

  componentDidUpdate() {
    Animated.timing(this.size, {
      duration: animationDurationSm,
      toValue: indicatorDimensions[this.props.size],
    }).start();
  }

  componentWillEnter(callback: () => mixed) {
    this.size.setValue(indicatorDimensions[INDICATOR_SIZES.invisible]);

    Animated.timing(this.size, {
      duration: animationDurationSm,
      toValue: indicatorDimensions[this.props.size],
    }).start(callback);
  }

  componentWillLeave(callback: () => mixed) {
    Animated.timing(this.size, {
      duration: animationDurationSm,
      toValue: indicatorDimensions[INDICATOR_SIZES.invisible],
    }).start(callback);
  }

  render() {
    const { selected } = this.props;
    const style = [
      styles.indicator,
      {
        height: this.size,
        width: this.size,
      },
    ];

    if (selected) {
      style.push(styles.indicatorSelected);
    }

    return <Animated.View style={style} />;
  }
}

export default BpkPaginationDotsIndicator;
