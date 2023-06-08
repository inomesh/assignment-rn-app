import React, {ReactElement} from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  View,
  ViewStyle,
  Button,
} from 'react-native';

interface ModalProps {
  onClose: () => void;
  style?: ViewStyle;
  open: boolean;
  children: ReactElement;
}

const Modal: React.FC<ModalProps> = ({onClose, open, children, style}) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
      style={style}>
      <View style={styles.modalView}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color={'#000'} />
        </View>
        {children}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  buttonWrapper: {
    width: 100,
    alignSelf: 'flex-end',
    margin: 5,
    borderColor: '#fff',
    borderWidth: 1,
  },
});

export default Modal;
