import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CountryFlag from './CountryFlag';
import useTheme from '../hooks/useTheme';

const DropdownComponent = ({
  data,
  type = 'icon',
  title,
  choice,
  defaultIndex,
}) => {
  const theme = useTheme();
  const styles = createStyle(theme);

  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        choice(selectedItem.value);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View
            style={[styles.dropdownButtonStyle, {gap: type === 'flag' && 10}]}>
            {selectedItem && type === 'icon' && (
              <Icon
                name={selectedItem.icon}
                style={styles.dropdownButtonIconStyle}
                color={theme.text}
              />
            )}
            {selectedItem && type === 'flag' && (
              <CountryFlag
                isoCode={selectedItem.flag}
                style={{borderRadius: 3}}
              />
            )}
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || title}
            </Text>
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              style={styles.dropdownButtonArrowStyle}
              color={theme.text}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View style={{backgroundColor: theme.light}}>
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: theme.light},
                {gap: type === 'flag' && 10}),
              }}>
              {type === 'icon' && (
                <Icon
                  name={item.icon}
                  style={styles.dropdownItemIconStyle}
                  color={theme.text}
                />
              )}
              {type === 'flag' && (
                <CountryFlag isoCode={item.flag} style={{borderRadius: 3}} />
              )}
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
            {type === 'flag' && item?.icon === 'gb' && (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: 'lightgray',
                  marginVertical: 10,
                }}
              />
            )}
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
      defaultValueByIndex={defaultIndex}
    />
  );
};

const createStyle = theme =>
  StyleSheet.create({
    dropdownButtonStyle: {
      height: 50,
      backgroundColor: theme.light,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: theme.text,
      textAlign: 'center',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 24,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: theme.text, //'#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      backgroundColor: theme.light,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: theme.text,
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });

export default DropdownComponent;
