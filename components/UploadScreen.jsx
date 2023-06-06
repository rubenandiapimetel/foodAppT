import React, { useState } from 'react';
import {StyleSheet, StatusBar, SafeAreaView, View, Text, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import ButtomBar from '../src_components/ButtomBar';
import MapView from 'react-native-maps';

const UploadFoodComponent = () => {
  const [foodImage, setFoodImage] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(null);

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

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos denegados', 'Se requieren permisos para acceder a la ubicación.');
      return;
    }

    const locationResult = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationResult.coords;

    setLocation({ latitude, longitude });
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
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        value={foodName}
        onChangeText={setFoodName}
      />

      <Text style={{ fontSize: 18 }}>Añade descripción</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={{ fontSize: 18 }}>Precio</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, flex: 1 }}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={{ fontSize: 20, marginLeft: 10 }}>€</Text>
      </View>

      <Text style={{ fontSize: 18 }}>Te encontrarán en</Text>
      <TouchableOpacity onPress={getLocation}>
      <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
      </TouchableOpacity>
      {location && (
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 }}
          placeholder="Introduce calle y número"
          // Aquí puedes utilizar alguna librería de autocompletado de direcciones, como react-native-google-places-autocomplete
        />
      )}

      <Button title="Subir" onPress={handleUpload} />
      <ButtomBar/>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
});


export default UploadFoodComponent;
