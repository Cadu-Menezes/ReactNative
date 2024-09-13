import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, DataTable } from 'react-native-paper';
import { router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 


export default function HomeScreen() {
  const [tarefas, setTarefas] = useState([]);

  const criar = () => {
    router.navigate('/formItem');
  };

  useEffect(() => {
    const buscaTarefas = async () => {
      try {
        const tarefasCollection = collection(db, 'tarefas');
        const tarefasSnapshot = await getDocs(tarefasCollection);
        const tarefasList = tarefasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTarefas(tarefasList);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    buscaTarefas();
  }, []);

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

      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title>Item</DataTable.Title>
          <DataTable.Title>Descrição</DataTable.Title>
        </DataTable.Header>

        {tarefas.map((tarefa) => (
          <DataTable.Row key={tarefa.id}>
            <DataTable.Cell>{tarefa.id}</DataTable.Cell>
            <DataTable.Cell>{tarefa.item}</DataTable.Cell>
            <DataTable.Cell>{tarefa.descricao}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Button mode="contained" style={styles.input} onPress={criar}>
        Novo
      </Button>
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
  table: {
    marginTop: 15,
  },
});
