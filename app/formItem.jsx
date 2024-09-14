import React, { useState } from 'react';
import { StyleSheet, Alert, View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Input from '@/components/Input';
import { db, storage } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FormItem() {
  const [item, setItem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagensTemp, setImagensTemp] = useState([]);
  const navigation = useNavigation();

  const adicionarImagens = (uris) => {
    const novasImagens = uris.map(uri => ({
      uri,
      id: Date.now() + Math.random(), // Gerar um ID único para cada imagem
    }));
    setImagensTemp(prevImagens => [...prevImagens, ...novasImagens]);
  };

  const escolherImagens = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const uris = result.assets.map(asset => asset.uri);
      adicionarImagens(uris);
    } else {
      Alert.alert('Erro', 'Não foi possível selecionar as imagens.');
    }
  };

  const tirarFotos = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const uris = result.assets.map(asset => asset.uri);
      adicionarImagens(uris);
    } else {
      Alert.alert('Erro', 'Não foi possível tirar as fotos.');
    }
  };

  const removerFoto = (id) => {
    setImagensTemp(prevImagens => prevImagens.filter(imagem => imagem.id !== id));
  };

  const uploadImagens = async (tarefaId) => {
    try {

      console.log('Iniciando upload das imagens...', tarefaId);

      const imagensProcessadas = await Promise.all(
        imagensTemp.map(async (imagem) => {
          console.log('********************Imagem***********************')
          
          console.log("Imagem: ",imagem)

          const { uri, id } = imagem;
          console.log("URI: ", uri)
          console.log("ID: ", id)
          
          const imageName = `${id}.jpg`;
          console.log("Nome da imagem: ", imageName)

          const imageRef = ref(storage, `tarefa_fotos/${tarefaId}/${imageName}`);
          console.log("Referência da imagem: ", imageRef)

          const response = await fetch(uri);
          console.log("Resposta da imagem: ", response)
                    
          if (!response.ok) {
            console.log('Erro ao obter a imagem. Status: ' + response.status);
            return null;
          }

          const blob = await response.blob();
          console.log("Blob da imagem: ", blob)
          
          await uploadBytes(imageRef, blob);

          const downloadURL = await getDownloadURL(imageRef);
          console.log("URL da imagem: ", downloadURL)

          return downloadURL;
        })
      );

      return imagensProcessadas.filter(url => url !== null);
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error);
      Alert.alert('Erro', 'Não foi possível fazer o upload das imagens.');
      return [];
    }
  };

  const cadastro = async () => {
    try {
      // Passo 1: Cadastrar a tarefa e obter o ID
      const tarefaDocRef = await addDoc(collection(db, 'tarefas'), {
        item,
        descricao,
        fotos: [] // Inicialmente, a lista de fotos está vazia
      });

      const tarefaId = tarefaDocRef.id; // Obter o ID gerado pelo Firestore
      console.log('ID da tarefa:', tarefaId);

      // Passo 2: Fazer o upload das imagens usando o ID da tarefa
      const urls = await uploadImagens(tarefaId);

      // Atualizar o documento da tarefa com as URLs das imagens
      await addDoc(collection(db, 'tarefas'), {
        item,
        descricao,
        fotos: urls
      });

      Alert.alert('Sucesso!', 'Tarefa registrada com sucesso!');
      setImagensTemp([]);
      navigation.navigate("/")
      
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível registrar a tarefa.');
      console.error('Erro ao registrar tarefa: ', erro);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TouchableOpacity onPress={() => removerFoto(item.id)} style={styles.removeButton}>
        <Button mode="text" style={styles.removeButtonText}>X</Button>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>
      <Input
        placeholder="Item"
        style={styles.input}
        value={item}
        onChangeText={setItem}
      />
      <Input
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Text style={styles.titulo}>Galeria</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={tirarFotos}>
          Tirar Fotos
        </Button>
        <Button mode="contained" onPress={escolherImagens}>
          Escolher da Galeria
        </Button>
      </View>
      <FlatList
        data={imagensTemp}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.gallery}
      />
      <Button mode="contained" style={styles.input} onPress={cadastro}>
        Cadastro
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  gallery: {
    marginTop: 20,
    justifyContent: 'center',
  },
  imageContainer: {
    margin: 5,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  removeButtonText: {
    color: 'white',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
});
