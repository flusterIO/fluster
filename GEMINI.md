# Fluster Project Overview

This document provides a comprehensive overview of the Fluster project, its structure, and development conventions.

## Project Overview

Fluster is a free and open-source academic note-taking application. It is a monorepo that consists of a Tauri-based desktop application, a Next.js-powered website, and several reusable packages. The project is built with a combination of technologies, including Rust, TypeScript, React, and Python.

### Key Technologies

- **Frontend:** The desktop application's frontend is built with React, TypeScript, and Vite. It uses Tailwind CSS for styling and Redux for state management.
- **Backend:** The desktop application's backend is powered by Rust and Tauri.
- **Website:** The project's website is built with Next.js and `fumadocs-mdx`.
- **Package Management:** The project uses pnpm for managing its monorepo structure.
- **Build System:** The project uses Vite for building the frontend and Cargo for building the Rust components. Wireit is used for orchestrating the build process.

## Building and Running

### Prerequisites

- Node.js and pnpm
- Rust and Cargo
- Python

### Development

To run the desktop application in development mode, use the following command:

```bash
pnpm -C apps/fluster dev
```

This will start the Vite development server and the Tauri application.

### Building

To build the desktop application for production, use the following command:

```bash
pnpm -C apps/fluster build
```

This will create a production-ready build of the application in the `apps/fluster/dist` directory.

### Website

To run the website in development mode, use the following command:

```bash
pnpm -C apps/website dev
```

To build the website for production, use the following command:

```bash
pnpm -C apps/website build
```

## Development Conventions

### Code Style

The project uses ESLint for linting TypeScript code and `rustfmt` for formatting Rust code. Please ensure that your code adheres to the project's coding style.

### Testing

The project uses Vitest for testing the frontend and `cargo test` for testing the Rust components. Please add tests for any new features or bug fixes.

### Commit Messages

The project follows the Conventional Commits specification for commit messages. Please ensure that your commit messages are descriptive and follow the correct format.
