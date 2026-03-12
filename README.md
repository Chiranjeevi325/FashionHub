# FashionHub

FashionHub is a modern, responsive e-commerce platform that connects brands (sellers) with customers. Built with the MERN stack (MongoDB, Express, React, Node.js), it provides a premium shopping experience featuring distinctive interfaces for both shoppers and sellers.

## a. Architecture Explanation

The application follows a decoupled Client-Server architecture:

- **Frontend (Client)**: A Single Page Application (SPA) built using React.js and Vite. It leverages React Router for client-side routing, Context API for global state management (Authentication & Cart), and Axios for making asynchronous HTTP requests to the backend. The UI is designed with a minimalist, premium aesthetic using vanilla CSS and CSS variables.
- **Backend (Server)**: A RESTful API built with Node.js and Express.js. It handles business logic, authentication, and database operations.
- **Database**: MongoDB (via Mongoose ODM) is used to persistently store user profiles, product catalogs, carts, and order histories.
- **Assets Storage**: Cloudinary is integrated for robust image uploading, resizing, and hosting (especially for product images).

## b. Authentication Flow Explanation

The platform uses a secure, stateless JSON Web Token (JWT) based authentication system:

1. **Login/Signup**: A user submits credentials. The backend verifies/creates the user and generates an Access Token (and a Refresh Token).
2. **Storage**: The tokens are sent to the frontend. The Access Token is stored in `localStorage` (or handled securely by the app state).
3. **Request Interception**: The frontend uses Axios interceptors to automatically attach the `Authorization: Bearer <token>` header to all outgoing requests to protected backend routes.
4. **Token Refresh**: If the Access Token expires, the Axios response interceptor detects the `401 Unauthorized` error, automatically requests a new token using the Refresh Token via a dedicated `/api/auth/refresh` endpoint, and seamlessly retries the original request without user interruption.
5. **Role-Based Access Control (RBAC)**: Users have roles (`brand` or `customer`). Protected routes on both the frontend (e.g., `<ProtectedRoute allowedRole="brand">`) and backend (via middleware) enforce these roles to prevent unauthorized access to specific areas (like the brand dashboard).

## c. Folder Structure Overview

The project codebase is organized for scalability and separation of concerns:

### Frontend
- **`src/components/`**: Reusable UI elements, grouped by domain (`auth`, `brand`, `customer`, `layout`).
- **`src/context/`**: Global state providers (`AuthContext.jsx`, `CartContext.jsx`).
- **`src/hooks/`**: Custom React hooks (`useProducts.js`, `useDebounce.js`, etc.).
- **`src/pages/`**: Main page components mapping to routes (`Brand/`, `customer/`, `Checkout.jsx`, `Profile.jsx`).
- **`src/services/`**: API abstraction layer. Service files (`authService.js`, `brandService.js`) encapsulate all Axios calls to the backend.
- **`src/utils/`**: Shared constants and utility functions.
- **`public/`**: Static assets like icons and raw images.

### Backend (Standalone Directory)
- **`config/`**: System configuration, including database connection (`database.js`).
- **`controllers/`**: Core business logic for handling incoming requests (`authController.js`, `brandController.js`).
- **`middleware/`**: Express middleware for security (`authMiddleware.js`), file uploads (`uploadMiddleware.js`), and global error handling (`errorMiddleware.js`).
- **`models/`**: Mongoose schemas defining database collections (`User.js`, `Product.js`, `Order.js`).
- **`routes/`**: Route definitions mapping endpoints to controller functions.

## d. Security Decisions

Key security measures implemented across the stack:
- **Password Hashing**: Passwords are never stored in plaintext; they are hashed using `bcryptjs` before persisting to MongoDB.
- **HTTP Headers Security**: The backend uses the `helmet` package to automatically set various HTTP headers to mitigate cross-site scripting (XSS), clickjacking, and other common vulnerabilities.
- **CORS Configuration**: Cross-Origin Resource Sharing is strictly configured to only accept requests from known frontend endpoints (localhost during dev, Vercel URL in production).
- **JWT Protection**: Protected routes require valid JSON Web Tokens, mitigating unauthorized data access. The two-token (Access + Refresh) setup minimizes the window of opportunity if an access token is compromised.
- **Soft Deletion**: For critical resources like Products, the system uses "soft deletes" (`isDeleted: true`) rather than hard database deletes, preventing accidental data loss and maintaining order referential integrity.

## e. Explanation of Where AI Tools Were Used

AI coding assistants (Agentic AI) were heavily utilized throughout the development lifecycle to accelerate building this architecture:
- **Code Generation**: Initial scaffolding for React components, building standard CRUD backend interfaces, and writing repetitive Mongoose schemas and Axios services.
- **Debugging & Refactoring**: Discovering and fixing React component lifecycle issues (e.g., stale closures, infinite loops in `useEffect`), resolving Vercel deployment blockers (specifically generating the SPA `vercel.json` routing fix), and fixing CSS overlap/flexbox layout problems.
- **UI Optimization**: Applying a cohesive "premium minimalist" theme by iteratively generating CSS layout fixes, animations (e.g., fade-ins, hover shadows), and responsive media query refinements to elements like the MarketNest Navbar, Footer, and Grid Layouts.
- **Architecture Planning**: Assisting in deciding the structure of the decoupled frontend/backend and the flow of the Cart and Order contexts.
