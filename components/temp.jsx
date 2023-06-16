import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import ButtomBar from '../src_components/ButtomBar';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const UploadFoodComponent = () => {
  const [foodImage, setFoodImage] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const placesAutocompleteRef = useRef();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }
    console.log('Permission accepted');
    const locationResult = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationResult.coords;

    setLocation({ latitude, longitude });
  };

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos denegados', 'Se requieren permisos para acceder a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setFoodImage(result.uri);
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos denegados', 'Se requieren permisos para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setFoodImage(result.uri);
    }
  };

  const handleUpload = () => {
    console.log('Imagen:', foodImage);
    console.log('Nombre:', foodName);
    console.log('Descripción:', description);
    console.log('Precio:', price);
    console.log('Ubicación:', location);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
<SafeAreaView style={{flex : 1}}>
      <StatusBar barStyle="light-content" />
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Subelo</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity onPress={pickImageFromCamera}>
          <Image source={require('../src/google_icon.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageFromGallery}>
          <Image source={require('../src/google_icon.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageFromCamera}>
          <Image source={require('../src/google_icon.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageFromGallery}>
          <Image source={require('../src/google_icon.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageFromCamera}>
          <Image source={require('../src/google_icon.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18, marginTop: 20 }}>Que has cocinado?</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la comida"
          value={foodName}
          onChangeText={setFoodName}
        />
        <Text style={{ fontSize: 18 }}>Añade descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={{ fontSize: 18 }}>Precio</Text>
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={{ fontSize: 20, marginLeft: 10 }}>€</Text>
        <Text style={{ fontSize: 18, marginBottom: 10, }}>Te encontrarán en</Text>
        <View style={styles.inputContainer}>
          <TouchableWithoutFeedback onPress={openModal}>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Selecciona una ubicación"
                editable={false}// Desactiva la edición del TextInput
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Button title="Subir" onPress={handleUpload} />
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContent}>
          <MapView
            style={{ flex: 1 }}
            region={
              location
                ? { ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
                : null
            }
            provider={PROVIDER_GOOGLE}
          >
            {location && <Marker coordinate={location} />}
          </MapView>
          <GooglePlacesAutocomplete
            ref={placesAutocompleteRef}
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, detail) => {
              const { lat, lng } = detail.geometry.location;
              setLocation(prevLocation => ({
                ...prevLocation,
                latitude: lat,
                longitude: lng,
              }));
              setModalVisible(false);
            }}
            query={{
              key: 'AIzaSyD6HhMnlXP9bMFzQHTbvuQZ_3aJ7Reu6tY',
              language: 'en',
              region: 'es',
            }}
          />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default UploadFoodComponent;
