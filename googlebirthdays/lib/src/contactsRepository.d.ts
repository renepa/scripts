import { GoogleContact } from "./types";
export declare class ContactRepository {
    private peopleApiClient;
    private config;
    loadContactsWithBirthdays(): Promise<GoogleContact[]>;
    private googleConnectionHasNameAndBirthday;
    private connectionToContact;
}
//# sourceMappingURL=contactsRepository.d.ts.map