# Narratives.tv - AI Agency Landing Page

This project is the official landing page for **Narratives**, an innovative AI agency. The website is designed to showcase the agency's services, portfolio, and expertise in the field of artificial intelligence.

## About Narratives

**Narratives** ([narratives.tv](https://narratives.tv)) specializes in creating compelling AI-driven solutions for businesses. We combine cutting-edge technology with creative storytelling to build powerful applications and experiences.

## Project Structure

The project is a single-page application built with React.

-   `frontend/`: Contains the React application.
-   `frontend/src/`: Main source code for the landing page.
-   `frontend/src/components/`: Reusable React components.
-   `frontend/public/`: Static assets.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm (or yarn)

### Installation & Running

1.  Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2.  Install NPM packages:
    ```sh
    pnpm install
    ```
3.  Start the development server:
    ```sh
    pnpm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Tech Stack

-   **Frontend:**
    -   React
    -   React Router
    -   Tailwind CSS

## Deployment

This application is ready for deployment on any static site hosting service.

1.  Build the application:
    ```sh
    cd frontend
    npm run build
    ```
2.  Deploy the `frontend/build` directory to your hosting provider.

Most modern hosting platforms (like Vercel, Netlify, or AWS Amplify) can be configured to do this automatically by setting:
-   **Base Directory:** `frontend`
-   **Build Command:** `npm run build`
-   **Publish Directory:** `frontend/build`
