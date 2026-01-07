# Namecheap Hosting Guide for Next.js Project

## Important Note About Next.js Hosting

**Next.js applications require Node.js runtime**, which traditional shared hosting typically doesn't support. You have three options:

1. **Option A (Recommended)**: Use Namecheap for DNS only, host on Vercel/Netlify (free tier available)
2. **Option B**: Convert to static export and use Namecheap shared hosting
3. **Option C**: Use Namecheap VPS (if you have VPS hosting, not shared hosting)

---

## Step 1: Determine Your Hosting Type

### Check Your Namecheap Account

1. Log into your Namecheap account
2. Go to **Hosting List** → Check your hosting plan type:
   - **Shared Hosting**: Usually cPanel-based, limited to PHP/static files
   - **VPS Hosting**: Full server access, can install Node.js
   - **Dedicated Server**: Full control

---

## OPTION A: Recommended - Namecheap DNS + Vercel Hosting (Best for Next.js)

This is the **recommended approach** for Next.js applications.

### A1. Deploy to Vercel

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Sign up for Vercel** (free tier available):
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import your project**:
   - Click "Add New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

4. **Configure Environment Variables**:
   - In Vercel project settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - You'll get a URL like: `your-project.vercel.app`

### A2. Connect Your Namecheap Domain to Vercel

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add your domain (e.g., `yourdomain.com` and `www.yourdomain.com`)

2. **In Namecheap**:
   - Go to **Domain List** → Click **Manage** next to your domain
   - Go to **Advanced DNS** tab
   - Add/Update these records:
     ```
     Type: A Record
     Host: @
     Value: 76.76.21.21
     TTL: Automatic
     
     Type: CNAME Record
     Host: www
     Value: cname.vercel-dns.com
     TTL: Automatic
     ```
   - **OR** use Vercel's nameservers (easier):
     - In Namecheap: Change nameservers to:
       - `ns1.vercel-dns.com`
       - `ns2.vercel-dns.com`

3. **Wait for DNS propagation** (can take 24-48 hours, usually faster)

---

## OPTION B: Static Export + Namecheap Shared Hosting

If you must use Namecheap shared hosting, convert your Next.js app to static export.

### B1. Configure Static Export

1. **Update `next.config.ts`**:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true, // Required for static export
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.unsplash.com',
           port: '',
           pathname: '/**',
         },
         {
           protocol: 'https',
           hostname: 'qvjvvzuclpdfbfqbgyhf.supabase.co',
           port: '',
           pathname: '/**',
         },
       ],
     },
   };

   export default nextConfig;
   ```

2. **Build static export**:
   ```bash
   npm run build
   ```
   This creates a `out/` folder with static files.

### B2. Upload to Namecheap via FTP/cPanel

1. **Get FTP credentials from Namecheap**:
   - Log into Namecheap → Hosting List → Manage
   - Find FTP credentials (usually in cPanel)

2. **Upload files**:
   - Use FTP client (FileZilla, Cyberduck) or cPanel File Manager
   - Upload **all contents** of the `out/` folder to `public_html/` directory
   - Ensure `index.html` is in the root of `public_html/`

3. **Set environment variables** (if needed):
   - Since these are build-time variables, they're already baked into the static files
   - No server-side configuration needed

### B3. Configure Domain

1. In Namecheap cPanel:
   - Go to **Addon Domains** or **Parked Domains**
   - Add your domain pointing to `public_html/`

---

## OPTION C: Namecheap VPS Hosting (Node.js)

If you have VPS hosting, you can run Next.js directly.

### C1. Connect to Your VPS

1. **SSH into your server**:
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

2. **Install Node.js** (if not installed):
   ```bash
   # Using NodeSource repository (for Node.js 20)
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Verify installation
   node --version
   npm --version
   ```

3. **Install PM2** (process manager):
   ```bash
   sudo npm install -g pm2
   ```

### C2. Upload Your Project

1. **Option 1: Git Clone** (recommended):
   ```bash
   cd /var/www
   git clone YOUR_GITHUB_REPO_URL cpe-website
   cd cpe-website
   npm install
   ```

2. **Option 2: FTP/SFTP Upload**:
   - Upload project files to `/var/www/cpe-website/`
   - SSH in and run:
     ```bash
     cd /var/www/cpe-website
     npm install
     ```

### C3. Configure Environment Variables

1. **Create `.env.production` file**:
   ```bash
   cd /var/www/cpe-website
   nano .env.production
   ```
   
2. **Add your variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   NODE_ENV=production
   ```

3. **Save and exit** (Ctrl+X, Y, Enter)

### C4. Build and Start Application

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start with PM2**:
   ```bash
   pm2 start npm --name "cpe-website" -- start
   pm2 save
   pm2 startup
   ```

3. **Verify it's running**:
   ```bash
   pm2 status
   pm2 logs cpe-website
   ```

### C5. Configure Nginx (Reverse Proxy)

1. **Install Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

2. **Create Nginx configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/cpe-website
   ```

3. **Add this configuration**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/cpe-website /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### C6. Configure SSL (HTTPS) with Let's Encrypt

1. **Install Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Get SSL certificate**:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Auto-renewal is set up automatically**

### C7. Configure Firewall

1. **Allow HTTP/HTTPS**:
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw allow OpenSSH
   sudo ufw enable
   ```

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify Supabase connection works
- [ ] Test contact form submission
- [ ] Test admin login (if applicable)
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test all navigation links
- [ ] Check SSL certificate (if using HTTPS)
- [ ] Set up monitoring (optional)

---

## Troubleshooting

### Static Export Issues
- If images don't load: Ensure `images.unoptimized: true` in config
- If routes don't work: Check `.htaccess` file for proper routing

### VPS Issues
- **Port 3000 not accessible**: Check firewall rules
- **PM2 not starting**: Check logs with `pm2 logs`
- **Nginx 502 error**: Verify Next.js is running on port 3000

### DNS Issues
- **Domain not resolving**: Wait 24-48 hours for DNS propagation
- **Check DNS propagation**: Use [whatsmydns.net](https://www.whatsmydns.net)

---

## Recommendation

**For production Next.js applications, Option A (Vercel + Namecheap DNS) is strongly recommended** because:
- ✅ Zero server management
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ Free tier available
- ✅ Optimized for Next.js

You still use your Namecheap domain, just point it to Vercel's hosting.

---

## Need Help?

- Namecheap Support: [support.namecheap.com](https://support.namecheap.com)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)



