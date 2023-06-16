import React, { useState, useEffect } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, TextInput } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const LocationAutocompleteComponent = () => {
  const [locatione, setLocatione] = useState(null); 


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

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails= {true}
        onPress={(data, detail) => {
          // Aquí puedes implementar la lógica para obtener los detalles de la ubicación seleccionada
          // Utilizando los datos proporcionados por la API de Google Places Autocomplete

          const {lat,lng} = detail.geometry.location; 
          setLocatione(prevLocatione => ({
            ...prevLocatione,
            latitude: lat,
            longitude: lng
          }));
          //ESTA ES LA MANERA CORRECTA DE HACERLO CON SPREADS Y DESECTRUCTURING YA QUE 
          //HE TENIDO UN ERROR GARRAFAL AL PENSAR QUE DEVOLVIAN LATITUDE Y LONGITUDE EN VEZ DE LAT Y LNG
          
        }}
        query={{
          key: "AIzaSyD6HhMnlXP9bMFzQHTbvuQZ_3aJ7Reu6tY",
          language: 'en', // Idioma en el que se mrostrarán los resultado
          
          region: 'es'
        }}
        />
              <MapView
        style={{ flex: 1 }}
        region={locatione ? { ...locatione, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } : null}
        provider={PROVIDER_GOOGLE}
      >
        {locatione && <Marker coordinate={locatione} />}
       { console.log(locatione)}
      </MapView>
    </View>
  );
};

export default LocationAutocompleteComponent;

