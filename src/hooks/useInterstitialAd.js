import {useState, useEffect, useCallback} from 'react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import ADS from '../constants/Ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : ADS.interstitial;

const useInterstitialAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdVisible, setIsAdVisible] = useState(false);
  const [interstitial, setInterstitial] = useState(null);

  useEffect(() => {
    if (!adUnitId) {
      console.error('Ad unit ID is not defined');
      return;
    }

    const ad = InterstitialAd.createForAdRequest(adUnitId);
    setInterstitial(ad);

    // Define event listeners
    const onAdLoaded = () => {
      console.log('Ad loaded');
      setIsAdLoaded(true);
    };

    const onAdClosed = () => {
      console.log('Ad closed');
      setIsAdVisible(false);
      ad.load();
    };

    // Attach event listeners
    const loadedListener = ad.addAdEventListener(
      AdEventType.LOADED,
      onAdLoaded,
    );
    const closedListener = ad.addAdEventListener(
      AdEventType.CLOSED,
      onAdClosed,
    );

    // Load the ad
    ad.load();

    // Clean up event listeners and ad instance
    return () => {
      loadedListener();
      closedListener();
      // Dispose of the ad if needed
    };
  }, [adUnitId]);

  const showAd = useCallback(() => {
    if (isAdLoaded && !isAdVisible && interstitial) {
      interstitial.show();
      setIsAdVisible(true);
    } else {
      console.log('Ad not ready or already visible');
    }
  }, [isAdLoaded, isAdVisible, interstitial]);
  return {showAd, isAdLoaded};
};

export default useInterstitialAd;
