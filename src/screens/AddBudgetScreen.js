import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {ADD_BUDGET} from '../store/budgetsSlice';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  Appbar,
  Button,
  MD2Colors,
  MD3Colors,
  Text,
  TextInput,
} from 'react-native-paper';

const AddBudgetScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [planedAmount, setPlanedAmount] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleAddBudget = () => {
    if (isFormValid()) {
      const newBudget = {
        id: uuidv4(),
        name,
        amount: parseFloat(amount),
        planedAmount: parseFloat(planedAmount),
      };
      dispatch(ADD_BUDGET(newBudget));
      navigation.goBack();
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, amount, planedAmount]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = 'Name is required !';
    }
    // else {
    //   errors.name = '';
    // }

    // Validate amount field
    if (!amount) {
      errors.amount = 'Acutal amount is required !';
    } else if (isNaN(amount)) {
      errors.amount = 'Actual amount should be a number !';
    }
    // else {
    //   errors.amount = '';
    // }

    // Validate amount field
    if (!planedAmount) {
      errors.planedAmount = 'Planed amount is required !';
    } else if (isNaN(planedAmount)) {
      errors.planedAmount = 'Planed amount should be a number !';
    }
    // else {
    //   errors.planedAmount = '';
    // }

    // Set the errors and update form validity
    setErrors(errors);
    // setIsFormValid(Object.keys(errors).length === 0);
  };

  const isFormValid = () => {
    return name && planedAmount && amount && Object.keys(errors).length === 0;
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="New Budget Entry" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <View>
          <TextInput
            mode="outlined"
            label="Budget Name"
            placeholder="Enter budget name"
            value={name}
            onChangeText={value => setName(value)}
            autoFocus
            // cursorColor ={MD2Colors.blueA700}
            // textColor={MD2Colors.blueA700}
            // outlineColor={MD2Colors.blueA700}
            // activeOutlineColor={MD2Colors.blueA700}
            theme={{
              colors: {
                primary: MD2Colors.blueA700,
              },
            }}
            error={errors['name']?.length > 0 ?? false}
          />
          <Text variant="bodyMedium" style={styles.errorHelpText}>
            {errors['name'] ?? ''}
          </Text>

          <TextInput
            mode="outlined"
            label="Actual Amount"
            placeholder="Enter actual amount"
            value={amount}
            onChangeText={value => setAmount(value)}
            // autoFocus
            // cursorColor ={MD2Colors.blueA700}
            // textColor={MD2Colors.blueA700}
            // outlineColor={MD2Colors.blueA700}
            // activeOutlineColor={MD2Colors.blueA700}
            theme={{
              colors: {
                primary: MD2Colors.blueA700,
              },
            }}
            error={errors['amount']?.length > 0 ?? false}
            keyboardType="numeric"
          />
          <Text variant="bodyMedium" style={styles.errorHelpText}>
            {errors['amount'] ?? ''}
          </Text>

          <TextInput
            mode="outlined"
            label="Planed Amount"
            placeholder="Enter planed amount"
            value={planedAmount}
            onChangeText={value => setPlanedAmount(value)}
            // autoFocus
            // cursorColor ={MD2Colors.blueA700}
            // textColor={MD2Colors.blueA700}
            // outlineColor={MD2Colors.blueA700}
            // activeOutlineColor={MD2Colors.blueA700}
            theme={{
              colors: {
                primary: MD2Colors.blueA700,
              },
            }}
            error={errors['planedAmount']?.length > 0 ?? false}
            keyboardType="numeric"
          />
          <Text variant="bodyMedium" style={styles.errorHelpText}>
            {errors['planedAmount'] ?? ''}
          </Text>

          <Button
            mode="contained-tonal"
            style={styles.saveBudgetBtn}
            textColor={MD2Colors.blueA700}
            buttonColor={MD2Colors.blue100}
            labelStyle={{width: '100%'}}
            onPress={handleAddBudget}
            disabled={!isFormValid()}>
            Add Budget
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: MD2Colors.grey200,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    color: 'black',
  },
  saveBudgetBtn: {
    // position: 'absolute',
    // margin: 16,
    width: '100%',
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  errorHelpText: {
    color: MD3Colors.error50,
    marginLeft: 2,
    marginVertical: 4,
    padding: 2,
  },
});

export default AddBudgetScreen;
