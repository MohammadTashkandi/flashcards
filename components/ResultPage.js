import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button'
import { white, purple } from '../utils/colors'

export default function ResultPage ({ correct, wrong, totalQuestions, startOver, goToDeck }) {
    return (
        <View style={styles.result}>
            <View style={styles.resultContainer}>
                <View style={styles.percentage}><Text style={{ color: white, fontSize: 30 }}>{((correct/totalQuestions)*100).toFixed(0)}%</Text></View>
                <Text style={styles.resultInfo}>You got {correct} questions right!</Text>
                <Text style={styles.resultInfo}>And you got {wrong} questions wrong</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button onPress={startOver}>
                    Start over
                </Button>
                <Button type='secondary' onPress={goToDeck}>
                    Go back to deck
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    result: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentage: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 360,
        backgroundColor: purple,
        height: 120,
        width: 120,
    },
    resultInfo: {
        fontSize: 20,
        margin: 5
    },
    resultContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch'
    }
})