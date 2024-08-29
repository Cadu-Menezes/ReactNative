import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function CustomSnackbar({ message, actionLabel, onAction }) {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button title="Show Snackbar" onPress={onToggleSnackBar} />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: actionLabel,
          onPress: () => {
            if (onAction) {
              onAction();
            }
            onDismissSnackBar();
          },
        }}
        duration={Snackbar.DURATION_SHORT}
      >
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});