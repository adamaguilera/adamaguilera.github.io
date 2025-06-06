const fs = require('fs');
const path = require('path');

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

// Read the blog index template
const indexTemplate = fs.readFileSync(path.join(__dirname, '../templates/blog-index.html'), 'utf8');

// Get all markdown files from the blog directory
const sourceBlogDir = path.join(__dirname, '../blog');
const publicBlogDir = path.join(__dirname, '../blog');

// Ensure the blog directory exists
if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
}

const files = fs.readdirSync(sourceBlogDir)
    .filter(file => file.endsWith('.md'))
    .sort((a, b) => {
        // Sort by date in filename (assuming format: YYYY-MM-DD-title.md)
        return b.localeCompare(a);
    });

// Generate blog entries HTML
const blogEntries = files.map(mdFile => {
    const mdContent = fs.readFileSync(path.join(sourceBlogDir, mdFile), 'utf8');

    // Parse frontmatter
    const metadata = parseFrontmatter(mdContent);
    if (!metadata || !metadata.title) {
        console.warn(`Warning: No frontmatter found in ${mdFile}, skipping...`);
        return '';
    }

    const htmlFile = mdFile.replace('.md', '.html');

    return `
        <div class="section blog-entry" onclick="window.location.href='/blog/${htmlFile}'">
            <div class="header-row">
                <h2><a href="/blog/${htmlFile}">${metadata.title}</a></h2>
            </div>
            <div class="content">
                <div class="text-content">
                    <p class="blog-date"><i>${metadata.date || ''}</i></p>
                    <p>${metadata.summary}</p>
                </div>
            </div>
        </div>
    `;
}).filter(entry => entry !== '').join('\n');

// Replace the placeholder in the template
const indexContent = indexTemplate.replace('{{blog-entries}}', blogEntries);

// Write the blog index file
fs.writeFileSync(path.join(publicBlogDir, 'index.html'), indexContent);

console.log('Updated blog index page'); 