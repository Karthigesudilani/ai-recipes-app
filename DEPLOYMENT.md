# 🚀 Deployment Guide

## Current Deployment Setup

This project is deployed on **Vercel** with automatic production deployments from the `main` branch.

### 🌐 **Live Application**
- **Production URL**: [https://ai-recipes-app.vercel.app](https://ai-recipes-app.vercel.app)
- **Deployment Platform**: Vercel
- **Branch**: `main` (production)
- **Auto-Deploy**: Enabled (deploys on every push to main)

## 🚀 Deployment Process

### **Automatic Deployment**
1. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel automatically detects changes to the `main` branch
   - Builds and deploys the application
   - Updates the production URL

### **Manual Deployment (if needed)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Deployments" tab
4. Click "Redeploy" on the latest deployment

## 🔧 Environment Variables

### **Required for Production**
- `GEMINI_API_KEY`: Your Google Gemini API key

### **Setting Environment Variables in Vercel**
1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add the following:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
   - **Environment**: Production (and Preview if needed)
4. Click "Save"

## 🛠️ Local Development

### **Prerequisites**
- Node.js 18+
- npm, yarn, pnpm, or bun

### **Setup Steps**
1. **Clone the repository:**
   ```bash
   git clone git clone git@github.com:Karthigesudilani/ai-recipes-app.git
   cd ai-recipes-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env.local file
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔍 Troubleshooting

### **Deployment Issues**
- **Build Failures**: Check Vercel build logs for TypeScript errors
- **Environment Variables**: Ensure `GEMINI_API_KEY` is set in Vercel
- **API Errors**: Verify your Gemini API key is valid and has sufficient quota

### **Local Development Issues**
- **API Key Not Found**: Check your `.env.local` file
- **Build Errors**: Run `npm run build` to check for errors
- **Dependencies**: Run `npm install` to ensure all packages are installed

### **Common Solutions**
- **Restart Development Server**: After adding environment variables
- **Clear Cache**: Delete `.next` folder and restart
- **Check API Quota**: Gemini has 60 requests/minute limit

## 📊 Monitoring

### **Vercel Analytics**
- **Performance**: Monitor Core Web Vitals
- **Usage**: Track API calls and response times
- **Errors**: Check for runtime errors in production

### **API Monitoring**
- **Gemini API**: Monitor quota usage and response times
- **Error Rates**: Track failed API calls
- **Cost Management**: Monitor API usage to control costs

## 🔒 Security Notes

- **Environment Variables**: Never commit API keys to version control
- **API Keys**: Use environment variables for all sensitive data
- **Rate Limiting**: Consider implementing rate limiting for API calls
- **Monitoring**: Regularly check for unauthorized API usage

## 🚀 Performance Optimization

### **Production Optimizations**
- **Static Assets**: Optimized images and fonts
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: Implemented caching strategies
- **CDN**: Vercel's global CDN for fast delivery

### **Development Tips**
- **Hot Reload**: Fast development with Next.js hot reload
- **TypeScript**: Catch errors early with type checking
- **ESLint**: Maintain code quality with linting
- **Prettier**: Consistent code formatting

## 📝 Deployment Checklist

Before pushing to main:
- [ ] All tests pass locally
- [ ] Environment variables are set in Vercel
- [ ] No console errors in development
- [ ] Build completes successfully (`npm run build`)
- [ ] Code is properly formatted and linted

## 🔄 Rollback Process

If deployment fails:
1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find the last working deployment
4. Click "Redeploy" on that deployment
5. Investigate the issue in a new branch 