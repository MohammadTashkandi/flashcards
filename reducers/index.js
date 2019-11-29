import React from 'react'
import { RECEIVE_DECKS, ADD_QUESTION, ADD_DECK, DELETE_DECK } from '../actions/ActionTypes'

export default function Temp (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: state[action.deckId].questions.concat(action.question)
                }
            }
        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case DELETE_DECK:
            const { [action.deckId]: value, ...rest } = state
            return rest
        default:
            return state
    }
}

/* const data =
{
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
} */