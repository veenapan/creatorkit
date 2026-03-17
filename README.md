# CreatorKit — Instagram AI Tool Hub

## Project Structure

```
creatorkit/
├── index.html                    ← Homepage
├── pricing.html                  ← Pricing page (Free vs Pro)
├── vercel.json                   ← Vercel deployment config
├── css/
│   └── main.css                  ← All shared styles
├── js/
│   └── main.js                   ← Rate limiting, API calls, utilities
├── api/
│   └── generate.js               ← Vercel serverless function (Claude API)
└── tools/
    ├── caption-generator.html    ← Free tool
    ├── hashtag-generator.html    ← Free tool
    ├── content-ideas.html        ← Free tool
    ├── hook-writer.html          ← Free tool
    ├── post-analyzer.html        ← Free tool
    ├── engagement-calculator.html← Free tool (no AI, pure math)
    ├── brand-pitch.html          ← Pro tool
    └── carousel-writer.html      ← Pro tool
```

## Deploy to Vercel (5 minutes)

### Step 1 — Push to GitHub
```bash
cd creatorkit
git init
git add .
git commit -m "launch creatorkit"
```
Create a new repo at github.com/new, then:
```bash
git remote add origin https://github.com/YOURUSERNAME/creatorkit.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to vercel.com → New Project
2. Import your GitHub repo
3. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from console.anthropic.com
4. Click Deploy

### Step 3 — Set up Stripe for Pro
1. Create account at stripe.com
2. Create a Product: "CreatorKit Pro" — $15/month recurring
3. Create a Payment Link
4. Replace `YOUR_STRIPE_LINK` in `pricing.html` with your Stripe payment link
5. After payment, Stripe sends a receipt — the customer's email or Stripe customer ID serves as their Pro key

### Step 4 — Custom domain (optional)
Vercel dashboard → Settings → Domains → add your domain

## How the Pro gate works
- Free users get 3 uses/day per tool (tracked in localStorage)
- When a user pays via Stripe, they get a key (use their Stripe customer ID)
- User enters key on the pricing page — stored in localStorage
- Pro tools check `CreatorKit.isPro()` before showing content

## Costs
| Service | Cost |
|---------|------|
| Vercel hosting | $0 (free tier) |
| Domain | ~$12/year |
| Claude API (Haiku) | ~$0.001 per use |
| Stripe | 2.9% + 30¢ per transaction |

## Environment Variables
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```
