export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'


export const receiveDecks = (decks) => {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export const addTitleToDeck = title => {
    return {
        type: ADD_DECK,
        deck: {
            title,
            questions: []
        }
    }
}