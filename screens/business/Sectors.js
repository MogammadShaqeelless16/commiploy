import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import RNPickerSelect from 'react-native-picker-select';

// List of sectors for businesses
const sectorsList = [
  'Construction', 'Manufacturing', 'Healthcare', 'Hospitality', 'Technology',
  'Retail', 'Transportation', 'Education', 'Real Estate', 'Finance',
  'Energy', 'Telecommunications', 'Agriculture', 'Food Services',
  'Entertainment', 'Professional Services', 'Government', 'Non-Profit',
];

// Plan options for business
const plans = [
  { label: 'Free', value: 'Free' },
  { label: 'Basic', value: 'Basic' },
  { label: 'Pro', value: 'Pro' },
];

const Sectors = ({ sectors, setSectors, plan, setPlan }) => {
  const [query, setQuery] = useState('');
  const [sectorLimitMessage, setSectorLimitMessage] = useState('');

  // Filter the sectors based on the input query and exclude already selected sectors
  const filteredSectors = sectorsList.filter(sec =>
    sec.toLowerCase().includes(query.toLowerCase()) && !sectors.includes(sec)
  ).slice(0, 1); // Limit to the first 5 matches

  // Function to handle sector selection
  const handleSectorSelect = (sec) => {
    if (sectors.length >= 3) {
      setSectorLimitMessage('You can only select up to 3 sectors.');
    } else {
      setSectors([...sectors, sec]);
      setSectorLimitMessage(''); // Clear message when a sector is successfully added
    }
    setQuery('');
  };

  // Function to remove a sector from the selected sectors
  const handleSectorRemove = (sec) => {
    setSectors(sectors.filter(s => s !== sec));
    setSectorLimitMessage(''); // Clear message when a sector is removed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Business Sectors</Text>

      {/* Sector limit message */}
      {sectorLimitMessage ? <Text style={styles.sectorLimitMessage}>{sectorLimitMessage}</Text> : null}

      {/* Plan Dropdown */}
      <Text style={styles.label}>Choose a Plan:</Text>
      <RNPickerSelect
        onValueChange={(itemValue) => setPlan(itemValue)}
        items={plans}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select a Plan', value: null }}
      />

      {/* Display selected sectors */}
      <View style={styles.selectedSectorsContainer}>
        {sectors.map((sec, index) => (
          <TouchableOpacity key={index} onPress={() => handleSectorRemove(sec)}>
            <Text style={styles.selectedSector}>{sec} ✖️</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sectors Input with Autocomplete */}
      <Text style={styles.label}>Sectors (multi-select):</Text>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={filteredSectors.length > 0 ? filteredSectors.map(sec => ({ sec })) : []} // Show suggestions only if there's a query
          defaultValue={query}
          onChangeText={text => setQuery(text)}
          placeholder="Type to search business sectors"
          flatListProps={{
            keyExtractor: item => item.sec,
            renderItem: ({ item }) => (
              <TouchableOpacity onPress={() => handleSectorSelect(item.sec)}>
                <Text style={styles.suggestion}>{item.sec}</Text>
              </TouchableOpacity>
            ),
          }}
          style={styles.autocompleteInput}
          inputContainerStyle={styles.autocompleteInputContainer}
          listContainerStyle={styles.suggestionsListContainer}
        />
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  autocompleteContainer: {
    position: 'relative',
    zIndex: 10,
  },
  autocompleteInputContainer: {
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 5,
  },
  autocompleteInput: {
    padding: 10,
    fontSize: 16,
  },
  suggestionsListContainer: {
    backgroundColor: '#fff',
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 150,
    marginTop: 5,
  },
  selectedSectorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  selectedSector: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectorLimitMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});

// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    color: 'black',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    color: 'black',
    marginBottom: 20,
  },
});

// Export the component
export default Sectors;
