import { GoogleCalendarEvent, GoogleDate } from "./types";
export declare class CalendarRepository {
    private calendarApiClient;
    private config;
    loadCalendarBirthdayBy({ year, month, day }: GoogleDate, contactId: string): Promise<GoogleCalendarEvent | undefined>;
    createOrUpdateBirthday(date: GoogleDate, name: string, contactId: string): Promise<void>;
    /**
     * loadAllBirthdays
     */
    loadAllBirthdays(): Promise<GoogleCalendarEvent[]>;
    deleteEvent(eventId: string): Promise<void>;
    private createCreateBirthdayPayload;
}
//# sourceMappingURL=calendarRepository.d.ts.map