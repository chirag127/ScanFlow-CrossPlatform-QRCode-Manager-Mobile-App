# QRSay: QR Code Interaction Mobile App

[![Build Status](https://img.shields.io/github/actions/workflow/ci.yml?style=flat-square&logo=github&label=Build&user=chirag127&repo=QRSay-QR-Code-Interaction-Mobile-App)](https://github.com/chirag127/QRSay-QR-Code-Interaction-Mobile-App/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/QRSay-QR-Code-Interaction-Mobile-App?style=flat-square&logo=codecov&label=Coverage)](https://codecov.io/gh/chirag127/QRSay-QR-Code-Interaction-Mobile-App)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20Native%2C%20Expo%2C%20TS-blue?style=flat-square&logo=typescript&logo=react&logo=expo)](https://github.com/chirag127/QRSay-QR-Code-Interaction-Mobile-App)
[![Lint/Format](https://img.shields.io/badge/Lint%2FFormat-Biome-green?style=flat-square&logo=biome)](https://github.com/chirag127/QRSay-QR-Code-Interaction-Mobile-App)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/QRSay-QR-Code-Interaction-Mobile-App?style=flat-square&label=Stars)](https://github.com/chirag127/QRSay-QR-Code-Interaction-Mobile-App/stargazers)


🌟 Star this Repo

## QRSay: Your Mobile QR Code Companion

Scan, manage, and interact with QR codes seamlessly on iOS and Android. QRSay provides a modern, high-performance mobile experience for rapid QR code engagement.

## Architecture


+ QRSay/
├── App.tsx          # Main entry point
├── components/     # Reusable UI components
├── screens/        # App screens (Scanner, History, etc.)
├── utils/          # Utility functions (QR code parsing, etc.)
├── models/         # Data models (QR code data)
├── store/          # State management (Zustand)
├── navigation/     # Navigation configuration (Expo Router)
├── config/         # Configuration files
├── assets/         # Images, fonts, etc.
└── app.json         # Expo project configuration


## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   QR Code Scanning
-   QR Code History
-   QR Code Management
-   Cross-Platform Support (iOS & Android)
-   Fast Performance

## Installation

bash
git clone https://github.com/chirag127/QRSay-QR-Code-Interaction-Mobile-App.git
cd QRSay-QR-Code-Interaction-Mobile-App
npm install


## Usage

1.  Run `npm start` to start the Expo development server.
2.  Scan the QR code with your mobile device or use an emulator.
3.  Use the app to scan, manage, and interact with QR codes.

## Contributing

See [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) license.

<details>
<summary>🤖 AI Agent Directives</summary>

**Tech Stack:**

*   **Language:** TypeScript
*   **Framework:** React Native, Expo
*   **State Management:** Zustand
*   **Navigation:** Expo Router, React Navigation
*   **Linting/Formatting:** Biome
*   **Testing:** Vitest, Playwright (E2E)

**Architectural Patterns:**

*   Feature-Sliced Design (FSD)
*   Component-Based Architecture

**Verification Commands:**

bash
npm run lint
npm run test
npm run e2e


**Purpose:**

This section defines the technical specifications of this project and ensures alignment of future AI Agents.
</details>
