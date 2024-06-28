import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, REMOVE_BUDGET } from '../store/budgetsSlice';


const BudgetListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budgets.budgetList);

  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  const handleREMOVE_BUDGET = (id) => {
    dispatch(REMOVE_BUDGET(id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.budgetItem}>
      <Text style={styles.budgetText}>{item.name}: ${item.amount}</Text>
      <Button title="Remove" onPress={() => handleREMOVE_BUDGET(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="Add Budget"
        onPress={() => navigation.navigate('AddBudget')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  budgetText: {
    fontSize: 16,
    color: "black"
  },
});

export default BudgetListScreen;
