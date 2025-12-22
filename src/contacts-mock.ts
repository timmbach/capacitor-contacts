// Mock implementation for @capacitor-community/contacts

export interface ContactPayload {
  contactId?: string;
  name?: {
    given?: string;
    family?: string;
    display?: string;
  };
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

export const Contacts: ContactsPlugin = {
  async getPermissions(): Promise<PermissionStatus> {
    console.warn("Mock Contacts.getPermissions called");
    return { granted: true };
  },
  async getContacts(): Promise<GetContactsResult> {
    console.warn("Mock Contacts.getContacts called");
    return { contacts: [] };
  },
};
