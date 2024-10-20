import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const mmkvJsonStorage = {
  setItem: (name, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      storage.set(name, jsonValue);
    } catch (error) {
      console.error(`Error saving item ${name}:`, error);
    }
  },

  getItem: name => {
    try {
      const value = storage.getString(name);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error retrieving item ${name}:`, error);
      return null;
    }
  },

  removeItem: name => {
    try {
      storage.delete(name);
    } catch (error) {
      console.error(`Error removing item ${name}:`, error);
    }
  },
};

export default mmkvJsonStorage;
