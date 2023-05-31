import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Image, Text } from 'react-native';

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
          <View style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Inicio</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Favoritos</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Compartelo</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Mensajes</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={require('../src/food_images/4.jpg')} style={styles.icon} />
            <Text style={styles.iconText}>Mi Cuenta</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  searchBar: {
    height: 40,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  contentContainer: {
    flexGrow: 1,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 60,
  },
  itemContainer: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  smallDescription: {
    fontSize: 12,
    color: '#888',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 12,
    color: '#888',
  },
});

export default RenderItem;
