import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './navigation/BottomNavigator';
import NewDeck from './components/NewDeck';
import DeckDetails from './components/DeckDetails';


const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Root' component={BottomNavigator} />
          <Stack.Screen name='NewDeck' component={NewDeck} />
          <Stack.Screen name='DeckDetails' component={DeckDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
