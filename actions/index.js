export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'


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

export const addCardToReduxDeck = (title, card) => {
    return {
        type: ADD_CARD_TO_DECK,
        deck: {
            title,
            card
        }
    }
}