import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBudgets, REMOVE_BUDGET} from '../store/budgetsSlice';
import {
  Appbar,
  Avatar,
  Card,
  FAB,
  IconButton,
  MD2Colors,
  MD3Colors,
  Text,
  useTheme,
} from 'react-native-paper';
import {currencyGreen} from '../configs/CustomColors';

const BudgetListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budgets.budgetList);

  const {colors} = useTheme();

  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  const handleREMOVE_BUDGET = id => {
    dispatch(REMOVE_BUDGET(id));
  };

  const renderItem = ({item}) => {
    const LeftIcon = props => (
      <Avatar.Icon
        {...props}
        icon="currency-inr"
        color={MD2Colors.white}
        theme={{
          colors: {
            primary: currencyGreen,
          },
        }}
      />
    );

    const RightAction = props => (
      <IconButton
        {...props}
        icon="delete"
        iconColor={MD3Colors.error40}
        size={30}
        onPress={() => handleREMOVE_BUDGET(item.id)}
      />
    );

    return (
      <>
        <Card
          mode="contained"
          theme={{
            colors: {
              surfaceVariant: MD3Colors.tertiary100,
            },
          }}
          style={styles.card}>
          <Card.Title
            title={`₹ ${item?.amount}`}
            // subtitle={`Acutal amount: $ ${item?.amount}`}
            left={LeftIcon}
            right={RightAction}
          />
          <Card.Content>
            <Text variant="titleMedium">{item?.name}</Text>
            <Text variant="bodyMedium">
              Planed amount is ₹ {item?.planedAmount || '0'}
            </Text>
            <Text variant="bodyMedium">Acutal amount is ₹ {item?.amount}</Text>
          </Card.Content>
        </Card>
      </>
    );
  };

  const renderNoDataFound = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
        }}>
        <Text style={{color: '#847f7f', fontSize: 20}}>
          No Budgets found !
        </Text>
        <Text style={{color: '#847f7f', fontSize: 14}}>
          Please add new budgets
        </Text>
      </View>
    );
  };

  return (
    <>
      {/* app header */}
      <Appbar.Header>
        <Appbar.Content title="Budget List" />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={budgets}
          renderItem={renderItem}
          ListEmptyComponent={renderNoDataFound}
          keyExtractor={item => item.id}
        />
        <FAB
          icon="plus"
          label="New Budget"
          style={styles.addBudgetBtn}
          onPress={() => navigation.navigate('AddBudget')}
          backgroundColor={MD2Colors.cyan50}
          color={MD2Colors.blueA700}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: MD2Colors.grey200,
  },
  addBudgetBtn: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    margin: 6,
  },
});

export default BudgetListScreen;
