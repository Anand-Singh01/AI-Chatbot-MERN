![1](https://github.com/Anand-singh97/AI-Chatbot-MERN/assets/132922327/e4b111fd-7a10-4842-8131-ab6a00e2d0b5)
![2](https://github.com/Anand-singh97/AI-Chatbot-MERN/assets/132922327/d67a435a-fa45-4028-9509-61ad92122fde)
![3](https://github.com/Anand-singh97/AI-Chatbot-MERN/assets/132922327/a1e794be-ed85-4756-bc2f-1112889b429c)
# MERN Stack Chat Application with GPT-3.5 Turbo Model API

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack along with TypeScript. It utilizes OpenAI's GPT-3.5 Turbo Model API to enhance chat interactions. Users can log in or sign up to access the chat features.

## Features

- **User Authentication:** Secure user authentication is implemented, with HTTP-only cookies containing JWT tokens.
- **Client-Side and Server-Side Validation:** Input validation is performed on both client and server sides using the Zod library to ensure data integrity.
- **Chat History:** Users can access previous chats, allowing for a seamless conversation experience.
- **State Management:** State management is handled efficiently using Recoil, providing a reliable and scalable solution.
- **Guest Signin:**

## Technologies Used

- **Frontend:**
  - React.js
  - TypeScript
  - Recoil (for state management)
  - MUI
  - Tailwind CSS
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for database)
  - TypeScript
  - bcrypt
  
- **Authentication:**
  - JSON Web Tokens (JWT)
  - HTTP-only Cookies

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
2. **Install dependencies:**
3. **Set up environment variables:**
   - Navigate to the `backend` directory and create a `.env` file with necessary environment variables:
     ```
     OPEN_AI_SECRET=your_open_ai_secret
     OPEN_AI_ORGANIZATION_ID=your_open_ai_organization_id
     MONGODB_URL=your_mongodb_url
     JWT_SECRET=your_jwt_secret
     COOKIE_SECRET=your_cookie_secret
     PORT=your_port
     CLIENT_URL1=your_client_url1
     CLIENT_URL2=your_client_url2
     NODE_ENV=development
     ```
   - Run `npm run dev` to start the backend server.
   - Navigate to the `client` directory and create a `.env` file with necessary environment variables:
     ```
     REACT_APP_BACKEND_URL=your_backend_url
     REACT_APP_GUEST_EMAIL=your_guest_email
     REACT_APP_GUEST_PASSWORD=your_guest_password
     REACT_APP_GUEST_NAME=your_guest_name
     ```
   - Run `npm run start` to start the frontend server.
5. **Access the application:**
   Open your web browser and go to `http://localhost:3000` to access the application.
```
