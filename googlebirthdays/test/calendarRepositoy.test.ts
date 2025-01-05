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

    it('should create a birthday event without a year', async () => {
        dotenv.config();
        // arrange
        const calendarRepository = new CalendarRepository();
        const date: GoogleDate = { month: 1, day: 24 };
        const dateToSearch = { year: new Date().getFullYear(), month: 1, day: 24 };

        // act
        calendarRepository.createOrUpdate(date, 'Test3', 'contact-id-54321');

        // check
        const expectedBirthday = await calendarRepository.loadCalendarBirthdayBy(dateToSearch, 'contact-id-54321');
        expect(expectedBirthday).toBeDefined;
        expect(expectedBirthday!.summary).toBe('Test3 hat Geburtstag');
    })

    it('should delete a birthday event', async () => {
        dotenv.config();
        // arrange
        const calendarRepository = new CalendarRepository();
        const date: GoogleDate = { year: 2025, month: 1, day: 24 };
        const eventId = '1qig52jd6ntfk0me0bf89o5cfo';

        // act
        await calendarRepository.deleteEvent(eventId);

        // check
        const deletedEvent = await calendarRepository.loadCalendarBirthdayBy(date, 'contact-id-54321');
        expect(deletedEvent).toBeNull();
    });

    it('should load all birthdays', async () => {
        dotenv.config();
        // arrange
        const calendarRepository = new CalendarRepository();

        // act
        const birthdays = await calendarRepository.loadAllBirthdays();

        // check
        expect(birthdays.length).toBe(0);
    });

    it('should delete an event', async () => {
        dotenv.config();
        // arrange
        const calendarRepository = new CalendarRepository();
        const eventId = '6it3an0slqq7gllv3dlf17nr1c';

        // act
        await calendarRepository.deleteEvent(eventId);

        // check
        const deletedEvent = await calendarRepository.loadCalendarBirthdayBy({ year: 2025, month: 1, day: 22 }, '6it3an0slqq7gllv3dlf17nr1c');
        expect(deletedEvent).toBeNull();
    })
})