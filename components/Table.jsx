import React from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Table() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <DataTable>
          {/* Cabeçalho da Tabela */}
          <DataTable.Header>
            <DataTable.Title>Nome</DataTable.Title>
            <DataTable.Title numeric>Idade</DataTable.Title>
            <DataTable.Title numeric>Profissão</DataTable.Title>
          </DataTable.Header>

          {/* Linhas de Dados */}
          <DataTable.Row>
            <DataTable.Cell>John Doe</DataTable.Cell>
            <DataTable.Cell numeric>28</DataTable.Cell>
            <DataTable.Cell numeric>Desenvolvedor</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Jane Smith</DataTable.Cell>
            <DataTable.Cell numeric>34</DataTable.Cell>
            <DataTable.Cell numeric>Designer</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Bob Johnson</DataTable.Cell>
            <DataTable.Cell numeric>45</DataTable.Cell>
            <DataTable.Cell numeric>Gerente</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});