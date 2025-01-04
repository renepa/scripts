export interface GoogleContact {
    contactId: string
    name: string
    birthday: GoogleDate

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