import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import React from 'react';

import useTheme from '../../hooks/useTheme';
import {useModal} from '../../providers/ModalProvider';
import useBookmarksStore from '../../states/useBookmarksStore';
import useSettingsStorage from '../../states/useSettingsStorage';

const DeleteModal = ({title, message}) => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const {closeModal} = useModal();
  const {removeAll} = useBookmarksStore();
  const {isVibration} = useSettingsStorage();

  const handleDelete = () => {
    isVibration && Vibration.vibrate(35);
    removeAll();
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
          onPress={closeModal}
          activeOpacity={0.7}
          style={styles.btn}>
          <Text style={styles.btnTextOne}>Not Now!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.7}
          style={styles.btn}>
          <Text style={styles.btnTextTwo}>Delete All</Text>
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
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      margin: 20,
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
    subtext: {
      fontSize: 14,
      color: theme.border,
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
      color: theme.border,
      textAlign: 'left',
    },
    btnTextTwo: {
      fontSize: 16,
      color: theme.border,
      textAlign: 'right',
    },
  });

export default DeleteModal;
