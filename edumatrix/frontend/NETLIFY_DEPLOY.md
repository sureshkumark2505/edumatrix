# EduMatrix AI - Netlify Deployment Guide

## Quick Deploy to Netlify

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Navigate to the frontend directory**:
   ```bash
   cd e:\stuweb\edumatrix\frontend
   ```

4. **Build your project**:
   ```bash
   npm install
   npm run build
   ```

5. **Deploy to Netlify**:
   ```bash
   netlify deploy --prod
   ```

   - Follow the prompts
   - Select "Create & configure a new site"
   - Choose your team
   - Enter a site name (or leave blank for random)
   - Enter publish directory: `dist`

### Option 2: Deploy via Netlify Web UI

1. **Build your project locally**:
   ```bash
   cd e:\stuweb\edumatrix\frontend
   npm install
   npm run build
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Push your frontend folder to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Base directory**: (leave empty or set to `frontend` if deploying from root)
   - Click "Deploy site"

### Option 3: Drag & Drop Deploy

1. **Build your project**:
   ```bash
   cd e:\stuweb\edumatrix\frontend
   npm install
   npm run build
   ```

2. **Deploy**:
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop your `dist` folder
   - Your site will be live instantly!

## Configuration Files

The following files have been created for Netlify deployment:

- **netlify.toml**: Netlify build configuration
- **public/_redirects**: SPA routing configuration
- **.gitignore**: Git ignore rules

## Environment Variables (if needed)

If your app needs environment variables:

1. In Netlify dashboard, go to: Site settings → Environment variables
2. Add variables with `VITE_` prefix (e.g., `VITE_API_URL`)
3. In your code, access them via `import.meta.env.VITE_API_URL`

## Important Notes

### Backend Server
Your Express backend (`backend/server.js`) cannot run on Netlify's free tier as it only supports static sites. You have two options:

1. **Use Netlify Functions** (serverless):
   - Convert your Express routes to Netlify Functions
   - Place them in `netlify/functions/` directory

2. **Deploy backend separately**:
   - **Render**: https://render.com (free tier available)
   - **Railway**: https://railway.app
   - **Heroku**: https://heroku.com
   - **Vercel**: https://vercel.com

### Update API URLs
Once your backend is deployed, update the API base URL in your frontend code to point to the deployed backend URL.

## Testing Locally

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Troubleshooting

### Build Fails
- Ensure all dependencies are in `package.json`
- Check Node version compatibility
- Review build logs in Netlify dashboard

### Routes Don't Work
- Verify `_redirects` file is in the `public` folder
- Check `netlify.toml` redirects configuration

### Missing Assets
- Ensure assets are in `public` folder
- Check relative paths in your code

## Support

For more help, visit:
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
