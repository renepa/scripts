import { CalendarRepository } from './calendarRepository';
import { ContactRepository } from './contactsRepository';
import * as dotenv from 'dotenv';
import * as readline from 'readline'; // Add this line to import the 'readline' module
import { GoogleCalendarEvent, GoogleContact } from './types';

dotenv.config();


const calendarRepository = new CalendarRepository();
const contactRepository = new ContactRepository();

main();

async function main() {
    dotenv.config();
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add':
            await contactBirthdaysToCalendarPrompt();
            console.log('Birthdays added to calendar.');
            break;
        case 'delete':
            await deleteAllBirthdaysPrompt();
            break;
        default:
            console.log('Unknown command. Use "add" to add birthdays or "delete" to delete all birthdays.');
    }
}

async function contactBirthdaysToCalendarPrompt() {
    const contactsWithBirthdays = await contactRepository.loadContactsWithBirthdays();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Are you sure you want to add ${contactsWithBirthdays.length} birthdays? (yes/no): `, async (answer) => {
        if (answer.toLowerCase() === 'yes') {
            await createEventsFor(contactsWithBirthdays);
        } else {
            console.log('Operation cancelled.');
        }
        rl.close();
    });
}

async function createEventsFor(contactsWithBirthdays: GoogleContact[]) {
    let count = 0;

    for (let contactWithBirthday of contactsWithBirthdays) {
        const { birthday, name, contactId } = contactWithBirthday;
        const response = await calendarRepository.createOrUpdateBirthday(birthday, name, contactId);
        console.log(`Added birthday for ${name}`);
        count++;
    }

    console.log(`${count} birthdays added.`);
}

async function deleteAllBirthdaysPrompt() {
    const birthdays = await calendarRepository.loadAllBirthdays();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Are you sure you want to delete ${birthdays.length} birthdays? (yes/no): `, async (answer) => {
        if (answer.toLowerCase() === 'yes') {
            await deleteAll(birthdays);
        } else {
            console.log('Operation cancelled.');
        }
        rl.close();
    });
}

async function deleteAll(birthdays: GoogleCalendarEvent[]) {
    let count = 0;
    for (let birthday of birthdays) {
        await calendarRepository.deleteEvent(birthday.id);
        count++;
        console.log(`Deleted birthday for ${birthday.summary}`);
    }

    console.log(`${count} birthdays deleted.`);
}
