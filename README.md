# ProductsStore - MERN Stack Product Management System

A full-stack product management application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to create, view, update, and delete products.

## Live Demo

Check out the live application: [ProductsStore on Render](https://productsstore-xrz4.onrender.com/)

## Features

- **Create Products**: Add new products with name, price, and image URL
- **View Products**: Browse through the list of all products
- **Update Products**: Edit existing product information
- **Delete Products**: Remove products from the database
- **Responsive Design**: Built with Chakra UI for a seamless experience on all devices

## Tech Stack

### Frontend
- React (Vite)
- Chakra UI
- React Router

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- MVC Architecture

### Deployment
- Render.com

## Installation and Setup

1. Clone the repository
   ```
   git clone https://github.com/mostafabdelhakem/ProductsStore.git
   cd ProductsStore
   ```

2. Install dependencies
   ```
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. Run the development server
   ```
   npm run dev
   ```

5. In a separate terminal, run the frontend
   ```
   cd frontend
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Runs the backend in development mode
- `npm run build` - Builds the frontend and installs dependencies
- `npm run start` - Runs the application in production mode

## Project Structure

```
ProductsStore/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   └── product.route.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── .env
├── .gitignore
├── package.json
└── README.md
