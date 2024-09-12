import React from 'react';
import { Appbar } from 'react-native-paper';

export default function AppBarComponent({ title, onMenuPress, onSearchPress }) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <Appbar.Action icon="magnify" onPress={onSearchPress} />
      <Appbar.Action icon="dots-vertical" onPress={onMenuPress} />
    </Appbar.Header>
  );
}