import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function CardComponent({ title, content, image }) {
  return (
    <Card style={styles.card}>
      {image && <Card.Cover source={{ uri: image }} />}
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
  },
});