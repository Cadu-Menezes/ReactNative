import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default function Lista({ items, onItemPress }) {
  return (
    <List.Section style={styles.listSection}>
      {items.map((item, index) => (
        <List.Item
          key={index}
          title={item.title}
          description={item.description}
          left={props => <List.Icon {...props} icon={item.icon} />}
          onPress={() => onItemPress(item)}
          style={styles.listItem}
        />
      ))}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  listSection: {
    marginVertical: 10,
  },
  listItem: {
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});