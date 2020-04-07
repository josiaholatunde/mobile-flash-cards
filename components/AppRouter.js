import React, { Fragment } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from '../navigation/BottomNavigator';
import NewDeck from './NewDeck';
import AddDeckCard from './AddDeckCard';
import AppLoader from './AppLoader';
import DeckDetails from './DeckDetails';
import Quiz from './Quiz';


const Stack = createStackNavigator();

const AppRouter = () => {
    return (
        <Fragment>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Root' component={BottomNavigator}

                    />
                    <Stack.Screen name='NewDeck' component={NewDeck}
                        options={{
                            headerTitle: 'Create a New Deck'
                        }}
                    />
                    <Stack.Screen name='DeckDetails' component={DeckDetails}
                        options={{
                            headerTitle: 'Deck Details'
                        }}
                    />
                    <Stack.Screen name='AddDeckCard' component={AddDeckCard}
                        options={{
                            headerTitle: 'Add a card to a deck'
                        }}
                    />
                    <Stack.Screen name='Quiz' component={Quiz} />
                </Stack.Navigator>
            </NavigationContainer>
        </Fragment>
    )
}


export default (AppRouter)
