# Resend Email Setup Guide

This guide will walk you through setting up Resend.com email integration for your contact form.

## Overview

When a user submits the contact form, the system will:
1. Save the message to your Supabase database (as before)
2. Send an email notification to your company email address using Resend

---

## Step-by-Step Setup Instructions

### Part 1: Resend.com Setup

#### Step 1: Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with your email address (you can use your company email: `fanartscompanylimited@gmail.com`)
4. Verify your email address by clicking the link in the confirmation email

#### Step 2: Get Your API Key
1. After logging in, navigate to **"API Keys"** in the left sidebar (or go to [https://resend.com/api-keys](https://resend.com/api-keys))
2. Click **"Create API Key"**
3. Give it a name (e.g., "CPE Website Contact Form")
4. Select the permissions:
   - ✅ **Send Emails** (required)
5. Click **"Add"**
6. **IMPORTANT**: Copy the API key immediately - it will only be shown once!
   - The key will look like: `re_123456789abcdefghijklmnopqrstuvwxyz`
   - Save it securely - you'll need it in the next steps

#### Step 3: Verify Your Domain (For Production - Optional but Recommended)
For production use, you should verify your domain to send emails from your own domain:

1. Go to **"Domains"** in the Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain name (e.g., `yourdomain.com`)
4. Follow the DNS configuration instructions:
   - Add the provided DNS records to your domain's DNS settings
   - Wait for DNS propagation (can take a few minutes to 24 hours)
5. Once verified, you can use emails like `noreply@yourdomain.com` as the "from" address

**Note**: For development/testing, you can skip this step and use the default `onboarding@resend.dev` email address.

---

### Part 2: Project Configuration

#### Step 4: Create Environment Variables File
1. In your project root directory (`/Users/hansonbambot/Documents/cpe-website`), create a file named `.env.local`
   - **Note**: This file is already in `.gitignore` and won't be committed to git

2. Add the following environment variables to `.env.local`:

```bash
# Resend Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here

# The email address that will receive contact form submissions
COMPANY_EMAIL=fanartscompanylimited@gmail.com

# The "from" email address for Resend
# For development: use onboarding@resend.dev
# For production: use an email from your verified domain (e.g., noreply@yourdomain.com)
RESEND_FROM_EMAIL=onboarding@resend.dev
```

3. Replace `re_your_actual_api_key_here` with the API key you copied from Resend in Step 2

#### Step 5: Update Environment Variables for Production
When deploying to production (Vercel, Netlify, etc.):

1. Go to your hosting platform's environment variables settings
2. Add the same three environment variables:
   - `RESEND_API_KEY`
   - `COMPANY_EMAIL`
   - `RESEND_FROM_EMAIL`

**For Vercel:**
- Go to your project → Settings → Environment Variables
- Add each variable for Production, Preview, and Development environments

**For Netlify:**
- Go to Site settings → Environment variables
- Add each variable

---

### Part 3: Testing

#### Step 6: Test the Integration
1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Navigate to your contact form page (usually `http://localhost:3000/contact`)

3. Fill out and submit the contact form with test data

4. Check:
   - ✅ The form should show a success message
   - ✅ Check your Supabase database - the message should be saved
   - ✅ Check your company email inbox (`fanartscompanylimited@gmail.com`) - you should receive an email

5. If you don't receive the email:
   - Check your spam/junk folder
   - Check the browser console for any errors
   - Check the server logs for error messages
   - Verify your `RESEND_API_KEY` is correct in `.env.local`

---

## Email Template

The email sent to your company will include:
- **Subject**: "New Contact Form Submission - [Project Type]" (if project type is selected)
- **From**: The email address you set in `RESEND_FROM_EMAIL`
- **Reply-To**: The user's email address (so you can reply directly)
- **Content**: A nicely formatted HTML email with all form fields:
  - Name
  - Email (clickable)
  - Company/Organization (if provided)
  - Phone Number (if provided, clickable)
  - Project Type (if selected)
  - Message
  - Submission timestamp

---

## Troubleshooting

### Email Not Sending
1. **Check API Key**: Verify `RESEND_API_KEY` is correct in `.env.local`
2. **Check Environment Variables**: Make sure the file is named `.env.local` (not `.env`)
3. **Restart Server**: After adding/changing environment variables, restart your Next.js dev server
4. **Check Resend Dashboard**: Go to Resend → Logs to see if emails were attempted and any error messages
5. **Check Console**: Look for error messages in your browser console and server logs

### "Invalid API Key" Error
- Make sure you copied the entire API key (it starts with `re_`)
- Verify there are no extra spaces or line breaks
- Regenerate the API key in Resend if needed

### "Domain Not Verified" Error
- If using a custom domain email, make sure the domain is verified in Resend
- For development, use `onboarding@resend.dev` as `RESEND_FROM_EMAIL`

### Emails Going to Spam
- Verify your domain in Resend (recommended for production)
- Use a professional "from" email address
- Consider setting up SPF, DKIM, and DMARC records (Resend provides these)

---

## Production Checklist

Before going live:
- [ ] Verify your domain in Resend
- [ ] Update `RESEND_FROM_EMAIL` to use your verified domain (e.g., `noreply@yourdomain.com`)
- [ ] Set environment variables in your production hosting platform
- [ ] Test the contact form in production
- [ ] Verify emails are being received
- [ ] Set up email monitoring/alerts if needed

---

## Cost Information

Resend offers:
- **Free Tier**: 3,000 emails/month, 100 emails/day
- **Paid Plans**: Start at $20/month for higher limits

For most websites, the free tier is sufficient. Monitor your usage in the Resend dashboard.

---

## Security Notes

- ✅ Never commit `.env.local` to git (it's already in `.gitignore`)
- ✅ Never share your API key publicly
- ✅ Rotate your API key if it's ever exposed
- ✅ Use different API keys for development and production if possible

---

## Support

- **Resend Documentation**: [https://resend.com/docs](https://resend.com/docs)
- **Resend Support**: [https://resend.com/support](https://resend.com/support)
- **Resend Status**: [https://status.resend.com](https://status.resend.com)

---

## Summary

After completing these steps:
1. ✅ Resend account created
2. ✅ API key obtained and added to `.env.local`
3. ✅ Environment variables configured
4. ✅ Contact form sends emails to your company inbox
5. ✅ Messages still saved to Supabase database

Your contact form is now fully integrated with email notifications! 🎉

