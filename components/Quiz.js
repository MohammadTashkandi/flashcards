import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { lightGray, white } from '../utils/colors'
import { setLocalNotification, clearLocalNotifications } from '../utils/helpers'
import Button from './Button'
import ResultPage from './ResultPage'

class Quiz extends React.Component {
    state = {
        correct: 0,
        wrong: 0,
        questionNumber: 0,
        questionSide: true,
        spinValue: new Animated.Value(0)
    }

    handlePress = (verdict) => {
        if (!this.state.questionSide) {
            this.flipCard()
        }
        this.setState((prevState) => ({
            correct: verdict === 'correct' ? prevState.correct + 1 : prevState.correct,
            wrong: verdict === 'wrong' ? prevState.wrong + 1 : prevState.wrong,
            questionNumber: prevState.questionNumber + 1,
        }))
    }

    flipCard = () => {
        const { questionSide, spinValue } = this.state

        if (questionSide) {
            Animated.timing(spinValue, {
                toValue: 180
            }).start()
        } else {
            Animated.timing(spinValue, {
                toValue: 0
            }).start()
        }
        this.setState((prevState) => ({
            questionSide: !prevState.questionSide,
        }))
    }

    startOver = () => {
        this.setState(() => ({
            correct: 0,
            wrong: 0,
            questionNumber: 0,
            questionSide: true,
        }))
    }

    goToDeck = () => {
        this.props.navigation.goBack()
    }

    render() {

        const { deck } = this.props
        const { correct, wrong, questionNumber, questionSide, spinValue } = this.state
        const totalQuestions = deck.questions.length

        const frontInterpolate = spinValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        
        const backInterpolate = spinValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        if (totalQuestions === 0) {
            return (
                <View style={styles.error}>
                    <Text style={{ fontSize: 25 }}>Sorry, you can't take the quiz because you haven't added any questions yet.</Text>
                </View>
            )
        }

        if (questionNumber + 1 > totalQuestions) {

            clearLocalNotifications()
                .then(setLocalNotification())

            return <ResultPage
                correct={correct}
                wrong={wrong}
                totalQuestions={totalQuestions}
                startOver={this.startOver}
                goToDeck={this.goToDeck}
            />
        }

        return (
            <View style={{ flex: 1, margin: 20 }}>
                <Text style={styles.counter}>{questionNumber + 1}/{totalQuestions}</Text>
                    <View style={{flex: 1, margin: 5}}>
                            <Animated.View style={[styles.card, {transform: [{rotateY: frontInterpolate}]}]} onPress={this.flipCard}>
                                <Text style={styles.text}>{deck.questions[questionNumber].question}</Text>
                            </Animated.View>

                            <Animated.View style={[styles.card, {transform: [{rotateY: backInterpolate}]}]} onPress={this.flipCard}>
                                <Text style={styles.text}>{deck.questions[questionNumber].answer}</Text>
                            </Animated.View>
                    </View>
                <Button style={{ marginBottom: 10 }} type='secondary' onPress={this.flipCard}>
                    FLIP
                </Button>

                <Button style={{ marginBottom: 10 }} onPress={() => this.handlePress('correct')}>
                    CORRECT
                </Button>

                <Button style={{ marginBottom: 20 }} type='danger' onPress={() => this.handlePress('wrong')}>
                    WRONG
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#006a6a',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: lightGray,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        backfaceVisibility: 'hidden'
    },
    error: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
    },
    text: {
        fontSize: 20,
        color: white,
    },
    counter: {
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
})

const mapStateToProps = (state, ownProps) => ({
    deck: state[ownProps.navigation.getParam('deckId')]
})

export default connect(mapStateToProps)(Quiz)