import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkRed, white, mainGreen, turqoise } from '../utils/colors'

export default function Button ({ children, onPress, type = 'primary', style = {} }) {
    let color = mainGreen

    if (type === 'secondary') {
        color = turqoise
    }

    if (type === 'danger') {
        color = darkRed
    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }, style]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: white,
        fontSize: 20,
        padding: 10
    },
    button: {
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
    }
})