import { CalendarRepository } from './calendarRepository';
import { ContactRepository } from './contactsRepository';
import * as dotenv from 'dotenv';
import * as readline from 'readline'; // Add this line to import the 'readline' module

dotenv.config();

const calendarRepository = new CalendarRepository();
const contactRepository = new ContactRepository();

async function contactBirthdaysToCalendar() {
    const contacts = await contactRepository.loadContactsWithBirthdays();
    contacts.forEach(contact => {
        calendarRepository.createOrUpdate(contact.birthday, contact.name, contact.contactId);
    });
}

async function deleteAllBirthdays() {
    const birthdays = await calendarRepository.loadAllBirthdays();
    const numBirthdays = birthdays.length;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Are you sure you want to delete ${numBirthdays} birthdays? (yes/no): `, (answer) => {
        if (answer.toLowerCase() === 'yes') {
            birthdays.forEach(birthday => {
                calendarRepository.deleteEvent(birthday.id);
            });
            console.log(`${numBirthdays} birthdays deleted.`);
        } else {
            console.log('Operation cancelled.');
        }
        rl.close();
    });
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add':
            await contactBirthdaysToCalendar();
            console.log('Birthdays added to calendar.');
            break;
        case 'delete':
            await deleteAllBirthdays();
            break;
        default:
            console.log('Unknown command. Use "add" to add birthdays or "delete" to delete all birthdays.');
    }
}

main();