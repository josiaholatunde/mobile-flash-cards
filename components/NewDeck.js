import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Colors from '../constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addTitleToDeck } from '../actions'
export class NewDeck extends Component {
    state  = {
        title: '',
        error: ''
    }
    handleTitleChange = (title) => {
        this.setState({ title })
    }

    addDeck = () => {
        const { title } = this.state
        const { dispatch } = this.props
        if (title && title.trim().length > 0) {
            return saveDeckTitle(title)
            .then(deck => {
                dispatch(addTitleToDeck(title))
                this.props.navigation.navigate('DecksList')
            }).catch(err => console.log('An error occurred while creating deck title'));
        } else {
            this.setState({ error: 'The deck title field is required'})
            setTimeout(() => this.setState({ error: ''}), 3000)
        }
    }
    render() {
        const { title, error } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={{ justifyContent: 'center', alignItems: 'center', padding: 45, marginTop: 20}}>
                <Text style={{ fontSize: 34, textAlign: 'center'}}>What is the title of your new deck ?</Text>

                <View style={{ marginTop: 90, alignItems: 'center'}}>
                    <TextInput 
                        onChangeText={this.handleTitleChange}
                        value={title}
                        style={styles.input}
                    />
                    <Text style={styles.errorText}>{ error &&  error  }</Text>
                    <TouchableOpacity onPress={this.addDeck} style={[styles.btn, { backgroundColor: Colors.primary }]}>
                        <Text style={{ color: Colors.white}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 5,
        width: 300,
        borderRadius: 3
        
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
        width: 100,
        alignItems: 'center'
    },
})

export default connect()(NewDeck)
