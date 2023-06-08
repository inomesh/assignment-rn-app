import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import storage from '@react-native-firebase/storage';

const PendingView = () => (
  <View style={styles.paddingView}>
    <Text>Waiting For the Camera to get ready</Text>
  </View>
);

interface CameraProps {
  handleClose: Function;
  handleSuccess: Function;
}

const CAMERA_VIEW_CONSTANTS = {
  FRONT: {key: RNCamera.Constants.Type.front},
  BACK: {key: RNCamera.Constants.Type.back},
};

export default function Camera({handleClose, handleSuccess}: CameraProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [cameraView, setCameraView] = useState(CAMERA_VIEW_CONSTANTS.FRONT.key);
  const handleImageUpload = useCallback(async function (imageUri: string) {
    try {
      // create bucket storage reference to not yet existing image
      setIsUploading(true);
      const imageExtn = imageUri.split('.').reverse()[0];
      const imageName = `${Date.now()}.${imageExtn}`;
      // uploads file
      const result = await storage().ref(imageName).putFile(imageUri);
      if (result.state === 'success') {
        handleSuccess(result.metadata.name);
      } else {
        throw new Error('Error in uploading image');
      }
    } catch (error) {
      Alert.alert('Error', 'Error occured while uploading photo', [
        {
          text: 'Close',
          onPress(value) {
            handleClose();
          },
        },
      ]);
    }
  }, []);

  const takePicture = async function (camera: any) {
    try {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      handleImageUpload(data.uri);
    } catch (error) {
      Alert.alert('Error', 'Error occured while capturing photo', [
        {
          text: 'Close',
          onPress(value) {
            handleClose();
          },
        },
      ]);
    }
  };

  const handleToggleCameraView = () => {
    setCameraView((previousView: string) => {
      if (previousView === CAMERA_VIEW_CONSTANTS.FRONT.key) {
        return CAMERA_VIEW_CONSTANTS.BACK.key;
      } else {
        return CAMERA_VIEW_CONSTANTS.FRONT.key;
      }
    });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        captureAudio={false}
        style={styles.preview}
        type={cameraView}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              {isUploading ? (
                <View style={styles.capture}>
                  <ActivityIndicator size={'large'} />
                  <Text>Uploading...</Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={handleToggleCameraView}
                    style={styles.capture}>
                    <Text style={{fontSize: 14}}> Switch </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => takePicture(camera)}
                    style={styles.capture}>
                    <Text style={{fontSize: 14}}> SNAP </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  paddingView: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
