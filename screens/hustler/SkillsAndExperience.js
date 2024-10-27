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
  { label: 'Primary School', value: 'Primary School' },
  { label: 'Grade 10', value: 'Grade 10' },
  { label: 'Grade 11', value: 'Grade 11' },
  { label: 'Grade 12', value: 'Grade 12' },
  { label: 'Certificate', value: 'Certificate' },
  { label: 'Diploma', value: 'Diploma' },
  { label: 'Degree', value: 'Degree' },
];

const SkillsAndExperience = ({ skills, setSkills, experience, setExperience, qualification, setQualification }) => {
  const [query, setQuery] = useState('');
  const [areaOfStudy, setAreaOfStudy] = useState('');
  const [skillLimitMessage, setSkillLimitMessage] = useState('');

  // Filter the skills based on the input query and exclude already selected skills
  const filteredSkills = skillsList.filter(skill =>
    skill.toLowerCase().includes(query.toLowerCase()) && !skills.includes(skill)
  ).slice(0, 1); // Limit to the first 5 matches

  // Function to handle skill selection
  const handleSkillSelect = (skill) => {
    if (skills.length >= 5) {
      setSkillLimitMessage('You can only select up to 5 skills.');
    } else {
      setSkills([...skills, skill]);
      setSkillLimitMessage(''); // Clear message when a skill is successfully added
    }
    setQuery('');
  };

  // Function to remove a skill from the selected skills
  const handleSkillRemove = (skill) => {
    setSkills(skills.filter(s => s !== skill));
    setSkillLimitMessage(''); // Clear message when a skill is removed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Skills & Experience</Text>

      {/* Skill limit message */}
      {skillLimitMessage ? <Text style={styles.skillLimitMessage}>{skillLimitMessage}</Text> : null}

      {/* Qualification Dropdown */}
      <Text style={styles.label}>Qualification:</Text>
      <RNPickerSelect
        onValueChange={(itemValue) => {
          setQualification(itemValue);
          if (itemValue === 'Diploma' || itemValue === 'Certificate') {
            setAreaOfStudy(''); // Reset area of study when qualification changes
          }
        }}
        items={qualifications}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Qualification', value: null }}
      />

      {/* Conditional Area of Study Input */}
      {(qualification === 'Diploma' || qualification === 'Certificate') && (
        <>
          <Text style={styles.label}>Area of Study:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your area of study"
            value={areaOfStudy}
            onChangeText={setAreaOfStudy}
          />
        </>
      )}

      {/* Display selected skills */}
      <View style={styles.selectedSkillsContainer}>
        {skills.map((skill, index) => (
          <TouchableOpacity key={index} onPress={() => handleSkillRemove(skill)}>
            <Text style={styles.selectedSkill}>{skill} ✖️</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Skills Input with Autocomplete */}
      <Text style={styles.label}>Skills (multi-select):</Text>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={filteredSkills.length > 0 ? filteredSkills.map(skill => ({ skill })) : []} // Show suggestions only if there's a query
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
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
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
  selectedSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
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
  skillLimitMessage: {
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

export default SkillsAndExperience;
