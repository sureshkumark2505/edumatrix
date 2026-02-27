# EduMatrix AI - Vercel Deployment Guide

## 🚀 Deploy to Vercel (Frontend + Backend)

Vercel supports both your React frontend and Express backend!

## Prerequisites

1. **Create a Vercel account**: https://vercel.com/signup
2. **Install Vercel CLI** (optional but recommended):
   ```bash
   npm install -g vercel
   ```

---

## Option 1: Deploy via Vercel CLI (Fastest)

### Deploy Frontend

1. **Navigate to frontend folder**:
   ```bash
   cd e:\stuweb\edumatrix\frontend
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   - Login if prompted
   - Follow the setup prompts:
     - Set up and deploy: **Y**
     - Which scope: Choose your account
     - Link to existing project: **N**
     - Project name: `edumatrix-frontend` (or your choice)
     - In which directory is your code: **./** (current directory)
     - Want to override settings: **N**

3. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Deploy Backend

1. **Navigate to backend folder**:
   ```bash
   cd e:\stuweb\edumatrix\backend
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the same prompts
   - Project name: `edumatrix-backend`

3. **Deploy to production**:
   ```bash
   vercel --prod
   ```

4. **Note the backend URL** (e.g., `https://edumatrix-backend.vercel.app`)

### Update Frontend API URL

Update your frontend to use the deployed backend URL if needed.

---

## Option 2: Deploy via GitHub + Vercel Dashboard

### Setup

1. **Initialize Git** (if not already done):
   ```bash
   cd e:\stuweb\edumatrix
   git init
   git add .
   git commit -m "Initial commit for Vercel deployment"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Run:
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git branch -M main
   git push -u origin main
   ```

### Deploy Frontend

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

### Deploy Backend

1. Go to https://vercel.com/new again
2. Import the same repository
3. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`
4. Click "Deploy"

5. **Copy the backend URL** from Vercel dashboard

---

## Option 3: Monorepo Deployment (Advanced)

Deploy both frontend and backend from a single repository:

1. Create `vercel.json` in the root:
   ```json
   {
     "builds": [
       {
         "src": "frontend/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "frontend/dist"
         }
       },
       {
         "src": "backend/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "backend/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "frontend/dist/$1"
       }
     ]
   }
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

---

## Post-Deployment Configuration

### Environment Variables

If you need environment variables:

1. **Via CLI**:
   ```bash
   vercel env add VARIABLE_NAME
   ```

2. **Via Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add your variables

### For Frontend (Vite):
- Prefix variables with `VITE_`
- Example: `VITE_API_URL=https://your-backend.vercel.app`

### For Backend:
- Add as regular environment variables
- Example: `PORT`, `DATABASE_URL`, `JWT_SECRET`

---

## Update API Endpoint in Frontend

After deploying the backend, update your frontend to use the production API:

1. Create `.env.production` in frontend folder:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

2. Update API calls to use:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

---

## Testing Your Deployment

### Frontend:
- Visit your Vercel URL (e.g., `https://edumatrix-frontend.vercel.app`)
- Test all routes and navigation
- Check browser console for errors

### Backend:
- Test API endpoints:
  ```bash
  curl https://your-backend.vercel.app/api/dashboard/stats
  ```

---

## Automatic Deployments

Once connected to GitHub:
- **Push to main branch** → Auto-deploy to production
- **Push to other branches** → Auto-deploy to preview URLs
- **Pull requests** → Get preview deployments

---

## Domain Configuration

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel provides free SSL certificates

---

## Vercel CLI Commands Reference

```bash
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel ls                # List deployments
vercel logs             # View logs
vercel env ls           # List environment variables
vercel inspect URL      # Inspect deployment
vercel --help           # Show all commands
```

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### Backend API Not Working
- Check function logs in Vercel dashboard
- Verify `vercel.json` configuration
- Test locally before deploying

### Routes Return 404
- Verify `vercel.json` rewrites configuration
- Check that `dist` folder contains `index.html`

### CORS Errors
- Update CORS configuration in backend `server.js`
- Add your Vercel frontend URL to allowed origins

---

## Performance Tips

1. **Enable Vercel Analytics**:
   - Go to Project → Analytics
   - Free for hobby projects

2. **Optimize Images**:
   - Use Vercel Image Optimization
   - Import and use `next/image` equivalent for Vite

3. **Enable Compression**:
   - Vercel automatically compresses responses
   - Ensure build output is optimized

---

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Node.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)

---

## Quick Deploy Commands

```bash
# Deploy everything in one go
cd e:\stuweb\edumatrix\frontend
vercel --prod

cd e:\stuweb\edumatrix\backend
vercel --prod
```

Your app will be live in seconds! 🎉
