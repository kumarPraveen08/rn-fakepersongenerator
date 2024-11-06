import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useBookmarksStore from '../states/useBookmarksStore';
import useSettingsStorage from '../states/useSettingsStorage';
import {useModal} from '../providers/ModalProvider';
import ProfileItem from '../components/ProfileItem';
import DeleteModal from '../components/modal/DeleteModal';
import MessageModal from '../components/modal/MessageModal';
import useTheme from '../hooks/useTheme';
import {flattenData, jsonToCSV, writeCSVFile} from '../utils';

const SavedScreen = () => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();
  const {isVibration} = useSettingsStorage();
  const {bookmarks} = useBookmarksStore();
  const [loading, setLoading] = useState(false);
  const {openModal} = useModal();

  const handleExport = () => {
    isVibration && Vibration.vibrate(35);
    if (bookmarks.length === 0) {
      openModal(<MessageModal title="Error" message="No data to download" />);
      return;
    }

    setLoading(true);
    let filePath;

    setTimeout(async () => {
      try {
        const normalData = flattenData(bookmarks);
        const csvData = jsonToCSV(normalData);
        filePath = await writeCSVFile(csvData);
      } catch (error) {
        console.error(error);
        openModal(
          <MessageModal title="Error" message="Failed to create CSV file" />,
        );
      } finally {
        openModal(
          <MessageModal
            title="CSV File Created"
            message={`File is saved at: ${filePath || 'unknown location'}`}
          />,
        );
        setLoading(false);
      }
    }, 100);
  };

  const handleBack = () => {
    isVibration && Vibration.vibrate(35);
    navigation.goBack();
  };

  const handleRemoveAll = () => {
    isVibration && Vibration.vibrate(35);
    openModal(
      <DeleteModal
        title="Are you sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          size={24}
          color={theme.text}
          onPress={handleBack}
        />
        <Text style={styles.title}>Saved Profiles</Text>
        <Menu>
          <MenuTrigger onPress={() => isVibration && Vibration.vibrate(35)}>
            <Icon name="dots-vertical" size={24} color={theme.text} />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptions}>
            <MenuOption style={styles.menuOption} onSelect={handleExport}>
              <Icon name="microsoft-excel" size={18} color={theme.border} />
              <Text style={styles.menuText}>Export to CSV</Text>
            </MenuOption>
            <MenuOption style={styles.menuOption} onSelect={handleRemoveAll}>
              <Icon name="delete" size={18} color={theme.border} />
              <Text style={styles.menuText}>Remove All</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <ScrollView style={{padding: 20}}>
        {loading && (
          <View>
            <ActivityIndicator color={theme.border} />
            <Text style={styles.loadingText}>Creating CSV File...</Text>
          </View>
        )}
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark, index) => (
            <ProfileItem data={bookmark} key={index} />
          ))
        ) : (
          <Text style={styles.noitem}>No Item Found!</Text>
        )}
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
    headerContainer: {
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
    loadingText: {
      fontSize: 12,
      color: theme.border,
      marginBottom: 15,
      marginTop: 5,
      textAlign: 'center',
    },
  });

export default SavedScreen;
