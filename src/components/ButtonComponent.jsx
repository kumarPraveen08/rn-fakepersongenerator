import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../hooks/useTheme';

const ButtonComponent = ({title, icon, onPress}) => {
  const theme = useTheme();
  const styles = createStyle(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}>
      <Icon name={icon} size={24} color={theme.white} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.text,
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%',
      backgroundColor: theme.text,
    },
    title: {
      fontSize: 18,
      color: theme.white,
    },
  });

export default ButtonComponent;
