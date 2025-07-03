
# React To-Do List App

This is a sleek and functional To-Do List web application built with **React**, allowing users to manage tasks with ease — from creation to completion and deletion. The app supports dynamic task editing and persistently stores data using **localStorage**.

---

## Scope

The goal of this application is to:

- Build a production-quality React CRUD (Create, Read, Update, Delete) app.  
- Practice state and effect management using `useState()` and `useEffect()`.  
- Utilize browser `localStorage` to maintain data between sessions.  
- Implement clean UI toggling between active and completed task views.  
- Develop reusable logic for common task actions (edit, delete, complete).  

---

## Key Features

- **Add Tasks** – Users can add new tasks with a title and description.  
- **Edit Tasks** – Tasks can be edited inline with update saving.  
- **Mark as Complete** – Tasks can be marked complete and timestamped.  
- **Toggle Task Views** – Switch between To-Do and Completed task views.  
- **Delete Tasks** – Remove tasks from either list.  
- **Local Storage Support** – Tasks are saved locally in the browser for persistence.  

---

## Tech Stack

- **React** – Frontend library  
- **JavaScript** – App logic  
- **CSS** – Styling the components  

---

## Getting Started

To run the app locally:

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/react-todo-list.git
   ```

2. **Navigate into the project folder**  
   ```bash
   cd react-todo-list
   ```

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Start the development server**  
   ```bash
   npm start
   ```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Learning Highlights

While building this app, the following React concepts and JavaScript techniques were explored:

- Functional components and React Hooks (`useState`, `useEffect`)  
- Handling form input and controlled components  
- Dynamic rendering based on app state  
- Managing side effects and retrieving/saving data with `localStorage`  
- Using `Date.now()` to generate unique task IDs  
- Conditional rendering for edit vs. view modes  
- Implementing full CRUD operations in React without a backend  
- Writing clean, organized JSX code  

---

## About this Project

This React To-Do List app was bootstrapped with Create React App. For detailed documentation about the available scripts (npm start, npm test, npm run build, etc.) and advanced configuration, please refer to the Create React App documentation.

---