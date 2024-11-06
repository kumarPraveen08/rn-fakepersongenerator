import {Image} from 'react-native';
import React from 'react';

const CountryFlag = ({isoCode, style}) => {
  const image = {
    width: 24,
    height: 18,
    overflow: 'hidden',
  };
  return <Image resizeMode="contain" style={[image, style]} source={isoCode} />;
};

export default CountryFlag;
