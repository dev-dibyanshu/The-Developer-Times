// Set current date in newspaper format
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', options);
    dateElement.textContent = formattedDate;
}

// Add smooth scroll behavior for any internal links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add reading progress indicator
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(to right, #1a1a1a, #444);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Add stagger animation to elements
function addStaggerAnimation() {
    const animatedElements = document.querySelectorAll('.stamp-card, .box-section, .expertise-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(0deg)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Add typewriter effect to headline
function typewriterEffect() {
    const headline = document.querySelector('.headline');
    if (!headline) return;
    
    const text = headline.textContent;
    headline.textContent = '';
    headline.style.borderBottom = 'none';
    
    let index = 0;
    const speed = 30;
    
    function type() {
        if (index < text.length) {
            headline.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            headline.style.borderBottom = '2px solid #1a1a1a';
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Add expertise card interaction
function addExpertiseInteraction() {
    const cards = document.querySelectorAll('.expertise-card');
    
    cards.forEach(card => {
        const toggle = card.querySelector('.card-toggle');
        
        const toggleCard = () => {
            const isExpanded = card.classList.contains('expanded');
            
            // Close all cards
            cards.forEach(c => c.classList.remove('expanded'));
            
            // Open clicked card if it wasn't already open
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        };
        
        // Click on card or toggle button
        card.addEventListener('click', toggleCard);
        
        // Prevent double-triggering
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCard();
        });
    });
}

// Add letter envelope interaction
function addLetterInteraction() {
    const envelopes = document.querySelectorAll('.letter-envelope');
    
    envelopes.forEach(envelope => {
        envelope.addEventListener('click', function() {
            // Close all other envelopes
            envelopes.forEach(env => {
                if (env !== envelope) {
                    env.classList.remove('open');
                }
            });
            
            // Toggle current envelope
            this.classList.toggle('open');
        });
    });
}

// Add click counter for tags (Easter egg)
function addTagInteraction() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        let clickCount = 0;
        tag.addEventListener('click', () => {
            clickCount++;
            tag.style.transform = 'scale(1.1)';
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 200);
            
            if (clickCount === 5) {
                tag.textContent += ' ⭐';
                clickCount = 0;
            }
        });
        tag.style.cursor = 'pointer';
        tag.style.transition = 'transform 0.2s ease';
    });
}

// Add print functionality
function addPrintButton() {
    const footer = document.querySelector('.newspaper-footer');
    const printBtn = document.createElement('button');
    printBtn.textContent = '🖨️ Print This Edition';
    printBtn.style.cssText = `
        margin: 20px auto;
        display: block;
        padding: 12px 24px;
        background-color: #1a1a1a;
        color: #fff;
        border: none;
        font-family: 'Georgia', serif;
        font-size: 1rem;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: background-color 0.3s ease;
    `;
    
    printBtn.addEventListener('mouseover', () => {
        printBtn.style.backgroundColor = '#333';
    });
    
    printBtn.addEventListener('mouseout', () => {
        printBtn.style.backgroundColor = '#1a1a1a';
    });
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    footer.insertBefore(printBtn, footer.firstChild);
}

// Add "Back to Top" button
function addBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #1a1a1a;
        color: #fff;
        border: 2px solid #fff;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseover', () => {
        backToTopBtn.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseout', () => {
        backToTopBtn.style.transform = 'scale(1)';
    });
}

// Add dynamic word count
function addWordCount() {
    const articles = document.querySelectorAll('.article-content, .project-description');
    let totalWords = 0;
    
    articles.forEach(article => {
        const text = article.textContent.trim();
        const words = text.split(/\s+/).length;
        totalWords += words;
    });
    
    const footer = document.querySelector('.footer-text');
    footer.textContent += ` | ${totalWords.toLocaleString()} words`;
}

// Audio Player Control
function initAudioPlayer() {
    const audioControl = document.getElementById('audioControl');
    const musicPlayer = document.getElementById('musicPlayer');
    const controlIcon = audioControl.querySelector('.control-icon');
    const controlText = audioControl.querySelector('.control-text');
    
    if (!audioControl || !musicPlayer) return;
    
    audioControl.addEventListener('click', () => {
        if (musicPlayer.paused) {
            musicPlayer.play();
            controlIcon.textContent = '⏸';
            controlText.textContent = 'PAUSE RECORDING';
            audioControl.classList.add('playing');
        } else {
            musicPlayer.pause();
            controlIcon.textContent = '▶';
            controlText.textContent = 'PLAY RECORDING';
            audioControl.classList.remove('playing');
        }
    });
    
    // Reset button when audio ends
    musicPlayer.addEventListener('ended', () => {
        controlIcon.textContent = '▶';
        controlText.textContent = 'PLAY RECORDING';
        audioControl.classList.remove('playing');
    });
}

// Initialize all features
function init() {
    setCurrentDate();
    initSmoothScroll();
    createReadingProgress();
    addStaggerAnimation();
    // addExpertiseInteraction(); // REMOVED - cards are now static
    // typewriterEffect(); // Uncomment for typewriter effect on headline
    addTagInteraction();
    addPrintButton();
    addBackToTop();
    addWordCount();
    initAudioPlayer();
    
    // Add fade-in effect to the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'P' to print
    if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        window.print();
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Console Easter Egg
console.log('%c📰 THE DEVELOPER TIMES 📰', 'font-size: 24px; font-weight: bold; color: #1a1a1a;');
console.log('%cWelcome to the source code!', 'font-size: 14px; color: #666;');
console.log('%cLooking for something? Try pressing Ctrl+T to scroll to top or Ctrl+P to print!', 'font-size: 12px; font-style: italic; color: #999;');
