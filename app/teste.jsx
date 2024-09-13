import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // libzinha para selecionar imagem na galeria
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system'; //Lib para converter base64

export default function teste() {
  const [user, setUser] = useState(null);
  const [foto, setFotoPerfil] = useState(null);

  useEffect(() => {
    const verificarPermissao = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
      }
    };

    verificarPermissao();

    const buscaDadosUsuario = async () => {
      try {
        const userId = await AsyncStorage.getItem('userToken');
        if (userId) {
          const userDoc = doc(db, 'usuarios', userId);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUser(userData);
            setFotoPerfil(userData.foto ? `data:image/jpeg;base64,${userData.foto}` : null);
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

    buscaDadosUsuario();
  }, []);

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      setFotoPerfil(uri);
      AtualizarImagem(uri);
    } else {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const AtualizarImagem = async (uri) => {
    try {
      if (!uri) {
        throw new Error('URI da imagem não está disponível.');
      }

      // Converte a imagem em Base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Atualiza a foto de perfil no Firestore
      await atualizarFotoDePerfil(base64);
    } catch (error) {
      console.error('Erro ao converter imagem para Base64:', error);
      Alert.alert('Erro', 'Não foi possível converter a imagem para Base64.');
    }
  };

  const atualizarFotoDePerfil = async (base64) => {
    try {
      const userId = await AsyncStorage.getItem('userToken');
      if (userId) {
        const userDoc = doc(db, 'usuarios', userId);
        await updateDoc(userDoc, { foto: base64 });
        Alert.alert('Sucesso', 'Foto de perfil atualizada!');
      } else {
        Alert.alert('Erro', 'Não foi possível obter o token do usuário.');
      }
    } catch (error) {
      console.error('Erro ao atualizar foto de perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a foto de perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {foto ? (
          <Image source={{ uri: imagem }} style={styles.avatar} />
        ) : (
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.avatar} />
        )}
      </View>
      <Button title="Escolher nova foto" onPress={escolherImagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
});
