Note: To check how to run the app check out - Instruction.md <br/>

1. In-Memory Backend (No Database)
To ensure this project is completely zero-configuration and easy to run locally, I aimed for a Node.js backend using an in-memory data structure (or local file) rather than requiring a dedicated database such as PostgreSQL or MongoDB. It demonstrates API routing, state mutation (booking cabanas), and error handling without adding heavy infrastructure dependencies.

2. Component-Driven Frontend & Tailwind CSS
The frontend is built with React and Vite for a fast developing experience. I separated concerns into smaller, reusable components (e.g., ResortMap, MapTile, BookingModal). For styling, I used Tailwind CSS. While standard CSS modules or styled-components are viable, Tailwind allowed for rapid UI prototyping, including a fully functional Dark Mode without cluttering the repository with massive CSS files.

3. Lightweight "Authentication"
Instead of implementing a heavy JWT or session-based authentication flow with a user database, I utilized a simplified login screen that stores the guest's Room Number and Name in the browser's localStorage. This isn't secure for a production environment, but it effectively proves the concept of protecting routes, reading user sessions, and attaching specific users to specific bookings in the UI.

4. Focused Testing Strategy
Testing was implemented using Jest/Supertest for the backend and Vitest/React Testing Library for the frontend. I focused on integration tests for the API and critical user journeys (like clicking unavailable vs. available cabanas) in the UI. I skipped heavy End-to-End (E2E) testing tools like Cypress to keep the project scope strictly focused on component logic and API validation.

5. Developer Experience (DX)
I created a custom run.js startup script at the root of the project. Rather than forcing the to open multiple terminals to start the frontend and backend separately, a single command launches the entire full-stack application concurrently.
