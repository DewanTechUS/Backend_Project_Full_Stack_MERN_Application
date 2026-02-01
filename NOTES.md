## Development Notes

This document contains extended development notes, design decisions, best practices, and learning references used during the development of the **Pro-Tasker Backend API**.

It is intended for **maintainers, instructors, recruiters, and future contributors** to understand how and why the backend was built.

## Project Purpose

The Pro-Tasker Backend API was built to demonstrate real-world backend engineering concepts, including:

- Authentication and authorization
- Ownership-based access control
- RESTful API design
- Secure environment configuration

The project emphasizes **clean structure**, **readable code**, and **production-ready patterns**.

## Technology Stack

The backend is built using the following technologies:

- **Node.js** — server-side runtime
- **Express.js** — web framework
- **MongoDB** — data persistence
- **Mongoose** — Object Data Modeling (ODM)
- **JSON Web Tokens (JWT)** — authentication
- **dotenv** — environment variable management

### References

- Node.js: https://nodejs.org/en/docs/
- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/docs/

## Project Structure Overview

The project follows a **modular structure**, where each responsibility is separated into its own directory:

- **Routes** define API endpoints
- **Controllers** handle request logic
- **Models** define database schemas
- **Middleware** enforces security and centralized error handling
- **Utilities** provide reusable helper functions

This structure mirrors **industry-standard backend projects** and makes the codebase easier to maintain and extend.

## RESTful API Design

The API follows **REST principles**, using:

- Clear, resource-based URLs
- Proper HTTP methods
- Meaningful HTTP status codes

Nested routes are used for tasks under projects to clearly represent **ownership** and **relationships between resources**.

### Examples

POST /api/projects
GET /api/projects/:id
POST /api/projects/:id/tasks

### Reference

- **REST API Design Guide**  
  https://restfulapi.net/

## Authentication Flow

User authentication is handled through **JWT-based login**. When a user logs in successfully, a token is generated and returned to the client. This token must be included in the `Authorization` header for all protected routes.

Tokens are **verified on every request** to ensure the user is authenticated before accessing protected resources.

### Reference

- **JWT Overview**  
  https://jwt.io/introduction

## Authorization and Ownership Enforcement

Beyond authentication, the backend enforces **authorization through ownership checks**.

- Each **project** and **task** is linked to a user ID
- Before returning or modifying data, the server verifies that the authenticated user **owns the resource**
- If ownership does not match, the server responds with **HTTP 403 Forbidden**

This ensures users can only access and manage their own data.

### Reference

- **Authentication vs Authorization**  
  https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization

## Middleware Design

Middleware functions are used to handle:

- Authentication and authorization
- Request parsing
- Centralized error handling

This approach keeps controllers clean, enforces consistent behavior across routes, and improves **testability and separation of concerns**.

### Reference

- **Express Middleware**  
  https://expressjs.com/en/guide/using-middleware.html

## Centralized Error Handling

A centralized error-handling middleware captures errors thrown from controllers and routes. This provides:

- Consistent JSON error responses
- Proper HTTP status codes
- Reduced duplicated `try/catch` logic

Errors are handled gracefully without leaking internal details.

### Reference

- **Express Error Handling**  
  https://expressjs.com/en/guide/error-handling.html

## Database Modeling Strategy

MongoDB schemas are designed with **clear ownership relationships**:

- Users own projects
- Projects own tasks

ObjectId references are used to link documents, and all queries are **scoped to the authenticated user** to prevent data leakage.

### Reference

- **MongoDB Data Modeling**  
  https://www.mongodb.com/docs/manual/core/data-modeling-introduction/

## Security Considerations

Security best practices are applied throughout the backend:

- Passwords are securely **hashed before storage**
- JWT secrets and database credentials are stored in **environment variables**
- The `.env` file is excluded from version control
- Protected routes require authentication by default
- Sensitive data is never returned in API responses

### References

- **OWASP API Security Top 10**  
  https://owasp.org/www-project-api-security/

- **bcrypt (npm)**  
  https://www.npmjs.com/package/bcrypt

## Console Logging and Debugging

During development, console logging is used to debug and track server behavior. **ANSI color codes** may be used to improve readability in the terminal, such as distinguishing success, warning, and error messages.

These logs are intended for **development only** and should be minimized or replaced with structured logging in production.

### Reference

- **Node.js Console Color Output**  
  https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color

## API Testing Strategy

All endpoints were tested using **Postman**. Testing covers:

- Authentication flows (register and login)
- Access control and authorization validation
- Full CRUD operations for projects and tasks
- Failure and edge cases (unauthorized access, missing data, invalid IDs)

This testing strategy ensures that unauthorized users cannot access protected resources and that valid users consistently receive correct responses.

### Reference

- **Postman Learning Center**  
  https://learning.postman.com/docs/getting-started/introduction/

## Environment Configuration

The application uses **environment variables** for configuration. This allows the same codebase to run across development, testing, and production environments without code changes.

Configuration values are read at runtime using `dotenv`, keeping sensitive data such as database credentials and JWT secrets out of source control.

### Reference

- **dotenv (npm)**  
  https://www.npmjs.com/package/dotenv

## Deployment Readiness

The backend is structured to be **deployment-ready** and follows production-oriented design principles. It includes:

- Environment-based configuration
- A health check endpoint
- Centralized error handling
- Modular and maintainable code organization

The architecture supports future enhancements such as pagination, rate limiting, structured logging, and automated testing.

## Future Improvements

Planned or optional improvements include:

- Adding pagination for large datasets
- Implementing rate limiting for improved security
- Adding automated tests using Jest
- Introducing API versioning
- Enhancing logging and monitoring for production environments

### References

- **Jest Testing (Planned)** 
  https://jestjs.io/docs/getting-started

- **API Versioning**  
  https://restfulapi.net/versioning/