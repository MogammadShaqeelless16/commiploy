import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

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
    setQuery(''); // Clear the input after selection
  };

  // Function to remove a skill from the selected skills
  const handleSkillRemove = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Skills & Experience</Text>

      {/* Display selected skills above the input field */}
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

      {/* Qualification Input */}
      <Text style={styles.label}>Qualification:</Text>
      <TextInput
        style={styles.input}
        placeholder="Self-taught, Qualified, etc."
        value={qualification}
        onChangeText={setQualification}
      />

      {/* Skills Input with Autocomplete */}
      <Text style={styles.label}>Skills (multi-select):</Text>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={filteredSkills.length === 0 && query !== '' ? [{ skill: query }] : filteredSkills.map(skill => ({ skill }))} // Display query if no matches
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
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  autocomplete: {
    marginBottom: 15,
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

export default SkillsAndExperience;
