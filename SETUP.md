# Backend Setup Guide

This document explains how to set up and run the backend API locally.

--------------------------------------------------

# PREREQUISITES

- Node.js (v18 or later)
- npm
- MongoDB (local or MongoDB Atlas)
- Git

--------------------------------------------------

# INSTALLATION

1. Clone the repository

git clone <repository-url>
cd backend

2. Initialize the project

npm init -y

3. Install dependencies

npm install express mongoose dotenv cors bcryptjs jsonwebtoken

4. Install development dependency

npm install -D nodemon

--------------------------------------------------

# ENVIRONMENT VARIABLES

Create a .env file in the backend root directory.

Required variables:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_ORIGIN=http://localhost:3001

Do NOT commit the .env file to GitHub.

--------------------------------------------------

# GENERATING A SECURE JWT SECRET

This project uses JSON Web Tokens (JWT) for authentication.

Generate a secure secret by running this command once:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Copy the generated value and paste it into your .env file:

JWT_SECRET=generated_random_string_here

--------------------------------------------------

# DATABASE SETUP

This project uses MongoDB with Mongoose.

You can use:
- Local MongoDB
- MongoDB Atlas (recommended)

Example MongoDB URI:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/database-name

--------------------------------------------------

# RUNNING THE SERVER

Development mode (with nodemon):

npm run dev

Production mode:

npm start

--------------------------------------------------

# PACKAGE.JSON SCRIPTS

Add the following scripts to package.json:

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

--------------------------------------------------

# HEALTH CHECK

Verify the server is running:

GET http://localhost:3000/health

Expected response:

{ "status": "ok" }

--------------------------------------------------

# SECURITY NOTES

- Passwords are hashed using bcrypt
- JWT is used for authentication
- CORS is restricted using CLIENT_ORIGIN
- Environment variables are excluded via .gitignore

--------------------------------------------------

# SETUP COMPLETE

The backend is now ready for development and testing.
