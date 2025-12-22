declare module "@capacitor-community/contacts" {
  export interface ContactPayload {
    contactId?: string;
    name?: {
      given?: string;
      family?: string;
      middle?: string;
      prefix?: string;
      suffix?: string;
      display?: string;
    };
    organization?: {
      company?: string;
      jobTitle?: string;
      department?: string;
    };
    birthday?: {
      year?: number;
      month?: number;
      day?: number;
    };
    note?: string;
    phones?: Array<{
      type?: string;
      label?: string;
      number?: string;
    }>;
    emails?: Array<{
      type?: string;
      label?: string;
      address?: string;
    }>;
    urls?: Array<{
      type?: string;
      label?: string;
      url?: string;
    }>;
    postalAddresses?: Array<{
      type?: string;
      label?: string;
      street?: string;
      city?: string;
      region?: string;
      postcode?: string;
      country?: string;
    }>;
    image?: {
      base64String?: string;
    };
  }

  export interface GetContactsResult {
    contacts: ContactPayload[];
  }

  export interface PermissionStatus {
    granted: boolean;
  }

  export interface ContactsPlugin {
    getPermissions(): Promise<PermissionStatus>;
    getContacts(): Promise<GetContactsResult>;
  }

  export const Contacts: ContactsPlugin;
}
