import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import mmkvJsonStorage from './mmkvJsonStorage';

const useSettingsStorage = create(
  persist(
    (set, get) => ({
      isDarkMode: false,
      isVibration: true,
      isAppRated: false,
      notificationTime: null,
      isAgreeTerms: false,
      setNotificationTime: time =>
        set(state => ({
          notificationTime: time,
        })),
      setAppRated: status =>
        set(state => ({
          isAppRated: status,
        })),
      setDarkMode: status =>
        set(state => ({
          isDarkMode: status,
        })),
      setVibration: status =>
        set(state => ({
          isVibration: status,
        })),
      setAgreeTerms: status =>
        set(state => ({
          isAgreeTerms: status,
        })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => mmkvJsonStorage),
    },
  ),
);

export default useSettingsStorage;
