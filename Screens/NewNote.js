import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownSelector from '../components/DropdownSelector';
import { STORAGE_KEY } from '../Globals/constants';

const NewNote = ({ navigation }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [showInput, setShowInput] = useState(false);

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
  }, [selectedClient, selectedCategory]);

  const handleClientChange = (value) => {
    setSelectedClient(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const checkShowInput = () => {
    setShowInput(selectedClient !== null && selectedCategory !== null);
  };

  const handleNoteTextChange = (text) => {
    setNoteText(text);
  };

  const handleSave = async () => {
    console.log('Saving notes:', noteText);

    const newNote = { id: Date.now(), client: selectedClient,category: selectedCategory, noteText };
    await saveNote(newNote);

    setNoteText('');
    // setSavedNotes([...savedNotes, newNote]);

    navigation.navigate('MyNotes');
  };

  const saveNote = async (note) => {
    try {
      const existingNotes = await AsyncStorage.getItem(STORAGE_KEY);
      const notes = existingNotes ? JSON.parse(existingNotes) : [];

      notes.push(note);

      // Save the updated notes array to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <View style={styles.body}>
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
  body:{
    paddingHorizontal:30,
    paddingVertical:20,
    justifyContent:"center",
  },
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
