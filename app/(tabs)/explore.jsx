import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';
import Button from '../../components/Button';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); 
  const router = useRouter();

  const buscarDadosUsuario = async () => {
    try {
      const userId = await AsyncStorage.getItem('userToken');
      if (userId) {
        const userDoc = doc(db, 'usuarios', userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser(userData);
        } else {
          console.log('Usuário não encontrado');
        }
      } else {
        console.log('Token do usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      buscarDadosUsuario();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Perfil" />
        <Appbar.Action 
          icon="dots-vertical"
          onPress={() => navigation.navigate("Settings")}
        />
      </Appbar.Header>
      
      <View style={styles.registerContainer}>
        {user ? (
          <View style={styles.avatarContainer}>
            {user.foto ? (
              <Image
                source={{ uri: user.foto }} 
                style={styles.avatar}
              />
            ) : (
              <Avatar.Icon
                size={80}
                icon="account"
                style={styles.avatar}
              />
            )}
            <Text style={styles.email}>{user.email}</Text>
          </View>
        ) : (
          <Text>Carregando...</Text>
        )}

        <Button mode="contained" style={styles.input} onPress={() => router.push('/teste')}>
          Atualizar Foto de Perfil
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  email: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
