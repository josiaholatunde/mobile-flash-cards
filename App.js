import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import setLocalNotification from './utils/helpers';
import AppRouter from './components/AppRouter';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default function App() {

  useEffect(() => {
    setLocalNotification()
    //eslint-disable-next-line
  }, [])

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppRouter />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
