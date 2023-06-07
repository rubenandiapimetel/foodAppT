import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationAutocompleteComponent = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const locationResult = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationResult.coords;

    setLocation({ latitude, longitude });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={location ? { ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } : null}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // Aquí puedes implementar la lógica para obtener los detalles de la ubicación seleccionada
          // Utilizando los datos proporcionados por la API de Google Places Autocomplete
          const { lat, lng } = details.geometry.location;
          setLocation({ latitude: lat, longitude: lng });
        }}
        query={{
          key: 'AIzaSyD6HhMnlXP9bMFzQHTbvuQZ_3aJ7Reu6tY',
          language: 'en', // Idioma en el que se mostrarán los resultados
          components: 'country:es', // Limita los resultados a España
        }}
      />
    </View>
  );
};

export default LocationAutocompleteComponent;
