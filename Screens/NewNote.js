import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownSelector from '../components/DropdownSelector';

const STORAGE_KEY = 'notes';

const NewNote = ({ navigation }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);

  const clients = [
    { label: 'Tom', value: 'Tom' },
    { label: 'Andy', value: 'Andy' },
    { label: 'Jessica', value: 'Jessica' },
  ];

  const categories = [
    { label: 'Goal Evidence', value: 'Goal Evidence' },
    { label: 'Support Coordination', value: 'Support Coordination' },
    { label: 'Active Duty', value: 'Active Duty' },
  ];

  useEffect(() => {
    checkShowInput();
    // loadNotes();
  }, [selectedClient, selectedCategory]);

  const handleClientChange = (value) => {
    console.log('1 is ', value);
    setSelectedClient(value);
  };

  const handleCategoryChange = (value) => {
    console.log('2 is ', value);
    setSelectedCategory(value);
  };

  const checkShowInput = () => {
    setShowInput(selectedClient !== null && selectedCategory !== null);
  };

  const handleNoteTextChange = (text) => {
    setNoteText(text);
  };

  const handleSave = async () => {
    // Implement your save logic here
    console.log('Saving notes:', noteText);

    // Save the new note to AsyncStorage
    const newNote = { id: Date.now(), client: selectedClient,category: selectedCategory, noteText };
    await saveNote(newNote);

    // Clear the input field and update the saved notes state
    setNoteText('');
    setSavedNotes([...savedNotes, newNote]);

    // Navigate to the 'MyNotes' screen
    navigation.navigate('MyNotes');
  };

  const saveNote = async (note) => {
    try {
      // Retrieve existing notes or initialize an empty array
      const existingNotes = await AsyncStorage.getItem(STORAGE_KEY);
      const notes = existingNotes ? JSON.parse(existingNotes) : [];

      // Add the new note to the array
      notes.push(note);

      // Save the updated notes array to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // const loadNotes = async () => {
  //   try {
  //     // Retrieve notes from AsyncStorage
  //     const existingNotes = await AsyncStorage.getItem(STORAGE_KEY);

  //     // Parse the JSON string and update the state with the notes array
  //     setSavedNotes(existingNotes ? JSON.parse(existingNotes) : []);
  //   } catch (error) {
  //     console.error('Error getting notes:', error);
  //   }
  // };

  return (
    <View>
      <Text>Select Client:</Text>
      <DropdownSelector
        label="Client"
        items={clients}
        onValueChange={handleClientChange}
      />

      <Text>Select Category:</Text>
      <DropdownSelector
        label="Category"
        items={categories}
        onValueChange={handleCategoryChange}
      />
      {showInput && (
        <View style={styles.input}>
          <Text>Enter Notes:</Text>
          <TextInput
            style={styles.textinput}
            multiline
            numberOfLines={4}
            placeholder="Type your notes here..."
            value={noteText}
            onChangeText={handleNoteTextChange}
          />
          <Button
            style={{ marginVertical: 8 }}
            title="Save"
            onPress={handleSave}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
});

export default NewNote;
