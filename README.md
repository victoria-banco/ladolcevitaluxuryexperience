# La Dolce Vita Luxury Experience — Website

Italy's most exclusive luxury concierge. Private after-hours museum access, Michelin-starred dining, Milan Fashion Week front row, master artisan ateliers.

## Project structure

```
ldv-site/
├── index.html          ← all pages (SPA routing)
├── styles.css          ← all styles
├── script.js           ← all JavaScript
├── images/             ← all photos, logos, video
├── robots.txt
├── CNAME               ← custom domain config
└── README.md
```

## Local development

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

## Contact form setup (Formspree)

1. Go to [formspree.io](https://formspree.io) → sign up free
2. Click **New Form** → enter `info@ladolcevitaluxuryexperience.com`
3. Copy your **Form ID** (8-character code)
4. Open `script.js` and replace `YOUR_FORMSPREE_ID` with it
5. Commit and push

## Deploy to GitHub Pages

1. Create a new repo on [github.com](https://github.com/new)  
   Name it: `ladolcevitaluxuryexperience` (or `your-username.github.io` for root URL)
2. Push this folder:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Custom domain (ladolcevitaluxuryexperience.com)

1. The `CNAME` file is already configured with your domain
2. In GitHub Pages settings, enter `www.ladolcevitaluxuryexperience.com`
3. At your domain registrar (wherever you bought the domain), add:
   - **CNAME record**: `www` → `YOUR_USERNAME.github.io`
   - **A records** (for root domain):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Enable **Enforce HTTPS** in GitHub Pages settings
5. DNS propagates in 24–48 hours
