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
    router.navigate('login');
  };

  return (
    <>
      
      <ThemedView style={styles.container}>
        
        <ThemedText type="title">Redefinição de senha</ThemedText>
        
        <Input
          placeholder="Senha Antiga"
          style={styles.input}
        /> 

        <Input
          placeholder="Nova Senha"
          style={styles.input}
        /> 

        <Button mode="contained" style={styles.input} onPress={register}>Redefinir</Button>
         
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
