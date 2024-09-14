import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, SafeAreaView } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState([]);

  const criar = () => {
    router.navigate('/formItem');
  };

  const editar = (id) => {
    console.log("Id da tarefa", id);
    router.push(`/formItem?id=${id}`);
  };

  const excluir = async (id) => {
    Alert.alert(
      'Excluir Tarefa',
      'Você tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: async () => {
            try {
              await deleteDoc(doc(db, 'tarefas', id));
              Alert.alert('Sucesso', 'Tarefa excluída com sucesso.');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
              console.error('Erro ao excluir tarefa:', error);
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    const WSTarefas = onSnapshot(collection(db, 'tarefas'), (snapshot) => {
      const tarefasList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTarefas(tarefasList);
    }, (error) => {
      console.error('Erro ao buscar tarefas:', error);
    });

    return () => WSTarefas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Title title={item.item} subtitle={item.descricao} />
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={() => editar(item.id)} style={styles.button}>
            Editar
          </Button>
          <Button mode="contained" onPress={() => excluir(item.id)} style={styles.button}>
            Excluir
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => {
            router.push("settings");
          }}
        />
      </Appbar.Header>
      
      <FlatList
        data={tarefas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Button mode="contained" style={styles.input} onPress={criar}>
        Novo
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginTop: 15,
    width: '100%',
  },
  list: {
    flexGrow: 1,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  cardContainer: {
    marginBottom: 15,
  },
  card: {
    elevation: 2,
  },
  actions: {
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 5,
  },
  appbar: {
    elevation: 0,
  },
});
