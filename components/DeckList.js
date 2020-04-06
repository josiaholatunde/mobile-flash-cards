import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import DeckCard from './DeckCard'
import { ScrollView } from 'react-native-gesture-handler'

export class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
    }
    render() {
        const { decks } = this.props
        return (
            <ScrollView>
                <Text> { JSON.stringify(decks)} </Text>
                {
                    Object.keys(decks).map(deckTitle => {
                        const deck = decks[deckTitle]

                        return <DeckCard deck={deck}  />
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
