import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
import { handleDeleteDeck } from '../actions'
import { brightGreen } from '../utils/colors'
import Button from './Button'

class IndividualDeck extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('deckId')
    })

    addCard = () => {
        const { navigation } = this.props

        const deckId = navigation.getParam('deckId')
        navigation.navigate('AddQuestion', {
            deckId
        })
    }

    startQuiz = () => {
        const { navigation } = this.props

        const deckId = navigation.getParam('deckId')
        navigation.navigate('Quiz', {
            deckId
        })
    }

    removeDeckCheck = () => {
        Alert.alert('Warning', 'Are you sure you want to delete this deck?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: this.removeDeck
            }
        ])
    }

    removeDeck = () => {
        const { navigation, dispatch } = this.props

        dispatch(handleDeleteDeck(navigation.getParam('deckId')))
        navigation.popToTop()
    }

    render () {

        const { deck } = this.props

        if (!deck) {
            return (
                <View>
                    <ActivityIndicator size='large' color={brightGreen} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.number}>{deck.questions.length} cards</Text>
                </View>

                <View>
                    <Button style={styles.button} onPress={this.addCard}>
                        Add card
                    </Button>

                    <Button style={styles.button} onPress={this.startQuiz} type='secondary'>
                        Start quiz
                    </Button>

                    <Button style={styles.button} onPress={this.removeDeckCheck} type='danger'>
                        Delete deck
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        alignItems: 'stretch',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    number: {
        fontSize: 20,
        color: brightGreen,
    },
    button: {
        marginBottom: 10,
    }
})

const mapStateToProps = (state, ownProps) => ({
        deck: state[ownProps.navigation.getParam('deckId')]
})

export default connect(mapStateToProps)(IndividualDeck)