import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import NoteCard from '../components/NoteCard';

const MyNotes = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, [notes]);

  const loadNotes = async () => {
    try {
      const existingNotes = await AsyncStorage.getItem("notes");
      setNotes(existingNotes ? JSON.parse(existingNotes) : []);
    } catch (error) {
      console.error('Error getting notes:', error);
    }
  };

  return (
    <View style={styles.body}>
      {notes.length === 0 ? (
        <Text style={styles.messageText}>No notes Currently!</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NoteCard noteItem={item} />
          )}
        />
      )}
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('NewNote');
        }}
      >
        <FontAwesome5 name={'plus'} size={20} color={'#ffffff'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  messageText:{
    alignSelf:"center", 
    fontSize: 24,
  },
  noteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
});

export default MyNotes;


