import {View, Text, StyleSheet, Vibration} from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import useSettingsStorage from '../states/useSettingsStorage';

const DisplayComponent = ({label, value}) => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const {isVibration} = useSettingsStorage();

  const handleCopy = () => {
    isVibration && Vibration.vibrate(35);
    Clipboard.setString(value);
    console.log('text copied: ' + value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Icon
        name="content-copy"
        color={theme.border}
        size={24}
        onPress={handleCopy}
      />
    </View>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.light,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      padding: 20,
      marginHorizontal: 20,
      borderRadius: 12,
      marginBottom: 15,
    },
    title: {
      alignItems: 'center',
      color: theme.text,
      margin: 20,
    },
    content: {
      flex: 1,
    },
    label: {
      fontSize: 12,
      color: theme.border,
    },
    value: {
      fontSize: 18,
      color: theme.text,
    },
  });

export default DisplayComponent;
