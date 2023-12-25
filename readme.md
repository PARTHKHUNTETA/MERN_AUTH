
**## About the Project**

- We will create a MERN stack application from absolute scratch.
- This will be a single-page application on the frontend using React, Redux, React Router and React Bootstrap. 
- The backend will use Express, MongoDB and Mongoose for the database and will implement authentication using JWT (JSON Web Tokens) and HTTP-only cookies. 
- We will also be using Redux for state management and Redux Toolkit for making things easier. 


## User Routes and Controller
Let's get our routes setup. We will have the following routes:

- POST /api/users - Register a user
- POST /api/users/auth - Authenticate a user and get token
- POST /api/users/logout - Logout user and clear cookie
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update profile

## Packages used
- Express
- dotenv
- mongoose
- bcyptjs
- jsonwebtoken
- cookie-parser
- nodemon