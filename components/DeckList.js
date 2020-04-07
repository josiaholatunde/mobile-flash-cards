import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks, hideLoading, showLoading } from '../actions'
import DeckCard from './DeckCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppLoader from './AppLoader'

export class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(showLoading());
        setTimeout(() => {
            getDecks()
                .then(decks => dispatch(receiveDecks(decks)))
                .finally(() => dispatch(hideLoading()))
        }, 2000)

    }
    render() {
        const { decks, loading } = this.props
        return (
            loading ? (<AppLoader />) : (<ScrollView style={{ flex: 1 }} contentContainerStyle={{
                justifyContent: 'center',
                marginTop: 20,
                alignItems: 'center'
            }}>
                {
                    Object.keys(decks).map((deckTitle, index) => {
                        const deck = decks[deckTitle]

                        return <TouchableOpacity key={deckTitle} onPress={() => this.props.navigation.navigate('DeckDetails', { title: deckTitle })}>
                            <DeckCard deck={deck} index={index} />
                        </TouchableOpacity>
                    })
                }
            </ScrollView>)
        )
    }
}

const mapStateToProps = ({ decks, loading }) => ({
    decks,
    loading
})

export default connect(mapStateToProps)(DeckList)
