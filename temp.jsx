import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

const RenderItem = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  // Simulación de datos obtenidos de una base de datos
  useEffect(() => {
    // Aquí debes obtener los datos de tu base de datos y establecerlos en el estado "data"
    const dummyData = [
      { id: 1, image: require('../src/food_images/1.jpg'), description: 'Descripción 1', smallDescription: 'Descripción pequeña 1' },
      { id: 2, image: require('../src/food_images/2.jpg'), description: 'Descripción 2', smallDescription: 'Descripción pequeña 2' },
      { id: 3, image: require('../src/food_images/3.jpg'), description: 'Descripción 3', smallDescription: 'Descripción pequeña 3' },
      { id: 4, image: require('../src/food_images/4.jpg'), description: 'Descripción 4', smallDescription: 'Descripción pequeña 4' },
      { id: 5, image: require('../src/food_images/3.jpg'), description: 'Descripción 5', smallDescription: 'Descripción pequeña 5' },
      { id: 6, image: require('../src/food_images/3.jpg'), description: 'Descripción 6', smallDescription: 'Descripción pequeña 6' },
      // ...
    ];
    setData(dummyData);
  }, []);

  // Función para renderizar cada elemento de la lista

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder="Buscaar"
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.listContainer}>
          {data.map(item => (
            <View style={styles.itemContainer} key={item.id}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.smallDescription}>{item.smallDescription}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Compartelo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Mensajes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Mi Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos
// ...

export default RenderItem;
