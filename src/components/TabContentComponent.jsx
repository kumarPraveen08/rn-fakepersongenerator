import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';
import DisplayComponent from './DisplayComponent';

const TabContentComponent = ({data, title}) => {
  const theme = useTheme();
  const styles = createStyle(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.map((item, index) => (
          <DisplayComponent key={index} label={item.key} value={item.value} />
        ))}
        <Text style={styles.note}>
          WARNING: Do not send funds to any of these addresses. You will lose
          your money. The fake credit cards generated in this app are purely for
          testing purposes and not real.
        </Text>
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
    title: {
      textAlign: 'center',
      color: theme.text,
      margin: 20,
      fontSize: 18,
      fontWeight: 'bold',
    },
    note: {
      fontSize: 12,
      color: theme.border,
      flex: 1,
      margin: 20,
    },
  });

export default TabContentComponent;
