import { AsyncStorage } from 'react-native'

const data =
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
}

export function getDecks() {
    return AsyncStorage.getItem('decks')
}

export function addCardToDeck(deckId, question) {
    return AsyncStorage.getItem('decks')
        .then((res) => {
            const decks = JSON.parse(res)

            const updatedDecks = {
                ...decks,
                [deckId]: {
                    ...decks[deckId],
                    questions: decks[deckId].questions.concat(question)
                }
            }

            return AsyncStorage.setItem('decks', JSON.stringify(updatedDecks))
        })
}

export function saveDeckTitle (title) {
    const toMerge = {
        [title]: {
            title,
            questions: []
        }
    }

    return AsyncStorage.mergeItem('decks', JSON.stringify(toMerge))
}

export function removeDeckTitle(deckId) {
    return AsyncStorage.getItem('decks')
        .then((res) => {
            const decks = JSON.parse(res)

            const { [deckId]: value, ...rest } = decks

            return AsyncStorage.setItem('decks', JSON.stringify(rest))
        })
}

export function resetStorage() {
    AsyncStorage.removeItem('decks')
}