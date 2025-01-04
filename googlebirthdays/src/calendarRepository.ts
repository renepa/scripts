import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { GoogleCalendarEvent, GoogleDate } from "./types";

export class CalendarRepository {
    private calendarApiClient = axios.create({
        baseURL: process.env.CALENDAR_API
    });

    private config: AxiosRequestConfig = {
        headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`,
            'Accept': '*/*',
        } as RawAxiosRequestHeaders,
    }

    public async loadCalendarBirthdayBy({ year, month, day }: GoogleDate, contactId: string): Promise<GoogleCalendarEvent | undefined> {
        const dateAsString = `${year}-${month}-${day}`;
        const axiosResponse = await this.calendarApiClient
            .get(`/events?timeMin=${dateAsString}T00:00:00Z&timeMax=${dateAsString}T23:59:59Z`, this.config)

        if (axiosResponse.status !== 200) {
            throw new Error('Negative Response')
        }

        const foundEvents = (axiosResponse.data.items as GoogleCalendarEvent[])
            .filter((calendarEvent) => calendarEvent.extendedProperties?.private?.contactId === contactId);

        if (foundEvents.length > 1) throw new Error('Found more than one Birthday for this person')

        return foundEvents.length === 0 ? undefined : foundEvents[0]
    }

    public async createOrUpdate(date: GoogleDate, name: string, contactId: string) {
        const existingEvent = await this.loadCalendarBirthdayBy(date, contactId);
        const payload = this.createCreateBirthdayPayload(name, contactId, date);
        if (existingEvent) {
            await this.calendarApiClient.patch('/events', payload, this.config)
        } else {
            await this.calendarApiClient.post('/events', payload, this.config)
        }
    }

    /**
     * loadAllBirthdays
     */
    public async loadAllBirthdays(): Promise<GoogleCalendarEvent[]> {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const startDate = new Date(currentYear, 0, 1);
        const endDate = new Date(currentYear, 11, 31);

        const startDateAsString = startDate.toISOString().split('T')[0];
        const endDateAsString = endDate.toISOString().split('T')[0];

        const axiosResponse = await this.calendarApiClient.get(`/events?timeMin=${startDateAsString}T00:00:00Z&timeMax=${endDateAsString}T23:59:59Z`, this.config);

        if (axiosResponse.status !== 200) {
            throw new Error('Negative Response');
        }

        const allEvents = axiosResponse.data.items as GoogleCalendarEvent[];
        const birthdayEvents = allEvents.filter((event) => event.extendedProperties?.private?.type === 'birthday');

        return birthdayEvents;
    }


    private createCreateBirthdayPayload(name: string, contactId: string, { year, month, day }: GoogleDate) {
        const dateAsString = `${year}-${month}-${day}`;
        return {
            summary: `${name} hat Geburtstag`,
            transparency: "transparent",
            visibility: "private",
            colorId: "1",
            start: {
                date: dateAsString
            },
            end: {
                date: dateAsString
            },
            recurrence: [
                `RRULE:FREQ=YEARLY;BYMONTH=${month};BYMONTHDAY=${day}`
            ],
            reminders: {
                useDefault: false
            },
            eventType: "default",
            extendedProperties: {
                private: {
                    type: "birthday",
                    contactId: contactId
                }
            }
        }
    }
}