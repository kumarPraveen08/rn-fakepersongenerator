import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useBookmarksStore from '../states/useBookmarksStore';
import useSettingsStorage from '../states/useSettingsStorage';
import useTheme from '../hooks/useTheme';
import CountryFlag from './CountryFlag';
import {countries} from '../constants/Options';

const ProfileItem = ({data}) => {
  const {personal, avatar, seed, flag} = data;
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();
  const {isVibration} = useSettingsStorage();
  const {removeBookmark} = useBookmarksStore();

  const handlePress = () => {
    isVibration && Vibration.vibrate(35);
    navigation.navigate('ProfileScreen', {data});
  };

  const handleDelete = () => {
    isVibration && Vibration.vibrate(35);
    removeBookmark(data.seed);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={handlePress}>
      <Image source={avatar} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{personal[2].value}</Text>
        <Text style={styles.seed}>Seed: {seed}</Text>
      </View>
      <Icon name="delete" size={24} color={theme.text} onPress={handleDelete} />
      <CountryFlag
        isoCode={flag || require('../assets/flags/zz.webp')}
        style={styles.flag}
      />
    </TouchableOpacity>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.light,
      marginBottom: 15,
      borderRadius: 12,
      padding: 10,
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    image: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      borderRadius: 12,
    },
    content: {
      flex: 1,
    },
    label: {
      fontSize: 12,
      color: theme.border,
    },
    value: {
      color: theme.text,
      fontSize: 16,
    },
    seed: {
      color: theme.border,
      fontSize: 12,
    },
    name: {
      flexDirection: 'row',
      gap: 10,
    },
    flag: {
      position: 'absolute',
      bottom: 11,
      left: 25,
      borderRadius: 3,
    },
  });

export default ProfileItem;
