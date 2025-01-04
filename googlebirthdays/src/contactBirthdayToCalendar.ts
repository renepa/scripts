import { CalendarRepository } from './calendarRepository';
import { ContactRepository } from './contactsRepository';
import * as dotenv from 'dotenv';

const calendarRepository = new CalendarRepository();
const contactRepository = new ContactRepository();

dotenv.config();

async function contactBirthdaysToCalendar() {
    const contacts = await contactRepository.loadContactsWithBirthdays();
    contacts.forEach(contact => {
        calendarRepository.createOrUpdate(contact.birthday, contact.name, contact.contactId);
    });
}