import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TabBar, TabView, SceneMap } from 'react-native-paper';

export default function CustomTab() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
        />
      )}
    />
  );
}

const FirstRoute = () => (
  <View style={styles.scene}>
    <Text>Primeira aba</Text>
  </View>
);

const SecondRoute = () => (
  <View style={styles.scene}>
    <Text>Segunda aba</Text>
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#6200ee',
  },
  indicator: {
    backgroundColor: '#ff4081',
  },
  label: {
    color: '#fff',
  },
});