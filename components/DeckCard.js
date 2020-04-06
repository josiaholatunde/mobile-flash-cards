import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

export class DeckCard extends Component {
    render() {
        const { deck } = this.props
        return (
            <TouchableOpacity style={styles.card}>
               <Text style={styles.cardTitle}> { deck.title } </Text> 
               <Text style={{ color: Colors.gray, fontSize: 18}}> { deck.questions.length }  card{ deck.questions.length === 1 ? '': 's' } </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        height: 150,
        width: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: .8,
        shadowRadius: 2,
        borderRadius: 8,
        elevation: 5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    cardTitle: {
        fontSize: 24,
        padding: 5,
    }
})

export default DeckCard
