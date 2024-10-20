import THEME from '../constants/Theme';
import useSettingsStorage from '../states/useSettingsStorage';

const useTheme = () => {
  const {isDarkMode} = useSettingsStorage();
  return isDarkMode ? THEME.dark : THEME.light;
};

export default useTheme;
