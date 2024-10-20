import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const useBackPress = onBackPress => {
  useEffect(() => {
    const handleBackPress = () => {
      if (onBackPress) {
        return onBackPress();
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [onBackPress]);
};

export default useBackPress;
