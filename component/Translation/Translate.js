// Translate.js
import React, { useEffect, useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const Translate = () => {
  const { i18n } = useTranslation(); // Get i18n instance
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem('selectedLanguage');
      if (storedLang) {
        setLanguage(storedLang);
        i18n.changeLanguage(storedLang); // Change language in i18n
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem('selectedLanguage', lang);
    setLanguage(lang);
    i18n.changeLanguage(lang); // Change language in i18n
  };

  return (
    <View style={styles.container}>
      <Text>Select Language:</Text>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue) => changeLanguage(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Afrikaans" value="af" />
        <Picker.Item label="IsiZulu" value="zu" />
        <Picker.Item label="IsiXhosa" value="xh" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  picker: { width: '100%' },
});

export default Translate;
