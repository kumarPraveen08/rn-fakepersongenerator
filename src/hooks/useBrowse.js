import {Linking} from 'react-native';

const useBrowse = url => {
  Linking.openURL(url)
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

export default useBrowse;
