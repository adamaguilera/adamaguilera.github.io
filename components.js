function loadCommonComponents() {
    // Determine if we're in a subdirectory
    const isInSubdirectory = window.location.pathname.split('/').length > 2;
    const pathPrefix = isInSubdirectory ? '../' : '';

    const leftSide = `
        <div class="left-side">
            <img src="/images/adam.JPG" alt="Adam Aguilera" class="profile-image">
            <div class="summary-box">
                <p>Hi I'm Adam Aguilera, a software engineer based out of NYC. I'm a passionate engineer with 3+ years of
                    experience contributing to and leading initiatives in the tech industry. I have a history of driving
                    cross-functional projects with large-scale impact at Lyft under AdTech, Fraud, B2B and Platform domains.
                    I'm deeply curious about new technologies and how to apply them so I'm regularly working on a side project
                    some of which you can see here!</p>
            </div>
            <div class="external-links">
                <a href="https://github.com/adamaguilera" target="_blank" title="GitHub Profile">
                    <img src="/images/github.svg" alt="GitHub">
                </a>
                <a href="https://linkedin.com/in/adamkaguilera" target="_blank" title="LinkedIn Profile">
                    <img src="/images/linkedin.png" alt="LinkedIn">
                </a>
                <a href="mailto:contact@adamaguilera.com" title="Email Me">
                    <img src="/images/gmail.svg" alt="Gmail">
                </a>
                <a href="/images/resume-public.pdf" target="_blank" title="View Resume">
                    <img src="/images/resume.png" alt="Resume">
                </a>
            </div>
        </div>
    `;

    const nav = `
        <nav class="tab-navigation">
            <a href="/" class="tab-button">Resume</a>
            <a href="/blog/" class="tab-button">Blog</a>
        </nav>
    `;

    // Insert the left side content
    const leftSideContainer = document.querySelector('.left-side-container');
    if (leftSideContainer) {
        leftSideContainer.innerHTML = leftSide;
    }

    // Insert the navigation
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.innerHTML = nav;
    }

    // Set active tab based on current page
    const currentPage = window.location.pathname;
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        const buttonHref = button.getAttribute('href');
        if (buttonHref === currentPage ||
            (currentPage === '/' && buttonHref === '/') ||
            (currentPage.startsWith('/blog/') && buttonHref === '/blog/')) {
            button.classList.add('active');
        }
    });
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', loadCommonComponents); 