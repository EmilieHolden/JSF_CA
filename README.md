# Altora

Altora is a responsive e-commerce application built with React and TypeScript.

The application uses the Noroff Online Shop API to display products and allows users to search, sort, view product details, add products to a shopping cart, update quantities, and complete a simulated checkout flow.

## Live Site

https://altorashop.netlify.app/

## Features

- Browse products from the Noroff Online Shop API
- View individual product details
- Search for products by name
- Sort products by price and rating
- Display product discounts
- Add products to the shopping cart
- Update product quantities in the cart
- Remove products from the cart
- Complete a simulated checkout
- Contact form with validation
- Loading and error states
- Responsive design
- Breadcrumb navigation

## Built With

- React
- TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS

## Getting Started

### Prerequisites

You need Node.js and npm installed on your computer.

### Installation

Clone the repository:

git clone (https://github.com/EmilieHolden/JSF_CA.git)

Navigate to the project directory:

cd js-fw_ca

Install the dependencies:

npm install

Start the development server:

npm run dev

## Available Scripts

Start the development server:

npm run dev

Run ESLint:

npm run lint

Create a production build:

npm run build

Preview the production build locally:

npm run preview

### components

Contains reusable UI components such as the header, footer, breadcrumbs, product cards, product details, loading states, and error states.

### stores

Contains the Zustand store used to manage shopping cart state across the application.

### types

Contains TypeScript types and interfaces used throughout the application.

### views

Contains the main page-level components used by React Router.

## API

This project uses the Noroff Online Shop API:

https://v2.api.noroff.dev/online-shop

Products are fetched from the API and displayed dynamically in the application.

## Deployment

The application is deployed with Netlify.

The production build is created using:

npm run build

Vite outputs the production files to the `dist` directory.

A Netlify `_redirects` file is used so that React Router routes work correctly when pages are refreshed or opened directly.

## Author

Emilie Holden
