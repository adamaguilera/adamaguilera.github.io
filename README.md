# Adam Aguilera Personal Website

A personal website and blog built with HTML, CSS, and JavaScript, hosted on GitHub Pages.

## Tech Stack

- HTML5 & CSS3 for structure and styling
- JavaScript for interactivity and dynamic content
- Marked.js for Markdown parsing
- GitHub Pages for hosting
- GitHub Actions for automated deployment

## Dependencies

- marked (^15.0.12) - For Markdown parsing

## Quick Start

1. Clone the repo:
   ```sh
   git clone https://github.com/adamaguilera/adamaguilera.github.io.git
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run locally:
   ```sh
   python3 -m http.server 8000
   ```
   Visit [http://localhost:8000](http://localhost:8000)

## Blog Management

### Adding New Blog Posts

1. Create a new Markdown file in the `blog/` directory

2. Add frontmatter at the top of your Markdown file:
   ```markdown
   ---
   title: Your Post Title
   date: YYYY-MM-DD
   description: A brief description of your post
   ---
   ```

3. Write your post content in Markdown format

4. Generate the blog post HTML and update the index:
   ```sh
   node scripts/generate-blog-posts.js
   node scripts/update-blog-index.js
   ```

### Blog Structure

- `blog/` - Contains all blog posts and the blog index
- `templates/` - Contains HTML templates for blog posts
- `scripts/` - Contains Node.js scripts for blog generation
  - `generate-blog-posts.js` - Converts Markdown to HTML
  - `update-blog-index.js` - Updates the blog index page


## Deployment

- Changes are automatically deployed to:
  - https://adamaguilera.com
  - https://adamaguilera.github.io
- Monitor deployment status in GitHub Actions
- Custom domain configured via CNAME
