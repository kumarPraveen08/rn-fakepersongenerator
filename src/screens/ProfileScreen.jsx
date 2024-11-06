import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import React, {useState} from 'react';
import useTheme from '../hooks/useTheme';
import HeaderComponent from '../components/HeaderComponent';
import TabViewComponent from '../components/TabViewComponent';
import {useNavigation} from '@react-navigation/native';
import useBookmarksStore from '../states/useBookmarksStore';
import useSettingsStorage from '../states/useSettingsStorage';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Warning: A props object containing a "key" prop is being spread into JSX',
]);

const ProfileScreen = props => {
  const {data} = props.route.params;
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();
  const {isVibration} = useSettingsStorage();
  const {addBookmark, removeBookmark, isBookmarked} = useBookmarksStore();
  const [loading, setLoading] = useState(false);

  const handleBookmark = () => {
    isVibration && Vibration.vibrate(35);
    if (isBookmarked(data.seed)) {
      removeBookmark(data.seed);
    } else {
      addBookmark(data);
    }
  };

  const handleBack = () => {
    isVibration && Vibration.vibrate(35);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Fake Person Profile"
        iconLeft="arrow-left"
        iconRight={isBookmarked(data.seed) ? 'heart' : 'heart-outline'}
        onPressLeft={handleBack}
        onPressRight={handleBookmark}
      />
      <View style={styles.main}>
        <View style={styles.top}>
          {loading && (
            <ActivityIndicator color={theme.border} style={styles.loader} />
          )}
          <Image
            source={data?.avatar}
            style={styles.image}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => setLoading(false)} // Handle error case
          />
        </View>
        <View style={styles.bottom}>
          <TabViewComponent data={data} />
        </View>
      </View>
    </View>
  );
};

const createStyle = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    main: {
      flex: 1,
    },
    top: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.light,
      gap: 12,
      position: 'relative',
    },
    bottom: {
      flex: 3,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.text,
      resizeMode: 'cover',
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tab: {
      padding: 15,
      borderColor: theme.text,
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: -12.5,
      marginTop: -12.5,
    },
  });

export default ProfileScreen;
