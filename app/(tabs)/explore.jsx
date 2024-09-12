import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';

export default function TabTwoScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userToken');
        if (userId) {
          const userDoc = doc(db, 'usuarios', userId);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            setUser(userSnapshot.data());
          }
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Perfil" />
        <Appbar.Action 
          icon="dots-vertical"
          onPress={() => {
            router.push("settings");
          }}
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
        <Link href="/teste" style={styles.link}>Clique aqui para editar o seu perfil</Link>
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
  link: {
    color: 'blue',
    marginLeft: 5,
  },
});
