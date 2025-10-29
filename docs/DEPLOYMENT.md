# Deployment Guide - BetterCV Resume Builder

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Done! Your site is live

#### Custom Domain (Optional)
- Go to your project settings in Vercel
- Navigate to "Domains"
- Add your custom domain
- Follow DNS configuration instructions

### Option 2: Netlify

#### Steps:
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repository

#### Build Settings:
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### Option 3: Self-Hosted (VPS/Cloud)

#### Requirements:
- Node.js 16+ installed
- PM2 or similar process manager
- Nginx (optional, for reverse proxy)

#### Steps:

1. **Clone repository on server**
   ```bash
   git clone YOUR_REPO_URL
   cd futuristic-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "bettercv" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 4: Docker

#### Dockerfile:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build and Run:
```bash
docker build -t bettercv .
docker run -p 3000:3000 bettercv
```

## Environment Variables

Currently, this project doesn't require environment variables. If you add features like:
- Analytics
- Database connections
- API keys

Create a `.env.local` file:
```env
NEXT_PUBLIC_ANALYTICS_ID=your_id_here
```

## Performance Optimization

### Before Deployment:

1. **Optimize Images**
   - Use Next.js Image component for any images
   - Compress images before adding to project

2. **Enable Compression**
   - Vercel/Netlify handle this automatically
   - For self-hosted, enable gzip in Nginx

3. **Set Cache Headers**
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/:all*(svg|jpg|png)',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=31536000, immutable',
             },
           ],
         },
       ];
     },
   };
   ```

## Post-Deployment Checklist

- [ ] Test all pages (/, /select, /editor)
- [ ] Test PDF export functionality
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check page load speed (use Lighthouse)
- [ ] Verify SEO meta tags
- [ ] Test 404 page
- [ ] Set up analytics (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate (automatic on Vercel/Netlify)

## Monitoring

### Vercel Analytics
- Enable in project settings
- View real-time performance metrics

### Google Analytics (Optional)
1. Create GA4 property
2. Add tracking code to `pages/_app.js`
3. Monitor user behavior

### Error Tracking (Optional)
Consider adding:
- Sentry for error tracking
- LogRocket for session replay

## Updating Your Deployment

### Vercel/Netlify (Auto-deploy)
- Push changes to GitHub
- Automatic deployment triggered
- Preview deployments for pull requests

### Self-Hosted
```bash
git pull origin main
npm install
npm run build
pm2 restart bettercv
```

## Troubleshooting

### Build Fails
- Check Node.js version (16+)
- Clear `.next` folder and rebuild
- Check for missing dependencies

### PDF Export Not Working
- Ensure html2canvas and jspdf are installed
- Check browser console for errors
- Verify CORS settings if using external images

### Slow Performance
- Enable production mode
- Check bundle size with `npm run build`
- Optimize images and assets
- Enable CDN (automatic on Vercel/Netlify)

## Security Considerations

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

2. **Set Security Headers**
   ```javascript
   // next.config.js
   async headers() {
     return [
       {
         source: '/:path*',
         headers: [
           {
             key: 'X-Frame-Options',
             value: 'DENY',
           },
           {
             key: 'X-Content-Type-Options',
             value: 'nosniff',
           },
         ],
       },
     ];
   }
   ```

3. **Use HTTPS**
   - Automatic on Vercel/Netlify
   - Use Let's Encrypt for self-hosted

## Cost Estimates

### Vercel (Recommended)
- **Free Tier**: Perfect for this project
- **Pro**: $20/month (if you need more)

### Netlify
- **Free Tier**: 100GB bandwidth/month
- **Pro**: $19/month

### Self-Hosted
- **VPS**: $5-20/month (DigitalOcean, Linode)
- **Domain**: $10-15/year

## Support

For deployment issues:
1. Check the platform's documentation
2. Review build logs
3. Test locally first with `npm run build && npm start`
4. Open an issue on GitHub

---

Good luck with your deployment! 🚀
