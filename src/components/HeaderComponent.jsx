import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../hooks/useTheme';

const HeaderComponent = ({
  title,
  iconLeft = 'arrow-left',
  iconRight = 'heart-outline',
  subtext = false,
  onPressLeft,
  onPressRight,
  displayRight = true,
}) => {
  const theme = useTheme();
  const styles = createStyle(theme);

  return (
    <View style={styles.container}>
      <Icon
        name={iconLeft}
        size={24}
        color={theme.text}
        onPress={onPressLeft}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtext && <Text style={styles.subtext}>Created by Ivyadu</Text>}
      </View>
      {displayRight ? (
        <Icon
          name={iconRight}
          size={24}
          color={theme.text}
          onPress={onPressRight}
        />
      ) : (
        <View style={{width: 24}} />
      )}
    </View>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    subtext: {
      fontSize: 12,
      color: theme.border,
      textAlign: 'center',
    },
  });

export default HeaderComponent;
