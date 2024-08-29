import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

export default function CheckBox({ options, onValueChange }) {
  const [checked, setChecked] = useState(options[0].value);

  const handlePress = (value) => {
    setChecked(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <View key={option.value} style={styles.radioItem}>
          <RadioButton
            value={option.value}
            status={checked === option.value ? 'checked' : 'unchecked'}
            onPress={() => handlePress(option.value)}
          />
          <Text onPress={() => handlePress(option.value)}>{option.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});