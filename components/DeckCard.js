import React, { Component } from 'react'

export class DeckCard extends Component {
    render() {
        const { deck } = this.props
        return (
            <View>
               <Text> Deck - { deck.title } </Text> 
            </View>
        )
    }
}

export default DeckCard
