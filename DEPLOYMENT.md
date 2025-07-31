# 🚀 Deployment Guide

## Quick Deploy to Vercel

### 1. Prepare Your Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: AI Recipe App"

# Push to GitHub
git remote add origin https://github.com/yourusername/ai-recipes-app.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - Add `OPENAI_API_KEY` with your OpenAI API key
5. Click "Deploy"

### 3. Alternative: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Add environment variables in Site settings:
   - Add `OPENAI_API_KEY` with your OpenAI API key
5. Deploy!

## Environment Variables

### Required
- `OPENAI_API_KEY`: Your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### Optional
- `ANTHROPIC_API_KEY`: If you want to use Anthropic instead of OpenAI

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your_api_key_here" > .env.local
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### API Key Issues
- Ensure your API key is valid and has sufficient credits
- Check that the environment variable is set correctly
- Restart the development server after adding environment variables

### Build Errors
- Run `npm run build` to check for TypeScript errors
- Ensure all dependencies are installed: `npm install`

### Deployment Issues
- Check that environment variables are set in your deployment platform
- Verify the API key has the correct permissions
- Check deployment logs for error messages

## Performance Tips

### For Production
- Consider using a CDN for static assets
- Implement caching for API responses
- Use environment-specific API keys
- Monitor API usage and costs

### For Development
- Use `.env.local` for local environment variables
- Keep API keys secure and never commit them
- Test with different ingredient combinations
- Monitor console for errors

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Consider rate limiting for API calls
- Monitor API usage to control costs 