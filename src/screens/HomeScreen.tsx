import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface RentalRecord {
  _id: string;
  name: string;
  genre: string;
  harga: number;
  dateAdded: string;
}

const HomeScreen = () => {
  const [records, setRecords] = useState<RentalRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get('/games');
        setRecords(response.data);
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.error || 'Failed to fetch records.');
      }
    };

    fetchRecords();
  }, []);

  const renderNode = (record: RentalRecord) => (
    <View key={record._id} style={styles.nodeCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.nodeTitle}>{record.name}</Text>
        <Text style={styles.nodeDate}>{new Date(record.dateAdded).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.nodeDescription}>Genre: {record.genre}</Text>
      <View style={styles.chartContainer}>
        <View style={[styles.chartBar, { width: `${Math.min(record.harga / 10, 100)}%` }]} />
      </View>
      <Text style={styles.nodeValue}>Harga: Rp {record.harga}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Game Rental Overview</Text>
        <Text style={styles.subHeader}>Modern display of your rentals</Text>
      </View>
      <View style={styles.recordContainer}>
        {records.map((record) => renderNode(record))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0FFFF',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#20B2AA',
  },
  recordContainer: {
    marginTop: 20,
  },
  nodeCard: {
    backgroundColor: '#F0FFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B0E0E6',
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008080',
  },
  nodeDescription: {
    fontSize: 16,
    color: '#008B8B',
    marginBottom: 10,
  },
  chartContainer: {
    height: 10,
    backgroundColor: '#B0E0E6',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  chartBar: {
    height: '100%',
    backgroundColor: '#008080',
  },
  nodeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#008080',
    marginTop: 5,
  },
  nodeDate: {
    fontSize: 14,
    color: '#20B2AA',
  },
});

export default HomeScreen;
