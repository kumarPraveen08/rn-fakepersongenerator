import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

import useInternetConnection from '../hooks/useInternetConnection';
import ADS from '../constants/Ads';

const {width} = Dimensions.get('window');

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : ADS.banner;

const BannerAdComponent = ({type = 'banner', theme}) => {
  const isConnected = useInternetConnection();
  const [adLoaded, setAdLoaded] = useState(false);

  if (!isConnected) {
    return null;
  }

  return (
    <View
      style={[
        adLoaded
          ? [styles.adContainer, {height: 0.15 * width}]
          : styles.adContainerHidden,
        {backgroundColor: theme?.background},
      ]}>
      <BannerAd
        unitId={adUnitId}
        size={
          type === 'banner'
            ? BannerAdSize.BANNER
            : BannerAdSize.ANCHORED_ADAPTIVE_BANNER
        }
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={error => {
          console.error('Ad failed to load: ', error);
          setAdLoaded(false);
        }}
      />
    </View>
  );
};

export default BannerAdComponent;

const styles = StyleSheet.create({
  adContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContainerHidden: {
    width: '100%',
    height: 0,
  },
});
