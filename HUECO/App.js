import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Import Screens
import ToDoApp from '../HUECO/src/Screens/ToDoApp';

export default function App() {
  return (
    <View style={styles.container}>
      <ToDoApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
