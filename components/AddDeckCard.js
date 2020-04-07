import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Colors from '../constants/Colors'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCardToReduxDeck } from '../actions'
import { Ionicons } from '@expo/vector-icons'
export class AddDeckCard extends Component {

    state = {
        question: '',
        answer: '',
        error: {}
    }

    handleInputChange = (fieldName, value) => this.setState({ [fieldName]: value })

    addCardToDeck = () => {
        const error = {}
        const { question, answer } = this.state
        if (!question || question.trim().length === 0) {
            error.question = 'The question field is required'
        }
        if (!question || question.trim().length === 0) {
            error.answer = 'The answer field is required'
        }
        if (Object.keys(error).length > 0) {
            this.setState({ error })
            setTimeout(() => this.setState({ error: {} }), 4000)
            return;
        }
        const { title } = this.props.route.params;
        const { dispatch, navigation } = this.props
        const card = {
            question,
            answer
        }
        addCardToDeck(title, card)
            .then(() => {
                dispatch(addCardToReduxDeck(title, card))
                navigation.navigate('DecksList')
            }).catch((err) => console.log('An error while adding card to deck'))
    }
    render() {
        const { question, answer, error } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Question</Text>
                    <TextInput
                        onChangeText={text => this.handleInputChange('question', text)}
                        value={question}
                        style={styles.input}
                    />
                    <Text style={styles.errorText}>  {error['question'] && error['question']} </Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Answer</Text>
                    <TextInput
                        onChangeText={text => this.handleInputChange('answer', text)}
                        value={answer}
                        style={styles.input}
                    />
                    <Text style={styles.errorText}>  {error['answer'] && error['answer']} </Text>
                </View>
                <TouchableOpacity onPress={this.addCardToDeck} style={[styles.btn, { backgroundColor: Colors.primary, flexDirection: 'row' }]}>

                    <Text style={{ color: Colors.white }}>Submit</Text>
                    {
                        (<Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-dropright' : 'md-arrow-forward'} color={Colors.white} style={{ marginLeft: 12}} />)
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 50,
        paddingTop: 70
    },
    label: {
        fontSize: 18
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 5,
        paddingLeft: 10,
        width: 300,
        marginTop: 10,
        borderRadius: 3,
    },
    errorText: {
        color: Colors.danger,
        alignSelf: 'flex-start',
        padding: 5
    },
    formGroup: {
        marginTop: 15,
        marginBottom: 15,
    },
    errorText: {
        color: Colors.danger,
        alignSelf: 'flex-start',
        padding: 5
    },
    btn: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 4,
        margin: 10,
        width: 130,
        alignItems: 'center'
    },
})

export default connect()(AddDeckCard)
