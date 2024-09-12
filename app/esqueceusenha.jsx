import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Input from '@/components/Input';
import { db } from '../firebaseConfig'; 
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function RedefinirSenha() {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const redefinirSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const q = query(
        collection(db, 'usuarios'),
        where('email', '==', email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = doc(db, 'usuarios', querySnapshot.docs[0].id);
        await updateDoc(userDoc, { senha: novaSenha });

        Alert.alert('Sucesso!', 'Senha redefinida com sucesso!');
        setEmail('');
        setNovaSenha('');
        setConfirmarSenha('');
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível redefinir a senha.');
      console.error('Erro ao redefinir senha: ', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Digite seu email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Nova Senha"
        style={styles.input}
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />
      <Input
        placeholder="Confirmar Nova Senha"
        style={styles.input}
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <Button mode="contained" style={styles.button} onPress={redefinirSenha}>
        Redefinir Senha
      </Button>
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
  button: {
    marginTop: 15,
    width: '100%',
  },
});
