![gpt](https://github.com/Anand-singh97/AI-Chatbot-MERN-/assets/132922327/e89e9958-f113-4b8b-8883-20a320c115a0)

# MERN Stack Chat Application with GPT-3.5 Turbo Model API

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack along with TypeScript. It utilizes OpenAI's GPT-3.5 Turbo Model API to enhance chat interactions. Users can log in or sign up to access the chat features.

## Features

- **User Authentication:** Secure user authentication is implemented, with HTTP-only cookies containing JWT tokens.
- **Client-Side and Server-Side Validation:** Input validation is performed on both client and server sides using the Zod library to ensure data integrity.
- **Chat History:** Users can access previous chats, allowing for a seamless conversation experience.
- **State Management:** State management is handled efficiently using Recoil, providing a reliable and scalable solution.

## Technologies Used

- **Frontend:**
  - React.js
  - TypeScript
  - Recoil (for state management)
  - Other relevant libraries
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for database)
  - TypeScript
  - Other relevant libraries
  
- **Authentication:**
  - JSON Web Tokens (JWT)
  - HTTP-only Cookies

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
2. **Install dependencies:**
3. **Set up environment variables:**
Create a `.env` file in the `backend` directory and add necessary environment variables like database connection string, JWT secret, cookie secret, open ai API.
cd ../backend && npm run dev
cd ../frontend && npm run dev
4. **Access the application:**
Open your web browser and go to `http://localhost:3000` to access the application.
