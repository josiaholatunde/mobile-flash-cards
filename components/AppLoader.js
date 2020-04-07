import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import { connect } from 'react-redux'

const AppLoader = ({ loading }) => {
  return (
    <View style={styles.center}>
       { loading &&  <ActivityIndicator
            size={"large"}
            color={Colors.primary}
        />}
    </View>
  )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})

const mapStateToProps = ({ loading }) => ({ loading })


export default connect(mapStateToProps)(AppLoader)
