


# Node.js Authentication API

This is a Node.js authentication API built with Express, Mongoose, JWT, and bcrypt. It supports user signup with OTP verification, login with JWT token generation, and OTP resend functionality.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Signup](#signup)
  - [Verify OTP](#verify-otp)
  - [Resend OTP](#resend-otp)
  - [Login](#login)
- [Middleware](#middleware)
- [Token Authentication](#token-authentication)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory and adding the following:

   ```plaintext
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`.

## Environment Variables

- `PORT`: The port number the server listens on.
- `MONGO_URI`: MongoDB connection URI.
- `ACCESS_TOKEN_SECRET`: Secret for signing JWT access tokens.
- `REFRESH_TOKEN_SECRET`: Secret for signing JWT refresh tokens.

## API Endpoints

### 1. Signup

- **Endpoint**: `/auth/signup`
- **Method**: `POST`
- **Description**: Registers a new user temporarily and sends an OTP for verification.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created temporarily. Please verify OTP.",
    "email": "user@example.com"
  }
  ```

### 2. Verify OTP

- **Endpoint**: `/auth/verify-otp`
- **Method**: `POST`
- **Description**: Verifies the OTP sent during signup. Upon successful verification, the user is saved to the database.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP verified successfully, user saved to database"
  }
  ```

### 3. Resend OTP

- **Endpoint**: `/auth/resend-otp`
- **Method**: `POST`
- **Description**: Resends a new OTP for verification to the specified email.
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "New OTP has been sent",
    "email": "user@example.com"
  }
  ```

### 4. Login

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user and generates JWT access and refresh tokens.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "accessToken": "access_token",
    "refreshToken": "refresh_token"
  }
  ```

## Middleware

### `authenticateToken`

This middleware checks if a valid JWT access token is provided in the `Authorization` header. It protects routes that require authentication.

- **Usage**:
  Add `authenticateToken` to any route that needs to be protected:
  ```javascript
  const authenticateToken = require('./middlewares/authMiddleware');
  app.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
  });
  ```

## Token Authentication

- **Access Token**: A short-lived token (15 minutes) that is used for regular authentication.
- **Refresh Token**: A longer-lived token (7 days) that can be used to generate a new access token when the current one expires.

To authenticate a request, include the access token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

---

For any issues or further assistance, feel free to open an issue or contact the maintainer.
```

### Usage Summary

#   A k h i l n o d e j s 
 
 #   A k h i l n o d e j s 
 
 #   A k h i l n o d e j s  
 