import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarIcon from '../components/TabBarIcon';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons'
import NewDeck from '../components/NewDeck';
import DeckList from '../components/DeckList';
import Colors from '../constants/Colors';
import { Platform } from 'react-native'

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
            tabStyle: { backgroundColor: Colors.primary, color: '#fff'}
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
                    tabBarIcon: ({ focused }) =>  (
                        Platform.OS === 'ios' ? (
                            <Entypo focused={focused} name='squared-plus' size={30} style={{ marginBottom: 0 }} color={Colors.tabIconDefault} />
                        )
                    :(<FontAwesome focused={focused} name='plus-square' size={30} style={{ marginBottom: 0 }} color={Colors.tabIconDefault} />))
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
