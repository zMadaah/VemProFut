# ⚽ VemProFut

**VemProFut** is a football match management platform designed to help players organize and manage their football (soccer) matches in a simple, efficient, and intuitive way.

The goal of this project is to provide a complete experience for players who want to organize games, manage teams, track match events, and create a better experience on and off the field.

---

## 🚀 Project Purpose

Organizing football matches with friends can quickly become messy:

- Who is playing?
- What’s the score?
- Who scored or assisted?
- How much time is left?
- How do we keep match information organized?

**VemProFut** solves this by centralizing everything into a single platform, making match management easier, faster, and more engaging.

---

## ✨ Features (In Progress)

- ⏱️ Match timer inspired by real football match flow
- 👥 Player management
- ⚽ Goal tracking per player
- 🅰️ Assist tracking
- 🟨 Card system (warnings and fouls)
- 📊 Match summary dashboard
- 🔄 Real-time game updates
- 🔐 JWT authentication
- 👤 User registration and login
- 📱 Personalized player profiles

---

## 🛠️ Tech Stack

### 📱 Frontend (Mobile)

- React Native
- TypeScript
- Expo
- Expo Router
- Context API
- Axios
- AsyncStorage

---

### 🌐 Backend API

Built following a scalable production-oriented architecture:

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- JWT Authentication
- Bcrypt
- REST API

---

### 🗄️ Database

- PostgreSQL

---

## 📂 Project Structure

```bash
VemProFut/
│
├── mobile/
│   ├── src/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── contexts/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── prisma/
│   └── server.ts
│
└── README.md
```

---

## 🧠 What I'm Learning

This project is helping me improve:

- Scalable software architecture
- Mobile application development
- Authentication flows with JWT
- API development with Node.js
- Database modeling
- Clean code principles
- Real-world project structure
- Full-stack integration

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/zMadaah/VemProFut.git
```

Navigate to project:

```bash
cd VemProFut
```

---

## 📱 Frontend Setup

Navigate to mobile folder:

```bash
cd mobile
```

Install dependencies:

```bash
yarn install
```

Start Expo:

```bash
npx expo start
```

Run Android:

```bash
npx expo run:android
```

Run iOS:

```bash
npx expo run:ios
```

---

## 🌐 Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
yarn install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/vemprofut"

JWT_SECRET=your_secret_key
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Start development server:

```bash
yarn dev
```

API runs on:

```bash
http://localhost:3333
```

---

## 🔐 Authentication Flow

Current authentication flow:

1. User creates account
2. Password is encrypted with Bcrypt
3. Data is stored in PostgreSQL
4. JWT token is generated after login
5. Mobile application stores session
6. Authenticated routes become available

---

## 📈 Project Status

🚧 This project is currently under active development.

Recent progress:

✅ Backend API started  
✅ PostgreSQL integration  
✅ User registration flow  
✅ Login authentication with JWT  
✅ Prisma ORM setup  
🚀 Mobile + API integration in progress

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

Feel free to open an issue or submit a pull request.

---

## 🌍 Vision

The long-term goal of **VemProFut** is to evolve into a complete platform for amateur football management — helping players organize matches, track performance, build teams, and improve the football experience.

---

LinkedIn:
LinkedIn profile: www.linkedin.com/in/joao-guilherme-cruz
---

Built with passion for football and technology ⚽💻
