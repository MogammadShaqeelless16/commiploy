import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { question: 'How do I apply for the creche?', answer: 'To apply for the creche, go to the Apply section in the app and fill out the form.' },
    { question: 'What are the operating hours?', answer: 'The creche operates from 8 AM to 6 PM, Monday through Friday.' },
    { question: 'What is the fee structure?', answer: 'The fee structure varies depending on the services you require. Please contact our support for detailed information.' },
    { question: 'Are meals provided?', answer: 'Yes, we provide nutritious meals and snacks throughout the day.' },
    { question: 'What safety measures are in place?', answer: 'We have strict safety protocols, including background checks for staff, security cameras, and secure entry systems.' },
    // Add more FAQs as needed
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Frequently Asked Questions</Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView>
        {filteredFaqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity onPress={() => handleToggle(index)} style={styles.questionContainer}>
              <Text style={styles.questionText}>{faq.question}</Text>
              <Ionicons
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  faqContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007BFF',
  },
  questionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },
  answerContainer: {
    padding: 15,

  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
});

export default FAQ;
