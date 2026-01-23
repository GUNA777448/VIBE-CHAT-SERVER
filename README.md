# 🚀 Vibe Chat - Server

A robust and secure RESTful API server for the Vibe Chat application. Built with Express.js and MongoDB, featuring JWT authentication and Arcjet rate limiting.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat-square&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=flat-square&logo=socket.io)

## ✨ Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 🛡️ **Arcjet Rate Limiting** - Protection against brute-force attacks
- 🤖 **Bot Detection** - Blocks malicious automated requests
- 🔒 **Shield Protection** - Guards against common web attacks
- 📡 **Real-time Communication** - Socket.io for instant messaging
- 🗄️ **MongoDB** - Flexible document-based data storage
- 🔑 **Password Hashing** - Secure bcrypt password encryption

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Express 5** | Web Framework |
| **MongoDB/Mongoose** | Database & ODM |
| **Socket.io** | Real-time Communication |
| **JWT** | Authentication Tokens |
| **Bcrypt.js** | Password Hashing |
| **Arcjet** | Rate Limiting & Security |
| **CORS** | Cross-Origin Resource Sharing |
| **Dotenv** | Environment Variables |

## 📁 Project Structure

```
VIBE-CHAT-SERVER/
├── controllers/
│   └── auth_controller.js    # Authentication logic
├── middlewares/
│   ├── auth_middleware.js    # JWT verification
│   └── arcjet_middleware.js  # Rate limiting & bot detection
├── models/
│   ├── user_model.js         # User schema
│   ├── chat_Model.js         # Chat schema
│   └── message_Model.js      # Message schema
├── routes/
│   └── auth_route.js         # Auth endpoints
├── utils/
│   ├── db.config.js          # Database connection
│   └── generate_tokens.js    # JWT token generation
├── server.js                 # Entry point
├── Dockerfile                # Docker configuration
└── package.json
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Rate Limited |
|--------|----------|-------------|--------------|
| `POST` | `/api/auth/signup` | Register new user | ✅ 5 req/min |
| `POST` | `/api/auth/signin` | User login | ✅ 5 req/min |
| `GET` | `/api/auth/profile` | Get user profile | 🔒 Protected |
| `PUT` | `/api/auth/profile` | Update profile | 🔒 Protected |

### Request/Response Examples

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vibe-chat.git
   cd vibe-chat/VIBE-CHAT-SERVER
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/vibe-chat
   
   # Authentication
   JWT_SECRET=your_super_secret_jwt_key
   ID_SECRET=your_id_secret_key
   
   # Server
   PORT=5000
   
   # Arcjet Rate Limiting
   ARCJET_KEY=your_arcjet_key_here
   ARCJET_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development (with hot reload)
   npm run dev
   
   # Production
   node server.js
   ```

5. **Verify it's running**
   
   Navigate to `http://localhost:5000` - you should see:
   ```
   🚀 Server running & DB connected
   ```

## 🛡️ Security Features

### Arcjet Rate Limiting

The server uses Arcjet for comprehensive protection:

| Protection | Description |
|------------|-------------|
| **Rate Limiting** | 5 requests per minute on auth routes |
| **Bot Detection** | Blocks malicious bots (allows Postman/curl for testing) |
| **Shield** | Protects against SQL injection, XSS, and more |

#### Rate Limit Response (429)
```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "retryAfter": "2025-01-24T12:00:00Z"
}
```

### Allowed Testing Tools
- ✅ Postman
- ✅ cURL
- ✅ HTTP Libraries (Insomnia, etc.)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm test` | Run tests |

## 🐳 Docker

Build and run with Docker:

```bash
# Build the image
docker build -t vibe-chat-server .

# Run the container
docker run -p 5000:5000 --env-file .env vibe-chat-server
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT signing | ✅ |
| `ID_SECRET` | Secret key for ID generation | ✅ |
| `PORT` | Server port (default: 5000) | ❌ |
| `ARCJET_KEY` | Arcjet API key | ✅ |
| `ARCJET_ENV` | Arcjet environment (development/production) | ❌ |

## 📊 Database Models

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Model
```javascript
{
  participants: [ObjectId],
  lastMessage: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  chatId: ObjectId,
  sender: ObjectId,
  content: String,
  type: String,
  createdAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

<p align="center">
  Made with ❤️ by the Vibe Chat Team
</p>
