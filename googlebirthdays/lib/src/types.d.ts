export interface GoogleContact {
    contactId: string;
    name: string;
    birthday: GoogleDate;
}
export interface GoogleDate {
    year?: number;
    month: number;
    day: number;
}
export interface GoogleCalendarEvent {
    id: string;
    summary: string;
    eventType: 'default';
    date: string;
    extendedProperties: {
        private: {
            type: 'birthday';
            contactId: string;
        };
    };
}
//# sourceMappingURL=types.d.ts.map