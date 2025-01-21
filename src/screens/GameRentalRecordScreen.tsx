import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface RentalRecord {
  _id: string;
  name: string;
  genre: string;
  harga: number;
  dateAdded: string;
}

const GameRentalRecordsScreen = () => {
  const [records, setRecords] = useState<RentalRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get('/games');
        setRecords(response.data);
      } catch (error: any) {
        console.error('Error fetching game rental records:', error.response?.data?.error || 'Server error');
      }
    };

    fetchRecords();
  }, []);

  const renderRecord = (record: RentalRecord) => (
    <View key={record._id} style={styles.recordCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.recordTitle}>{record.name}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Genre:</Text> {record.genre}</Text>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Harga:</Text> {record.harga}</Text>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Date Added:</Text> {new Date(record.dateAdded).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Game Rental Records</Text>
      {records.length > 0 ? (
        records.map(renderRecord)
      ) : (
        <Text style={styles.noDataText}>No records available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0FFFF',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#008080',
    textAlign: 'center',
    paddingTop: 40,
    marginBottom: 20,
  },
  recordCard: {
    backgroundColor: '#F0FFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#B0E0E6',
  },
  cardHeader: {
    marginBottom: 10,
  },
  recordTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#008080',
  },
  cardContent: {
    marginBottom: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#B0E0E6',
  },
  recordText: {
    fontSize: 15,
    color: '#008080',
    marginBottom: 5,
  },
  recordLabel: {
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#008080',
  },
});

export default GameRentalRecordsScreen;
