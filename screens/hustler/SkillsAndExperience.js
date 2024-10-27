import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import RNPickerSelect from 'react-native-picker-select';

// List of manual labor skills for predictive typing
const skillsList = [
  'Carpentry', 'Welding', 'Masonry', 'Plumbing', 'Electrical Work',
  'Painting', 'Roofing', 'Landscaping', 'Heavy Equipment Operation', 
  'HVAC Installation', 'Forklift Operation', 'Bricklaying', 
  'Concrete Finishing', 'Drywall Installation', 'Sheet Metal Work',
  'Paving', 'Cleaning', 'Catering', 'Construction Management',
  'Scaffolding', 'Site Management', 'Inspection', 'Quality Control',
  'Maintenance', 'Assembly Line Work', 'Metal Fabrication',
  'Auto Repair', 'Machining', 'Sewing', 'Bartending',
  'Farming', 'Food Processing', 'Logging', 'Demolition',
  'Glass Installation', 'Insulation Installation', 'Flooring',
  'Tile Setting', 'Handyman Services', 'Marine Construction',
  'Wrecking', 'Restoration', 'Sign Making', 'Fire Protection',
  'Waste Management'
];

// Qualification options
const qualifications = [
  { label: 'Select Qualification', value: '' },
  { label: 'Grade 10', value: 'Grade 10' },
  { label: 'Grade 11', value: 'Grade 11' },
  { label: 'Grade 12', value: 'Grade 12' },
  { label: 'Primary School', value: 'Primary School' },
];

const SkillsAndExperience = ({ skills, setSkills, experience, setExperience, qualification, setQualification }) => {
  const [query, setQuery] = useState('');

  // Filter the skills based on the input query
  const filteredSkills = skillsList.filter(skill =>
    skill.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3); // Limit to the first 3 matches

  // Function to handle skill selection
  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setQuery('');
  };

  // Function to remove a skill from the selected skills
  const handleSkillRemove = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Skills & Experience</Text>

      {/* Skills Input with Autocomplete */}
      <Text style={styles.label}>Skills (multi-select):</Text>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={filteredSkills.length === 0 && query !== '' ? [{ skill: query }] : filteredSkills.map(skill => ({ skill }))}
          defaultValue={query}
          onChangeText={text => setQuery(text)}
          placeholder="Type to search manual labor skills"
          flatListProps={{
            keyExtractor: item => item.skill,
            renderItem: ({ item }) => (
              <TouchableOpacity onPress={() => handleSkillSelect(item.skill)}>
                <Text style={styles.suggestion}>{item.skill}</Text>
              </TouchableOpacity>
            ),
          }}
          style={styles.autocomplete}
        />
      </View>

      {/* Display selected skills */}
      <View style={styles.selectedSkillsContainer}>
        {skills.map((skill, index) => (
          <TouchableOpacity key={index} onPress={() => handleSkillRemove(skill)}>
            <Text style={styles.selectedSkill}>{skill} ✖️</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Experience Input */}
      <TextInput
        style={styles.input}
        placeholder="Experience (in years)"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />

      {/* Qualification Dropdown */}
      <Text style={styles.label}>Qualification:</Text>
      <RNPickerSelect
        onValueChange={(itemValue) => setQualification(itemValue)}
        items={qualifications}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Qualification', value: null }}
      />

    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff', // Set background color for better visibility
    borderRadius: 10, // Add rounded corners
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow properties for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
    elevation: 3, // Shadow for Android
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
    marginTop: 15, // Add top margin to labels
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  autocomplete: {
    marginBottom: 15,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 10, // Set zIndex to ensure it is on top
    elevation: 5, // Android shadow effect
  },
  selectedSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  selectedSkill: {
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
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    color: 'black',
    marginBottom: 15,
  },
});

export default SkillsAndExperience;
