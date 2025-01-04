import { CalendarRepository } from './calendarRepository';
import { ContactRepository } from './contactsRepository';
import * as dotenv from 'dotenv';
import * as readline from 'readline'; // Add this line to import the 'readline' module

const calendarRepository = new CalendarRepository();
const contactRepository = new ContactRepository();

dotenv.config();

async function contactBirthdaysToCalendar() {
    const contacts = await contactRepository.loadContactsWithBirthdays();
    contacts.forEach(contact => {
        calendarRepository.createOrUpdate(contact.birthday, contact.name, contact.contactId);
    });
}

async function deleteAllBirthdays() {
    const contacts = await contactRepository.loadContactsWithBirthdays();
    const numBirthdays = contacts.length;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Are you sure you want to delete ${numBirthdays} birthdays? (yes/no): `, (answer) => {
        if (answer.toLowerCase() === 'yes') {
            contacts.forEach(contact => {
                calendarRepository.deleteEvent(contact.contactId);
            });
            console.log(`${numBirthdays} birthdays deleted.`);
        } else {
            console.log('Operation cancelled.');
        }
        rl.close();
    });
}

contactBirthdaysToCalendar();
deleteAllBirthdays();