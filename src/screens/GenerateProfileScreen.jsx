import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Vibration,
  ToastAndroid,
} from 'react-native';

import {darkShield, shield} from '../utils';
import useTheme from '../hooks/useTheme';
import {ages, countries, gender} from '../constants/Options';
import HeaderComponent from '../components/HeaderComponent';
import DropdownComponent from '../components/DropdownComponent';
import useSettingsStorage from '../states/useSettingsStorage';
import usePromote from '../hooks/usePromote';
import usePerson from '../hooks/api/usePerson';
import useInternetConnection from '../hooks/useInternetConnection';
import BannerAdComponent from '../components/BannerAdComponent';
import useBackPress from '../hooks/useHardwareBack';
import useInterstitialAd from '../hooks/useInterstitialAd';

const GenerateProfileScreen = () => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();
  const {isDarkMode, isVibration} = useSettingsStorage();
  const [loading, setLoading] = useState(false);
  const [sex, setSex] = useState('random');
  const [age, setAge] = useState({minAge: 18, maxAge: 65});
  const [country, setCountry] = useState('en_US');
  const isConnected = useInternetConnection();
  const {isAdLoaded, showAd} = useInterstitialAd();

  const handleGenerate = () => {
    isVibration && Vibration.vibrate(35);
    if (isConnected) {
      setLoading(true);
      setTimeout(() => {
        try {
          const person = usePerson(country, sex, age, 1);
          setLoading(false);
          navigation.navigate('ProfileScreen', {data: person.data[0]});
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to generate persons. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 100);
    } else {
      ToastAndroid.show('No Internet Connection', ToastAndroid.SHORT);
    }
  };

  const handleBack = () => {
    if (isAdLoaded && Math.random() < 0.5) {
      showAd();
    }
    isVibration && Vibration.vibrate(35);
    navigation.goBack();
    return true;
  };

  const handleShare = () => {
    isVibration && Vibration.vibrate(35);
    usePromote('share');
  };

  useBackPress(handleBack);

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Generate Profile"
        iconLeft="arrow-left"
        iconRight="share-variant"
        onPressLeft={handleBack}
        onPressRight={handleShare}
      />
      <View style={styles.main}>
        <Image source={isDarkMode ? darkShield : shield} style={styles.image} />
        <View style={styles.tool}>
          <DropdownComponent
            data={gender}
            title="Sex"
            type="icon"
            choice={setSex}
            defaultIndex={0}
          />
          <DropdownComponent
            data={ages}
            title="Age Group"
            type="icon"
            choice={setAge}
            defaultIndex={0}
          />
          <DropdownComponent
            data={countries}
            title="Countries"
            type="flag"
            choice={setCountry}
            defaultIndex={7}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btn}
          disabled={loading}
          onPress={handleGenerate}>
          {loading ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Icon name="auto-fix" size={24} color={theme.white} />
          )}
          <Text style={styles.btnText}>
            {loading ? 'Generating...' : 'Generate'}
          </Text>
        </TouchableOpacity>
      </View>
      <BannerAdComponent type="other" theme={theme} />
    </View>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    main: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      marginHorizontal: 25,
      marginTop: 50,
      gap: 15,
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: 'cover',
    },
    tool: {
      marginTop: 25,
      flexDirection: 'column',
      width: '100%',
      gap: 15,
    },
    btn: {
      gap: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: theme.text,
      width: '100%',
    },
    btnText: {
      fontSize: 18,
      color: theme.white,
    },
  });

export default GenerateProfileScreen;
