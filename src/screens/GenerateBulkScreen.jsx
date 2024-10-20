import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  darkShield,
  flattenData,
  jsonToCSV,
  shield,
  writeCSVFile,
} from '../utils';
import useTheme from '../hooks/useTheme';
import usePromote from '../hooks/usePromote';
import usePerson from '../hooks/api/usePerson';
import {useModal} from '../providers/ModalProvider';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import MessageModal from '../components/modal/MessageModal';
import {ages, countries, gender} from '../constants/Options';
import useSettingsStorage from '../states/useSettingsStorage';
import DropdownComponent from '../components/DropdownComponent';
import useInternetConnection from '../hooks/useInternetConnection';
import BannerAdComponent from '../components/BannerAdComponent';
import useBackPress from '../hooks/useHardwareBack';
import useInterstitialAd from '../hooks/useInterstitialAd';

const GenerateBulkScreen = () => {
  const theme = useTheme();
  const styles = createStyle(theme);
  const navigation = useNavigation();
  const {isDarkMode, isVibration} = useSettingsStorage();
  const [sex, setSex] = useState('random');
  const [age, setAge] = useState({minAge: 18, maxAge: 65});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [makingFile, setMakingFile] = useState(false);
  const [country, setCountry] = useState('en_US');
  const [persons, setPersons] = useState([]);
  const [isFinished, setFinished] = useState(false);
  const {openModal} = useModal();
  const isConnected = useInternetConnection();
  const {isAdLoaded, showAd} = useInterstitialAd();

  const handleGenerate = () => {
    isVibration && Vibration.vibrate(35);
    if (isConnected) {
      setLoading(true);
      setTimeout(() => {
        try {
          const generatedPersons = usePerson(country, sex, age, quantity);
          setPersons(generatedPersons);
        } catch (error) {
          console.error(error);
          openModal(
            <MessageModal
              title="Error"
              message="Failed to generate persons. Please try again."
            />,
          );
          setLoading(false);
        } finally {
          setLoading(false);
          setFinished(true);
        }
      }, 100);
    } else {
      ToastAndroid.show('No Internet Connection', ToastAndroid.SHORT);
    }
  };

  const handleDownloadCSV = async () => {
    isVibration && Vibration.vibrate(35);
    if (persons.length === 0) {
      openModal(<MessageModal title="Error" message="No data to download" />);
      return;
    }

    setMakingFile(true);
    let filePath;

    setTimeout(async () => {
      try {
        const normalData = flattenData(persons.data);
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
            message={`File is saved at: ${
              filePath || 'unknown location'
            } or Check Downloads Section in Settings.`}
          />,
        );
        setMakingFile(false);
      }
    }, 100);
  };

  const handleReset = () => {
    isVibration && Vibration.vibrate(35);
    setPersons([]);
    setQuantity(1);
    setFinished(false);
  };

  const handleBack = () => {
    if (isAdLoaded && Math.random() < 0.5) {
      showAd();
    }
    isVibration && Vibration.vibrate(35);
    navigation.goBack();
    return true;
  };

  const handleShare = () => {
    isVibration && Vibration.vibrate(35);
    usePromote('share');
  };

  useBackPress(handleBack);

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Generate Bulk Profiles"
        iconLeft="arrow-left"
        iconRight="share-variant"
        onPressLeft={handleBack}
        onPressRight={handleShare}
      />
      <View style={styles.main}>
        <Image source={isDarkMode ? darkShield : shield} style={styles.image} />
        <View style={styles.tool}>
          <DropdownComponent
            data={gender}
            title="Gender"
            type="icon"
            choice={setSex}
            defaultIndex={0}
          />
          <DropdownComponent
            data={ages}
            title="Age Group"
            type="icon"
            choice={setAge}
            defaultIndex={0}
          />
          <DropdownComponent
            data={countries}
            title="Countries"
            type="flag"
            choice={setCountry}
            defaultIndex={7}
          />
          <Slider
            step={1}
            style={{
              width: '100%',
            }}
            value={quantity}
            minimumValue={1}
            maximumValue={1000}
            minimumTrackTintColor={theme.text}
            maximumTrackTintColor={theme.border}
            onValueChange={setQuantity}
          />
        </View>
        {!isFinished ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            disabled={loading}
            onPress={handleGenerate}>
            {loading ? (
              <ActivityIndicator color={theme.white} />
            ) : (
              <Icon name="auto-fix" size={24} color={theme.white} />
            )}
            <Text style={styles.btnText}>
              {loading ? 'Generating...' : 'Generate'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.action}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.btn}
              disabled={makingFile}
              onPress={handleDownloadCSV}>
              {makingFile ? (
                <ActivityIndicator color={theme.white} />
              ) : (
                <Icon name="download" size={24} color={theme.white} />
              )}
              <Text style={styles.btnText}>
                {makingFile ? 'Creating File...' : 'DOWNLOAD CSV'}
              </Text>
            </TouchableOpacity>
            <ButtonComponent
              title="Reset"
              icon="reload"
              onPress={handleReset}
            />
          </View>
        )}
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
      </View>
      <BannerAdComponent type="other" theme={theme} />
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
      padding: 20,
      alignItems: 'center',
      marginHorizontal: 25,
      marginTop: 50,
      gap: 15,
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: 'cover',
    },
    tool: {
      marginTop: 25,
      flexDirection: 'column',
      width: '100%',
      gap: 15,
    },
    quantity: {
      fontSize: 12,
      color: theme.border,
      textAlign: 'center',
    },
    btn: {
      gap: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: theme.text,
      width: '100%',
    },
    btnText: {
      fontSize: 18,
      color: theme.white,
    },
    action: {
      flexDirection: 'column',
      gap: 14,
      width: '100%',
    },
  });

export default GenerateBulkScreen;
