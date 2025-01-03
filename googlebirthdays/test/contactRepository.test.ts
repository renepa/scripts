import { ContactRepository } from "../src/contactsRepository";
import * as dotenv from 'dotenv';

describe('Contact Birthdays to Calender Tests', () => {
    it('should load contacts with their birthdays', async () => {
        dotenv.config()
        
        // arrange
        const contactRepository = new ContactRepository();

        // act
        const contacts = await contactRepository.loadContactsWithBirthdays()

        // check
        expect(contacts.length).toBe(78)

    })
})