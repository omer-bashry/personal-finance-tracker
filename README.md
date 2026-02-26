# Personal Finance Tracker

A sleek, responsive, and robust personal finance tracking dashboard built with React and Tailwind CSS v4. This application allows users to effortlessly manage their income and expenses, offering insightful analytics, beautiful dynamic charts, and a seamlessly integrated Dark Mode.

## Features

- **Dashboard Overview**: Get a bird's-eye view of your finances with calculated net balance, total income, and total expenses.
- **Transaction Management**: 
  - Add, edit, and delete transactions.
  - Real-time search by transaction category.
  - Advanced filtering by transaction type (income/expense) and category.
  - Built-in pagination supporting extensive transaction histories.
- **Interactive Reports & Analytics**: 
  - Dynamic Pie and Bar charts powered by `recharts`.
  - Detailed top-spend category breakdowns.
  - Month-over-month performance comparison mapping income vs expenses.
- **Global Dark Mode**: Fully native dark theme integrated with Tailwind v4 `@custom-variant dark` strategies and persisted across sessions using LocalStorage.
- **Responsive Layout**: Fluid design tailored for seamless shifting between mobile and desktop setups, including an intuitive mobile-friendly sliding sidebar.

## Tech Stack

- **Frontend Framework:** React (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **Charting:** Recharts
- **State Management:** React Context API & `localStorage` persistence

## Project Architecture

1. **Context & State Management (`/context/FinanceContext.jsx`)**
   The application state relies heavily on a centralized context provider storing historical transactions, theme preferences, and calculating real-time aggregated metrics. It hooks straight into `localStorage` allowing fluid data retention between reloads.
2. **Dynamic UI Ecosystem (`/components`)**
   Constructed with flexible components such as re-usable Cards, Buttons, and layout containers to maintain a consistent UI schema in both light and dark orientations without heavy repetitive CSS.
3. **Data Operations (`/utils/calculations.js`)**
   Detached utility logic handling month-by-month groupings, percentage reductions, and total asset evaluations outside of main render blocking scopes.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone (https://github.com/omer-bashry/personal-finance-tracker)
   ```

2. **Navigate to project directory**
   ```bash
   cd personal-finance-tracker
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Design Choices

- **Tailwind v4 Integration:** We adopted the newest Tailwind compiler utilizing the standard `@import "tailwindcss"` and streamlined variant queries to inject the `.dark` class dynamically to the `<html/>` root.
- **Local Persistence layer:** To avoid requiring backend setups out of the box, `localStorage` abstracts the user's financial log smoothly.

---

*Designed to simplify finance monitoring and bring aesthetic clarity to personal budgeting.*
