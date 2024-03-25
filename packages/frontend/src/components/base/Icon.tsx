import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {removeProps} from '../../utils/helpers/string';

type IconProps = FontAwesomeIconProps & {};

function Icon(props : IconProps) {
  /* eslint-disable */
  const { className } = props;

  const remainingProps = removeProps(props, ['insideBtn', 'svgIcon']);
  // @ts-ignore
  const iconsName = remainingProps['icon'] as unknown as IconProp;

  // @ts-ignore
  return (
      Object.keys(remainingProps).includes('icon') && iconsName ?
          <FontAwesomeIcon icon={iconsName} className={className} {...remainingProps} /> : null
  );
  /* eslint-disable */
}

Icon.defaultProps = {
  insideBtn: false,
};

export default Icon;
