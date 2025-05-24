## Products

This project is a frontend application built using React, Vite, and TypeScript.
* I use `Amazon Q` and `ChatGPT` to improve development times.
* Time wasted in total 8h

### Deployed url
[https://pillar-screen-test-frontend.vercel.app/](https://pillar-screen-test-frontend.vercel.app/)

## Project Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

### Installing Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/angel-sm/pillar-screen-test-frontend.git
   ```

2. Install the dependencies:
   ```bash
   cd pillar-screen-test-frontend
   npm install
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server, and you can view the project at `http://localhost:3000` in your browser.

### Building the Project for Production

To build the project for production, run:

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview Production Build

To preview the production build locally, run:

```bash
npm run preview
```

This will start a server that serves the production build.

## Project Structure

Here is an overview of the important directories and files:

- `public/`: Contains the static assets like images and the `index.html` file.
- `src/`: Contains the source code of the application.
  - `core/`: Clean architecture folder structure.
    - `<entity>/`: Entity.
      - `application/`: Use cases and context.
      - `domain/`: Schemas and models of entity.
      - `infrastructure/`: DB repository.
  - `hooks/`: Custom hooks.
  - `presentation/`: Pages with components.
  - `App.tsx`: The root component of the application.
  - `main.tsx`: The entry point where the React app is rendered.

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build.

## Additional Notes

- This project uses TypeScript for static typing.
- Vite is used for fast hot module replacement during development.
- React is the framework used to build the user interface.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
