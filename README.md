# PhotoDrag - Image Upload and Gallery App

PhotoDrag is a React-based application that allows users to upload images and display them in a gallery. Users can drag and drop images or upload them via file input. Images are stored in Firebase and displayed with pagination.

![PhotoDrag Screenshot](https://github.com/naumanshafi/image-gallery-app/blob/main/public/Photo%20Drag.png)

## Features

- Drag-and-drop or file upload functionality for images.
- Display images in a gallery with pagination.
- View full-size images in a modal.
- Delete images with a confirmation modal.
- Images are stored in Firebase Firestore and Firebase Storage.
- Multi-language support with a language selector in the Navbar.
- Responsive and modern UI using React.

## Tech Stack

- **React**: Frontend library for building the user interface.
- **Firebase**: Used for authentication, Firestore for storing image data, and Firebase Storage for image storage.
- **CSS**: Custom styles for the user interface.

## Project Structure

```bash
├── src
│   ├── components
│   │   ├── Navbar.js
│   │   ├── ImageUpload.js
│   │   ├── ImageGallery.js
│   ├── css
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── ImageUpload.css
│   │   ├── ImageGallery.css
│   ├── firebase.js
│   ├── App.js
│   ├── index.js
└── .env
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed on your local machine.
- A Firebase project set up for authentication, Firestore, and Firebase Storage.

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/naumanshafi/image-gallery-app.git
cd image-gallery-app
```

### 2. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Firebase Configuration

Create a `.env` file in the root directory of your project and add your Firebase credentials:

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

> **Important**: Replace the placeholders (YOUR_API_KEY, etc.) with your actual Firebase credentials from your Firebase Console.

### 4. Firebase Setup

- Go to [Firebase Console](https://console.firebase.google.com/).
- Create a new project (if you don’t have one).
- Enable **Firestore Database** and **Firebase Storage** in the Firebase Console.

### 5. Running the Application

Once the configuration is complete, you can start the development server by running:

```bash
npm start
```

The app should now be running at [http://localhost:3000](http://localhost:3000).

### 6. Deploying to Production

For deploying the application, you can build it by running:

```bash
npm run build
```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Node.js](https://nodejs.org/)
```

This version removes the actual Firebase credentials and uses placeholders. Make sure to replace them with your own credentials before setting up.
