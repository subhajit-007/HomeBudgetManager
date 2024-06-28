import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { ADD_BUDGET } from '../store/budgetsSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const AddBudgetScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleAddBudget = () => {
    if (name && amount) {
        console.log("name and amount: ", name, amount)
      const newBudget = { id: uuidv4(), name, amount: parseFloat(amount) };
      dispatch(ADD_BUDGET(newBudget));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Budget Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(value) => setAmount(value)}
        keyboardType="numeric"
      />
      <Button title="Add Budget" onPress={handleAddBudget} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "black"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    color: "black"
  },
});

export default AddBudgetScreen;
