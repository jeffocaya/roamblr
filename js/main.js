// js/main.js - Shared functionality for roamblr

// ============================================
// NAVIGATION & UI
// ============================================

// Mobile menu toggle (if we add hamburger menu later)
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

// Generic form submission handler
function handleFormSubmit(formId, redirectType) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        
        // Re-enable after 5 seconds in case of error (Formspree will handle redirect)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 5000);
    });
}

// ============================================
// URL PARAMETERS
// ============================================

// Get URL parameter by name
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Update page title with city name
function updateTitleWithCity(cityName) {
    document.title = `${cityName} creators · roamblr`;
}

// ============================================
// CITY DATA (Shared across pages)
// ============================================

// City database - single source of truth
const cityDatabase = {
    nairobi: {
        name: 'Nairobi',
        country: 'Kenya',
        countryCode: 'KE',
        creatorCount: 12,
        tags: [
            { icon: 'fa-utensils', label: 'street food' },
            { icon: 'fa-car', label: 'matatus' },
            { icon: 'fa-music', label: 'nightlife' },
            { icon: 'fa-tree', label: 'national park' },
            { icon: 'fa-shopping-bag', label: 'markets' }
        ]
    },
    kampala: {
        name: 'Kampala',
        country: 'Uganda',
        countryCode: 'UG',
        creatorCount: 8,
        tags: [
            { icon: 'fa-music', label: 'nightlife' },
            { icon: 'fa-utensils', label: 'street food' },
            { icon: 'fa-motorcycle', label: 'boda bodas' },
            { icon: 'fa-water', label: 'Lake Victoria' }
        ]
    },
    mombasa: {
        name: 'Mombasa',
        country: 'Kenya',
        countryCode: 'KE',
        creatorCount: 6,
        tags: [
            { icon: 'fa-umbrella-beach', label: 'beach' },
            { icon: 'fa-ship', label: 'dhow trips' },
            { icon: 'fa-landmark', label: 'old town' },
            { icon: 'fa-utensils', label: 'seafood' }
        ]
    },
    jinja: {
        name: 'Jinja',
        country: 'Uganda',
        countryCode: 'UG',
        creatorCount: 4,
        tags: [
            { icon: 'fa-water', label: 'rafting' },
            { icon: 'fa-mountain', label: 'adventure' },
            { icon: 'fa-tree', label: 'waterfalls' },
            { icon: 'fa-map', label: 'Source of Nile' }
        ]
    },
    kisumu: {
        name: 'Kisumu',
        country: 'Kenya',
        countryCode: 'KE',
        creatorCount: 3,
        tags: [
            { icon: 'fa-water', label: 'Lake Victoria' },
            { icon: 'fa-fish', label: 'fishing' },
            { icon: 'fa-sun', label: 'beaches' }
        ]
    }
};

// Get city data by slug
function getCityData(slug) {
    return cityDatabase[slug] || null;
}

// Get all cities as array
function getAllCities() {
    return Object.keys(cityDatabase).map(slug => ({
        slug,
        ...cityDatabase[slug]
    }));
}

// ============================================
// CREATOR DATA (Shared across pages)
// ============================================

// Creator database
const creatorDatabase = {
    nairobi: [
        {
            id: 'wanjiku',
            avatar: '👩🏾',
            name: 'Wanjiku M.',
            subs: '87k',
            niches: ['adventure', 'street food'],
            responseTime: 'fast',
            hosted: 3,
            hostedNames: 'Mark (London)',
            quote: 'Showed me the real Nairobi — we shot a viral street food series.',
            videoLink: 'https://youtube.com/watch=example1'
        },
        {
            id: 'kevin',
            avatar: '👨🏾',
            name: 'Kevin O.',
            subs: '124k',
            niches: ['tech', 'lifestyle'],
            responseTime: '3h',
            hosted: 2,
            quote: 'Great with tech reviews and local spots.',
            videoLink: 'https://youtube.com/watch=example2'
        },
        {
            id: 'achieng',
            avatar: '👩🏿',
            name: 'Achieng P.',
            subs: '56k',
            niches: ['fashion', 'culture'],
            responseTime: '1h',
            hosted: 4,
            quote: 'Best fashion spots in Nairobi.',
            videoLink: 'https://youtube.com/watch=example3'
        },
        {
            id: 'mwangi',
            avatar: '👨🏻',
            name: 'Mwangi T.',
            subs: '32k',
            niches: ['adventure', 'hiking'],
            responseTime: '1 day',
            hosted: 1,
            quote: 'Knows all the hiking trails.',
            videoLink: 'https://youtube.com/watch=example4'
        }
    ],
    kampala: [
        {
            id: 'ssemanda',
            avatar: '👨🏿',
            name: 'Ssemanda K.',
            subs: '42k',
            niches: ['nightlife', 'culture'],
            responseTime: '2h',
            hosted: 4,
            hostedNames: 'Dee Mwango',
            quote: 'Knew every hidden rooftop. My Kampala vlog blew up.',
            videoLink: 'https://youtube.com/watch=example5'
        },
        {
            id: 'nakato',
            avatar: '👩🏾',
            name: 'Nakato R.',
            subs: '38k',
            niches: ['food', 'markets'],
            responseTime: 'fast',
            hosted: 3,
            quote: 'Best street food guide in Kampala.',
            videoLink: 'https://youtube.com/watch=example6'
        }
    ],
    mombasa: [
        {
            id: 'zahara',
            avatar: '👩🏽',
            name: 'Zahara A.',
            subs: '110k',
            niches: ['beach', 'Swahili culture'],
            responseTime: '1 day',
            hosted: 5,
            hostedNames: 'Tunde (Nigeria)',
            quote: 'Organised a dhow trip with local musicians.',
            videoLink: 'https://youtube.com/watch=example7'
        }
    ],
    jinja: [
        {
            id: 'okello',
            avatar: '👨🏽‍🦱',
            name: 'Okello J.',
            subs: '28k',
            niches: ['adventure', 'rafting'],
            responseTime: 'fast',
            hosted: 2,
            hostedNames: 'Wode Maya',
            quote: 'Best rafting guide on the Nile.',
            videoLink: 'https://youtube.com/watch=example8'
        }
    ]
};

// Get creators by city
function getCreatorsByCity(citySlug) {
    return creatorDatabase[citySlug] || [];
}

// Get creator by ID
function getCreatorById(creatorId) {
    for (const city in creatorDatabase) {
        const creator = creatorDatabase[city].find(c => c.id === creatorId);
        if (creator) return { ...creator, city };
    }
    return null;
}

// ============================================
// SEARCH & FILTER
// ============================================

// Filter creators by search term
function filterCreators(creators, searchTerm) {
    if (!searchTerm) return creators;
    
    const term = searchTerm.toLowerCase();
    return creators.filter(creator => 
        creator.name.toLowerCase().includes(term) ||
        creator.niches.some(niche => niche.toLowerCase().includes(term))
    );
}

// Sort creators
function sortCreators(creators, sortBy) {
    const sorted = [...creators];
    
    switch(sortBy) {
        case 'subs':
            return sorted.sort((a, b) => {
                const aNum = parseInt(a.subs.replace('k', '')) * (a.subs.includes('k') ? 1000 : 1);
                const bNum = parseInt(b.subs.replace('k', '')) * (b.subs.includes('k') ? 1000 : 1);
                return bNum - aNum;
            });
        case 'collabs':
            return sorted.sort((a, b) => b.hosted - a.hosted);
        case 'recent':
        default:
            return sorted; // Default order
    }
}

// ============================================
// ANALYTICS & TRACKING (Simple)
// ============================================

// Track page view (you can connect to Google Analytics later)
function trackPageView(pageName) {
    console.log(`Page view: ${pageName}`);
    // Add Google Analytics here later
}

// Track search
function trackSearch(city, searchTerm) {
    console.log(`Search in ${city}: ${searchTerm}`);
    // Store in localStorage for now
    const searches = JSON.parse(localStorage.getItem('roamblr_searches') || '[]');
    searches.push({ city, term: searchTerm, timestamp: new Date().toISOString() });
    localStorage.setItem('roamblr_searches', JSON.stringify(searches.slice(-50)));
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

// Save form data to localStorage (in case user accidentally refreshes)
function saveFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const data = JSON.parse(localStorage.getItem(`roamblr_${formId}`) || '{}');
            data[field.name] = field.value;
            localStorage.setItem(`roamblr_${formId}`, JSON.stringify(data));
        });
    });
}

// Load saved form data
function loadFormData(formId) {
    const data = JSON.parse(localStorage.getItem(`roamblr_${formId}`) || '{}');
    const form = document.getElementById(formId);
    if (!form) return;
    
    Object.keys(data).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) field.value = data[key];
    });
}

// Clear saved form data
function clearFormData(formId) {
    localStorage.removeItem(`roamblr_${formId}`);
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize all common functionality
function initRoamblr() {
    initMobileMenu();
    initSmoothScroll();
    
    // Track page view
    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    trackPageView(pageName);
    
    // Load any saved form data
    if (document.getElementById('apply-form')) {
        loadFormData('apply-form');
    }
    if (document.getElementById('intro-form')) {
        loadFormData('intro-form');
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initRoamblr);
