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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'

const UploadFoodComponent = () => {
  const [foodImage, setFoodImage] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [locatione, setLocatione] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [adress, setAdress] = useState(null);
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') { 
      console.log('Permission denied');
      return;
    }
    console.log('Permission accpet');
    const locationResult = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationResult.coords;

    setLocatione({ latitude, longitude });
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
    // Aquí puedes implementar la lógica para subir la imagen y los datos a tu servidor o base de datos
    // Por simplicidad, solo mostraremos los valores en la consola

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

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, padding: 20 }}>

        <Text style={{ fontSize: 18, marginBottom: 10 }}>Sube fotos de tu plato</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginTop:20 }}>
          <TouchableOpacity onPress={pickImageFromCamera}>
            <AntDesign name="upload" size={30}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromGallery}>
          <AntDesign name="upload" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromCamera}>
          <AntDesign name="upload" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromGallery}>
          <AntDesign name="upload" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromCamera}>
          <AntDesign name="upload" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromGallery}>
          <AntDesign name="upload" size={30} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 18, marginTop: 20 }}>¿Que has cocinado hoy?</Text>
        <TextInput
          style={styles.input}
          value={foodName}
          onChangeText={setFoodName}
        />

        <Text style={{ fontSize: 18 }}>Añade una descripción del plato</Text>
        <TextInput
          style={styles.inputDescrip}
          value={description}
          multiline={true}  
          onChangeText={setDescription}
        />

        <Text style={{ fontSize: 18,  marginRight: 10 }} >Precio</Text>
        <TextInput
          style={styles.inputPrice}
          value={price}
          placeholder = { price ? price : "€"}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={{ fontSize: 18, marginBottom: 10, }}>Te encontrarán en</Text>
        <View >
          <TouchableWithoutFeedback onPress={openModal}>
            <View>
              <TextInput
                style={styles.input}
                placeholder={ adress ? adress : "Selecciona una ubicación"}
                editable={false} // Desactiva la edición del TextInput
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={locatione ? { ...locatione, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } : null}
            provider={PROVIDER_GOOGLE}
          >
            {locatione && <Marker coordinate={locatione} />}
            {console.log(locatione)}
          </MapView>

          <Button style={{ padding: 40, }} title="Subir" onPress={handleUpload} />
        </View>
        <ButtomBar />

      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <KeyboardAvoidingView style={styles.modalContainer} >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                  <GooglePlacesAutocomplete style = {styles.googlePlacesAutocomplete}
                    placeholder={ adress ? adress : "Selecciona una ubicación"}
                    fetchDetails={true}
                    onPress={(data, detail) => {
                      const { lat, lng } = detail.geometry.location;
                      setLocatione((prevLocatione) => ({
                        ...prevLocatione,
                        latitude: lat,
                        longitude: lng,
                      }));
                      setAdress(data.description);
                      {console.log(data,detail)} //logs para ver la ubicacion
                    }}
                    query={{
                      key: "AIzaSyD6HhMnlXP9bMFzQHTbvuQZ_3aJ7Reu6tY",
                      language: 'en',
                      region: 'es'
                    }}
                  />
                  <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.applyButtonText}>Aplicar</Text>
                  </TouchableOpacity>
              
                <MapView
                  style={styles.mapModal}
                  region={locatione ? { ...locatione, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } : null}
                  provider={PROVIDER_GOOGLE}
                >
                  {locatione && <Marker coordinate={locatione} />}
                </MapView>

              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#ffff',
  },
  inputPrice: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#ffff',
    width: 5 *16
  },
  inputDescrip: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#ffff',
    height: 10 * 16, // Ajusta el número de filas multiplicando el tamaño de fuente
    textAlignVertical: 'top', // Alinea el texto en la parte superior del inputtextAlign: 
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flex: 1,

  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  mapModal: {
    height: "90%",
    width:"100%",
    zIndex: -1,
  },
  inputContainer: {
    marginTop: 16,
    flex: 1,
  },
  applyButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  googlePlacesAutocomplete: {
    position: 'absolute',
    zIndex: 1,
  },
});


export default UploadFoodComponent;
