const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Function to parse frontmatter from markdown content
function parseFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;

    const frontmatter = frontmatterMatch[1];
    const metadata = {};

    frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            metadata[key.trim()] = valueParts.join(':').trim();
        }
    });

    return metadata;
}

// Read the template
const template = fs.readFileSync(path.join(__dirname, '../templates/blog-post.html'), 'utf8');

// Get all markdown files from the blog directory
const sourceBlogDir = path.join(__dirname, '../blog');
const publicBlogDir = path.join(__dirname, '../blog');

// Ensure the blog directory exists
if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
}

const files = fs.readdirSync(sourceBlogDir)
    .filter(file => file.endsWith('.md'));

// Process each markdown file
files.forEach(mdFile => {
    // Read the markdown file
    const mdContent = fs.readFileSync(path.join(sourceBlogDir, mdFile), 'utf8');

    // Parse frontmatter
    const metadata = parseFrontmatter(mdContent);
    if (!metadata || !metadata.title) {
        console.warn(`Warning: No frontmatter found in ${mdFile}, skipping...`);
        return;
    }

    // Remove frontmatter from content
    const contentWithoutFrontmatter = mdContent.replace(/^---\n[\s\S]*?\n---\n/, '');

    // Convert markdown to HTML
    const htmlContent = marked(contentWithoutFrontmatter);

    // Generate the HTML filename
    const htmlFile = mdFile.replace('.md', '.html');

    // Replace placeholders in the template
    let finalHtml = template
        .replace('{{title}}', metadata.title)
        .replace('<!-- Content will be inserted here during generation -->', htmlContent);

    // Write the HTML file to the blog directory
    fs.writeFileSync(path.join(publicBlogDir, htmlFile), finalHtml);

    console.log(`Generated ${htmlFile} from ${mdFile}`);
});
