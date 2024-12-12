# PingMe - Real-time Chat Application

PingMe is a modern chat application built using the MERN stack (MongoDB, Express.js, React, Node.js). It features real-time messaging, user authentication and private messaging with WebSocket (Socket.IO) for instant communication.

## Technologies
- MongoDB, Express.js, React.js, Node.js (MERN)
- Axios
- Socket.io
- Redux
- React Router Dom
- React Hot Toast

## Features
Login <br />

![image info](screenshots/Ping%20me%20Login.png) <br />

Register <br />

![image info](screenshots/Ping%20me%20register.png) <br />

Account Verification Email(Added email verification feature upon user registration.) <br />

![image info](screenshots/Ping%20me%20account%20verificaton%20email.png) <br />

Account Verification <br />

![image info](screenshots/Ping%20me%20account%20verificaton.png) <br />

Reset Password (Enter registered email to reset password) <br />

![image info](screenshots/Ping%20me%20reset%20password.png) <br />

Reset Password Email <br />

![image info](screenshots/Ping%20me%20reset%20password%20email.png) <br />

Reset Password Confirm <br />

![image info](screenshots/Ping%20me%20reset%20password%20confirm.png) <br />

Interface <br />

![image info](screenshots/Ping%20me%20interface%202.png) <br />

Conversation Between two persons <br />

![image info](screenshots/Ping%20me%20conversation.png) <br />

Message Deletion 1 <br />

![image info](screenshots/Ping%20me%20delete%20message%201.png) <br />

Message Deletion 2(delete for me and delete for everyone options available) <br />

![image info](screenshots/Ping%20me%20delete%20message%202.png) <br />

Message Deletion 3(delete for everyone shown below) <br />

![image info](screenshots/Ping%20me%20delete%20message%203.png) <br />

User Adding 1(add by clicking + button below the chat section and enter their username) <br />

![image info](screenshots/Ping%20me%20user%20adding%201.png) <br />

User Adding 2(Enter the message to send) <br />

![image info](screenshots/Ping%20me%20user%20adding%202.png) <br />

Profile(Options to change our avatar, name, username and password. avatar can be change by clicking the avatar itself) <br />

![image info](screenshots/Ping%20me%20profile.png) <br />

Profile(Options to change our avatar, name, username and password. avatar can be change by clicking the avatar itself) <br />

![image info](screenshots/Ping%20me%20profile.png) <br />

Name Change <br />

![image info](screenshots/Ping%20me%20name%20change.png) <br />

Userame Change <br />

![image info](screenshots/Ping%20me%20username%20change.png) <br />

Password Change <br />

![image info](screenshots/Ping%20me%20password%20change.png) <br />

Light Mode (By cliking the toggle button on the navbar) <br />

![image info](screenshots/Ping%20me%20light%20mode.png) <br />

## Run Website Locally

clone the project

```git clone https://github.com/ashifthekkupuram/ping_me.git```

go to project directory

```cd ping_me```

go to client directory, install dependencies and create .env file in the client directory

```cd client```

```npm install``

```
VITE_API_URL = http://localhost:8000/api
VITE_BACKEND_URL = http://localhost:8000
```

run the frontend

```npm run dev``

open new terminal and go to root directory of the project, install dependencies for the backend and create .env file in the root directory. Backend package file and .env file is in the root diretory

```npm install```

```
PORT = 8000
REFRESH_SECRET_KEY = ...
ACCESS_SECRET_KEY = ...
MONGODB_URI = ...
ALLOWED_ORIGINS = 'http://localhost:5173 http://127.0.0.1:5173'
EMAIL = (add the email that need to send email to reset password and verification)
PASSWORD = (password or application password of added email)
```

run the backend

```npm run dev```
















