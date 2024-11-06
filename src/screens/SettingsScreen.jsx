import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Vibration,
} from 'react-native';

import HeaderComponent from '../components/HeaderComponent';
import useSettingsStorage from '../states/useSettingsStorage';
import useTheme from '../hooks/useTheme';
import SETTINGS from '../constants/Settings';
import APP from '../constants/App';

const SettingsScreen = () => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();

  const {isDarkMode, setDarkMode, isVibration, setVibration} =
    useSettingsStorage();

  const handlePress = async action => {
    isVibration && Vibration.vibrate(35);
    if (action === 'screen-download') {
      navigation.navigate('DownloadsScreen');
    }
  };

  const handleBack = () => {
    isVibration && Vibration.vibrate(35);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Settings"
        iconLeft="arrow-left"
        onPressLeft={handleBack}
        displayRight={false}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
        {SETTINGS.map((setting, index) => {
          return (
            <View style={styles.item} key={index}>
              <Text style={styles.name}>{setting.name}</Text>
              {setting.action === 'toggle-theme' ||
              setting.action === 'toggle-vibration' ? (
                <Switch
                  value={
                    setting.action === 'toggle-theme' ? isDarkMode : isVibration
                  }
                  onValueChange={
                    setting.action === 'toggle-theme'
                      ? setDarkMode
                      : setVibration
                  }
                  style={styles.switch}
                  trackColor={{false: theme.border, true: theme.border}}
                  thumbColor={theme.text}
                />
              ) : setting.action === 'none' ? (
                <Text style={styles.version}>{APP.version}</Text>
              ) : (
                <Icon
                  name="chevron-right"
                  size={32}
                  color={theme.border}
                  style={styles.icon}
                  onPress={() => handlePress(setting.action)}
                />
              )}
            </View>
          );
        })}
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    item: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      paddingLeft: 20,
      borderRadius: 12,
      backgroundColor: theme.light,
      marginBottom: 15,
      overflow: 'hidden',
    },
    version: {
      color: theme.border,
      paddingVertical: 28,
      marginRight: 25,
    },
    name: {
      fontSize: 18,
      color: theme.text,
    },
    icon: {
      padding: 20,
    },
    switch: {
      paddingVertical: 22,
      paddingHorizontal: 20,
      marginRight: 20,
    },
  });

export default SettingsScreen;
