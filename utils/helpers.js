import * as Permissions from 'expo-permissions'
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'

const NOTIFICATIONS_KEY = 'Flashcards:Notifications'

function createNotification() {
    return {
        title: 'Take a quiz',
        body: "Using Flashcards is a great way to memorize stuff!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: true,
            sticky: false,
            priority: 'high',
        }
    }
}

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function setLocalNotification() {
    console.log('in here')
    AsyncStorage.getItem(NOTIFICATIONS_KEY)
        .then((data) => {
            const parsedData = JSON.parse(data)
            if (parsedData === null) {
                console.log('key not set')
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then((status) => {
                        console.log('ask async')
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(12)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(createNotification(), {
                                repeat: 'day',
                                time: tomorrow
                            })

                            AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}