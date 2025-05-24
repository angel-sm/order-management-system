# Order Management System - Frontend

A React-based frontend application for the Order Management System.

## Tech Stack

- React
- TypeScript
- Mantine UI
- Zustand (State Management)
- Wouter (Routing)
- Axios (API Client)

## Project Structure

application/
├── src/
│ ├── app/ # Application setup
│ │ ├── App.tsx # Main application component with routes
│ │ └── theme.ts # Mantine theme configuration
│ ├── core/ # Core business logic
│ │ ├── Auth/ # Authentication module
│ │ │ ├── application/ # State and use cases
│ │ │ └── infrastructure/ # API repositories
│ │ └── Order/ # Order management module
│ │ ├── application/ # State and use cases
│ │ └── infrastructure/ # API repositories
│ └── presentation/ # UI components
│ ├── components/ # Reusable UI components
│ │ ├── atoms/ # Basic UI elements
│ │ ├── molecules/# Composite components
│ │ └── organisms/# Complex components
│ └── pages/ # Page components
│ ├── Login.page.tsx
│ ├── Orders.page.tsx
│ └── Signup.page.tsx

## Features

- User authentication (Sign in/Sign up)
- Order management (Create, View orders)
- Responsive UI with Mantine

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your API URL
```

3. Start the development server:

```bash
npm run dev
```

Available Routes
/ - Home page (Orders management)

/signin - User login

/signup - User registration

State Management
The application uses Zustand for state management:

useAuthStore - Manages authentication state and user information

useOrderStore - Manages orders data and operations

API Integration
API calls are handled through repository classes that use Axios for HTTP requests.
