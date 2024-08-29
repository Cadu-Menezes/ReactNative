import { Link, router, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Input from '@/components/Input';
import { Button } from 'react-native-paper';
import { isLoggedIn } from '@/services/auth';

export default function login() {

  const login = () => {
    isLoggedIn.value = true;
    router.navigate('(tabs)');
  };

  return (
    <>
      
      <ThemedView style={styles.container}>
        
        <ThemedText type="title">Login.</ThemedText>
        
        <Input
          placeholder="Email"
          style={styles.input}
        /> 

        <Input
          placeholder="Senha"
          style={styles.input}
        /> 

        <Button mode="contained" style={styles.input} onPress={login}>Login</Button>
         
        <View style={styles.registerContainer}>
          <ThemedText>Não possui login?</ThemedText>
          <Link href="/registro" style={styles.link}> Registre-se aqui</Link>
        </View>

        <View style={styles.registerContainer}>
          <Link href="/esqueceusenha" style={styles.link}> Esqueceu sua senha? clique aqui!</Link>
        </View>
        
        

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
