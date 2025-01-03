import { loadContactsWithBirthdays } from "../src/contactBirthdaysToCalender"
import * as dotenv from 'dotenv';

describe('Contact Birthdays to Calender Tests', () => {
    it('should load contacts with their birthdays', async () => {
        const contacts = await loadContactsWithBirthdays()
        let i = 0;
    })
})