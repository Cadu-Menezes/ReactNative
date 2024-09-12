import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default function Imagem({ source, width = 100, height = 100, style }) {
  return (
    <View style={[styles.imageContainer, style]}>
      <Image
        source={source}
        style={{ width, height, borderRadius: 10 }}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
});