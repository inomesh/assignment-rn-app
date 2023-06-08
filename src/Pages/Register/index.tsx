import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import Camera from '../../Components/Camera';
import storage from '@react-native-firebase/storage';
import AdhaaarCard from './AdhaaarCard';
import {RootContext} from '../../Context';

interface ListProps {
  label: string;
  onPress: any;
  isFullFilled: boolean;
}

const ListWrapper = ({label, onPress, isFullFilled}: ListProps) => (
  <View style={styles.listWrapper}>
    <Text style={styles.listText}>{label}</Text>
    {isFullFilled && <Text style={styles.statusStyle}>Captured</Text>}
    <Button text="Capture" style={styles.listButton} onPress={onPress} />
  </View>
);

const Register = () => {
  const state = React.useContext(RootContext);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [openAdhaarModal, setOpenAdhaarModal] = useState(false);

  const handleOpenCameraModal = () => {
    setOpenCameraModal(true);
  };

  const handleCloseCameraModal = () => {
    setOpenCameraModal(false);
  };

  const handleImageCapturedSuccessfully = async (imageName: string) => {
    try {
      const imageUrl = await storage().ref(imageName).getDownloadURL();
      state.handleChangeValue({field: 'image', value: imageUrl});
      state.handleChangeValue({field: 'isImageCaptured', value: true});
    } catch (error) {
      console.log('error', error);
    } finally {
      handleCloseCameraModal();
    }
  };

  const handleOpenAdhaarModal = () => {
    setOpenAdhaarModal(true);
  };

  const handleCloseAdhaarModal = () => {
    setOpenAdhaarModal(false);
  };

  const handleAdhaarCapturedSuccessfully = (data: object) => {
    state.handleChangeValue({field: 'adhaar', value: data});
    state.handleChangeValue({field: 'isAdhaarCaptured', value: true});
    handleCloseAdhaarModal();
  };
  console.log(state);

  return (
    <View style={styles.container}>
      <ListWrapper
        label="Take A Selfie"
        isFullFilled={state.values?.isImageCaptured}
        onPress={handleOpenCameraModal}
      />

      <ListWrapper
        label="Adhaar Card"
        isFullFilled={state.values?.isAdhaarCaptured}
        onPress={handleOpenAdhaarModal}
      />

      <Modal open={openCameraModal} onClose={handleCloseCameraModal}>
        <Camera
          handleClose={handleCloseCameraModal}
          handleSuccess={handleImageCapturedSuccessfully}
        />
      </Modal>

      <Modal open={openAdhaarModal} onClose={handleCloseAdhaarModal}>
        <AdhaaarCard
          handleClose={handleCloseAdhaarModal}
          handleSuccess={handleAdhaarCapturedSuccessfully}
        />
      </Modal>

      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{uri: state.values?.image}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  listWrapper: {
    flexDirection: 'row',
    gap: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 22,
    color: '#000',
  },
  listButton: {
    width: 100,
  },
  statusStyle: {
    fontSize: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  imageWrapper: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Register;
