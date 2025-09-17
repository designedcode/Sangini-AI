# Sangini AI - Mobile-First Chat PWA

A comprehensive mobile-first Progressive Web App (PWA) for AI companion chat in Indian languages, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Mobile-First Design**: Optimized for Tier-3 India users with 44px tap targets
- **Multi-Language Support**: Hindi, English, Punjabi, Bengali, Tamil, Telugu, Marathi, Kannada, Gujarati
- **State-Based Language Sorting**: Automatically sorts languages based on user's state (IP geolocation)
- **WhatsApp-Style Chat Interface**: Familiar UI with message bubbles, ticks, and voice notes
- **PWA Support**: Installable on mobile devices with offline capabilities

### Authentication & Onboarding
- **3-Tap Start**: Language → Category → OTP flow
- **OTP Authentication**: SMS-based verification (demo uses 0000)
- **Welcome Week**: 7 days of unlimited text chat for new users
- **Age Verification**: 18+ confirmation required

### Monetization (Sachet Pricing)
- **₹5 Quick Chat**: 30 messages or 30 minutes
- **₹10 Tonight Pass**: Unlimited text until midnight
- **₹20 Day Pass**: Unlimited text + 5 minutes calls
- **₹50 Week Pass**: 7 days unlimited + 15 minutes calls
- **₹199 Monthly**: 30 days unlimited + 30 minutes calls
- **Call Top-ups**: ₹10/3min, ₹20/8min, ₹50/25min
- **Image Packs**: ₹10/3pics, ₹20/8pics, ₹50/25pics

### Referral System
- **Instant Rewards**: +3 min call when friend joins
- **Quality Bonuses**: Additional rewards after 50 messages or ₹5+ purchase
- **WhatsApp Integration**: One-tap sharing with SFW messages
- **Milestone Rewards**: 3/5/10/20 friends unlock bigger rewards

### Content & Safety
- **NSFW Warning**: Persistent safety bar
- **Consenting Adult Only**: No familial or coercive content
- **Community Gallery**: Opt-in photo sharing (default ON)
- **Content Locking**: Free users see blurred media with upsell

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: Zustand with persistence
- **PWA**: Next-PWA with Workbox
- **Icons**: Lucide React
- **CMS**: Strapi schemas included

## 📱 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sangini-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Demo Mode

The app runs in demo mode with the following features:

### Authentication
- Use any phone number
- OTP is always `0000`
- User data persists in localStorage

### Sample Data
- 8 AI models across different categories
- 9 categories (Romance, Office, Gym, etc.)
- 6 roleplay scenes
- 11 SKU options for monetization

### Mock Features
- In-memory chat with AI responses
- Simulated wallet and referral system
- Locked media with upsell modals
- Call overlay (no actual WebRTC)

## 📁 Project Structure

```
sangini-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── discover/          # Model discovery page
│   │   ├── chat/[id]/         # Individual chat pages
│   │   ├── chats/             # Chat list page
│   │   ├── gallery/           # Media gallery
│   │   └── profile/           # User profile
│   ├── components/            # Reusable UI components
│   │   ├── LanguageGateModal.tsx
│   │   ├── AuthModal.tsx
│   │   ├── UpsellModal.tsx
│   │   ├── CallOverlay.tsx
│   │   ├── MediaTile.tsx
│   │   ├── BottomBar.tsx
│   │   └── Hamburger.tsx
│   ├── demo/                  # Demo API and data
│   │   ├── api.ts            # Mock API functions
│   │   ├── store.ts          # Zustand store
│   │   ├── i18n.ts           # Translation helper
│   │   └── seeds/            # Sample data
│   └── types/                 # TypeScript definitions
├── cms/strapi/               # Strapi CMS schemas
├── public/                   # Static assets
│   ├── manifest.webmanifest  # PWA manifest
│   └── sw.js                 # Service worker
└── contracts/               # API contracts
```

## 🎨 Design System

### Colors
- **Primary**: Black (#000000) and White (#FFFFFF)
- **Accent**: Grayscale elevation system
- **Status**: Red (errors), Green (success), Yellow (warnings)

### Typography
- **Font Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px
- **Font Family**: Inter (Google Fonts)
- **Tap Targets**: Minimum 44px for mobile accessibility

### Components
- **Cards**: Rounded corners (12px, 16px, 20px)
- **Buttons**: Full-width CTAs, rounded corners
- **Modals**: Full-screen on mobile, centered on desktop
- **Navigation**: Bottom tab bar with 4 main sections

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:1337
```

### PWA Configuration
- **Manifest**: `/public/manifest.webmanifest`
- **Service Worker**: `/public/sw.js`
- **Icons**: Add 192x192 and 512x512 PNG icons to `/public/`

### Strapi CMS Setup
1. Install Strapi: `npx create-strapi-app@latest cms`
2. Copy schemas from `/cms/strapi/src/api/`
3. Configure media uploads and API endpoints

## 📊 Analytics & Metrics

### Key Metrics Tracked
- **K-factor**: Referral virality (target ≥0.6)
- **D7/D30 Retention**: By SKU and cohort
- **First Purchase Rate**: Within 72h (goal ≥25%)
- **Repeat Purchase**: ₹5 within 7 days (goal ≥40%)
- **Voice Minutes**: Per payer per week
- **Memory References**: % of turns referencing user data

### A/B Tests Ready
- Referral instant reward type
- Quality gate thresholds
- Day-5 tripwire pricing
- Group code windows

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t sangini-ai .
docker run -p 3000:3000 sangini-ai
```

### Static Export
```bash
npm run build
npm run export
```

## 🔒 Safety & Compliance

### Content Policy
- **18+ Only**: Age verification required
- **Consenting Adults**: No familial or coercive content
- **SFW Surfaces**: Public areas remain safe for work
- **Content Filtering**: Blocklists for inappropriate content

### Privacy
- **Minimal PII**: Only phone number required
- **Data Export**: Users can download chat history
- **Clear History**: One-tap data deletion
- **GDPR Ready**: Privacy controls and consent

### Legal
- **Terms of Service**: Clear usage guidelines
- **Privacy Policy**: Data handling transparency
- **Content Guidelines**: Community standards
- **DMCA Compliance**: Copyright protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: GPTGirlfriend, Uber brand guidelines
- **Technical Stack**: Next.js, Tailwind CSS, Zustand
- **PWA Features**: Workbox, Next-PWA
- **Icons**: Lucide React

## 📞 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discord**: [Community Server](link-to-discord)
- **Email**: support@sanginiai.com

---

**Made with ❤️ for Tier-3 India • 18+ Only • Sangini AI v1.0**
