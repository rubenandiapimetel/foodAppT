import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

export default BottomBar = () =>{
  const navigation = useNavigation();
  return(

<View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('')}>
        <Icon name="restaurant" size={24} />
          <Text style={styles.iconText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Added')}>
        <Icon name="favorite-border" size={24} />
          <Text style={styles.iconText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
        <Icon name="add" size={24} />
          <Text style={styles.iconText}>Compártelo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
        <Icon name="chat" size={24} />
          <Text style={styles.iconText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
        <Icon name="person" size={24} />
          <Text style={styles.iconText}>Cuenta</Text>
        </TouchableOpacity>
      </View>
  )
}

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
    paddingBottom: 60, // Asegura que el contenido no se solape con la barra inferior
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
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