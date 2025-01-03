export interface GoogleContact {
    name: string
    birthday: GoogleDate

}

export interface GoogleConnection {
    names: { displayName: string }[]
    birthdays: { date: GoogleDate }[]
}

export interface GoogleDate {
    year: number
    month: number
    day: number
}

export interface GoogleCalendarEvent {
    summary: string
    eventType: 'default'
    date: string
    extendedProperties: {
        private: {
            type: 'birthday',
            contactId: string
        }
    }
}