/* import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import LocationAutocompleteComponent from './components/temp';

const LocationAutocompleteComponent = () => {
  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    (async () => {
      await getLocation();
    })();
  }, []);

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

  const handleAutocomplete = async (text) => {
    setSearchText(text);

    // Aquí puedes implementar la lógica para obtener las predicciones de ubicación
    // Puedes utilizar alguna API de autocompletado de direcciones, como Google Places Autocomplete

    // Ejemplo de obtención de predicciones ficticias
    const fakePredictions = [
      { description: 'Location 1', place_id: '1' },
      { description: 'Location 2', place_id: '2' },
      { description: 'Location 3', place_id: '3' },
    ];

    setPredictions(fakePredictions);
  };

  const handlePredictionSelect = async (prediction) => {
    // Aquí puedes implementar la lógica para obtener los detalles de la ubicación seleccionada
    // Utilizando el place_id de la predicción seleccionada

    // Ejemplo de obtención de detalles de ubicación ficticia
    const fakeLocation = { latitude: 40.7128, longitude: -74.0060 };

    setLocation(fakeLocation);
    setPredictions([]);
    setSearchText('');
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={location ? { ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } : null}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={handleAutocomplete}
        value={searchText}
        placeholder="Enter location"
      />
      {predictions.map((prediction) => (
        <Text key={prediction.place_id} onPress={() => handlePredictionSelect(prediction)}>
          {prediction.description}
        </Text>
      ))}
    </View>
  );
};

export default LocationAutocompleteComponent; */