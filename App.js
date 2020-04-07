import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './navigation/BottomNavigator';
import NewDeck from './components/NewDeck';
import DeckDetails from './components/DeckDetails';
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import AddDeckCard from './components/AddDeckCard';
import Quiz from './components/Quiz';
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import setLocalNotification from './utils/helpers';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

const Stack = createStackNavigator();



export default function App() {

  useEffect(() => {
    setLocalNotification()
    //eslint-disable-next-line
  }, [])
  
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
