# SOQRS Quick Start Guide

Get your SOQRS development environment up and running in minutes!

## ⚡ Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **npm** or **yarn** package manager
- ✅ **Git** installed
- ✅ A code editor (VS Code recommended)
- ✅ A Supabase account ([Sign up](https://supabase.com))

## 🚀 Installation Steps

### 1. Install Dependencies

Open terminal in the project directory and run:

```bash
npm install
```

This will install all required packages (~200MB).

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
# Windows PowerShell
copy .env.local.example .env.local

# macOS/Linux
cp .env.local.example .env.local
```

### 3. Configure Supabase (REQUIRED)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (~2 minutes)
3. Go to **Project Settings** → **API**
4. Copy the following values to your `.env.local`:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open `supabase/migrations/00001_initial_schema.sql` from your project
4. Copy all content and paste into the SQL Editor
5. Click **Run** (this will create all tables)

### 5. Enable Phone Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Phone** provider
3. For development, you can use Supabase's built-in SMS (limited)
4. For production, configure Twilio (see below)

### 6. Start Development Server

```bash
npm run dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000)

## 🎉 You're Ready!

Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

### Test the Auth Flow

1. Click "Hemen Başla" or "Kayıt Ol"
2. Enter a phone number (use your real number for testing)
3. Enter the OTP code sent to your phone
4. Complete the onboarding form
5. You'll be redirected to the main app!

## 🔧 Optional Services (For Full Functionality)

### Cloudinary (Image Hosting)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy credentials to `.env.local`:
   - Cloud Name → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - API Key → `CLOUDINARY_API_KEY`
   - API Secret → `CLOUDINARY_API_SECRET`

### Stripe (Payments)

1. Sign up at [stripe.com](https://stripe.com)
2. Go to Developers → API Keys
3. Copy test keys to `.env.local`:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

### Twilio (SMS)

1. Sign up at [twilio.com](https://twilio.com)
2. Get a phone number
3. Copy credentials to `.env.local`:
   - Account SID → `TWILIO_ACCOUNT_SID`
   - Auth Token → `TWILIO_AUTH_TOKEN`
   - Phone Number → `TWILIO_PHONE_NUMBER`

### Google Maps (Location Features)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Distance Matrix API
   - Geocoding API
4. Create API key
5. Copy to `.env.local`:
   - API Key → `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### OneSignal (Push Notifications)

1. Sign up at [onesignal.com](https://onesignal.com)
2. Create a new app
3. Choose Web Push
4. Copy credentials to `.env.local`:
   - App ID → `NEXT_PUBLIC_ONESIGNAL_APP_ID`
   - API Key → `ONESIGNAL_API_KEY`

## 📱 Testing PWA Features

### On Desktop

1. Open Chrome/Edge
2. Go to [http://localhost:3000](http://localhost:3000)
3. Click the install icon in the address bar
4. App will be installed as a desktop app

### On Mobile

1. Make sure your phone and computer are on the same network
2. Find your computer's local IP (e.g., 192.168.1.100)
3. On your phone, go to `http://YOUR_IP:3000`
4. In Safari (iOS) or Chrome (Android), tap "Add to Home Screen"

**Note**: For camera access (QR scanning), you need HTTPS. On localhost, it works automatically.

## 🧪 Testing Features

### What Works Now

- ✅ Landing page
- ✅ Phone SMS registration
- ✅ Phone SMS login
- ✅ Onboarding flow
- ✅ Profile page
- ✅ QR code generation
- ✅ QR code scanning (needs HTTPS or localhost)
- ✅ Settings page
- ✅ PWA installation
- ✅ Offline mode

### What Needs Implementation

- ⏳ Social feed (posts, stories, shorts)
- ⏳ Park notes & spots
- ⏳ Ride requests & offers
- ⏳ Marketplace
- ⏳ Notifications
- ⏳ VIP QR features
- ⏳ Chat system

## 🐛 Troubleshooting

### "Module not found" errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Supabase connection errors

- Check your `.env.local` file
- Make sure you copied the correct keys
- Restart the dev server

### Phone SMS not working

- Check if Phone auth is enabled in Supabase
- For testing, use Supabase's built-in SMS (limited)
- For production, configure Twilio

### QR scanner not working

- Camera access requires HTTPS or localhost
- Check browser permissions
- Try on a different browser

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📚 Next Steps

1. **Read the Documentation**
   - `README.md` - Project overview
   - `IMPLEMENTATION_GUIDE.md` - Feature implementation
   - `DEVELOPMENT_NOTES.md` - Development tips

2. **Explore the Code**
   - Check out `app/` for pages
   - Look at `components/` for UI components
   - Review `lib/` for utilities

3. **Start Building**
   - Pick a feature from `IMPLEMENTATION_GUIDE.md`
   - Follow the implementation steps
   - Test thoroughly

## 💡 Tips

- Use **VS Code** with these extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript

- Enable **hot reload** for faster development

- Use **React DevTools** for debugging

- Check **browser console** for errors

- Use **Supabase Studio** to view database

## 🎯 Development Workflow

```bash
# 1. Start dev server
npm run dev

# 2. Make changes to code

# 3. Check browser (auto-refreshes)

# 4. Check for errors in terminal

# 5. Test in browser

# 6. Commit changes
git add .
git commit -m "Add feature X"
```

## 📞 Need Help?

- Check `DEVELOPMENT_NOTES.md` for common issues
- Review `IMPLEMENTATION_GUIDE.md` for feature guides
- Check Supabase logs for backend errors
- Check browser console for frontend errors

## 🎉 Success!

If you can see the landing page and register a new account, you're all set! 

Start building amazing features! 🚀

---

**Happy Coding!** 💻✨
