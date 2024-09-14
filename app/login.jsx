import React, { useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Input from '@/components/Input';
import { db } from '../firebaseConfig'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      // Buscar o usuário no Firestore 
      const q = query(
        collection(db, 'usuarios'),
        where('email', '==', email),
        where('senha', '==', senha)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Usuário encontrado
        const userId = querySnapshot.docs[0].id; 
        await AsyncStorage.setItem('userToken', userId); 

        Alert.alert('Sucesso!', 'Login realizado com sucesso!');
        router.push('(tabs)');
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível realizar o login.');
      console.error('Erro ao realizar login: ', erro);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>

      <Input
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      /> 

      <Input
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      /> 

      <Button mode="contained" style={styles.input} onPress={login}>Login</Button>
       
      <View style={styles.registerContainer}>
        <ThemedText>Não possui login?</ThemedText>
        <TouchableOpacity onPress={() => router.push('/registro')}>
          <ThemedText style={styles.link}>Registre-se aqui</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => router.push('/esqueceusenha')}>
          <ThemedText style={styles.link}>Esqueceu sua senha? clique aqui!</ThemedText>
        </TouchableOpacity>
      </View>
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
