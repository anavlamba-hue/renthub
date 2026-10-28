# RentHub — Apartment Rental Platform

RentHub is a responsive apartment rental application built with Angular. It allows users to browse apartment listings, explore property details, manage favourites, and create and publish their own listings.

## Project Links

- **GitHub Repository:** https://github.com/anavlamba-hue/renthub
- **Live Application:** https://renthub-alpha-two.vercel.app/

## Features

### Authentication and User Accounts

- User registration and login.
- Session management and logout.
- Route protection using an authentication guard.
- Preconfigured demo accounts for evaluation.

### Apartment Listings

- Create and publish apartment listings.
- Preview listing information before publishing.
- Edit listing details during the preview workflow.
- Display property information, including location, price, amenities, photos, and contact details.
- View individual listing details.

### Discovery and Interaction

- Browse apartment listings.
- Search and filter listings using available criteria.
- Sort and paginate listing results.
- Add and manage favourite listings.
- Submit enquiries and interact with listing information.
- Favourites do not sync across browsers or devices because the application does not use a shared backend database.

### User Experience

- Responsive interface for desktop and mobile devices.
- Form validation for user input.
- Angular Material/CDK components and custom SCSS styling.

## Technology Stack

- **Frontend:** Angular 22, TypeScript, HTML
- **Styling:** SCSS, Angular Material/CDK
- **Routing:** Angular Router
- **Authentication and storage:** Browser `localStorage`
- **Unit testing:** Vitest through the Angular CLI
- **Package management:** npm

## Demo Credentials

The following demo accounts are seeded automatically in the browser's local storage when the application initializes.

| User  | Email             | Password    |
| ----- | ----------------- | ----------- |
| Anav  | `anav@lamba.com`  | `anav1738`  |
| Navya | `navya@lamba.com` | `navya1999` |
| Sandy | `sandy@gmail.com` | `sandy1972` |

**Note:** This is a coursework demonstration implementation. Authentication data is stored in browser local storage rather than a shared backend.

## Run the Project Locally

### Prerequisites

- Node.js and npm
- Git

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/anavlamba-hue/renthub.git
cd renthub
npm install
```

### Development Server

Start the local development server:

```bash
npm start
```

Open `http://localhost:4200/` in your browser. The application reloads automatically when source files change.

### Production Build

Build the application for production:

```bash
npm run build
```

The generated build artifacts are written to the `dist/` directory.

### Unit Tests

Run the unit test suite:

```bash
npx ng test --watch=false --isolate=false
```

**Latest verified result:** 20 tests passed across 16 test files.

## Bonus Feature

- **Listing Preview and Submit Workflow:** Users can review a listing before publishing it and return to edit its details before submitting.

## Implementation Notes

- User and session data are stored locally in the browser.
- Demo accounts are initialized automatically if they do not already exist in local storage.
- The application currently uses client-side authentication and does not provide server-side authentication or shared user persistence.

## Author

Anav Lamba
