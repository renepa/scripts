import * as dotenv from 'dotenv';
import { CalendarRepository } from '../src/calendarRepository';

describe('Contact Birthdays to Calender Tests', () => {
    it('should load contacts with their birthdays', async () => {
        dotenv.config()
        // arrange
        const calendarRepository = new CalendarRepository();

        // act
        const birthdays = await calendarRepository.loadCalendarBirthdayBy(2025, 1, 22, 'contact-id-12345')

        // check
        expect(birthdays.length).toBe(1)
        expect(birthdays[0].summary).toBe('Test hat Geburtstag')
        expect(birthdays[0].eventType).toBe('default')
        expect(birthdays[0].extendedProperties.private.contactId).toBe('contact-id-12345')

    }),

    it('should create a new birthday', async () => {
        dotenv.config()
        // arrange
        const calendarRepository = new CalendarRepository();

        // act

        // check

    }),
    
    it('should update an existing birthday', async () => {
        dotenv.config()
        // arrange
        const calendarRepository = new CalendarRepository();

        // act

        // check

    })
})