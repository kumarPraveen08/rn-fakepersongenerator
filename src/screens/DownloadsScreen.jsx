import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet, ScrollView, Vibration} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

import useTheme from '../hooks/useTheme';
import {formatFileSize, listFiles, openFile} from '../utils';
import HeaderComponent from '../components/HeaderComponent';
import useSettingsStorage from '../states/useSettingsStorage';

const DownloadsScreen = () => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();
  const {isVibration} = useSettingsStorage();
  const [files, setFiles] = useState([]);

  const handleBack = () => {
    isVibration && Vibration.vibrate(35);
    navigation.goBack();
  };

  useEffect(() => {
    listFiles(setFiles);
  }, [listFiles, setFiles]);

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Downloads"
        iconLeft="arrow-left"
        onPressLeft={handleBack}
        displayRight={false}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
        {files.length > 0 ? (
          files.map((file, index) => {
            return (
              <View key={index} style={styles.item}>
                <Icon
                  name="file"
                  size={20}
                  color={theme.background}
                  style={styles.iconTwo}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{file.name}</Text>
                  <Text style={styles.size}>{formatFileSize(file.size)}</Text>
                </View>
                <Menu>
                  <MenuTrigger
                    onPress={() => isVibration && Vibration.vibrate(35)}>
                    <Icon
                      name="dots-vertical"
                      size={28}
                      color={theme.border}
                      style={styles.icon}
                    />
                  </MenuTrigger>
                  <MenuOptions style={styles.menuOptions}>
                    <MenuOption
                      style={styles.menuOption}
                      onSelect={() => openFile(file.path)}>
                      <Icon
                        name="share-variant"
                        size={18}
                        color={theme.border}
                      />
                      <Text style={styles.menuText}>Share</Text>
                    </MenuOption>
                    {/* delete file action */}
                    {/* <MenuOption
                    style={styles.menuOption}
                    onSelect={() => deleteFile(file.path)}>
                    <Icon name="delete" size={18} color={theme.border} />
                    <Text style={styles.menuText}>Delete</Text>
                  </MenuOption> */}
                  </MenuOptions>
                </Menu>
              </View>
            );
          })
        ) : (
          <Text style={styles.noitem}>No Downloads Found!</Text>
        )}
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
      gap: 15,
      paddingLeft: 15,
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
    nameContainer: {
      flexDirection: 'column',
      gap: 0,
      flex: 1,
    },
    name: {
      fontSize: 18,
      color: theme.text,
    },
    size: {
      fontSize: 12,
      color: theme.text,
    },
    icon: {
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    iconTwo: {
      borderRadius: 50,
      backgroundColor: theme.border,
      padding: 5,
    },
    menuOptions: {
      backgroundColor: theme.light,
      padding: 10,
    },
    menuOption: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    menuText: {
      color: theme.text,
      fontSize: 16,
    },
    noitem: {
      fontSize: 16,
      textAlign: 'center',
      color: theme.border,
    },
  });

export default DownloadsScreen;
