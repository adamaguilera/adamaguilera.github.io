# Adam Aguilera Personal Website

My personal website built with pure HTML, CSS, and JavaScript. It is designed to be deployed on GitHub Pages and requires no build step or dependencies.

## Technology Stack
- HTML5 for structure
- CSS3 for styling
- Vanilla JavaScript for interactivity
- GitHub Pages for hosting
- Custom domain: adamaguilera.com

## Local Development

### Prerequisites
- A modern web browser
- Python 3 (optional, for local server)

### Running Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/adamaguilera/adamaguilera.github.io.git
   cd adamaguilera.github.io
   ```

2. Open the `index.html` file directly in your web browser.
   - Or, for best results (especially with images), run a simple local server:
   ```sh
   python3 -m http.server 8000
   ```
   Then visit [http://localhost:8000](http://localhost:8000) in your browser.

## Making Changes

### File Structure
- `index.html` - Main website content
- `style.css` - All styling and animations
- `images/` - Directory containing all website images
- `.github/workflows/static.yml` - GitHub Actions workflow for deployment

### Development Workflow
1. Make changes to the HTML, CSS, or JavaScript files
2. Test changes locally using the methods described above
3. Commit and push changes to the main branch:
   ```sh
   git add .
   git commit -m "Description of changes"
   git push
   ```

## Deployment

The website is automatically deployed through GitHub Actions whenever changes are pushed to the main branch. The deployment process:
1. Builds the static site
2. Deploys to GitHub Pages
3. Updates both adamaguilera.github.io and adamaguilera.com

### Deployment Status
You can monitor the deployment status by:
1. Going to the "Actions" tab in your GitHub repository
2. Looking for the "Deploy static content to Pages" workflow

## Custom Domain
The website is accessible at:
- https://adamaguilera.com (primary)
- https://adamaguilera.github.io (fallback)

The custom domain is configured through:
- `CNAME` file in the repository
- DNS settings with your domain registrar
- GitHub Pages settings

## Troubleshooting
- If changes aren't appearing, check the GitHub Actions workflow status
- For local testing issues, ensure you're using a modern browser
- If images aren't loading locally, use the Python server method
- For domain issues, verify DNS settings and GitHub Pages configuration
