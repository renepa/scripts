import * as dotenv from 'dotenv';
import { CalendarRepository } from '../src/calendarRepository';

describe('Contact Birthdays to Calender Tests', () => {
    it('should load contacts with their birthdays', async () => {
        dotenv.config()
        // arrange
        const calendarRepository = new CalendarRepository();

        // act
        const birthdays = await calendarRepository.loadCalendarBirthdaysAt(2025, 1, 22)

        // check
        expect(birthdays.length).toBe(1)

    })
})