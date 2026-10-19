# Mirys Cleanings — static website

A responsive, lightweight, no-framework site suitable for **GitHub Pages**. Uses the two supplied brand images. No build process or npm dependencies.

## Preview locally
Open `index.html` in a browser, or from the project folder run `python3 -m http.server 8000` and open `http://localhost:8000`.

## Important: configure quote requests
Edit `script.js` and set `BUSINESS_EMAIL` to your cleaning business inbox.

The existing form intentionally uses the customer's own **email application** to compose a request, at zero cost and without a backend. It does **not** silently send or save requests. The visitor must press **Send** in their mail app. For mobile users with configured mail apps, this is easy; for users without one, consider replacing it with a hosted form service (Formspree, Getform, etc.), which may have free-tier limits and separate data/privacy responsibilities. No working inbox was provided, so quote submission is **not activated** until configured.

## Publish using GitHub Pages
1. Create a public repository and upload all files preserving `assets/` folder.
2. In GitHub repository **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)` and save.
3. Open the URL GitHub provides and test all navigation and the form on desktop and mobile.
4. When ready for a custom domain, configure it in **Settings → Pages → Custom domain** and follow GitHub's current DNS instructions for your domain provider. Enable **Enforce HTTPS** when available.

## Photos and licensing
- The two supplied logo files are local assets in `assets/`.
- The three service-card background photographs are currently loaded by URL from Unsplash's image CDN (not downloaded), to keep the repository small. Their photo IDs are in `styles.css` (`.office-photo`, `.construction-photo`, `.custom-photo`). These photos have not been verified individually; before publishing commercially, confirm each individual photo's license and rights, and ideally download a compressed local copy to `assets/` and update those CSS references. Unsplash free-license terms: https://unsplash.com/license (free commercial usage for eligible Unsplash photos; extra rights for recognizable people/logos may still be needed).
- No client names, ratings, guarantees, address, phone numbers, or service area were invented. Update copy to match the actual business.

## Editing
- Colors are CSS variables at top of `styles.css`.
- Content and services are in `index.html`.
- Navigation and form behavior are in `script.js`.

No cookies, trackers, fonts fetched from third-party services, or analytics are included.
