import {Modal, View, StyleSheet} from 'react-native';
import React, {createContext, useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../hooks/useTheme';

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
  const theme = useTheme();
  const styles = createStyle(theme);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isForced, setForce] = useState(false);

  const openModal = (content, force = false) => {
    setModalContent(content);
    setModalVisible(true);
    setForce(force);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{openModal, closeModal}}>
      {children}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={!isForced && closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {!isForced && (
              <Icon
                style={styles.close}
                name="close"
                color={theme.text}
                size={24}
                onPress={closeModal}
              />
            )}
            {modalContent}
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

const createStyle = theme =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: theme.background,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 20,
    },
    close: {
      position: 'absolute',
      top: 15,
      right: 15,
      zIndex: 10,
    },
  });
