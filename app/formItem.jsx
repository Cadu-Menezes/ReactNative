import React, { useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Input from '@/components/Input';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function formItem() {
  
  const [item, setitem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState([]);

  const router = useRouter();

  const cadastro = async () => {
    try {
      // Adicionar o item na coleção 'items' no Firestore
      await addDoc(collection(db, 'tarefas'), {
        item: item,
        descricao: descricao, 
        fotos: fotos, 
      });

      Alert.alert('Sucesso!', 'tarefa registrada com sucesso!');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível registrar a tarefa.');
      console.error('Erro ao registrar tarefa: ', erro);
    }
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tarefa</ThemedText>

      <Input
        placeholder="item"
        style={styles.input}
        value={item}
        onChangeText={setitem}
      /> 

      <Input
        placeholder="descricao"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      /> 

      <Button mode="contained" style={styles.input} onPress={cadastro}>Cadastro</Button>
       
    </ThemedView>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    color: 'blue',
    marginLeft: 5,
  },
});
