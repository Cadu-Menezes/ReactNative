import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Divider, List } from 'react-native-paper';

export default function NavMenu() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={openMenu} mode="contained">
        Open Menu
      </Button>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show Menu</Button>}
      >
        <Menu.Item onPress={() => console.log('Item 1')} title="Item 1" />
        <Menu.Item onPress={() => console.log('Item 2')} title="Item 2" />
        <Menu.Item onPress={() => console.log('Item 3')} title="Item 3" />
        <Divider />
        <Menu.Item onPress={() => console.log('Item 4')} title="Item 4" />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});