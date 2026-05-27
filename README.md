<div align="center">
  <img src="public/icons/android-chrome-512x512.png" alt="Void" width="120" />
  <h1>Void</h1>
</div>

A modern community and team collaboration platform. Void provides a structured approach to organizing communities through servers, channels, role-aware server controls, secure authentication, onboarding flows, and customizable themes.

## 🎯 Current Features

### Core Functionality
- **Authentication** - Secure authentication via Clerk with sign-in and sign-up flows
- **Onboarding** - First-time users are prompted to create their initial server and are redirected into their workspace after setup
- **Servers** - Create and manage community servers with invite codes, server avatars, and automatic general-channel provisioning
- **Invites** - Copyable invite links with invite-code regeneration from the server header
- **Channels** - Support for TEXT, AUDIO, and VIDEO channel types within servers, grouped in the server sidebar
- **Role-based Access Control** - Member roles (OWNER, MEMBER, MODERATOR, ADMIN) drive the server header actions and membership access
- **User Profiles** - Profile management linked to Clerk authentication and synced with server membership data

### UI & UX
- **Dark/Light Theme** - Theme toggle with persistent preferences via next-themes
- **Responsive Navigation** - Sidebar navigation with server list and action items
- **File Upload** - Image upload integration via UploadThing
- **Media Attachments** - UploadThing is wired for both server images and message file uploads, including images, videos, and PDFs
- **Server Layouts** - Protected server layouts render a dedicated sidebar, server header, and member-aware navigation for each server
- **Modal-driven Flows** - Create-server and invite dialogs are managed globally through the modal store
- **Modern Design System** - Radix UI components with Tailwind CSS styling
- **Toast Notifications** - User feedback via Sonner toast system

## 🛠️ Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Authentication** | Clerk |
| **Database** | MySQL with Prisma ORM (MariaDB adapter) |
| **Styling** | Tailwind CSS, Radix UI, Lucide Icons, Shadcn |
| **Forms** | React Hook Form with Zod validation |
| **File Upload** | UploadThing |
| **State Management** | React hooks, Form state |

## 📊 Data Model

- **Profile** - User profiles synced with Clerk authentication
- **Server** - Community servers with owner and invite codes
- **Channel** - Typed channels (TEXT/AUDIO/VIDEO) within servers
- **Member** - Server memberships with role assignments

## ⚙️ Prerequisites

- Node.js 18.x or higher
- MySQL 8.x or higher or MariaDB
- npm, yarn, or pnpm
- Clerk account and API keys
- UploadThing account (for file uploads)

## 🚀 Getting Started

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

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_HOST="localhost"
DATABASE_PORT="3306"
DATABASE_USER="your_mysql_user"
DATABASE_PASSWORD="your_mysql_password"
DATABASE_NAME="Void"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# UploadThing
UPLOADTHING_TOKEN="your-uploadthing-token"
NEXT_PUBLIC_UPLOADTHING_APP_ID="your-uploadthing-app-id"
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

## 📁 Project Structure

```
app/                     # Next.js 16 App Router
├── (auth)/              # Authentication routes (sign-in, sign-up)
├── (main)/              # Main application routes
│   └── (routes)/servers/[id]/   # Protected server layout and server page
├── (setup)/             # Setup/onboarding flow for first-time users
├── api/                 # API routes (servers, invite refresh, uploadthing)
└── layout.tsx           # Root layout with theme provider

components/              # Reusable UI components
├── modals/              # Modal components
├── navigation/          # Navigation sidebar, server list, and create-server action
├── providers/           # Context providers (Theme, modals)
├── server/              # Server sidebar and header controls
├── ui/                  # Shadcn UI components
└── ActionTooltips.tsx, FileUpload.tsx

lib/                     # Core utilities and configurations
├── db.ts                # Prisma client singleton
├── current-user.ts      # Clerk user profile fetching
├── profile.ts           # Profile management utilities
├── uploadthing.ts       # UploadThing configuration
├── utils.ts             # Common utilities
└── generated/           # Generated Prisma types

prisma/                  # Database
├── schema.prisma        # Data models (Profile, Server, Channel, Member)
└── migrations/          # Database migration history

public/                  # Static assets
postcss.config.mjs       # PostCSS configuration
tailwind.config.js       # Tailwind CSS configuration
components.json          # Shadcn UI configuration
```

## 🔧 Available Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Build for production (runs prisma generate) |
| `npm run start`     | Start production server  |
| `npm run lint`      | Run ESLint               |
| `npx prisma studio` | Open Prisma database GUI |

## 🔒 Authentication Flow

1. User visits `/` (public page)
2. Redirected to `/sign-in` or `/sign-up` (Clerk-managed)
3. Upon successful auth, user profile is created/synced
4. Redirected to `/setup` for initial server setup if no server membership exists
5. Existing members are redirected directly into `/servers/[id]`
6. Server creation automatically creates the owner membership and a default `general` text channel
7. Server invite links can be copied or regenerated from the server header

## 🚧 Roadmap / In Progress

- Real-time messaging with WebSocket support
- Channel message history and persistence
- Direct messaging between users
- Advanced admin controls and moderation
- User presence indicators
- Media sharing and attachments

## 📝 Contributing

Contributions are welcome. Please open an issue or submit a pull request for any improvements.

## 📄 License

This project is licensed under the MIT License.
