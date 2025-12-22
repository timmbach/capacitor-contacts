# Capacitor Contacts Plugin - iOS Limited Authorization Issue

## Overview

Testing the `feat/ios-limited-authorization-status` branch from `@capacitor-community/contacts` to evaluate iOS limited contacts authorization support.

## Current Status

⚠️ **Not Working** - The branch builds and syncs successfully but does not retrieve contacts on either iOS or Android.

## Installation

```json
"@capacitor-community/contacts": "github:capacitor-community/contacts#feat/ios-limited-authorization-status"
```

## Observed Issues

### Runtime Behavior

- ❌ No permission consent dialog appears when requesting contacts access
- ❌ `getContacts()` returns empty array `[]`
- ❌ Plugin fails silently without throwing errors
