# Issue: feat/ios-limited-authorization-status Branch Cannot Be Used# Issue: feat/ios-limited-authorization-status Branch Not Working

## Problem## Problem

The `feat/ios-limited-authorization-status` branch **cannot be built** because it's missing the compiled JavaScript files needed for the Capacitor bridge.The `feat/ios-limited-authorization-status` branch builds and syncs successfully, but **does not actually retrieve contacts** (both iOS and Android).

## Installation Attempt**Observed behavior:**

```````json- No permission consent dialog appears when requesting contacts access

"@capacitor-community/contacts": "github:capacitor-community/contacts#feat/ios-limited-authorization-status"- `getContacts()` returns empty array `[]`

```- No errors thrown, plugin just fails silently

## Build Error## Installation

``````json

Cannot find module '@capacitor-community/contacts' or its corresponding type declarations."@capacitor-community/contacts": "github:capacitor-community/contacts#feat/ios-limited-authorization-status"

```````

## What's Missing## Possible Causes

The branch only includes native iOS/Android code but lacks the JavaScript layer:1. **Missing compiled distribution files** - The branch doesn't include `dist/` folder with compiled JS/TS bridge code. We worked around this with a Vite alias to a mock implementation, but the actual native bridge may not be properly wired.

- No `dist/` folder (compiled JS files)

- No `src/` folder (TypeScript source)2. **Broken native bridge** - The native code (iOS/Android) may not be properly registering or exposing methods to Capacitor's JS bridge.

- `package.json` references non-existent files: `dist/plugin.cjs.js`, `dist/esm/index.js`

3. **Incomplete implementation** - The branch may be work-in-progress with the native side not fully implemented yet.

## Why

4. **Plugin registration issue** - The Capacitor plugin registration may be broken, preventing JS from calling native methods.

The branch appears to only commit native platform code without the TypeScript/JavaScript source or build artifacts.
