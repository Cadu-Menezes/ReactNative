import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default function Input({ placeholder, value, onChangeText, style, secureTextEntry }) {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});