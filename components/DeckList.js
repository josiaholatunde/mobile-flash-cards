import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import DeckCard from './DeckCard'
import { TouchableOpacity } from 'react-native-gesture-handler'

export class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
    }
    render() {
        const { decks } = this.props
        return (
            <ScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'center', 
            marginTop: 20,
            alignItems: 'center'}}>
                {
                    Object.keys(decks).map(deckTitle => {
                        const deck = decks[deckTitle]

                        return <TouchableOpacity key={deckTitle} onPress={() => this.props.navigation.navigate('DeckDetails', { title: deckTitle })}>
                            <DeckCard deck={deck}  />
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = decks => ({
    decks
})

export default connect(mapStateToProps)(DeckList)
