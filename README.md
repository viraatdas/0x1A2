# 0x1A2 - I'm a Teapot 🫖

An exclusive, invite-only social platform inspired by HTTP status code 418. Like a teapot that refuses to brew coffee, we're selective about what we serve.

## Features

- **Invite-Only Access**: Quality over quantity community building
- **Real-Time Timeline**: Posts appear instantly with WebSocket subscriptions
- **Social Interactions**: Like, reply, and repost functionality
- **Beautiful UI**: Modern, responsive design with dark mode support
- **Teapot Theme**: Playful references to the HTTP 418 status throughout

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI Components**: Lucide icons, Framer Motion animations
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd 0x1A2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the entire contents of `supabase/schema.sql` and run it
4. This will create all necessary tables, indexes, and security policies

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
NEXT_PUBLIC_APP_NAME=0x1A2
NEXT_PUBLIC_APP_DESCRIPTION=I'm a teapot - An exclusive social platform
```

You can find these values in your Supabase project settings under "API".

### 5. Create the First Admin User

Since this is an invite-only platform, you'll need to manually create the first admin user:

1. Go to your Supabase dashboard → Authentication → Users
2. Click "Invite user" and create a user
3. Go to the SQL Editor and run:

```sql
-- Replace 'user-id-here' with the actual user ID from the auth.users table
INSERT INTO public.profiles (id, username, display_name, is_admin)
VALUES ('user-id-here', 'admin', 'Admin User', true);
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
0x1A2/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── home/              # Main timeline
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Timeline.tsx       # Post feed
│   ├── Post.tsx           # Individual post
│   └── ComposeModal.tsx   # New post composer
├── lib/                   # Utilities
│   └── supabase/          # Supabase client setup
├── types/                 # TypeScript types
└── supabase/              # Database schema

```

## How It Works

### Invite System

1. **Invite Requests**: Non-members can request invites from the landing page
2. **Admin Review**: Admins can review and approve requests
3. **Invite Codes**: Approved users receive 8-character invite codes
4. **Registration**: New users must provide a valid invite code to sign up

### Authentication Flow

- Email/password authentication via Supabase Auth
- Middleware protects authenticated routes
- Automatic redirects for logged-in/out users

### Real-Time Features

- Posts appear instantly using Supabase Realtime subscriptions
- Like counts update live
- Timeline auto-refreshes when new posts arrive

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed anywhere that supports Node.js:
- Railway
- Render
- Fly.io
- Self-hosted with Docker

## Contributing

This is an invite-only platform, but we welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Easter Eggs 🥚

Look out for teapot-themed surprises throughout the app! The 418 status code appears in various creative ways.

## License

MIT License - feel free to use this as a starting point for your own projects!

---

*"I'm a teapot, short and stout. Here is my handle, here is my spout."* ☕️
