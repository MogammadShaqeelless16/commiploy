import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const inventoryData = [
  {
    id: '1',
    name: 'T-Shirt - Street Art',
    description: 'Colorful street art design, unisex, cotton fabric.',
    price: 'R100.00',
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=T-Shirt',
  },
  {
    id: '2',
    name: 'Local Handwoven Basket',
    description: 'Handmade, eco-friendly basket, perfect for groceries or decor.',
    price: 'R150.00',
    stockStatus: 'Out of Stock',
    image: 'https://via.placeholder.com/150/98FB98/FFFFFF?text=Basket',
  },
  {
    id: '3',
    name: 'Chakalaka and Pap',
    description: 'A local favorite, spicy chakalaka with traditional maize meal (pap).',
    price: 'R40.00',
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Food',
  },
  {
    id: '4',
    name: 'Beaded Necklaces',
    description: 'Handmade beaded necklaces, various colors, perfect for gifts.',
    price: 'R60.00',
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=Necklace',
  },
  {
    id: '5',
    name: 'Fresh Fruit Juice (Orange)',
    description: 'Freshly squeezed, refreshing orange juice, served cold.',
    price: 'R25.00',
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/150/FF8C00/FFFFFF?text=Juice',
  },
];

const InventoryPage = ({ navigation }) => {
  const handleDelete = (id) => {
    Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => handleProductDelete(id), style: 'destructive' },
    ]);
  };

  const handleProductDelete = (id) => {
    // Implement product deletion logic here (e.g., update state, make API call)
    Alert.alert('Product Deleted', `Product with ID ${id} has been deleted.`);
  };

  const handleUpdate = (id) => {
    // Navigate to update page or show update modal
    Alert.alert('Update Product', `Navigate to update page for product ID ${id}`);
  };

  const handleBack = () => {
    // Go back to the previous screen
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={[styles.stockStatus, item.stockStatus === 'In Stock' ? styles.inStock : styles.outOfStock]}>
          {item.stockStatus}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(item.id)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button in the Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.buttonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={inventoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  inStock: {
    color: 'green',
  },
  outOfStock: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});

export default InventoryPage;
