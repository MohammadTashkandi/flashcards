import { getDecks, addCardToDeck, saveDeckTitle, removeDeckTitle } from '../utils/api'
import { RECEIVE_DECKS, ADD_QUESTION, ADD_DECK, DELETE_DECK } from './ActionTypes'


function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function handleReceiveDecks () {
    return (dispatch) => {
        return getDecks()
            .then((decks) => {
                dispatch(receiveDecks(JSON.parse(decks)))
            })
    }
}

function addQuestion (deckId, question) {
    return {
        type: ADD_QUESTION,
        deckId,
        question,
    }
}

export function handleAddQuestion (deckId, question) {
    return (dispatch) => {
        return addCardToDeck(deckId, question)
            .then(() => {
                dispatch(addQuestion(deckId, question))
            })
    }
}

function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function handleAddDeck(title) {
    return (dispatch) => {
        return saveDeckTitle(title)
            .then(() => {
                dispatch(addDeck(title))
            })
    }
}

function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function handleDeleteDeck(deckId) {
    return (dispatch) => {
        return removeDeckTitle(deckId)
            .then(() => {
                dispatch(deleteDeck(deckId))
            })
    }
}