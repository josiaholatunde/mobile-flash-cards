import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'
import { AntDesign, EvilIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import setLocalNotification, { clearAllNotifications } from '../utils/helpers'
export class Quiz extends Component {
    state = {
        currentQuestion: 0,
        correctQuestions: 0,
        showQuestion: true,
        finishQuiz: false
    }
    handleAnswer = (response) => {
        const { questions } = this.props
        const { currentQuestion } = this.state
        if (response) {
            this.setState(state => ({ correctQuestions: state.correctQuestions + 1 }))
        }

        if (currentQuestion === questions.length - 1) {
            this.setState({ finishQuiz: true })
            // Clear all notification
            clearAllNotifications();
        } else {
            this.setState(state => ({ currentQuestion: state.currentQuestion + 1, }))
        }


    }
    toggleShowQuestion = () => this.setState(state => ({ showQuestion: !state.showQuestion }))

    resetQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctQuestions: 0,
            showQuestion: true,
            finishQuiz: false
        })
        clearAllNotifications()
        .then(setLocalNotification)
       
    }

    showResult = () => {
        const { correctQuestions } = this.state
        const { questions, navigation } = this.props;
        return <View style={styles.center}>
            <View style={{ marginBottom: 30 }}>
                <AntDesign name='checkcircle' size={55} style={{ color: Colors.gray, fontSize: 77 }} />
            </View>
            <Text style={{ fontSize: 22 }}>Total Questions Answered:  {questions.length} </Text>
            <Text style={{ fontSize: 22 }}>Correct Answers:  {correctQuestions} </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity style={[styles.btnMd, styles.row, { backgroundColor: Colors.primary }]} onPress={() => navigation.goBack()}>
                    <EvilIcons name='chevron-left' color={Colors.white} size={30} />
                    <Text style={{ color: Colors.white, }}> Go Back </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnMd, styles.row, { backgroundColor: Colors.danger }]} onPress={this.resetQuiz}>
                    <EvilIcons name='chevron-left' color={Colors.white} size={30} />
                    <Text style={{ color: Colors.white }}> Reset </Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    showQuestion = () => {
        const { currentQuestion, showQuestion } = this.state
        const { questions } = this.props

        const currentCard = questions[currentQuestion]

        return <View style={{ padding: 20 }}>
            <Text>
                {currentQuestion + 1} / {questions.length}
            </Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    showQuestion ?
                        (<Text style={styles.questionTxt}> {currentCard && currentCard.question} </Text>) : (<Text style={styles.questionTxt}> {currentCard && currentCard.answer } </Text>)
                }
                
            </View>

            <View style={styles.actionBtn}>
                <TouchableOpacity onPress={this.toggleShowQuestion}  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'red' }}>
                        {
                            showQuestion ? 'See Answer' : 'See Question'
                        }
                    </Text>
                    <AntDesign name='arrowright' style={{fontSize: 20, marginLeft: 5}} size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleAnswer(true)} style={[styles.btn, { backgroundColor: Colors.primary, marginTop: 50 }]}>
                    <Text style={{ color: Colors.white }}> Correct </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleAnswer(false)} style={[styles.btn, { backgroundColor: Colors.danger }]}>
                    <Text style={{ color: Colors.white }}> Incorrect </Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    render() {
        const questions = this.props.questions
        const { finishQuiz } = this.state

        if (questions.length === 0) {
            return <View style={styles.center}>
                <Entypo name='emoji-sad' size={100} style={{ marginBottom: 20 }} />
                <Text style={{ fontSize: 20 }}>This deck has no question cards!</Text>
            </View>
        }
        return (
            finishQuiz ? (
                this.showResult()
            ) : (this.showQuestion())
        )
    }
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btn: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 4,
        margin: 10,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnMd: {
        padding: 5,
        borderRadius: 4,
        margin: 10,
        width: 110,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionBtn: {
        marginTop: 190,
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionTxt: {
        fontSize: 33,
        marginTop: 150,
        textAlign: 'center'
    }
})

const mapStateToProps = (decks, props) => ({
    questions: decks[props.route.params.title].questions
})
export default connect(mapStateToProps)(Quiz)
