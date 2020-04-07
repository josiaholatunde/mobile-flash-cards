export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const SET_LOADING='SET_LOADING'


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

export const deleteDeckFromRedux = title => {
    return {
        type: DELETE_DECK,
        title
    }
}

export const showLoading = () => ({
    type: SET_LOADING,
    payload: true
})

export const hideLoading = () => ({
    type: SET_LOADING,
    payload: false
})