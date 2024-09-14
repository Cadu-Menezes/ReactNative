import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, DataTable } from 'react-native-paper';
import { router } from 'expo-router';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState([]);

  // Navega para a tela de formulário
  const criar = () => {
    router.navigate('/formItem');
  };

  useEffect(() => {
    // Adiciona um listener em tempo real para a coleção de tarefas
    const WSTarefas = onSnapshot(collection(db, 'tarefas'), (snapshot) => {
      const tarefasList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTarefas(tarefasList);
    }, (error) => {
      console.error('Erro ao buscar tarefas:', error);
    });

    // Limpeza: remove o listener quando o componente desmonta
    return () => WSTarefas();
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    width: '100%',
  },
  table: {
    marginTop: 15,
  },
});
