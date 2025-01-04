import * as dotenv from 'dotenv';
import { CalendarRepository } from '../src/calendarRepository';
import { GoogleDate } from '../src/types';

describe('Contact Birthdays to Calender Tests', () => {
    it('should load contacts with their birthdays', async () => {
        dotenv.config()
        // arrange
        const calendarRepository = new CalendarRepository();
        const date: GoogleDate = { year: 2025, month: 1, day: 22 }

        // act
        const birthday = await calendarRepository.loadCalendarBirthdayBy(date, 'contact-id-12345')

        // check
        expect(birthday!).toBeDefined
        expect(birthday!.summary).toBe('Test hat Geburtstag')
        expect(birthday!.eventType).toBe('default')
        expect(birthday!.extendedProperties.private.contactId).toBe('contact-id-12345')

    })

    it('should create a new birthday', async () => {
        dotenv.config()
        // arrange
        const calendarRepository = new CalendarRepository();
        const date: GoogleDate = { year: 2025, month: 1, day: 23 }

        // act
        calendarRepository.createOrUpdate(date, 'Test2', 'peopple/12345')

        // check
        const expectedBirthday = await calendarRepository.loadCalendarBirthdayBy(date, 'peopple/12345');
        expect(expectedBirthday).toBeDefined
        expect(expectedBirthday!.summary).toBe('Test2 hat Geburtstag')

    })

    it('should delete a birthday event', async () => {
        dotenv.config();
        // arrange
        const calendarRepository = new CalendarRepository();
        const date: GoogleDate = { year: 2025, month: 1, day: 24 };
        const eventId = 'event-id-12345';

        // act
        await calendarRepository.deleteEvent(eventId);

        // check
        const deletedEvent = await calendarRepository.loadCalendarBirthdayBy(date, 'contact-id-12345');
        expect(deletedEvent).toBeNull();
    });

    
})