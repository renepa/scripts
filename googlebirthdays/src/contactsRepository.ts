import axios, { AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import * as dotenv from 'dotenv';
import { GoogleContact, GoogleDate } from "./types";

interface GoogleConnection {
  resourceName: string
  names: { displayName: string }[]
  birthdays: { date: GoogleDate }[]
}

export class ContactRepository {

  private peopleApiClient = axios.create({
    baseURL: process.env.PEOPLE_API
  });

  private config: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Accept': '*/*',
    } as RawAxiosRequestHeaders,
  }

  public async loadContactsWithBirthdays(): Promise<GoogleContact[]> {
    const axiosResponse = await this.peopleApiClient.get('/connections?personFields=names,emailAddresses,birthdays&pageSize=500', this.config);

    if (axiosResponse.status === 200) {
      return (axiosResponse.data.connections as GoogleConnection[])
        .filter(this.googleConnectionHasNameAndBirthday)
        .map(this.connectionToContact)
    } else {
      throw new Error('Negative reponse')
    }

    return axiosResponse.data.items
  }

  private googleConnectionHasNameAndBirthday(connection: GoogleConnection): boolean {
    return connection.birthdays && connection.birthdays.length > 0 && connection.names && connection.names.length > 0
  }

  private connectionToContact(googleConnection: GoogleConnection): GoogleContact {
    if (googleConnection.names.length > 1 || googleConnection.birthdays.length > 1) {
      throw new Error(`Check connection ${googleConnection.names[0]} -> More than one name or birthday`)
    }

    return {
      contactId: googleConnection.resourceName,
      name: googleConnection.names[0].displayName,
      birthday: googleConnection.birthdays[0].date
    }

  }
}