# Void

A modern real-time communication platform built for communities and teams. Void provides seamless messaging experiences with support for group rooms, private conversations, and comprehensive administrative tools.

## Features

- **Real-time Messaging** - Instant message delivery powered by WebSocket connections
- **Rooms** - Create and join public or private rooms for group discussions
- **Direct Messages** - Private one-on-one conversations between users
- **Admin Controls** - Full moderation capabilities including user management, role assignments, and content moderation
- **User Authentication** - Secure sign-up and login system
- **Role-based Permissions** - Granular control over user capabilities within rooms
- **Message History** - Persistent message storage and retrieval
- **Online Presence** - Real-time user status indicators

## Tech Stack

- Next.js
- Socket.io
- Prisma
- MySQL
- Tailwind CSS

## Prerequisites

- Node.js 18.x or higher
- MySQL 8.x or higher
- npm, yarn, or pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/namans4ini/Void.git
cd Void
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://user:password@localhost:3306/Void"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Initialize the database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Void/
├── app/                  # Next.js App Router
├── components/           # Reusable UI components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── socket/               # Socket.io server and handlers
└── types/                # TypeScript type definitions
```

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Build for production     |
| `npm run start`     | Start production server  |
| `npm run lint`      | Run ESLint               |
| `npx prisma studio` | Open Prisma database GUI |

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for any improvements.

## License

This project is licensed under the MIT License.
