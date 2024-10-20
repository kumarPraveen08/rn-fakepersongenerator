import {Share} from 'react-native';

const useMessage = message => {
  Share.share({message})
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

export default useMessage;
