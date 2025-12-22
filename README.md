# Capacitor Contacts App# Capacitor Contacts App (Vite + TypeScript)



A simple Capacitor app that fetches and displays contacts on iOS and Android.A modern TypeScript-based Capacitor app built with Vite that fetches and displays contacts on iOS and Android using the `@capacitor-community/contacts` plugin.



## Features## Features



- Fetch contacts from device- ⚡ **Vite** - Lightning fast dev server and optimized builds

- Display contact names, phone numbers, and emails- ✅ **TypeScript** - Type-safe development

- Cross-platform support (iOS & Android)- 📱 **iOS & Android** - Works on both platforms

- 🔐 **Permission handling** - Proper contacts access management

## Tech Stack- 🎨 **Modern UI** - Clean gradient design

- 📋 **Sorted contacts** - Alphabetically organized with phone and email

- Capacitor 7.0- 🔥 **Hot Module Replacement** - Instant updates during development

- Vite 5.0

- TypeScript 5.3## Prerequisites

- @capacitor-community/contacts

- Node.js and npm installed

## Setup- For iOS development:

  - macOS with Xcode installed

```bash  - CocoaPods installed

npm install- For Android development:

npm run build  - Android Studio installed

npx cap sync  - Java Development Kit (JDK) installed

```

## Setup Instructions

## Run

### 1. Install Dependencies

```bash

# iOSAll dependencies are already installed, but if you need to reinstall:

npx cap open ios

```bash

# Androidnpm install

npx cap open android```

```

### 2. Development Mode

## Development

Run the app in development mode with hot reload:

```bash

npm run dev```bash

```npm run dev

```

## Note

This starts the Vite dev server at `http://localhost:5173`

This project uses a mock implementation for the contacts plugin during build. The actual native plugin code needs to be integrated for device functionality.

### 3. Build for Production

Build the TypeScript and bundle with Vite:

```bash
npm run build
```

This command:

- Compiles TypeScript with type checking
- Bundles with Vite to the `dist` directory
- Optimizes assets for production

### 4. Sync with Native Platforms

Sync the web assets with the native platforms:

```bash
npm run sync
```

Or sync individually:

```bash
npm run sync:ios
npm run sync:android
```

## Running the App

### On iOS

1. Open the iOS project in Xcode:

```bash
npm run open:ios
```

2. In Xcode:
   - Select a simulator or connected device
   - Click the "Run" button (or press Cmd+R)

### On Android

1. Open the Android project in Android Studio:

```bash
npm run open:android
```

2. In Android Studio:
   - Wait for Gradle sync to complete
   - Select an emulator or connected device
   - Click the "Run" button

## Permissions

The app requires contacts permissions to function:

### iOS

- Permission request: "This app needs access to your contacts to display them in the app."
- Configured in `ios/App/App/Info.plist` with `NSContactsUsageDescription`

### Android

- Permissions: `READ_CONTACTS` and `WRITE_CONTACTS`
- Configured in `android/app/src/main/AndroidManifest.xml`

## Project Structure

```
capacitor-contacts/
├── src/
│   └── app.ts              # Main TypeScript application logic
├── dist/                   # Vite build output (generated)
│   ├── index.html
│   └── assets/
│       ├── *.css
│       └── *.js
├── ios/                    # iOS native project
├── android/                # Android native project
├── index.html              # Source HTML file (Vite entry point)
├── styles.css              # Source CSS file
├── vite.config.ts          # Vite configuration
├── package.json            # Node dependencies
├── tsconfig.json           # TypeScript configuration
└── capacitor.config.ts     # Capacitor configuration
```

## Development Scripts

- `npm run dev` - Start Vite dev server with hot reload
- `npm run build` - Build for production with Vite
- `npm run preview` - Preview production build locally
- `npm run sync` - Build and sync with both platforms
- `npm run sync:ios` - Build and sync with iOS
- `npm run sync:android` - Build and sync with Android
- `npm run open:ios` - Open iOS project in Xcode
- `npm run open:android` - Open Android project in Android Studio

## How It Works

1. Click the "Fetch Contacts" button
2. The app requests contacts permission
3. If granted, contacts are fetched from the device
4. Contacts are displayed in an alphabetically sorted list
5. Each contact shows:
   - Name
   - Phone number(s)
   - Email address(es)

## Troubleshooting

### iOS Issues

- **Permission not working**: Make sure `NSContactsUsageDescription` is in `Info.plist`
- **Build fails**: Run `pod install` in the `ios/App` directory

### Android Issues

- **Gradle sync fails**: Make sure Java JDK is installed and configured
- **Permission denied**: Check that permissions are in `AndroidManifest.xml`

### General Issues

- **TypeScript errors**: Run `npm run build` to see detailed error messages
- **Changes not showing**: Run `npm run sync` to rebuild and sync platforms
- **Plugin not found**: Make sure you ran `npm install`
- **Vite dev server issues**: Clear cache with `rm -rf node_modules/.vite`
- **Hot reload not working**: Restart the dev server with `npm run dev`

## Using the Plugin API

The app uses the `@capacitor-community/contacts` plugin. Here are the main methods:

```typescript
// Request permissions
await Contacts.requestPermissions();

// Get all contacts
const result = await Contacts.getContacts({
  projection: {
    name: true,
    phones: true,
    emails: true,
  },
});
```

## License

MIT

## Support

For issues with:

- Vite: https://vitejs.dev/guide/
- Capacitor: https://capacitorjs.com/docs
- Contacts plugin: https://github.com/capacitor-community/contacts
