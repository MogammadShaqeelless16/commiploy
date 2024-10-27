import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DashboardCard from './DashboardCard'; 
import { fetchCurrentUser } from '../UserOperations/fetchProfile';
import supabase from '../../supabaseClient';

const HustlerDashboard = () => {
  const navigation = useNavigation();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigateTo = (path) => {
    navigation.navigate(path);
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const user = await fetchCurrentUser();

        const { data: userBusinessesData, error: businessesError } = await supabase
          .from('users_businesses')
          .select('business_id')
          .eq('user_id', user.id);

        if (businessesError) {
          throw new Error(businessesError.message);
        }

        if (!userBusinessesData || userBusinessesData.length === 0) {
          setTotalProducts(0);
          setTotalLeads(0);
          return;
        }

        const businessIds = userBusinessesData.map(userBusiness => userBusiness.business_id);

        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('shop_id', businessIds);

        if (productsError) {
          throw new Error(productsError.message);
        }

        setTotalProducts(productsData.length);

        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .in('business_uuid', businessIds);

        if (leadsError) {
          throw new Error(leadsError.message);
        }

        setTotalLeads(leadsData.length);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.DashboardContainer}>
      <Text style={styles.header}>Hustler Dashboard</Text>

      <View style={styles.dashboardOverview}>
        <DashboardCard 
          title="Jobs Complete" 
          endValue={15} 
          onClick={() => navigateTo('Customers')} 
        />
        <DashboardCard 
          title="Reviews" 
          endValue={5} 
          onClick={() => navigateTo('Orders')} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
   DashboardContainer: {
    flexGrow: 1,
    backgroundColor: '#7ed957',
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    margin: 16,
  },
  dashboardOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HustlerDashboard;
