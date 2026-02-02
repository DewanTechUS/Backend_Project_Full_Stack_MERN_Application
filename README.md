# Pro-Tasker Backend API

## Author

**Dewan Mahmud (Rocky)**

## Overview

The **Pro-Tasker Backend API** is a RESTful backend service built with **Node.js**, **Express**, and **MongoDB**. It provides secure authentication, ownership-based authorization, and full CRUD functionality for managing **projects** and **nested tasks**.

This backend demonstrates real-world backend engineering practices, including:

- JWT-based authentication
- Protected routes
- Ownership-based access control
- Modular and scalable architecture
- Environment-based configuration using `.env`

The API is designed to be tested using **Postman** or any standard REST client.

## Key Features

- JWT-based authentication (user registration and login)
- Ownership-based authorization (users can only access their own data)
- Projects with nested task management
- Secure password hashing using **bcrypt**
- Centralized error handling
- MongoDB integration with **Mongoose ODM**
- Environment-based configuration using `.env`
- Health check endpoint for service monitoring

## Technology Stack

- **Node.js** – server-side JavaScript runtime
- **Express.js** – web framework for building RESTful APIs
- **MongoDB** – NoSQL database for data persistence
- **Mongoose** – Object Data Modeling (ODM) for MongoDB
- **JSON Web Tokens (JWT)** – authentication and authorization
- **bcrypt** – secure password hashing
- **dotenv** – environment variable management
- **cors** – Cross-Origin Resource Sharing configuration

## Project Structure (High Level)

- **server.js**  
  Application entry point. Initializes the Express app, middleware, routes, and database connection.

- **src/config**  
  Configuration files for database connections and environment setup.

- **src/models**  
  Mongoose schemas defining the data models (User, Project, Task).

- **src/controllers**  
  Business logic and request handling for authentication, projects, and tasks.

- **src/routes**  
  API route definitions that map HTTP endpoints to controllers.

- **src/middleware**  
  Authentication, authorization, and centralized error-handling middleware.

- **src/utils**  
  Reusable helper utilities such as JWT token generation.

- **public**  
  Static assets and backend documentation UI (HTML, CSS, media).

## Setup Instructions

Setup and environment configuration are documented separately.

Please refer to the following files:

- **SETUP.md** — Installation steps and environment configuration
- **NOTES.md** — Development notes, design decisions, and learning references

## Base URLs

- **Root URL:**  
  http://localhost:3000/

- **API Base URL:**  
  http://localhost:3000/api

## Health Check

- **Endpoint:**  
  `GET http://localhost:3000/health`

- **Expected Response:**

```json
{
  "status": "ok"
}
```

## Postman Testing Guide (12 Steps)

These steps verify **authentication**, **authorization**, and **full CRUD functionality** for projects and nested tasks using a REST client such as Postman.

### Step 1: Register User A

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/register`

- **Body (JSON):**

```json
{
  "name": "Rocky",
  "email": "rocky@test.com",
  "password": "123456"
}
```

- **Expected Result:**
 - HTTP **201 Created**
 - JWT token returned

### Step 2: Login User A

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/login`

- **Body (JSON):**

```json
{
  "email": "rocky@test.com",
  "password": "123456"
}
```

- **Expected Result:**
 - HTTP **200 OK**
 - Save the returned token as **TOKEN_A**

### Step 3: Access Protected Route Without Token

- **Method:** GET
- **URL:** `http://localhost:3000/api/projects`
- **Headers:** None (no Authorization token)

- **Expected Result:**
 - HTTP **401 Unauthorized**

### Step 4: Create Project (User A)

- **Method:** POST
- **URL:** `http://localhost:3000/api/projects`

- **Headers:**
- `Authorization: Bearer TOKEN_A`
- `Content-Type: application/json`

- **Body (JSON):**

```json
{
  "name": "Rocky Project",
  "description": "Ownership test project"
}
```

- **Expected Result:**
 - HTTP **201 Created**
 - Save the returned project `_id` as **PROJECT_ID**

### Step 5: Get All Projects (User A)

- **Method:** GET
- **URL:** `http://localhost:3000/api/projects`

- **Header:**
- `Authorization: Bearer TOKEN_A`

- **Expected Result:**
 - HTTP **200 OK**
 - Only projects owned by **User A** are returned

### Step 6: Get Single Project by ID (User A)

- **Method:** GET
- **URL:** `http://localhost:3000/api/projects/PROJECT_ID`

- **Header:**
- `Authorization: Bearer TOKEN_A`

- **Expected Result:**
 - HTTP **200 OK**
 - Project object returned

### Step 7: Create Task Under Project (User A)

- **Method:** POST
- **URL:** `http://localhost:3000/api/projects/PROJECT_ID/tasks`

- **Header:**
- `Authorization: Bearer TOKEN_A`

- **Body (JSON):**

```json
{
  "title": "Task A1",
  "description": "Created by User A",
  "status": "To Do"
}
```

- **Expected Result:**
 - HTTP **201 Created**
 - Save the returned task `_id` as **TASK_ID**

### Step 8: Get Tasks for Project (User A)

- **Method:** GET
- **URL:** `http://localhost:3000/api/projects/PROJECT_ID/tasks`

- **Header:**
- `Authorization: Bearer TOKEN_A`

- **Expected Result:**
  - HTTP **200 OK**
  - Array of tasks belonging to **PROJECT_ID** returned


### Step 9: Register and Login User B (Authorization Test)

This step verifies that users cannot access resources owned by other users.

#### Register User B

- **Method:** POST  
- **URL:** `http://localhost:3000/api/auth/register`

**Body (JSON):**
```json
{
  "name": "User B",
  "email": "userb@test.com",
  "password": "123456"
}

```

- **Expected Result:**
 - HTTP **201 Created**
 - JWT token returned

#### Login User B

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/login`

- **Body (JSON):**

```json
{
  "email": "userb@test.com",
  "password": "123456"
}
```

- **Expected Result:**
 - HTTP **200 OK**
 - Save the returned token as **TOKEN_B**

**Note:** User B must use a **different email address** than User A.

### Step 10: User B Accesses User A Project

- **Method:** GET
- **URL:** `http://localhost:3000/api/projects/PROJECT_ID`

- **Header:**
- `Authorization: Bearer TOKEN_B`

- **Expected Result:**
 - HTTP **403 Forbidden**

### Step 11: User B Accesses User A Tasks

- **Method:** GET
- **URL:** `http://localhost:3000/api/projects/PROJECT_ID/tasks`

- **Header:**
- `Authorization: Bearer TOKEN_B`

- **Expected Result:**
 - HTTP **403 Forbidden**

### Step 12: Update Task (User A)

- **Method:** PUT
- **URL:**
  `http://localhost:3000/api/projects/PROJECT_ID/tasks/TASK_ID`

- **Header:**
- `Authorization: Bearer TOKEN_A`

- **Body (JSON):**

```json
{
  "status": "Done"
}
```

- **Expected Result:**
 - HTTP **200 OK**
 - Updated task returned

## Security Notes

- Passwords are securely hashed using **bcrypt** before storage
- JWT tokens are required to access all protected routes
- Ownership checks prevent cross-user access to projects and tasks
- Sensitive configuration values are stored in environment variables and are **never committed** to version control
- CORS is restricted using the `CLIENT_ORIGIN` environment variable

## License

This project is licensed under the **MIT License**.
See the `LICENSE` file for details.

## Status

The backend API is fully functional and has been tested end-to-end using Postman, including authentication, authorization, and CRUD operations.

## Reflection

Building the Pro-Tasker Backend API was a valuable learning experience that helped solidify my understanding of real-world backend development. Through this project, I gained hands-on experience designing a RESTful API, implementing JWT-based authentication, and enforcing ownership-based authorization to protect user data.

One of the most important lessons from this project was the difference between authentication and authorization. Beyond simply verifying users, I learned how to properly scope database queries and route access to ensure that users can only access and modify their own projects and tasks. This significantly improved my understanding of backend security and data protection.

I also strengthened my skills in structuring a backend application using a modular architecture. Separating routes, controllers, models, middleware, and utilities made the codebase easier to read, debug, and extend. Implementing centralized error handling and environment-based configuration further reinforced production-ready best practices.

Testing the API extensively with Postman helped me think from the perspective of both the client and the server. It allowed me to validate not only successful flows but also failure cases such as unauthorized access and invalid input.

Overall, this project increased my confidence in building secure, maintainable backend systems and gave me a strong foundation for future work with full-stack applications, automated testing, and production deployments.

## Special Thanks

Special thanks to my instructors, mentors, and fellow learners in my **Per Scholas cohort** for their continuous support, feedback, and collaboration. Learning alongside such a motivated group played a meaningful role in the successful completion of this project.

```