import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Image, BackHandler, Vibration} from 'react-native';

import {crown, darkCrown} from '../utils';
import useTheme from '../hooks/useTheme';
import usePromote from '../hooks/usePromote';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import useSettingsStorage from '../states/useSettingsStorage';
import useBackPress from '../hooks/useHardwareBack';
import Snackbar from 'react-native-snackbar';
import BannerAdComponent from '../components/BannerAdComponent';
import {useModal} from '../providers/ModalProvider';
import NoticeModal from '../components/modal/NoticeModal';

const HomeScreen = () => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();
  const {isDarkMode, isVibration, isAgreeTerms} = useSettingsStorage();
  const isFocused = useIsFocused();
  const [exitApp, setExitApp] = useState(false);
  const {openModal} = useModal();

  const handleSettings = () => {
    isVibration && Vibration.vibrate(35);
    navigation.navigate('SettingsScreen');
  };

  const handleProfile = () => {
    isVibration && Vibration.vibrate(35);
    navigation.navigate('GenerateProfileScreen');
  };

  const handleSaved = () => {
    isVibration && Vibration.vibrate(35);
    navigation.navigate('SavedScreen');
  };

  const handleBulk = () => {
    isVibration && Vibration.vibrate(35);
    navigation.navigate('GenerateBulkScreen');
  };

  const handleBack = () => {
    if (exitApp) {
      BackHandler.exitApp();
      return true;
    } else if (isFocused) {
      Snackbar.show({
        text: 'Please press back button once more to exit',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: theme.light,
        textColor: theme.text,
        action: {
          text: 'DISMISS',
          textColor: theme.border,
        },
      });
      setExitApp(true);
      // Reset the flag after 2 seconds
      setTimeout(() => setExitApp(false), 2000);
      return true;
    }
  };

  useBackPress(handleBack);

  const handleShare = () => {
    isVibration && Vibration.vibrate(35);
    usePromote('share');
  };

  useEffect(() => {
    !isAgreeTerms &&
      openModal(
        <NoticeModal
          title="Notice"
          message="All the information provided by the generator is not true, including names, avatars, addresses, emails, social security numbers, credit card numbers and so on, are not real exist. They can't be used to make purchases online or to obtain employment or so on. We just generate this information randomly in the correct format or in valid syntax. By using this app, you agree to our Terms and Conditions and Privacy Policy."
        />,
        true,
      );
  }, [isAgreeTerms]);

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Fake Person Generator"
        iconLeft="cog"
        iconRight="share-variant"
        onPressLeft={handleSettings}
        onPressRight={handleShare}
        subtext={true}
      />
      <View style={styles.main}>
        <Image source={isDarkMode ? darkCrown : crown} style={styles.image} />
        <ButtonComponent
          title="Generate Profile"
          icon="auto-fix"
          onPress={handleProfile}
        />
        <ButtonComponent
          title="Bulk Generate"
          icon="check-all"
          onPress={handleBulk}
        />
        <ButtonComponent
          title="Saved Profiles"
          icon="heart-outline"
          onPress={handleSaved}
        />
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
      width: 120,
      height: 120,
      resizeMode: 'cover',
      marginBottom: 25,
    },
    btn: {
      gap: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    btnText: {
      fontSize: 18,
      color: theme.white,
    },
  });

export default HomeScreen;
