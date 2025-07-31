# 🍳 AI Recipes App

An intelligent recipe discovery app that turns your leftover ingredients into delicious meals using AI-powered recipe generation.

## ✨ Features

### 🎯 **Core Features**
- **AI-Powered Recipe Generation** - Generate personalized recipes from your available ingredients
- **Smart Ingredient Analysis** - AI analyzes your ingredients and suggests optimal recipes
- **Dietary Preferences** - Support for various dietary restrictions (vegetarian, vegan, gluten-free, etc.)
- **Waste Reduction** - Minimize food waste by using ingredients you already have

### 📱 **User Experience**
- **Add Ingredients** - Easy ingredient input with autocomplete and tags
- **Recipe Discovery** - Browse AI-generated recipes with detailed instructions
- **Cooking Mode** - Step-by-step cooking instructions with timers
- **Recipe Collections** - Organize recipes into custom collections
- **Favorites System** - Save and manage your favorite recipes
- **PDF Export** - Download recipes as PDF for offline use

### 🤖 **AI Enhancements**
- **Ingredient Substitutions** - AI suggests alternatives for missing ingredients
- **Recipe Scaling** - Automatically adjust recipe quantities
- **Nutritional Analysis** - Get detailed nutrition information
- **Dietary Modifications** - AI adapts recipes to dietary preferences

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Beautiful transitions and micro-interactions
- **Dark/Light Mode** - Adaptive theme support
- **Accessibility** - WCAG compliant design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Google Gemini API key (free)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-recipes-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Gemini API Configuration
GEMINI_API_KEY=your_actual_gemini_key_here
```

**To get your free Gemini API key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Replace `your_actual_gemini_key_here` with your real API key

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## 🎯 How to Use

### 1. **Add Ingredients**
- Navigate to `/add-ingredients`
- Type your available ingredients
- Select dietary preferences
- Click "Find Recipes"

### 2. **Discover Recipes**
- Browse AI-generated recipes
- Filter by cuisine, difficulty, or cooking time
- View detailed instructions and nutrition info

### 3. **Cook with Confidence**
- Use cooking mode for step-by-step guidance
- Set timers for each step
- Get ingredient substitutions if needed

### 4. **Organize & Save**
- Create custom recipe collections
- Save favorite recipes
- Download recipes as PDF

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **PDF Generation**: jsPDF + html2canvas

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── add-ingredients/    # Ingredient input page
│   ├── recipes/           # Recipe discovery page
│   ├── collections/       # Recipe collections
│   ├── favorites/         # Saved favorites
│   └── api/              # API routes
├── components/            # React components
│   ├── AddIngredient/     # Ingredient input components
│   ├── Recipes/          # Recipe display components
│   ├── Collections/      # Collection management
│   ├── Favorites/        # Favorites management
│   └── UI/              # Reusable UI components
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚨 Troubleshooting

### **"Gemini API key not configured"**
- Check your `.env.local` file
- Ensure the API key is correct
- Restart your development server

### **"Invalid API key"**
- Verify your API key from Google AI Studio
- Remove any extra spaces or characters

### **"Quota exceeded"**
- Gemini has a 60 requests/minute limit
- Wait a minute and try again
- The app includes fallback recipes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
