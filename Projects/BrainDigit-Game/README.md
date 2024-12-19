# BrainDigit Game - README

This project is a web-based memory game where users try to remember and input sequences of digits. It is developed using React, React Router, Material UI, and additional third-party libraries for enhanced UI and effects.

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [File Structure](#file-structure)
4. [Component Breakdown](#component-breakdown)
5. [Screenshots](#screenshots)
6. [Step-by-Step Guide](#step-by-step-guide)

## Overview

### Features

- Interactive and visually appealing UI.
- Fully responsive design for mobile and desktop views.
- Stages include Welcome, Settings, Game, Result, and Submit.
- Confetti effect for perfect scores.

### Technologies Used

- **React** for building the user interface.
- **Material UI** for styled components.
- **React Router** for navigation.
- **Confetti** for visual effects.

## Setup

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd BrainDigit-game
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

## File Structure

```Python
src/
├── App.jsx                  # Main application entry
├── App.css                  # Global CSS
├── components/              # All component files
│   ├── WelcomePage.jsx      # Welcome page
│   ├── SettingsPage.jsx     # Game settings
│   ├── GamePage.jsx         # Game logic
│   ├── ResultPage.jsx       # Results display
│   ├── SubmitPage.jsx       # Final submission page
│   ├── Footer.jsx           # Footer component
│   └── Navigation.jsx       # Navigation bar
├── sounds/                  # Sound files
└── images/                  # Images and logos
```

## Component Breakdown

### `App.jsx`

The root of the application. Includes:

- Navigation bar (`Navigation` component).
- Routes for all pages.
- Footer (`Footer` component).

### `WelcomePage.jsx`

Displays a welcome message and brief instructions. Includes a button to proceed to the settings page.

### `SettingsPage.jsx`

Allows users to configure the number of digits and digit types. Includes:

- Dropdowns for customization.
- Buttons to start the game or navigate back.

### `GamePage.jsx`

Displays the digits one by one with a beep sound. Includes logic for transitioning to the result page after showing all digits.

### `ResultPage.jsx`

Displays input fields for users to recall and input the digits they saw. Includes:

- OTP-like input fields.
- Replay, Reset, and Submit buttons.

### `SubmitPage.jsx`

Final results page displaying the user's score. Includes a confetti effect for perfect scores.

### `Footer.jsx`

A responsive footer displaying logos and links to GitHub and Twitter.

### `Navigation.jsx`

Responsive navigation bar with links to different pages.

## Screenshots

### 1. Welcome Page

![Welcome Page](/img/1.png)
*Screenshot of the Welcome Page with a "Start" button.*

### 2. Settings Page

![Settings Page](/img/2.png)
*Screenshot of dropdowns for digit settings.*

### 3. Game Page

![Game Page](/img/3.png)
*Screenshot showing a single digit with animation.*

### 4. Result Page

![Result Page](/img/4.png)
*Screenshot of OTP-like input fields.*

### 5. Submit Page

![Submit Page](/img/5.png)
*Screenshot of the final results and confetti effect.*

### 6. Responsive View

![Responsive View](/img/phone.png)\
*Screenshot of the app on a mobile device.*

## Step-by-Step Guide

### Welcome Page

1. The user lands on the `WelcomePage`.
2. Click the "Start" button to navigate to the `SettingsPage`.

### Settings Page

1. Configure the game settings (number of digits and type).
2. Click "Start" to begin the game, which redirects to the `GamePage`.

### Game Page

1. The app displays digits one by one with a beep sound.
2. After all digits are shown, navigate to the `ResultPage`.

### Result Page

1. Users input the digits they saw using OTP-style fields.
2. Buttons available:
   - **Replay:** Restart the game.
   - **Reset:** Go back to settings.
   - **Submit:** Navigate to the `SubmitPage` with results.

### Submit Page

1. Displays results with congratulatory messages for perfect scores.
2. Includes a button to navigate back to the home page.

---

Feel free to customize and enhance the game further!

---

### License

This project is licensed under the MIT License.

---

### Acknowledgments

This project was created with the help of various online resources and tutorials. Special thanks to the developers who created the libraries and frameworks used in this project.

---

### Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and creat
e. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/new-feature`)
3. Commit your Changes (`git commit -m 'Add new feature'`)
4. Push to the Branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your-username/your-repo/tags).

---

### Authors

- **M SAKSHAM** - *Initial work* - [My X Profile](https://X.com/M_Saksham093)

---
