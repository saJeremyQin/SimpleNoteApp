import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropdownSelector = ({ label, items, onValueChange }) => {
  const placeholder = {
    label: `Select ${label}...`,
    value: null,
    color: '#9EA0A4',
  };

  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={items}
      onValueChange={onValueChange}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  },
});

export default DropdownSelector;
