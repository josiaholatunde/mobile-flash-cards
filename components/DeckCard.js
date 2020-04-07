import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import { getRandomColors } from '../constants/Colors'
import _ from 'lodash'

const colorsArray = getRandomColors()
export class DeckCard extends Component {
    render() {
        const { deck, index } = this.props
        const indexOfColorToDisplay = index % colorsArray.length
        return (
            <TouchableOpacity style={[styles.card, { backgroundColor: colorsArray[indexOfColorToDisplay] }]}>
               <Text style={styles.cardTitle}> { deck.title } </Text> 
               <Text style={{ color: Colors.white, fontSize: 18}}> { deck.questions.length }  card{ deck.questions.length === 1 ? '': 's' } </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    cardTitle: {
        fontSize: 24,
        padding: 5,
        color: Colors.white
    }
})

export default DeckCard
