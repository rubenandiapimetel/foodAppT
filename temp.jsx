<Modal visible={modalVisible} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, detail) => {
          // Lógica para obtener los detalles de la ubicación seleccionada
          const { lat, lng } = detail.geometry.location;
          setLocatione(prevLocatione => ({
            ...prevLocatione,
            latitude: lat,
            longitude: lng
          }));
          setModalVisible(false); // Cerrar la ventana modal después de seleccionar una ubicación
        }}
        query={{
          key: "AIzaSyD6HhMnlXP9bMFzQHTbvuQZ_3aJ7Reu6tY",
          language: 'en',
          region: 'es'
        }}
      />
      <Button title="Cerrar" onPress={() => setModalVisible(false)} />
    </View>
  </View>
</Modal>