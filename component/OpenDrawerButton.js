import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons

const OpenDrawerButton = () => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOpenDrawer}>
      <Icon name="menu" size={30} color="#333" /> {/* Hamburger Icon */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default OpenDrawerButton;
