# SprechFit 🗣️

> A mobile-first language learning app focused on speaking practice — built with Expo and React Native.

## Overview

SprechFit is a cross-platform language learning app (iOS, Android, and web) built with [Expo](https://expo.dev/) and [Expo Router](https://docs.expo.dev/router/introduction/). It is designed to help learners build speaking confidence through interactive exercises, audio playback, and a smooth, animated mobile experience.

## Features

- **Speaking-focused practice**: listen to and practice pronunciation using text-to-speech (`expo-speech`) and audio playback (`expo-av`)
- **Tab-based navigation**: file-based routing with Expo Router and bottom tabs
- **Local persistence**: progress and settings saved on-device with AsyncStorage
- **Polished UI**: gradients, blur effects, haptic feedback, and animations (Reanimated, Gesture Handler)
- **Custom typography**: Inter and Outfit fonts via Expo Google Fonts
- **Cross-platform**: runs on iOS, Android, and the web from a single codebase

> ✏️ Adjust this list to match what is actually implemented (e.g. lesson types, languages supported, progress tracking, streaks, camera features).

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Expo](https://expo.dev/) SDK 52, React Native 0.76, React 18 |
| Language | TypeScript |
| Navigation | Expo Router, React Navigation (bottom tabs) |
| Audio & speech | `expo-av`, `expo-speech` |
| Storage | `@react-native-async-storage/async-storage` |
| Animation & gestures | `react-native-reanimated`, `react-native-gesture-handler` |
| UI & icons | Lucide, `@expo/vector-icons`, `react-native-svg`, `expo-linear-gradient`, `expo-blur` |
| Builds | EAS Build (`eas.json`) |

## Project Structure

```
sprechfit/
├── app/            # Screens and routes (Expo Router)
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable UI components
├── constants/      # Theme, colors, and other constants
├── data/           # Static content (lessons, vocabulary, etc.)
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── utils/          # Helper functions
├── app.json        # Expo app configuration
└── eas.json        # EAS Build profiles
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm
- [Expo Go](https://expo.dev/go) on your phone, or an iOS simulator / Android emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/bensdz/sprechfit.git
cd sprechfit

# Install dependencies
npm install
```

### Run the app

```bash
npm run dev
```

This starts the Expo development server. From the terminal you can then:

- press `i` to open the iOS simulator
- press `a` to open the Android emulator
- press `w` to open the web version
- scan the QR code with Expo Go (or a development build) on your device

> **Note:** The project includes `expo-dev-client`. Features that need native modules may require a [development build](https://docs.expo.dev/develop/development-builds/introduction/) instead of Expo Go.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Expo development server |
| `npm run build:web` | Export a static web build |
| `npm run lint` | Lint the codebase |

## Building for Production

Native builds use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas login
eas build --platform android   # or ios / all
```

Build profiles are defined in `eas.json`.

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss larger changes.

## License

Add a license of your choice (e.g. MIT) and reference it here.

## Author

Built by [@bensdz](https://github.com/bensdz).
