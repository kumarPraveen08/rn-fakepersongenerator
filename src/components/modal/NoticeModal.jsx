import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Vibration,
} from 'react-native';
import React from 'react';

import useTheme from '../../hooks/useTheme';
import useSettingsStorage from '../../states/useSettingsStorage';
import {useModal} from '../../providers/ModalProvider';

const NoticeModal = ({title, message}) => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const {closeModal} = useModal();
  const {isVibration, setAgreeTerms} = useSettingsStorage();

  const handleCloseApp = () => {
    isVibration && Vibration.vibrate(35);
    BackHandler.exitApp();
  };

  const handleAgree = () => {
    isVibration && Vibration.vibrate(35);
    setAgreeTerms(true);
    closeModal();
  };

  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.steps}>
          <Text style={styles.step}>{message}</Text>
        </View>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          onPress={handleCloseApp}
          activeOpacity={0.7}
          style={styles.btn}>
          <Text style={styles.btnTextOne}>Close App</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAgree}
          activeOpacity={0.7}
          style={styles.btn}>
          <Text style={styles.btnTextTwo}>Yes, I Agree!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    content: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      color: theme.text,
      textAlign: 'center',
      width: '75%',
      fontWeight: 'bold',
    },
    steps: {
      gap: 10,
      marginVertical: 20,
    },
    step: {
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btn: {
      flex: 1,
      marginTop: 20,
    },
    btnTextOne: {
      fontSize: 16,
      color: theme.text,
      textAlign: 'left',
    },
    btnTextTwo: {
      fontSize: 16,
      color: theme.text,
      textAlign: 'right',
    },
  });

export default NoticeModal;
