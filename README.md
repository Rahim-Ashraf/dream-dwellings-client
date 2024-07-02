## Website name: Dream Dwellings
#### Admin username: admin@gmail.com
#### Admin password: aaaaA!

## live link: https://dream-dwellings-36ef2.web.app
### Features:
*   This is a Real Estate website.
*   This website have payment integration with stripe payment
*   This website have 3 type of user role: normal user, agent and admin
*   A normal user can add properties to wishlist and by propertise by stripe payment
*   This website have a search and filter option in All Properties page where an user can find properties by searching or filtering
*   An agent can add new properties and update thier uploaded properties
*   Agent can add new properties and update thier uploaded properties
*   Admin can manage users, delete users and change user role
*   An admin is the most powerful whow can manage and verify properties
*   An admin also can manage reviews and add advertisements
*   This website have JWT authorization for private routing

### Technologies used:
React, Tailwind CSS, Firebase, Express JS, MongoDB, JWT

## How to Start the project:

### Installation
1. Clone the repository
2. Install dependencies:
    ```sh
   npm install
    ```

### Configuration
1. Set up Firebase:
    - Create a project in [Firebase Console](https://console.firebase.google.com/) and add a web app.
    - Copy the Firebase config.

2. Create a `.env.local` file in the root directory:
    ```plaintext
    VITE_apiKey=your-api-key
    VITE_authDomain=your-auth-domain
    VITE_projectId=your-project-id
    VITE_storageBucket=your-storage-bucket
    VITE_messagingSenderId=your-messaging-sender-id
    VITE_appId=your-app-id
    ```

## Usage

1. Run the development server:
    ```sh
    npm start
    ```
2. Build for production:
    ```sh
    npm run build
    ```
