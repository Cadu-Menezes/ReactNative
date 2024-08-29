import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function ProgressBar({ progress, color = '#6200ee', label }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ProgressBar progress={progress} color={color} style={styles.progressBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
  },
});