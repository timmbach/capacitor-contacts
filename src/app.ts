import {
  Contacts,
  ContactPayload,
  GetContactsResult,
  type PermissionStatus,
} from "@capacitor-community/contacts";

// Type definitions for DOM elements
interface ContactElements {
  fetchButton: HTMLButtonElement;
  contactsList: HTMLDivElement;
  statusDiv: HTMLDivElement;
}

type StatusType = "info" | "success" | "error";

// Get DOM elements with type safety
function getElements(): ContactElements {
  const fetchButton = document.getElementById(
    "fetchButton"
  ) as HTMLButtonElement;
  const contactsList = document.getElementById(
    "contactsList"
  ) as HTMLDivElement;
  const statusDiv = document.getElementById("status") as HTMLDivElement;

  if (!fetchButton || !contactsList || !statusDiv) {
    throw new Error("Required DOM elements not found");
  }

  return { fetchButton, contactsList, statusDiv };
}

// Show status message
function showStatus(
  statusDiv: HTMLDivElement,
  message: string,
  type: StatusType = "info"
): void {
  statusDiv.textContent = message;
  statusDiv.className = `status show ${type}`;
  setTimeout(() => {
    statusDiv.classList.remove("show");
  }, 3000);
}

// Format phone numbers
function formatPhone(
  phones?: Array<{ number?: string | null }>
): string | null {
  if (!phones || phones.length === 0) return null;
  return phones
    .filter((phone) => phone.number)
    .map((phone) => phone.number!)
    .join(", ");
}

// Format emails
function formatEmail(
  emails?: Array<{ address?: string | null }>
): string | null {
  if (!emails || emails.length === 0) return null;
  return emails
    .filter((email) => email.address)
    .map((email) => email.address!)
    .join(", ");
}

// Display contacts
function displayContacts(
  contactsList: HTMLDivElement,
  contacts: ContactPayload[]
): void {
  contactsList.innerHTML = "";

  if (!contacts || contacts.length === 0) {
    contactsList.innerHTML = `
            <div class="no-contacts">
                <p>No contacts found</p>
                <p>📝</p>
            </div>
        `;
    return;
  }

  // Sort contacts alphabetically by name
  const sortedContacts = [...contacts].sort((a, b) => {
    const nameA = (a.name?.display || "Unknown").toLowerCase();
    const nameB = (b.name?.display || "Unknown").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  // Add contact count
  const countDiv = document.createElement("div");
  countDiv.className = "contact-count";
  countDiv.textContent = `${sortedContacts.length} contact${
    sortedContacts.length !== 1 ? "s" : ""
  } found`;
  contactsList.appendChild(countDiv);

  sortedContacts.forEach((contact: ContactPayload) => {
    const contactDiv = document.createElement("div");
    contactDiv.className = "contact-item";

    const name = contact.name?.display || "Unknown";
    const phones = formatPhone(contact.phones);
    const emails = formatEmail(contact.emails);

    let detailsHTML = "";
    if (phones) {
      detailsHTML += `<div class="contact-phone">${phones}</div>`;
    }
    if (emails) {
      detailsHTML += `<div class="contact-email">${emails}</div>`;
    }

    contactDiv.innerHTML = `
            <div class="contact-name">${name}</div>
            <div class="contact-details">
                ${
                  detailsHTML ||
                  '<div style="color: #999;">No contact details</div>'
                }
            </div>
        `;

    contactsList.appendChild(contactDiv);
  });
}

// Fetch contacts
async function fetchContacts(elements: ContactElements): Promise<void> {
  const { fetchButton, contactsList, statusDiv } = elements;

  try {
    fetchButton.disabled = true;
    fetchButton.textContent = "Fetching...";
    showStatus(statusDiv, "Requesting contacts permission...", "info");

    // Request permission first
    const permission: PermissionStatus = await Contacts.getPermissions();

    if (permission.granted) {
      showStatus(statusDiv, "Loading contacts...", "info");

      // Fetch all contacts
      const result: GetContactsResult = await Contacts.getContacts();

      console.log("Contacts fetched:", result);
      displayContacts(contactsList, result.contacts);
      showStatus(
        statusDiv,
        `Successfully loaded ${result.contacts.length} contacts!`,
        "success"
      );
    } else {
      showStatus(
        statusDiv,
        "Permission denied. Please enable contacts access in settings.",
        "error"
      );
      contactsList.innerHTML = `
                <div class="no-contacts">
                    <p>⚠️ Permission Denied</p>
                    <p style="margin-top: 10px; font-size: 14px;">
                        Please enable contacts access in your device settings to use this feature.
                    </p>
                </div>
            `;
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    showStatus(statusDiv, `Error: ${errorMessage}`, "error");
    contactsList.innerHTML = `
            <div class="no-contacts">
                <p>❌ Error loading contacts</p>
                <p style="margin-top: 10px; font-size: 14px; color: #d32f2f;">
                    ${errorMessage}
                </p>
            </div>
        `;
  } finally {
    fetchButton.disabled = false;
    fetchButton.textContent = "Fetch Contacts";
  }
}

// Initialize app
function initApp(): void {
  try {
    const elements = getElements();

    // Event listener
    elements.fetchButton.addEventListener("click", () =>
      fetchContacts(elements)
    );

    // Initial message
    elements.contactsList.innerHTML = `
            <div class="no-contacts">
                <p>👆 Click the button above to load contacts</p>
            </div>
        `;
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
