import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function ButtonIcon({ icon, size = 24, color = '#6200ee', onPress }) {
  return (
    <IconButton
      icon={icon}
      size={size}
      color={color}
      onPress={onPress}
      style={styles.iconButton}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    margin: 5, 
  },
});