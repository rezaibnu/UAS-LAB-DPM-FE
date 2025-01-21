import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../utils/axiosInstance';

interface RentalRecord {
  _id: string;
  name: string;
  genre: string;
  harga: number;
  dateAdded: string;
}

const GameRentalScreen = () => {
  const [records, setRecords] = useState<RentalRecord[]>([]);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [harga, setHarga] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/games');
      setRecords(response.data);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to fetch records.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateRecord = async () => {
    if (!name || !genre || !harga || !dateAdded) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    try {
      if (editMode && editingId) {
        await axiosInstance.put(`/games/${editingId}`, { name, genre, harga, dateAdded });
        Alert.alert('Success', 'Record updated successfully!');
      } else {
        const response = await axiosInstance.post('/games', { name, genre, harga, dateAdded });
        Alert.alert('Success', 'Record added successfully!');
        setRecords((prev) => [...prev, response.data]);
      }
      resetForm();
      fetchRecords();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to save record.');
    }
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      await axiosInstance.delete(`/games/${id}`);
      Alert.alert('Success', 'Record deleted successfully!');
      fetchRecords();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete record.');
    }
  };

  const handleEditRecord = (record: RentalRecord) => {
    setName(record.name);
    setGenre(record.genre);
    setHarga(record.harga.toString());
    setDateAdded(record.dateAdded);
    setEditMode(true);
    setEditingId(record._id);
  };

  const resetForm = () => {
    setName('');
    setGenre('');
    setHarga('');
    setDateAdded('');
    setEditMode(false);
    setEditingId(null);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const renderRecordCard = ({ item }: { item: RentalRecord }) => (
    <View style={styles.recordCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleEditRecord(item)}>
          <FontAwesome name="pencil" size={20} color="#008080" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}><Text style={styles.cardLabel}>Genre:</Text> {item.genre}</Text>
        <Text style={styles.cardText}><Text style={styles.cardLabel}>Harga:</Text> {item.harga}</Text>
        <Text style={styles.cardText}><Text style={styles.cardLabel}>Date Added:</Text> {new Date(item.dateAdded).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecord(item._id)}>
        <FontAwesome name="trash" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Rental Management</Text>
      <View style={styles.formCard}>
        <Text style={styles.formHeader}>{editMode ? 'Edit Record' : 'Add New Record'}</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="gamepad" size={20} color="#008080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="tags" size={20} color="#008080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Genre"
            value={genre}
            onChangeText={setGenre}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="dollar" size={20} color="#008080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Harga"
            value={harga}
            keyboardType="number-pad"
            onChangeText={setHarga}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={20} color="#008080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Date Added (YYYY-MM-DD)"
            value={dateAdded}
            onChangeText={setDateAdded}
          />
        </View>
        <Pressable style={styles.addButton} onPress={handleAddOrUpdateRecord}>
          <Text style={styles.addButtonText}>{editMode ? 'Update Record' : 'Add Record'}</Text>
        </Pressable>
      </View>
      <FlatList
        data={records}
        keyExtractor={(item) => item._id}
        renderItem={renderRecordCard}
        refreshing={loading}
        onRefresh={fetchRecords}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  formCard: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: '#F0FFFF',
    borderWidth: 1,
    borderColor: '#B0E0E6',
  },
  formHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B0E0E6',
    color: '#008080',
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#008080',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recordCard: {
    backgroundColor: '#F5FFFA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#B0E0E6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008080',
  },
  cardContent: {
    marginBottom: 8,
    borderTopWidth: 1,
    borderColor: '#B0E0E6',
    paddingTop: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#008080',
    marginBottom: 4,
  },
  cardLabel: {
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#008080',
    padding: 6,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

export default GameRentalScreen;
