# Jackie's Book Tally - Next.js Firebase App

This is a Next.js application integrated with Firebase for backend services, including authentication and database.

## Project Overview

Jackie's Book Tally is a platform for avid readers to track, review, and discover books, focusing on Romance, Fantasy, and Smut genres. It allows users to sign up, manage their profiles, and interact with book-related content and blog posts.

## Key Features Implemented (So Far)

- User Authentication: Sign-up, Sign-in, Sign-out, Password Reset using Firebase Authentication.
- User Profile Management: Viewable user profiles.
- User Settings: Users can update their display name, email, and password.
- Blog: Users can view blog posts, and authenticated users can create new posts.
- Responsive Navbar: Navigation adapts based on authentication status.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation) (or npm/yarn if you prefer, but this project uses pnpm)
- A [Firebase](https://firebase.google.com/) account.

## Firebase Setup

1.  **Create/Use a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Create a new project or select an existing one.

2.  **Add a Web App to Your Firebase Project:**
    *   In your Firebase project, navigate to "Project settings" (click the gear icon).
    *   Under the "General" tab, scroll down to "Your apps".
    *   Click the Web icon (`</>`) to add a new web application.
    *   Give your app a nickname (e.g., "Jackie's Book Tally Web").
    *   Click "Register app". Firebase will provide you with a `firebaseConfig` object. **Copy these values**, as you'll need them for your environment variables.

3.  **Enable Authentication:**
    *   In the Firebase console, go to "Authentication" (under the "Build" section in the left sidebar).
    *   Click the "Sign-in method" tab.
    *   Enable the "Email/Password" provider. You can also enable other providers like Google, Facebook, etc., if desired.

4.  **Enable Firestore Database:**
    *   In the Firebase console, go to "Firestore Database" (under the "Build" section).
    *   Click "Create database".
    *   Choose to start in **production mode** (this sets up more secure default rules).
    *   Select your preferred Firestore location.
    *   Click "Enable".

## Environment Variables

This project requires Firebase configuration keys to connect to your Firebase backend.

1.  Create a file named `.env.local` in the root of your project.
2.  Add the following lines to `.env.local`, replacing `YOUR_VALUE_HERE` with the corresponding values from your Firebase project's `firebaseConfig` object:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_VALUE_HERE
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_VALUE_HERE
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_VALUE_HERE
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_VALUE_HERE
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_VALUE_HERE
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_VALUE_HERE
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_VALUE_HERE
    ```
    *Note: The `NEXT_PUBLIC_` prefix is important for Next.js to expose these variables to the browser.*

## Installation

1.  Clone the repository (if you haven't already):
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  Install the project dependencies:
    ```bash
    pnpm install
    ```

## Running the Development Server

1.  Ensure your `.env.local` file is set up correctly with your Firebase credentials.
2.  Start the development server:
    ```bash
    pnpm dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. The page will auto-update as you edit files.

## Building for Production

To create a production build of the application, run:
```bash
pnpm build
```
This will generate an optimized version of your application in the `.next` folder. You can then start the production server using `pnpm start`.

## Project Structure

A brief overview of the key directories:

-   `app/`: Contains all the routes, pages, and layouts (using Next.js App Router).
    -   `app/api/`: API routes.
    -   `app/components/`: Reusable React components used across various pages.
    -   `app/layout.tsx`: The main layout file for the application.
    -   `app/page.tsx`: The main landing page.
    -   `app/(auth)/`: Route group for authentication-related pages (e.g., `signin`, `signup`).
-   `app/firebase.ts`: Initializes the Firebase app and exports Firebase service instances and utility functions.
-   `app/UserContext.tsx`: React Context for managing global user authentication state.
-   `public/`: Static assets like images and fonts.
-   `README.md`: This file.
-   `package.json`: Lists project dependencies and scripts.
-   `next.config.js` (or `.mjs`): Configuration for Next.js.
-   `tailwind.config.ts`: Configuration for Tailwind CSS.
-   `tsconfig.json`: TypeScript configuration.

## Learn More (Next.js)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
