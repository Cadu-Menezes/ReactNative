import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig'; 
import { doc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Teste() {
  const [foto, setFotoPerfil] = useState(null);
  const [uploading, setUploading] = useState(false);

  const storage = getStorage();

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await processarImagem(uri);
    } else {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const processarImagem = async (uri) => {
    try {
      if (!uri) {
        throw new Error('URI da imagem não está disponível.');
      }

      setUploading(true);
      
      const userId = await AsyncStorage.getItem('userToken');
      const imageRef = ref(storage, `profile_pictures/${userId}`);

      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);
      await atualizarFotoDePerfil(downloadURL);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      Alert.alert('Erro', 'Não foi possível processar a imagem.');
    } finally {
      setUploading(false);
    }
  };

  const atualizarFotoDePerfil = async (url) => {
    try {
      const userId = await AsyncStorage.getItem('userToken');
      if (userId) {
        const userDoc = doc(db, 'usuarios', userId);
        await updateDoc(userDoc, { foto: url });
        Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        setFotoPerfil(url); 
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
          <Image source={{ uri: foto }} style={styles.avatar} />
        ) : (
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.avatar} />
        )}
      </View>
      <Button title={uploading ? "Enviando..." : "Escolher nova foto"} onPress={escolherImagem} disabled={uploading} />
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
