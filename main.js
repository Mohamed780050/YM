/**
 * Wall Touch - Floating Contact Button Logic
 * This file handles the rendering and interactions of the fixed social media button.
 */

// 1. Array of social media objects as requested
const socialLinks = [
    {
        name: "WhatsApp",
        icon: "fab fa-whatsapp",
        url: "https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F966543557939%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGns71tTL6zxRmU_Oqc6i5nbNKoshv9naFSlnbUH4H7NwgmoLhxLu9afarzIyo_aem_NMe_IY05bkhxKwRhjEdvpA&e=AT3UsCzX6Ci9wqNF-1hP3NlgJRqjewg7bRR9ftLP2rBYimai6dB1tnFJdSaicUxIQH72QgBqCutPjKoqmJ_tRctzlkbTIQXLlE1HeqE5FQ",
        customStyle: "bg-[#25D366] text-white",
        label: "واتساب"
    },
    {
        name: "Call",
        icon: "fas fa-phone-alt",
        url: "tel:⁦+966 54 355 7939⁩",
        customStyle: "bg-black text-white",
        label: "اتصال مباشر"
    },
    {
        name: "Instagram",
        icon: "fab fa-instagram",
        url: "https://www.instagram.com/ymlink.sa/",
        customStyle: "bg-[#E4405F] text-white",
        label: "إنستغرام"
    },
    {
        name: "Store",
        icon: "fas fa-shopping-bag",
        url: "https://walltouch1.com/",
        customStyle: "bg-[#1e293b] text-white",
        label: "المتجر الإلكتروني"
    }
];

// 2. Initialize the floating button
function initFloatingButton() {
    const container = document.getElementById('floating-contact');
    if (!container) return;

    // Create the main toggle button (the green chat button in the reference)
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'contact-toggle';
    toggleBtn.className = 'w-16 h-16 bg-[#25D366] text-white rounded-lg shadow-2xl flex items-center justify-center text-3xl transition-transform hover:scale-110 active:scale-95 z-50';
    toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';

    // Create the menu container
    const menu = document.createElement('div');
    menu.id = 'contact-menu';
    menu.className = 'hidden flex-col items-center gap-4 mb-4 transition-all duration-300 transform translate-y-4 opacity-0 scale-90';

    // Populate the menu with social links
    socialLinks.forEach((link, index) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.className = `mb-2 w-14 h-14 rounded-lg shadow-lg flex items-center justify-center text-2xl transition-all hover:scale-110 ${link.customStyle}`;
        linkElement.innerHTML = `<i class="${link.icon}"></i>`;
        linkElement.title = link.label;
        
        // Add label if on desktop/hover
        const label = document.createElement('span');
        label.className = 'absolute right-20 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 whitespace-nowrap hidden md:block';
        label.innerText = link.label;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'group relative flex items-center';
        wrapper.appendChild(label);
        wrapper.appendChild(linkElement);
        
        menu.appendChild(wrapper);
    });

    // Toggle logic
    let isOpen = false;
    toggleBtn.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
            menu.classList.remove('hidden');
            setTimeout(() => {
                menu.classList.remove('translate-y-4', 'opacity-0', 'scale-90');
                toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
            }, 10);
        } else {
            menu.classList.add('translate-y-4', 'opacity-0', 'scale-90');
            toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 300);
        }
    };

    container.appendChild(menu);
    container.appendChild(toggleBtn);
}

// 3. Scroll Reveal Animation Logic
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null, // use the viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once it's revealed
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class when it leaves viewport for re-animation
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// 4. Run on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initFloatingButton();
    initScrollReveal();
});
