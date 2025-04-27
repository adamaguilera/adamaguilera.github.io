# Adam Aguilera Personal Website

This is a static personal website built with pure HTML, CSS, and JavaScript. It is designed to be deployed on GitHub Pages and requires no build step or dependencies.

## Local Preview

To view the website locally:

1. Open the `public/index.html` file directly in your web browser.
   - Or, for best results (especially with images), run a simple local server:

   ```sh
   cd public
   python3 -m http.server 8000
   ```

2. Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Deploying to GitHub Pages

1. Move all files from the `public` directory to the root of your `gh-pages` branch (or set GitHub Pages to serve from `/public`).
2. Push to GitHub.
3. In your repository settings, set GitHub Pages to serve from the correct branch/folder.

## Features
- No frameworks or dependencies
- Responsive, clean design
- Easy to maintain and update 