import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import useTheme from '../../hooks/useTheme';
import {useModal} from '../../providers/ModalProvider';

const MessageModal = ({title, message}) => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const {closeModal} = useModal();

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
          <Text style={styles.btnTextTwo}>Got It!</Text>
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
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btn: {
      flex: 1,
      marginTop: 20,
    },
    btnTextTwo: {
      fontSize: 16,
      color: theme.border,
      textAlign: 'center',
    },
  });

export default MessageModal;
