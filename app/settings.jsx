import { Link, router, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/Button';

export default function settings() {

  const logout = () => {
    router.navigate('login');
  };

  return (
    <>
      
      <ThemedView style={styles.container}>
        <ThemedText type="title">Settings.</ThemedText>
        <Button mode="contained" onPress={logout}>Logout</Button>
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
});
