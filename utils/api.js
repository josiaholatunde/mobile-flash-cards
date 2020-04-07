import { AsyncStorage } from 'react-native'
import dumpData from './db'
import { MOBILE_FLASHCARD_DB_KEY, MOBILE_FLASHCARD_NOTIFICATION_KEY } from './helpers'

export const seedDbWithDumpData = (dumpData) => {
    return AsyncStorage.setItem(MOBILE_FLASHCARD_DB_KEY, JSON.stringify(dumpData))
    .then(() => console.log('Successfully seeded db'))
}

export const getDecks = () => {
    return AsyncStorage.getItem(MOBILE_FLASHCARD_DB_KEY)
    .then(result => {
        if (result === null) {
            seedDbWithDumpData(dumpData);
            return dumpData;
        } else {
            return JSON.parse(result)
        }
    })
}

export const getDeck = title => {
    return getDecks()
    .then(results => results[title])
}

export const saveDeckTitle = title => {
    return AsyncStorage.mergeItem(MOBILE_FLASHCARD_DB_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export const addCardToDeck = (title, card) => {
    return getDecks()
    .then(decks => {
        decks[title].questions.push(card);
        AsyncStorage.mergeItem(MOBILE_FLASHCARD_DB_KEY, JSON.stringify(decks))
    })
}

export const deleteDeckFromDb = (title) => {
    return getDecks()
    .then(decks => {
         decks[title] = null
         delete decks[title]

         return AsyncStorage.mergeItem(MOBILE_FLASHCARD_DB_KEY, JSON.stringify(decks))
    })
}