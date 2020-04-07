import { AsyncStorage } from "react-native"
import * as Permissions from 'expo-permissions'
import { Notifications } from "expo"

export const MOBILE_FLASHCARD_DB_KEY = 'Udaci:flashcard-key'





export const MOBILE_FLASHCARD_NOTIFICATION_KEY = 'Udaci:notification'

export default function setLocalNotification() {
    return AsyncStorage.getItem(MOBILE_FLASHCARD_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
        if (data === null) {
            Permissions.askAsync(MOBILE_FLASHCARD_NOTIFICATION_KEY)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()

                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(8)

                    Notifications.scheduleLocalNotificationAsync(createNotification(), {
                        repeat: 'day',
                        tomorrow
                    })

                    AsyncStorage.setItem(MOBILE_FLASHCARD_NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}

export const createNotification = () => ({
    title: 'Study your quiz',
    body: 'Don\'t forget to take your quiz today ',
    android: {
        vibration: true,
        sound: true,
        sticky: false,
        priority: 'high'
    }
})

export const clearAllNotifications = () => {
    return AsyncStorage.removeItem(MOBILE_FLASHCARD_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}