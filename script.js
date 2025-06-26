// script.js - Shared JavaScript for all pages

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Animated particles background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 15 + 10;
        const opacity = Math.random() * 0.5 + 0.3;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = startX + 'px';
        particle.style.opacity = opacity;
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    };
    
    // Create initial particles
    createParticle();
    
    // Continue creating particles
    const particleInterval = setInterval(createParticle, 300);
    
    // Store interval for cleanup if needed
    return particleInterval;
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    };
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            } else if (!entry.isIntersecting && entry.target.classList.contains('animated')) {
                entry.target.classList.remove('animated');
                entry.target.textContent = '0';
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => {
        observer.observe(counter);
    });
}
document.addEventListener('DOMContentLoaded', animateCounters);

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fade in animation on scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Initializing mobile menu...');
    console.log('Mobile menu toggle:', mobileMenuToggle);
    console.log('Navbar:', navbar);
    console.log('Nav links:', navLinks);
    
    if (mobileMenuToggle && navbar && navLinks) {
        console.log('All elements found, adding event listeners...');
        
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu clicked!');
            
            navbar.classList.toggle('mobile-open');
            navLinks.classList.toggle('mobile-open');
            mobileMenuToggle.classList.toggle('active');
            
            console.log('Mobile menu state:', {
                navbarOpen: navbar.classList.contains('mobile-open'),
                navLinksOpen: navLinks.classList.contains('mobile-open'),
                toggleActive: mobileMenuToggle.classList.contains('active')
            });
            
            // Close AI dropdown when mobile menu is closed
            if (!navbar.classList.contains('mobile-open')) {
                closeAllDropdowns();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navbar.classList.contains('mobile-open')) {
                console.log('Closing mobile menu (outside click)');
                navbar.classList.remove('mobile-open');
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
                closeAllDropdowns();
            }
        });
        
        // Close menu when window is resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                console.log('Closing mobile menu (resize)');
                navbar.classList.remove('mobile-open');
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
                closeAllDropdowns();
            }
        });
        
        // Close menu when clicking on a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Closing mobile menu (nav link click)');
                navbar.classList.remove('mobile-open');
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
                closeAllDropdowns();
            });
        });
        
        console.log('Mobile menu initialization complete!');
    } else {
        console.error('Mobile menu elements not found:', {
            mobileMenuToggle: !!mobileMenuToggle,
            navbar: !!navbar,
            navLinks: !!navLinks
        });
    }
}

// Utility function to throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced scroll performance
const throttledScroll = throttle(() => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, 16);
window.addEventListener('scroll', throttledScroll);

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing functions...');
    
    try {
        createParticles();
        console.log('Particles created');
    } catch (e) {
        console.log('Particles creation failed:', e);
    }
    
    try {
        animateCounters();
        console.log('Counters initialized');
    } catch (e) {
        console.log('Counter initialization failed:', e);
    }
    
    try {
        initSmoothScrolling();
        console.log('Smooth scrolling initialized');
    } catch (e) {
        console.log('Smooth scrolling initialization failed:', e);
    }
    
    try {
        initScrollAnimations();
        console.log('Scroll animations initialized');
    } catch (e) {
        console.log('Scroll animations initialization failed:', e);
    }
    
    try {
        initMobileMenu();
        console.log('Mobile menu initialization attempted');
    } catch (e) {
        console.error('Mobile menu initialization failed:', e);
    }
    
    console.log('All initialization complete!');
});

// Clean up particles on page unload
window.addEventListener('beforeunload', () => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
});

// Toggle AI Dropdown (navbar version)
function toggleAIDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('aiDropdownContent');
    const button = event.target;
    
    // Close any other open dropdowns first
    const allDropdowns = document.querySelectorAll('.ai-dropdown-content.show');
    allDropdowns.forEach(dd => {
        if (dd !== dropdown) {
            dd.classList.remove('show');
        }
    });
    
    dropdown.classList.toggle('show');
    
    // Add visual feedback for mobile
    if (window.innerWidth <= 768) {
        button.style.background = dropdown.classList.contains('show') 
            ? 'rgba(64, 224, 255, 0.1)' 
            : 'transparent';
    }
}

// Close dropdown if click outside
window.addEventListener('click', function(event) {
    const dropdown = document.getElementById('aiDropdownContent');
    const button = document.querySelector('.ai-dropdown-toggle');
    if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.remove('show');
        if (button && window.innerWidth <= 768) {
            button.style.background = 'transparent';
        }
    }
});

// Close dropdown when mobile menu is closed
function closeAllDropdowns() {
    const dropdown = document.getElementById('aiDropdownContent');
    const button = document.querySelector('.ai-dropdown-toggle');
    if (dropdown) {
        dropdown.classList.remove('show');
        if (button && window.innerWidth <= 768) {
            button.style.background = 'transparent';
        }
    }
}

// AI Name to Official URL Mapping
const aiNameToUrl = {
    'chatgpt': 'https://chat.openai.com/',
    'google gemini': 'https://gemini.google.com/',
    'gemini': 'https://gemini.google.com/',
    'anthropic claude': 'https://claude.ai/',
    'claude': 'https://claude.ai/',
    'perplexity ai': 'https://www.perplexity.ai/',
    'perplexity': 'https://www.perplexity.ai/',
    'pi': 'https://pi.ai/',
    'pi (inflection)': 'https://pi.ai/',
    'microsoft copilot': 'https://copilot.microsoft.com/',
    'copilot': 'https://copilot.microsoft.com/',
    'you.com ai': 'https://you.com/',
    'you ai': 'https://you.com/',
    'mistral ai': 'https://mistral.ai/',
    'mistral': 'https://mistral.ai/',
    'llama': 'https://llama.meta.com/',
    'llama (meta ai)': 'https://llama.meta.com/',
    'jasper ai': 'https://www.jasper.ai/',
    'jasper': 'https://www.jasper.ai/',
    'midjourney': 'https://www.midjourney.com/',
    'stable diffusion': 'https://stablediffusionweb.com/',
    'dall·e': 'https://labs.openai.com/',
    'dalle': 'https://labs.openai.com/',
    'ideogram': 'https://ideogram.ai/',
    'dreamstudio': 'https://dreamstudio.ai/',
    'canva ai': 'https://www.canva.com/ai-image-generator/',
    'canva': 'https://www.canva.com/ai-image-generator/',
    'synthesia': 'https://www.synthesia.io/',
    'pictory': 'https://pictory.ai/',
    'elevenlabs': 'https://elevenlabs.io/',
    'github copilot': 'https://github.com/features/copilot',
    'amazon codewhisperer': 'https://aws.amazon.com/codewhisperer/',
    'codewhisperer': 'https://aws.amazon.com/codewhisperer/',
    'tabnine': 'https://www.tabnine.com/',
    'replit ghostwriter': 'https://replit.com/site/ghostwriter',
    'ghostwriter': 'https://replit.com/site/ghostwriter',
    'deepl': 'https://www.deepl.com/',
    'descript': 'https://www.descript.com/',
    'runwayml': 'https://runwayml.com/',
    'notion ai': 'https://www.notion.so/product/ai',
    'notion': 'https://www.notion.so/product/ai',
    'quillbot': 'https://quillbot.com/',
    'grammarlygo': 'https://www.grammarly.com/grammarlygo',
    'copy.ai': 'https://www.copy.ai/',
    'copy ai': 'https://www.copy.ai/',
    'writesonic': 'https://writesonic.com/',
    'chatpdf': 'https://www.chatpdf.com/',
    'tome ai': 'https://tome.app/',
    'tome': 'https://tome.app/'
};

// Search form handler (redirect to official site)
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = searchForm.querySelector('input[type="text"]');
        const query = input.value.trim().toLowerCase();
        let found = false;
        for (const [name, url] of Object.entries(aiNameToUrl)) {
            if (query === name || name.includes(query) || query.includes(name)) {
                window.open(url, '_blank');
                found = true;
                break;
            }
        }
        if (!found) {
            alert('No matching AI found. Please try another name.');
        }
    });
}

// === Research Page: Advanced Filters, PDF Viewer, Featured, Summaries ===
document.addEventListener('DOMContentLoaded', function () {
  const researchList = document.getElementById('research-list');
  const featuredList = document.getElementById('featured-research');
  const searchInput = document.getElementById('research-search');
  const categoryFilter = document.getElementById('research-category-filter');
  const yearFilter = document.getElementById('research-year-filter');
  const authorFilter = document.getElementById('research-author-filter');
  const sourceFilter = document.getElementById('research-source-filter');
  const pdfModal = document.getElementById('pdf-modal');
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfDownload = document.getElementById('pdf-download-link');
  const closePdfModal = document.getElementById('close-pdf-modal');

  if (!researchList || !searchInput || !categoryFilter || !yearFilter || !authorFilter || !sourceFilter) return;

  // Demo research articles with extra fields
  const researchArticles = [
    {
      title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
      authors: 'Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova',
      date: '2018-10-11',
      year: '2018',
      source: 'arXiv',
      tags: ['NLP', 'LLMs'],
      summary: 'BERT is a method of pre-training language representations for NLP tasks.',
      tldr: 'BERT enables state-of-the-art results on a wide array of NLP tasks by pre-training deep bidirectional representations.',
      keyTakeaways: ['Bidirectional transformer', 'Pre-training + fine-tuning', 'Improved NLP benchmarks'],
      methodology: 'Masked language modeling and next sentence prediction.',
      results: 'Achieved SOTA on 11 NLP tasks.',
      pdf: 'https://arxiv.org/pdf/1810.04805.pdf',
      featured: true
    },
    {
      title: 'ImageNet Classification with Deep Convolutional Neural Networks',
      authors: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton',
      date: '2012-12-03',
      year: '2012',
      source: 'NeurIPS',
      tags: ['Computer Vision', 'GANs'],
      summary: 'The famous AlexNet paper that revolutionized computer vision with deep learning.',
      tldr: 'AlexNet showed deep CNNs can achieve breakthrough performance on image classification.',
      keyTakeaways: ['Deep CNN', 'ReLU activation', 'GPU training'],
      methodology: 'Deep convolutional neural network trained on ImageNet.',
      results: 'Top-5 error rate of 15.3% on ImageNet.',
      pdf: 'https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',
      featured: true
    },
    {
      title: 'Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm',
      authors: 'Silver, Hubert, Schrittwieser, et al.',
      date: '2017-12-06',
      year: '2017',
      source: 'arXiv',
      tags: ['Reinforcement Learning', 'AI Theory'],
      summary: 'AlphaZero learns to play chess, shogi, and Go at superhuman level using RL.',
      tldr: 'AlphaZero uses self-play and deep RL to master complex board games without human data.',
      keyTakeaways: ['Self-play', 'General RL', 'No human data'],
      methodology: 'Monte Carlo tree search + deep neural networks.',
      results: 'Surpassed previous SOTA in chess, shogi, Go.',
      pdf: 'https://arxiv.org/pdf/1712.01815.pdf',
      featured: false
    },
    {
      title: 'Robustness Gym: Unifying the NLP Evaluation Landscape',
      authors: 'Yin, Kann, Yu, et al.',
      date: '2020-07-15',
      year: '2020',
      source: 'arXiv',
      tags: ['NLP', 'Ethics'],
      summary: 'A toolkit for evaluating NLP model robustness and fairness.',
      tldr: 'Robustness Gym provides a unified platform for evaluating NLP model robustness.',
      keyTakeaways: ['Robustness evaluation', 'Fairness', 'NLP toolkit'],
      methodology: 'Modular evaluation framework for NLP models.',
      results: 'Benchmarked robustness across models.',
      pdf: 'https://arxiv.org/pdf/2002.08909.pdf',
      featured: false
    },
    {
      title: 'A Survey of Deep Learning for Scientific Discovery',
      authors: 'Nathan Baker, et al.',
      date: '2022-01-10',
      year: '2022',
      source: 'Nature',
      tags: ['AI Theory'],
      summary: 'Overview of deep learning applications in scientific research.',
      tldr: 'Deep learning is accelerating scientific discovery across disciplines.',
      keyTakeaways: ['Scientific discovery', 'DL applications', 'Interdisciplinary'],
      methodology: 'Survey of DL methods in science.',
      results: 'Identified trends and challenges.',
      pdf: 'https://www.nature.com/articles/s42256-021-00407-0.pdf',
      featured: true
    },
    {
      title: 'Ethical and Social Risks of Harm from Language Models',
      authors: 'Solaiman, Brundage, Clark, et al.',
      date: '2019-12-19',
      year: '2019',
      source: 'arXiv',
      tags: ['Ethics', 'NLP'],
      summary: 'Analysis of ethical and social risks posed by large language models.',
      tldr: 'Large language models pose new ethical and social risks.',
      keyTakeaways: ['Ethics', 'Social risk', 'LLMs'],
      methodology: 'Risk analysis of LLMs.',
      results: 'Outlined mitigation strategies.',
      pdf: 'https://arxiv.org/pdf/1906.01946.pdf',
      featured: false
    },
    {
      title: 'CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning',
      authors: 'Pranav Rajpurkar, et al.',
      date: '2017-11-08',
      year: '2017',
      source: 'arXiv',
      tags: ['Healthcare', 'Computer Vision'],
      summary: 'Deep learning for automated pneumonia detection in medical images.',
      tldr: 'CheXNet matches radiologist performance on pneumonia detection.',
      keyTakeaways: ['Medical imaging', 'DL healthcare', 'Radiologist-level'],
      methodology: '121-layer CNN trained on chest X-rays.',
      results: 'Outperformed radiologists on F1 score.',
      pdf: 'https://arxiv.org/pdf/1711.05225.pdf',
      featured: false
    },
    {
      title: 'Learning Dexterous In-Hand Manipulation',
      authors: 'OpenAI et al.',
      date: '2018-07-30',
      year: '2018',
      source: 'arXiv',
      tags: ['Robotics', 'Reinforcement Learning'],
      summary: 'AI learns to manipulate objects with a robotic hand using RL.',
      tldr: 'RL enables dexterous robotic manipulation.',
      keyTakeaways: ['Robotics', 'Dexterous manipulation', 'RL'],
      methodology: 'Domain randomization and RL.',
      results: 'Robust in-hand manipulation in simulation and real world.',
      pdf: 'https://arxiv.org/pdf/1808.00177.pdf',
      featured: false
    },
    {
      title: 'The AI Clinician: Reinforcement Learning for Intensive Care',
      authors: 'J. Komorowski, et al.',
      date: '2018-05-15',
      year: '2018',
      source: 'Nature',
      tags: ['Healthcare', 'Reinforcement Learning'],
      summary: 'RL-based AI system for optimizing treatment in intensive care units.',
      tldr: 'RL can optimize treatment strategies in ICUs.',
      keyTakeaways: ['Healthcare', 'RL', 'ICU'],
      methodology: 'Off-policy RL on ICU data.',
      results: 'Improved patient outcomes in simulation.',
      pdf: 'https://www.nature.com/articles/s41746-018-0030-1.pdf',
      featured: false
    },
    {
      title: 'A Survey on Bias and Fairness in Machine Learning',
      authors: 'Mehrabi, Morstatter, Saxena, et al.',
      date: '2021-08-01',
      year: '2021',
      source: 'arXiv',
      tags: ['Ethics', 'AI Theory'],
      summary: 'Comprehensive survey of bias and fairness in ML systems.',
      tldr: 'Bias and fairness are critical challenges in ML.',
      keyTakeaways: ['Bias', 'Fairness', 'ML'],
      methodology: 'Survey of bias/fairness in ML.',
      results: 'Summarized open problems and solutions.',
      pdf: 'https://arxiv.org/pdf/1908.09635.pdf',
      featured: false
    }
  ];

  // --- PDF Viewer Modal Logic ---
  function openPdfModal(pdfUrl) {
    if (!pdfModal || !pdfViewer || !pdfDownload) return;
    pdfViewer.src = pdfUrl;
    pdfDownload.href = pdfUrl;
    pdfModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closePdf() {
    if (!pdfModal || !pdfViewer) return;
    pdfModal.style.display = 'none';
    pdfViewer.src = '';
    document.body.style.overflow = '';
  }
  if (closePdfModal) closePdfModal.onclick = closePdf;
  if (pdfModal) pdfModal.addEventListener('click', e => { if (e.target === pdfModal) closePdf(); });

  // --- Render Featured/Trending Section ---
  function renderFeatured(articles) {
    if (!featuredList) return;
    featuredList.innerHTML = '';
    const featured = articles.filter(a => a.featured);
    if (featured.length === 0) return;
    featured.forEach(article => {
      const card = document.createElement('div');
      card.className = 'research-card';
      card.innerHTML = `
        <div class="research-title">${article.title} <span style="background:#40e0ff;color:#181828;font-size:0.9rem;padding:0.1rem 0.7rem;border-radius:8px;margin-left:0.5rem;">Featured</span></div>
        <div class="research-meta">
          <span>${article.authors}</span> &bull; <span>${article.date}</span>
          <span class="research-source">${article.source}</span>
        </div>
        <div class="research-tags">
          ${article.tags.map(tag => `<span class="research-tag">${tag}</span>`).join(' ')}
        </div>
        <div style="margin-bottom:0.7rem; color:#e0e0e0; font-size:1rem;">${article.summary}</div>
        <div style="margin-bottom:0.7rem;"><strong>TL;DR:</strong> ${article.tldr}</div>
        <div style="margin-bottom:0.7rem;"><strong>Key Takeaways:</strong> <ul style="margin:0 0 0.3rem 1.2rem;padding:0;">${article.keyTakeaways.map(k=>`<li>${k}</li>`).join('')}</ul></div>
        <div style="margin-bottom:0.7rem;"><strong>Methodology:</strong> ${article.methodology}</div>
        <div style="margin-bottom:0.7rem;"><strong>Results:</strong> ${article.results}</div>
        <button class="view-pdf-btn" data-pdf="${article.pdf}" style="background:#40e0ff;color:#181828;font-weight:600;padding:0.4rem 1.1rem;border-radius:8px;border:none;cursor:pointer;margin-right:0.7rem;">View PDF</button>
        <a href="${article.pdf}" download style="color:#40e0ff;text-decoration:underline;font-weight:600;font-size:1rem;">Download</a>
      `;
      featuredList.appendChild(card);
    });
  }

  // --- Render Main Article List ---
  function renderArticles(articles) {
    researchList.innerHTML = '';
    if (articles.length === 0) {
      researchList.innerHTML = '<div style="color:#aaa;font-size:1.1rem;">No research articles found.</div>';
      return;
    }
    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'research-card';
      card.innerHTML = `
        <div class="research-title">${article.title}${article.featured ? ' <span style=\"background:#40e0ff;color:#181828;font-size:0.9rem;padding:0.1rem 0.7rem;border-radius:8px;margin-left:0.5rem;\">Featured</span>' : ''}</div>
        <div class="research-meta">
          <span>${article.authors}</span> &bull; <span>${article.date}</span>
          <span class="research-source">${article.source}</span>
        </div>
        <div class="research-tags">
          ${article.tags.map(tag => `<span class="research-tag">${tag}</span>`).join(' ')}
        </div>
        <div style="margin-bottom:0.7rem; color:#e0e0e0; font-size:1rem;">${article.summary}</div>
        <div style="margin-bottom:0.7rem;"><strong>TL;DR:</strong> ${article.tldr}</div>
        <div style="margin-bottom:0.7rem;"><strong>Key Takeaways:</strong> <ul style="margin:0 0 0.3rem 1.2rem;padding:0;">${article.keyTakeaways.map(k=>`<li>${k}</li>`).join('')}</ul></div>
        <button class="view-pdf-btn" data-pdf="${article.pdf}" style="background:#40e0ff;color:#181828;font-weight:600;padding:0.4rem 1.1rem;border-radius:8px;border:none;cursor:pointer;margin-right:0.7rem;">View PDF</button>
        <a href="${article.pdf}" download style="color:#40e0ff;text-decoration:underline;font-weight:600;font-size:1rem;">Download</a>
      `;
      researchList.appendChild(card);
    });
    // Attach PDF view listeners
    document.querySelectorAll('.view-pdf-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        openPdfModal(this.getAttribute('data-pdf'));
      });
    });
  }

  // --- Filtering Logic ---
  function filterArticles() {
    const keyword = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const year = yearFilter.value;
    const author = authorFilter.value.trim().toLowerCase();
    const source = sourceFilter.value;
    let filtered = researchArticles.filter(article => {
      const matchesKeyword =
        article.title.toLowerCase().includes(keyword) ||
        article.authors.toLowerCase().includes(keyword) ||
        article.summary.toLowerCase().includes(keyword) ||
        (article.tldr && article.tldr.toLowerCase().includes(keyword));
      const matchesCategory = category === '' || article.tags.includes(category);
      const matchesYear = year === '' || article.year === year;
      const matchesAuthor = author === '' || article.authors.toLowerCase().includes(author);
      const matchesSource = source === '' || article.source === source;
      return matchesKeyword && matchesCategory && matchesYear && matchesAuthor && matchesSource;
    });
    renderArticles(filtered);
  }

  // --- Event Listeners ---
  searchInput.addEventListener('input', filterArticles);
  categoryFilter.addEventListener('change', filterArticles);
  yearFilter.addEventListener('change', filterArticles);
  authorFilter.addEventListener('input', filterArticles);
  sourceFilter.addEventListener('change', filterArticles);

  // --- Initial Render ---
  renderFeatured(researchArticles);
  renderArticles(researchArticles.filter(a => !a.featured));
});

// Test function for mobile menu (can be called from console)
function testMobileMenu() {
    console.log('Testing mobile menu...');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navbar && navLinks) {
        console.log('Elements found, toggling mobile menu...');
        navbar.classList.toggle('mobile-open');
        navLinks.classList.toggle('mobile-open');
        mobileMenuToggle.classList.toggle('active');
        
        console.log('Mobile menu toggled. Current state:', {
            navbarOpen: navbar.classList.contains('mobile-open'),
            navLinksOpen: navLinks.classList.contains('mobile-open'),
            toggleActive: mobileMenuToggle.classList.contains('active')
        });
    } else {
        console.error('Mobile menu elements not found for testing');
    }
}

// Make test function globally available
window.testMobileMenu = testMobileMenu;

