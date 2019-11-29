import React from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions'
import Button from './Button'

class AddQuestion extends React.Component {

    state = {
        question: '',
        answer: '',
    }

    onChange = (name, text) => {
        this.setState(() => ({
            [name]: text
        }))
    }

    handleSubmit = () => {
        const { question, answer } = this.state
        const { navigation, dispatch } = this.props

        if (question === '' || answer === '') {
            return alert('Please fill both the question and answer')
        }

        const deckId = navigation.getParam('deckId')

        const newQuestion = {
            question,
            answer
        }
        dispatch(handleAddQuestion(deckId, newQuestion))
            .then(() => {
                navigation.goBack()
            })
    }

    render () {

        const { question, answer } = this.state

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.label}>Question:</Text>
                <TextInput
                    style={styles.input}
                    value={question}
                    onChangeText={(text) => this.onChange('question', text)}
                />
                <Text style={styles.label}>Answer:</Text>
                <TextInput
                    style={styles.input}
                    value={answer}
                    onChangeText={(text) => this.onChange('answer', text)}
                />

                <Button
                    onPress={this.handleSubmit}>
                        SUBMIT
                </Button>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        margin: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 30
    },
    label: {
        fontSize: 24,
    }
})

export default connect()(AddQuestion)