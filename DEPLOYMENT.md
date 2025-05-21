# Deploying FuelFriendly Website to Vercel

This guide will help you deploy the FuelFriendly website with its new admin panel and access control features to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. Git installed on your local machine
3. Node.js and npm installed

## Deployment Steps

### Option 1: Deploy from the Vercel Dashboard

1. Log in to your Vercel account
2. Click on "New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Select the FuelFriendly repository
5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project directory:
   ```bash
   cd path/to/fuel-website
   ```

4. Deploy the project:
   ```bash
   vercel
   ```

5. Follow the prompts to configure your deployment

### Option 3: Use the Built-in Deploy Script

The project already includes a deploy script in package.json:

```bash
npm run deploy
```

This will build the project and deploy it to Vercel.

## Access Levels

The website now has multiple access levels:

1. **Level 1 (Basic Access)**: Can view stations, orders, and messages
2. **Level 2 (Extended Access)**: Can manage users, products, and view analytics
3. **Level 3 (Advanced Access)**: Can access system data, API management, and security settings
4. **Superior Admin**: Has full control over all system functions

## Superior Admin Access

To access the Superior Admin features:

1. Log in with any email and password
2. Select "Superior Admin" as the access level
3. Enter the access code: `FUEL-SUPERIOR-2023`

## Testing the Deployment

After deployment, you can test the different access levels:

1. Visit your deployed site
2. Click on "Login" in the navigation bar
3. Enter any email and password
4. Select an access level
5. For Superior Admin access, use the code: `FUEL-SUPERIOR-2023`

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel deployment logs
2. Ensure all dependencies are correctly installed
3. Verify that the build process completes successfully
4. Check that the routes are correctly configured in vercel.json

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
