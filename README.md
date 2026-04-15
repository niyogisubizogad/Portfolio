# Gad's Portfolio - Modern Social Feed with AI Messaging

A premium, responsive portfolio website featuring a social feed interface with integrated AI-powered messaging. Built with Vue.js, featuring dark/light theme support, real-time messaging, and an intelligent auto-reply system powered by Hugging Face.

## 🌟 Features

- **Modern UI Design**
  - Premium dark theme with ambient gradients
  - Light theme support for better accessibility
  - Glass panels with backdrop blur effects
  - Smooth animations and transitions
  - Responsive design for all devices

- **AI-Powered Messaging**
  - Integrated Gad AI assistant for auto-replies
  - Built with Hugging Face Inference API
  - Smart conversation system with real-time responses
  - Loading spinner animations

- **Portfolio Sections**
  - **Home:** Social feed interface with stories and posts
  - **About:** Professional profile and CV information
  - **Projects:** Showcase of recent work with technology stack
  - **Skills:** Technical skills with progress bars and tools
  - **Contact:** Contact form and social media links

- **Theme System**
  - Toggle between dark and light themes
  - Theme preference saved in localStorage
  - Seamless transition between themes
  - Optimized colors for each theme

- **Social Integration**
  - GitHub, LinkedIn, Facebook, Instagram, YouTube, TikTok
  - WhatsApp and direct contact options
  - Easy-to-customize social links

## 🛠️ Technologies Used

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Bootstrap 5** - Responsive grid system (navbar)
- **Font Awesome** - Icon library

### Backend (Development)
- **Node.js** - JavaScript runtime
- **Express.js** - Dev server middleware (via Vue CLI)

### AI & APIs
- **Hugging Face Inference API** - AI model hosting and inference
- **Qwen/Qwen2.5-7B-Instruct** - Language model for auto-replies

### Build Tools
- **Vue CLI** - Build and development server
- **Webpack** - Module bundler
- **Babel** - JavaScript transpiler

## 📋 Requirements

- **Node.js** >= 14.x
- **npm** >= 6.x
- **Hugging Face API Key** (for AI features)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or download the project
cd portfolio

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Add your Hugging Face API key:

```
HF_API_KEY=your_hugging_face_api_key_here
HF_MODEL=Qwen/Qwen2.5-7B-Instruct:fastest
```

**How to get a Hugging Face API Key:**
1. Go to [huggingface.co](https://huggingface.co/)
2. Sign up or log in
3. Navigate to Settings → Access Tokens
4. Create a new token with `read` access
5. Copy the token and paste it in `.env`

### 3. Development Server

```bash
# Start development server with hot-reload
npm run serve
```

The app will be available at `http://localhost:8080`

### 4. Production Build

```bash
# Build for production
npm run build
```

This creates an optimized build in the `dist/` directory.

### 5. Code Quality

```bash
# Lint and fix files
npm run lint
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── pic.jpg         # Profile picture
│   │   └── logo.png        # Logo
│   ├── views/
│   │   ├── Home.vue        # Social feed with stories & posts
│   │   ├── About.vue       # Profile and CV information
│   │   ├── Projects.vue    # Project showcase
│   │   ├── Skills.vue      # Technical skills and tools
│   │   └── Contact.vue     # Contact form and social links
│   ├── App.vue             # Root component with navigation
│   ├── main.js             # Application entry point
│   └── router.js           # Vue Router configuration
├── .env                    # Environment variables (create this)
├── .env.example            # Example environment variables
├── vue.config.js           # Vue CLI configuration with AI middleware
├── package.json            # Project dependencies
├── babel.config.js         # Babel configuration
└── README.md               # This file
```

## 🤖 AI Auto-Reply Feature

The portfolio includes an intelligent auto-reply system that uses Hugging Face's Qwen model to generate helpful responses.

### How It Works

1. User sends a message in the Messages panel
2. Message is sent to `/api/auto-reply` endpoint
3. Vue CLI dev server processes the request with AI
4. Gad AI generates a response using Hugging Face API
5. Response is displayed with a typing animation

### Example Message Flow

```
User: "Hey, how are you?"
↓
[Gad AI is typing...]
↓
Gad AI: "Hey! I'm doing great, thanks for asking! How can I help you today?"
```

### Customizing AI Behavior

Edit the system prompt in `vue.config.js` (line ~75):

```javascript
{
  role: 'system',
  content: 'You are Gad AI, an intelligent assistant built by Gad NiYOGiSUBiZO. ...'
}
```

## 🎨 Theme System

The portfolio supports both dark and light themes with a toggle button in the navbar.

### Switching Themes

Click the **sun/moon icon** (☀️/🌙) in the top navigation bar to toggle themes.

### Theme Preferences

- Automatically detected from system preferences
- Saved to browser's localStorage
- Persists across sessions

### Customizing Colors

Edit CSS variables in `src/App.vue`:

**Light Theme:**
```css
:root {
  --primary-color: #38bdf8;        /* Cyan */
  --text-color: #1e293b;           /* Dark blue-gray */
  --background-color: #f8fafc;     /* Light gray */
}
```

**Dark Theme:**
```css
[data-theme="dark"] {
  --primary-color: #38bdf8;        /* Cyan */
  --text-color: #e2e8f0;           /* Light gray */
  --background-color: #020617;     /* Dark blue */
}
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- **Desktop:** 1200px and above
- **Tablet:** 768px - 1199px
- **Mobile:** Below 768px

All pages and components adapt seamlessly to different screen sizes.

## 🔧 Configuration

### Customizing Content

**Personal Information:**
- Edit component data in respective Vue files
- Update profile picture in `src/assets/`
- Modify social links in component data

**Colors & Styling:**
- Global colors in `src/App.vue`
- Page-specific styles in component `<style>` blocks
- Responsive breakpoints in media queries

### Environment Variables

```env
# Hugging Face Configuration
HF_API_KEY=your_api_key_here
HF_MODEL=Qwen/Qwen2.5-7B-Instruct:fastest
```

## 📚 Page Details

### Home Page
- Social feed interface with iPhone mockup
- Stories carousel with company logos
- Post cards with project information
- Direct messaging overlay

### About Page
- Professional bio
- Personal information cards
- Experience timeline
- Expandable CV section

### Projects Page
- Project cards with preview images
- Technology stack badges
- GitHub and demo links
- Hover overlay effects

### Skills Page
- Skill categories with progress bars
- Tools and technologies grid
- Visual skill assessment
- Icon-based tool showcase

### Contact Page
- Contact form with validation
- Contact information display
- Social media links
- Direct WhatsApp integration

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is personal portfolio software. All rights reserved.

## 👨‍💻 Author

**Gad NiYOGiSUBiZO**
- Frontend Developer
- Location: Kigali, Rwanda
- Email: offgad200@gmail.com
- Phone: +250 785 662 308

### Social Links
- GitHub: [Gad-off](https://github.com/Gad-off)
- WhatsApp: [Chat on WhatsApp](https://wa.me/250785662308)
- Facebook: [Profile](https://www.facebook.com/profile.php?id=100092313189365)
- Instagram: [Gad](https://www.instagram.com/true_p.ath/)
- YouTube: [@GadEditor](https://www.youtube.com/@niyogisubizogad)
- TikTok: [@gadeditor](https://www.tiktok.com/@gadeditor)

## 🐛 Troubleshooting

### AI Auto-Reply Not Working

**Problem:** Messages send but no AI response
- ✓ Check `.env` file exists with `HF_API_KEY`
- ✓ Verify API key is valid on Hugging Face
- ✓ Restart dev server after env changes
- ✓ Check browser console for errors

### Light Theme Text Not Visible

**Problem:** Text appears as dark on dark background
- ✓ Hard-refresh browser (Ctrl+Shift+R)
- ✓ Clear browser cache and localStorage
- ✓ Check that `[data-theme="light"]` CSS is loaded

### Build Errors

**Problem:** npm run build fails
- ✓ Delete `node_modules` folder
- ✓ Run `npm install` again
- ✓ Clear npm cache: `npm cache clean --force`

### Port Already in Use

**Problem:** "Port 8080 already in use"
```bash
# Use a different port
npm run serve -- --port 3000
```

## 📖 Additional Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router Guide](https://router.vuejs.org/)
- [Hugging Face API Docs](https://huggingface.co/docs/api-inference)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

## 🚀 Future Enhancements

- [ ] Backend database integration
- [ ] Email form submission
- [ ] Blog section
- [ ] Project filtering and search
- [ ] Dark mode animations
- [ ] Internationalization (i18n)
- [ ] Progressive Web App (PWA)
- [ ] Analytics integration

## 📞 Support

For issues, questions, or feature requests:
- Email: offgad200@gmail.com
- WhatsApp: +250 785 662 308
- GitHub Issues: (if repository is public)

---

**Made with ❤️ by Gad NiYOGiSUBiZO**
