import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from "../actions";


export default function(state={}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case ADD_CARD_TO_DECK:
            const { title, card } = action.deck
            const updatedDeck = state[title]
            updatedDeck.questions.push(card)
            return {
                ...state,
                [title]: updatedDeck 
            }
        default: 
        return state;
    }
}