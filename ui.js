/* ========================================
   UI INTERACTIONS - HRM SYSTEM
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initPanel();
});

/* ========================================
   NAVIGATION HANDLING
   ======================================== */

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

/* ========================================
   SLIDE-IN PANEL HANDLING
   ======================================== */

function initPanel() {
    const overlay = document.getElementById('panelOverlay');
    const panel = document.getElementById('slidePanel');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const newRequestBtn = document.getElementById('newRequestBtn');
    const closeBtn = document.getElementById('closePanel');
    const cancelBtn = document.getElementById('cancelPanel');
    const panelTitle = document.getElementById('panelTitle');
    
    // Open panel for adding employee
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', function() {
            panelTitle.textContent = 'Add Employee';
            openPanel();
        });
    }
    
    // Open panel for new request
    if (newRequestBtn) {
        newRequestBtn.addEventListener('click', function() {
            panelTitle.textContent = 'New Leave Request';
            openPanel();
        });
    }
    
    // Close panel with close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closePanel);
    }
    
    // Close panel with cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePanel);
    }
    
    // Close panel when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', closePanel);
    }
    
    // Close panel on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closePanel();
        }
    });
}

function openPanel() {
    const overlay = document.getElementById('panelOverlay');
    const panel = document.getElementById('slidePanel');
    
    overlay.classList.add('active');
    panel.classList.add('active');
    
    // Prevent body scroll when panel is open
    document.body.style.overflow = 'hidden';
}

function closePanel() {
    const overlay = document.getElementById('panelOverlay');
    const panel = document.getElementById('slidePanel');
    
    overlay.classList.remove('active');
    panel.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

/* ========================================
   FILTER INTERACTIONS
   ======================================== */

// Add interactive behavior to filter pills
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-pill')) {
        const parentGroup = e.target.closest('.filter-options');
        if (parentGroup) {
            // Remove active from siblings
            const siblings = parentGroup.querySelectorAll('.filter-pill');
            siblings.forEach(pill => pill.classList.remove('active'));
            
            // Add active to clicked pill
            e.target.classList.add('active');
        }
    }
});

/* ========================================
   CARD HOVER EFFECTS (VISUAL ONLY)
   ======================================== */

// Add subtle animations to request cards
const requestCards = document.querySelectorAll('.request-card');
requestCards.forEach(card => {
    card.addEventListener('mousedown', function() {
        this.style.cursor = 'grabbing';
    });
    
    card.addEventListener('mouseup', function() {
        this.style.cursor = 'grab';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.cursor = 'grab';
    });
});

/* ========================================
   SMOOTH HOVER STATES
   ======================================== */

// Employee row smooth interactions
const employeeRows = document.querySelectorAll('.employee-row');
employeeRows.forEach(row => {
    const actions = row.querySelector('.employee-actions');
    
    row.addEventListener('mouseenter', function() {
        if (actions) {
            // Small delay for smoother effect
            setTimeout(() => {
                actions.style.opacity = '1';
            }, 50);
        }
    });
    
    row.addEventListener('mouseleave', function() {
        if (actions) {
            actions.style.opacity = '0';
        }
    });
});

/* ========================================
   ACTION BUTTON FEEDBACK
   ======================================== */

// Add click feedback to action buttons (UI only)
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Smooth scroll helper
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add ripple effect to primary buttons
const primaryButtons = document.querySelectorAll('.btn-primary');
primaryButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove any existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/* ========================================
   CONSOLE BRANDING
   ======================================== */

console.log('%cHorizon HRM', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%cUI-Only Static Demo', 'font-size: 12px; color: #78716c;');
console.log('%cNo backend • No APIs • Pure frontend interactions', 'font-size: 10px; color: #a8a29e; font-style: italic;');
