import { Link, router, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Input from '@/components/Input';
import { Button } from 'react-native-paper';
import { isLoggedIn } from '@/services/auth';

export default function registro() {

  const register = () => {
    isLoggedIn.value = true;
    router.navigate('(tabs)');
  };

  return (
    <>
      
      <ThemedView style={styles.container}>
        
        <ThemedText type="title">Registro</ThemedText>
        
        <Input
          placeholder="Nome"
          style={styles.input}
        /> 

        <Button mode="contained" style={styles.input} onPress={register}>Criar</Button>
         
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  input: {
    marginTop: 15,
  }

});
