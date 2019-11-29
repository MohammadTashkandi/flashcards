import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions'
import Button from './Button'

class AddDeck extends React.Component {

    state = {
        title: ''
    }

    handleChange = (name, text) => {
        this.setState(() => ({
            [name]: text
        }))
    }

    handleSubmit = () => {
        const { dispatch, navigation } = this.props
        const { title } = this.state

        if (title === '') {
            return alert('Please enter a title for your deck!')
        }

        dispatch(handleAddDeck(title))
            .then(() => {
                navigation.navigate('IndividualDeck', {
                    deckId: title
                })
            })

        this.setState(() => ({
            title: '',
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{ textAlign: 'center', fontSize: 24 }}>What is the title of your new deck?</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.title}
                        onChangeText={(text) => this.handleChange('title', text)}
                    />
                </View>
                <Button onPress={this.handleSubmit}>
                    SUBMIT
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        margin: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
    }
})

export default connect()(AddDeck)