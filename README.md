# Capacitor Contacts Plugin - iOS Limited Authorization Issue

## Overview

Testing the `feat/ios-limited-authorization-status` branch from `@capacitor-community/contacts` to evaluate iOS limited contacts authorization support.

## Current Status

⚠️ **Not Working** - The branch builds and syncs successfully with workarounds, but does not retrieve contacts on either iOS or Android.

## Installation

```json
"@capacitor-community/contacts": "github:capacitor-community/contacts#feat/ios-limited-authorization-status"
```

## Workarounds Implemented

To get the app to build successfully, we had to create:

1. **Type Definition File** ([src/types/capacitor-contacts.d.ts](src/types/capacitor-contacts.d.ts))

   - Provides TypeScript type definitions for the missing plugin module
   - Includes interfaces for `ContactPayload`, `GetContactsResult`, `PermissionStatus`, and `ContactsPlugin`

2. **Mock Implementation** ([src/contacts-mock.ts](src/contacts-mock.ts))

   - Minimal mock implementation of the Contacts plugin
   - Returns empty data but prevents build errors

3. **Vite Alias Configuration** ([vite.config.ts](vite.config.ts))
   - Aliases `@capacitor-community/contacts` to point to the mock file
   - Allows the app to build and run despite missing distribution files

**Result:** App builds successfully but `getContacts()` still returns an empty array `[]`.

## Observed Issues

### Runtime Behavior

- ❌ No permission consent dialog appears when requesting contacts access
- ❌ `getContacts()` returns empty array `[]`
- ❌ Plugin fails silently without throwing errors
