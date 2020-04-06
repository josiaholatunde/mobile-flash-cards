import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarIcon from '../components/TabBarIcon';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import NewDeck from '../components/NewDeck';
import DeckList from '../components/DeckList';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'DecksList';

const BottomNavigator = ({ route, navigation }) => {

    navigation.setOptions({
        headerTitle: getHeaderTitle(route)
    })
    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: '#ccc',
            tabStyle: { backgroundColor: '#0275d8', color: '#fff'}
          }}
        >
            <BottomTab.Screen
                name='DecksList'
                component={DeckList}
                options={{
                    tabBarLabel: 'Decks',
                    tabBarIcon: ({ focused }) => <MaterialIcons focused={focused} name='card-travel' size={30} style={{ marginBottom: 0 }} color={ Colors.tabIconDefault} />
                }}
            />

            <BottomTab.Screen
                name='AddDeck'
                component={NewDeck}
                options={{
                    tabBarLabel: 'Add Deck',
                    tabBarIcon: ({ focused }) => <FontAwesome focused={focused} name='plus-square' size={30} style={{ marginBottom: 0 }} color={Colors.tabIconDefault} />
                }}
            />
        </BottomTab.Navigator>
    )
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  
    switch (routeName) {
      case 'DecksList':
        return 'List of Decks';
      case 'AddDeck':
        return 'Add a new Deck';
    }
  }

export default BottomNavigator
