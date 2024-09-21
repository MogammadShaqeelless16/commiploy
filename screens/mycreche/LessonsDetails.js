import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import supabase from '../../supabaseClient';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const LessonsDetails = ({ route, navigation }) => {
  const { crecheId } = route.params;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events') // Replace with the actual table name if different
        .select('*')
        .eq('creche_id', crecheId);

      if (error) {
        throw error;
      }

      setEvents(data);
    } catch (error) {
      Alert.alert('Error', error.message || 'Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Get today's date
  const today = moment().startOf('day').format('YYYY-MM-DD');

  // Filter events for today
  const filteredEvents = events.filter(event => {
    const eventStart = moment(event.start).format('YYYY-MM-DD');
    return eventStart === today;
  });

  // Transform events into the format required by the calendar
  const markedDates = filteredEvents.reduce((acc, event) => {
    const startDate = moment(event.start).format('YYYY-MM-DD');
    acc[startDate] = {
      marked: true,
      dotColor: event.color_code || '#4a90e2' // Use color_code from event or default color
    };
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={20} color="#4a90e2" />
      </TouchableOpacity>
      <Text style={styles.title}>Lesson Plan for Today</Text>
      <Calendar
        current={today}
        markedDates={markedDates}
        markingType={'dot'}
        theme={{
          calendarBackground: '#fff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#4a90e2',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#4a90e2',
          dayTextColor: '#2d4150',
          arrowColor: '#4a90e2',
          monthTextColor: '#4a90e2',
          indicatorColor: '#4a90e2',
          textDayFontFamily: 'Montserrat',
          textMonthFontFamily: 'Montserrat',
          textDayHeaderFontFamily: 'Montserrat',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
        }}
      />
      <View style={styles.eventsContainer}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <View key={index} style={[styles.event, { backgroundColor: event.color_code || '#e0e0e0' }]}>
              <Text style={styles.eventText}>{event.title}</Text>
              <Text style={styles.eventText}>
                {moment(event.start).format('HH:mm')} - {moment(event.end_time).format('HH:mm')}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEventsText}>No events for today.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  eventsContainer: {
    marginTop: 20,
  },
  event: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  eventText: {
    fontSize: 16,
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
  },
});

export default LessonsDetails;
