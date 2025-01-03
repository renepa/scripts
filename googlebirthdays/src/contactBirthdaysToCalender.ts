import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import * as dotenv from 'dotenv';

interface GoogleContact {
  name: string
  birthday: GoogleDate

}

interface GoogleConnection {
  names: { displayName: string }[]
  birthdays: { date: GoogleDate }[]
}

interface GoogleDate {
  year: number
  month: number
  day: number
}

dotenv.config()

const peopleApiClient = axios.create({
  baseURL: 'https://people.googleapis.com/v1/people/me'
});

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Accept': '*/*',
  } as RawAxiosRequestHeaders,
}

export async function loadContactsWithBirthdays(): Promise<GoogleContact[]> {
  const axiosResponse = await peopleApiClient.get('/connections?personFields=names,emailAddresses,birthdays&pageSize=500', config);

  if (axiosResponse.status === 200) {
    return (axiosResponse.data.connections as GoogleConnection[])
      .filter(googleConnectionHasNameAndBirthday)
      .map(connectionToContact)
  } else {
    throw new Error('Negative reponse')
  }

  return axiosResponse.data.items
}

function googleConnectionHasNameAndBirthday(connection: GoogleConnection): boolean {
  return connection.birthdays && connection.birthdays.length > 0 && connection.names && connection.names.length > 0
}

function connectionToContact(googleConnection: GoogleConnection): GoogleContact {
  if (googleConnection.names.length > 1 || googleConnection.birthdays.length > 1) {
    throw new Error(`Check connection ${googleConnection.names[0]} -> More than one name or birthday`)
  }

  return {
    name: googleConnection.names[0].displayName,
    birthday: googleConnection.birthdays[0].date
  }
}


