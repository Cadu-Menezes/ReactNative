import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { Link, router, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1 }}>
      
      <Appbar.Header>
        <Appbar.Content title="Perfil"/>
        <Appbar.Action 
          icon="dots-vertical"
          onPress={() => {
            router.push("settings");
          }}
        />
      </Appbar.Header>
      
      <View style={styles.registerContainer}>
          <ThemedText>Components</ThemedText>
          <Link href="/teste" style={styles.link}> Clique aqui para visualizar</Link>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginTop: 15,
    width: '100%', 
  },
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    color: 'blue', 
    marginLeft: 5,
  },

});