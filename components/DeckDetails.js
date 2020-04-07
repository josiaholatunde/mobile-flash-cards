import React, { Component } from 'react'
import { View, Text, StyleSheet, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../utils/api'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import { deleteDeckFromRedux } from '../actions';
import { deleteDeckFromDb } from '../utils/api'
import TextButton from './TextButton';
export class DeckDetails extends Component {

    deleteDeck = () => {
        const { dispatch, deck, navigation } = this.props
        deleteDeckFromDb(deck.title)
        .then(deck => {
            dispatch(deleteDeckFromRedux(deck.title))
            navigation.navigate('DecksList')
            
        }).catch(err => console.log('An error occurred while deleting deck'))
    }

    render() {
        const { deck } = this.props;
        return (
           deck && (
            <View style={{ flex: 1, alignItems: 'center', padding: 50}}>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}> {deck.title} </Text>
                <Text style={{ color: Colors.gray, fontSize: 18, marginTop: 10 }}> {deck.questions.length}  card{deck.questions.length === 1 ? '' : 's'} </Text>
            </View>

            <View style={styles.actionBtn}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddDeckCard', { title: deck.title})} style={[styles.btn, { backgroundColor: Colors.primary }]}>
                    <Text style={{color: Colors.white}}> Add Card </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', { title: deck.title})} style={[styles.btn, { backgroundColor: Colors.danger }]}>
                    <Text style={{color: Colors.white}}> Start Quiz </Text>
                </TouchableOpacity>
            </View>
        </View>
           )
        )
    }
}


const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 34,
        padding: 5,
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },  
    btn: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 4,
        margin: 10
    },
    actionBtn: {
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (decks, props) => ({
    deck: decks[props.route.params.title]
})
export default connect(mapStateToProps)(DeckDetails)
