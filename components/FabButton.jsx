import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export default function FabButton({ icon = 'plus', onPress }) {
  return (
    <FAB
      style={styles.fab}
      icon={icon}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee', 
  },
});