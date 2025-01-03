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

    public async loadCalendarBirthdaysAt(year: number, month: number, day: number): Promise<GoogleCalendarEvent[]> {
        const dateAsString = `${year}-${month}-${day}`;
        const axiosResponse = await this.calendarApiClient
            .get(`/events?eventTypes=birthday&timeMin=${dateAsString}T00:00:00Z&timeMax=${dateAsString}T23:59:59Z`, this.config)

        return axiosResponse.data.items as GoogleCalendarEvent[]
    }
}