import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { handleReceiveDecks } from '../actions'
import { lightGray, gray } from '../utils/colors'

class DeckList extends React.Component {

    componentDidMount () {
        this.props.dispatch(handleReceiveDecks())
    }

    handlePress = (deckId) => {
        this.props.navigation.navigate('IndividualDeck', {
            deckId,
        })
    }

    render () {

        const { decks } = this.props
        const decksKeys = Object.keys(decks)

        if (decksKeys.length === 0) {
            return (
                <View style={styles.error}>
                    <Text style={{ fontSize: 25 }}>Add a deck by clicking on the "Add Deck" tab below!</Text>
                </View>
            )
        }

        return (
            <ScrollView style={{flex: 1}}>
                {
                    decksKeys.map((deckId) => {
                        const { title } = decks[deckId]
                        const numberOfQuestions = decks[deckId].questions.length

                        return (
                            <TouchableOpacity onPress={() => this.handlePress(deckId)} key={title} style={styles.deck}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={{color: gray}}>{numberOfQuestions} cards</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        backgroundColor: '#83ff83',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: lightGray,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    title: {
        fontSize: 24
    },
    error: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
    },
})

const mapStateToProps = (state) => ({
    decks: state
})

export default connect(mapStateToProps)(DeckList)