# VØID — Shopify Theme Files

## File Structure

```
shopify-theme/
├── sections/
│   └── void-landing.liquid    ← Main section (Liquid + Schema)
├── assets/
│   ├── void-landing.css       ← All styles
│   └── void-landing.js        ← All interactivity
└── README.md
```

---

## Installation (3 steps)

### 1. Upload asset files
In your Shopify Admin → **Online Store → Themes → Edit code**:
- Upload `void-landing.css` → into the **Assets** folder
- Upload `void-landing.js`  → into the **Assets** folder

### 2. Add the section
- In the same code editor, open the **Sections** folder
- Click **Add a new section** → name it `void-landing`
- Paste the entire contents of `void-landing.liquid`
- Save

### 3. Add to a page template
**Option A — Homepage:**
- Go to **Online Store → Customize**
- On the Homepage, click **Add section** → choose **VØID Landing Page**
- Configure settings in the sidebar

**Option B — Custom page template:**
- In the code editor, open `templates/`
- Create a new template: `page.void.json`
- Add the section reference:
```json
{
  "sections": {
    "main": {
      "type": "void-landing"
    }
  },
  "order": ["main"]
}
```
- Assign this template to your landing page in **Pages → Template**

---

## Theme Editor Settings

Once added, all content is editable via the Shopify Customizer sidebar:

| Setting | Description |
|---|---|
| Brand Name | Displayed in nav + footer |
| Hero Eyebrow | Small tag above title (e.g. "SS 2040") |
| Hero Title | Giant animated text |
| Hero Subtitle | Italic tagline |
| Background Video URL | Upload MP4 to Files, paste URL here |
| Hero Background Image | Fallback if no video |
| Primary / Ghost CTA | Button labels + URLs |
| Featured Collection | Auto-pulls first 3 products |
| Philosophy Statement | Large quote text |
| Stat 1–3 | Animated counter numbers + labels |
| Feature Label/Heading/Body | Innovation section copy |

---

## Adding Your Video

1. Go to **Settings → Files** in Shopify Admin
2. Upload your `.mp4` background video
3. Copy the CDN URL of the uploaded file
4. Paste it into **Hero → Background Video URL** in the Customizer

**Recommended video specs:**
- Format: MP4 (H.264)
- Resolution: 1920×1080 or 3840×2160
- Duration: 10–30 seconds looping
- File size: Under 20MB for fast load

---

## Connecting Your Navigation

The nav auto-pulls from your **Main Menu** (`main-menu` handle).
To customise: **Online Store → Navigation → Main menu**

---

## Customising Colors

All color tokens are CSS variables in `void-landing.css`:

```css
.void-landing-wrapper {
  --void-gold:        #c9a84c;  /* Primary accent */
  --void-gold-bright: #f0d080;  /* Highlights */
  --void-gold-dim:    #7a6030;  /* Subtle gold */
  --void-bg:          #03030a;  /* Page background */
  --void-deep:        #060612;  /* Section backgrounds */
  --void-surface:     #0d0d1f;  /* Card backgrounds */
  --void-text:        #e8e4d8;  /* Body text */
  --void-muted:       #6e6a60;  /* Secondary text */
}
```

Change any of these to match your brand palette.

---

## Notes

- All animations respect `prefers-reduced-motion`
- Cards automatically show placeholder silhouettes if no collection is assigned
- The section is self-contained — no external dependencies except Google Fonts
