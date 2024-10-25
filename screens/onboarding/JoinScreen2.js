// JoinScreen2.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import Translate from '../../component/Translation/Translate'; // Import Translate component

const { width: screenWidth } = Dimensions.get('window');
const registeredBadge = require('../../assets/images/Registered.png');

const JoinScreen2 = () => {
  const { t } = useTranslation(); // Use the translation hook

  return (
    <View style={styles.container}>
      {/* Language Selection */}
      <Translate /> {/* Include the Translate component for language selection */}

      <Text style={styles.title}>
        {t('description') || 'Welcome, Discover Local Opportunities!'}
      </Text>
      <Text style={styles.description}>
        {t('mommy') || 'Find trustworthy sellers and job listings. Mommy daddy'}
      </Text>

      {/* Grid layout */}
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Image source={registeredBadge} style={styles.badgeImage} />
          <Text style={styles.featureText}>
            {t('trustworthy') || 'Commiploy ensures quality and reliability.'}
          </Text>
        </View>
      </View>

      {/* Additional Information */}
      <Text style={styles.infoText}>
        {t('infoText') || 'Some additional information goes here.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 20 },
  gridContainer: { width: '100%', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 },
  gridItem: { width: '100%', alignItems: 'center', marginBottom: 20 },
  badgeImage: { width: 100, height: 100, marginBottom: 10 },
  featureText: { fontSize: 16, textAlign: 'center', color: '#666', paddingHorizontal: 20 },
  infoText: { fontSize: 16, textAlign: 'center', color: '#666', marginTop: 20 },
});

export default JoinScreen2;
