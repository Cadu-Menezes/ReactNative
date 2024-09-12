import { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const registrarUsuario = async () => {
    try {
      // Adicionar o usuário na coleção 'usuarios' no Firestore, gerando automaticamente um ID
      await addDoc(collection(db, 'usuarios'), {
        email: email,
        senha: senha, // Aqui você está armazenando a senha diretamente no Firestore
        foto: '', // Campo da foto vazio
      });

      Alert.alert('Sucesso!', 'Usuário registrado com sucesso!');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível registrar o usuário.');
      console.error('Erro ao registrar usuário: ', erro);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Registrar</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Registrar" onPress={registrarUsuario} />
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
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
