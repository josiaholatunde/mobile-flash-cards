import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './navigation/BottomNavigator';
import NewDeck from './components/NewDeck';
import DeckDetails from './components/DeckDetails';
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import AddDeckCard from './components/AddDeckCard';
import Quiz from './components/Quiz';

const store = createStore(reducer)

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Root' component={BottomNavigator} />
            <Stack.Screen name='NewDeck' component={NewDeck} />
            <Stack.Screen name='DeckDetails' component={DeckDetails} />
            <Stack.Screen name='AddDeckCard' component={AddDeckCard} />
            <Stack.Screen name='Quiz' component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
