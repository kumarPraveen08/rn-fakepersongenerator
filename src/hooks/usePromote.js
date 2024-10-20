import useBrowse from './useBrowse';
import useMessage from './useMessage';
import APP from '../constants/App';

const usePromote = (action = 'moreapps') => {
  if (action === 'share') {
    useMessage(APP.share + APP.package);
  } else if (action === 'feedback') {
    useBrowse(APP.support);
  } else if (action === 'rate') {
    useBrowse(APP.rate + APP.package);
  } else if (action === 'moreapps') {
    useBrowse(APP.dev);
  }
};

export default usePromote;
