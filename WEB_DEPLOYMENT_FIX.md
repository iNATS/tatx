# Web Deployment Fix - Blank Page Issue

## Problem
After deployment, the Expo web app shows a blank page.

## Root Causes

1. **Missing dist directory** - The build process wasn't creating the `dist` folder properly
2. **Server starts before build** - The server was trying to serve files before the build completed
3. **Missing error handling** - No validation that the build succeeded before starting the server

## Fixes Applied

### 1. Updated `server.js`
- Added check for `dist` directory existence
- Server exits with error message if build didn't complete
- Added logging to show which directory is being served

### 2. Updated `nixpacks.toml`
- Changed start command from `npm run serve:web` to `node server.js`
- This ensures the server starts directly without npm overhead

### 3. Build Process
The build process now:
1. Runs `npm ci` to install dependencies
2. Runs `npm run build:web` which:
   - Exports the web app to `dist` folder
   - Runs RTL fix script
   - Copies PWA assets
3. Starts `node server.js` to serve the built files

## Deployment Commands

### Local Testing
```bash
# Build the web app
npm run build:web

# Serve the built app
npm run serve:web

# Or do both in one command
npm run web
```

### Production (Dokploy/VPS)
The deployment should automatically:
1. Install dependencies with `npm ci`
2. Build the web app with `npm run build:web`
3. Start the server with `node server.js`

## Troubleshooting

### Blank Page After Deployment

1. **Check build logs** - Look for any errors during `npm run build:web`
2. **Check server logs** - Look for "dist directory not found" error
3. **Verify dist folder** - SSH into server and check if `dist/index.html` exists

### Common Issues

#### Issue: "dist directory not found"
**Solution:** The build step failed. Check build logs for errors.

#### Issue: Blank white page
**Solution:** 
- Check browser console for JavaScript errors
- Verify the build completed successfully
- Check if `index.html` is being served correctly

#### Issue: 404 errors
**Solution:**
- Verify the server is running
- Check that the dist folder has all required files
- Ensure file permissions are correct

## File Structure After Build

```
tatx-app/
├── dist/                    # Built web app (created during build)
│   ├── index.html          # Main HTML file
│   ├── *.js                # JavaScript bundles
│   ├── *.css               # CSS styles
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   └── assets/             # Images and fonts
├── server.js               # Web server
├── nixpacks.toml          # Deployment configuration
└── package.json           # Dependencies and scripts
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Port to listen on |
| `HOST` | 0.0.0.0 | Host to bind to |
| `DIST_DIR` | dist | Directory containing built files |

## Testing Locally

```bash
# Clean build and serve
rm -rf dist
npm run build:web
npm run serve:web

# Visit http://localhost:3000
```

## Deployment Checklist

- [ ] `npm run build:web` completes without errors
- [ ] `dist/index.html` exists after build
- [ ] Server starts and logs "listening on..."
- [ ] Browser shows the app (not blank page)
- [ ] No console errors in browser
- [ ] RTL layout works correctly
- [ ] PWA features work (if applicable)
