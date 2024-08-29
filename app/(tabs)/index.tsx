import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { router } from 'expo-router';
import Grid from '@/components/Grid';
import { Button } from 'react-native-paper';
import { isLoggedIn } from '@/services/auth';


export default function HomeScreen() {

  const criar = () => {
    isLoggedIn.value = true;
    router.navigate('criarItem');
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => {
            router.push("settings");
          }}
        />
      </Appbar.Header>

      <Grid columns={3} gap={15}>
        <View style={styles.gridItem}><Text>Produtos</Text></View>
        <View style={styles.gridItem}><Text>Fornecedores</Text></View>
        <View style={styles.gridItem}><Text>Usuarios</Text></View>
        <View style={styles.gridItem}><Text>Cotação</Text></View>
        <View style={styles.gridItem}><Text>Requisição</Text></View>
        <View style={styles.gridItem}><Text>Contatos</Text></View>
      </Grid>

      <Button mode="contained" style={styles.input} onPress={criar}>Novo</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    marginTop: 15,
    backgroundColor: '#ccc',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 15,
    width: '100%', 
  },
});