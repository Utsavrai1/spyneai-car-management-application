# Car Management Application

## Overview

The **Car Management Application** is a full-stack web application for managing car listings. It includes user authentication, car listing creation, and image uploads. The application is built with **Node.js**, **Express** for the backend, and a **React** frontend.

This repository contains the following folders:

- **backend/**: Backend code (Node.js, Express, MongoDB)
- **frontend/**: Frontend code (React)

## Features

- User registration and login
- Create, update, and delete car listings
- Search for cars
- Upload car images using Cloudinary

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, JWT, Cloudinary, Multer
- **Frontend**: React, Axios
- **API Documentation**: Swagger UI
- **Database**: MongoDB (MongoDB Atlas recommended)
- **Image Upload**: Cloudinary
- **File Upload Handling**: Multer

---

## Installation Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/car-management-app.git
cd car-management-app
```

### 2. Backend Setup

The backend is located inside the `backend/` folder.

#### 2.1 Install Dependencies

Navigate to the `backend` directory and install the required dependencies:

```bash
cd backend
npm install
```

#### 2.2 Setup Environment Variables

Create a `.env` file in the `backend/` folder with the following content:

```dotenv
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

- Replace `your_jwt_secret_key`, `your_mongodb_connection_string`, `your_cloudinary_*` values with your actual credentials.

#### 2.3 Start the Backend

To start the backend server, run the following command:

```bash
npm start
```

The backend will be available at `http://localhost:5000/api`.

---

### 3. Frontend Setup

The frontend is located inside the `frontend/` folder.

#### 3.1 Install Dependencies

Navigate to the `frontend` directory and install the required dependencies:

```bash
cd frontend
npm install
```

#### 3.2 Set API Base URL

In the `frontend/` directory, open the `src/api.js` file and update the API base URL to your backend URL:

```js
const API_URL = "http://localhost:5000/api";
```

#### 3.3 Start the Frontend

To start the frontend application, run:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

---

## API Documentation

### Access Swagger UI

Once the backend is running, you can access the Swagger UI for API documentation by navigating to:

```
http://localhost:5000/api-docs
```

This UI allows you to explore and test all the available API routes, including user authentication and car management.

---

## Frontend Features

- **Login / Signup**: Users can create an account or log in.
- **Car Listings**: Users can view all their car listings, create new listings, and update existing ones.
- **Image Upload**: Car images can be uploaded using Cloudinary.
- **Search**: Users can search for cars by keywords.

---

## Folder Structure

### Backend Folder Structure (`backend/`)

```
backend/
  ├── controllers/
  │   ├── authController.js
  │   └── carController.js
  ├── models/
  │   ├── Car.js
  │   └── User.js
  ├── routes/
  │   ├── authRoutes.js
  │   └── carRoutes.js
  ├── middleware/
  │   └── auth.js
  ├── config/
  │   └── database.js
  ├── app.js
  └── .env
```

### Frontend Folder Structure (`frontend/`)

```
frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   └── CarList.js
  │   ├── pages/
  │   │   ├── LoginPage.js
  │   │   └── HomePage.js
  │   ├── App.js
  │   └── api.js
  ├── package.json
  └── .env
```

### How to Use:

1. **Clone the repository**: As mentioned, clone the repository and follow the setup instructions for both frontend and backend.
2. **API Routes**: The API has routes for authentication (`/auth/signup`, `/auth/login`) and car management (`/cars`).
3. **Swagger Documentation**: Visit `http://localhost:5000/api-docs` to see the API documentation and try out different routes.
