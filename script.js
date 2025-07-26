// Estado da aplicação
let currentPage = 'home';
let isMobileMenuOpen = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ícones Lucide
    lucide.createIcons();
    
    // Configurar página inicial
    setActivePage('home');
    updateNavigation();
});

// Navegação entre páginas
function navigateTo(page) {
    if (currentPage !== page) {
        currentPage = page;
        setActivePage(page);
        updateNavigation();
        
        // Fechar menu mobile se estiver aberto
        if (isMobileMenuOpen) {
            closeMobileMenu();
        }
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function setActivePage(page) {
    // Esconder todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Mostrar página atual
    const currentPageElement = document.getElementById(`page-${page}`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
}

function updateNavigation() {
    // Atualizar links de navegação desktop
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        link.classList.toggle('active', page === currentPage);
    });
    
    // Atualizar links de navegação mobile
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        link.classList.toggle('active', page === currentPage);
    });
}

// Menu Mobile
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.add('open');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        mobileMenu.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
    
    // Recriar ícones após mudança
    lucide.createIcons();
}

function closeMobileMenu() {
    if (isMobileMenuOpen) {
        isMobileMenuOpen = false;
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        
        mobileMenu.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        
        // Recriar ícones após mudança
        lucide.createIcons();
    }
}

// WhatsApp
function openWhatsApp() {
    const message = 'Olá! Gostaria de saber mais sobre os produtos da Econorte - Higiene e praticidade para o seu ambiente.';
    const url = `https://wa.me/559591747792?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Formulário de contato (quando implementado)
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form Data:', data);
    
    // Aqui seria implementada a lógica de envio
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset do formulário
    event.target.reset();
}

// Smooth scroll para links internos
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Sistema de busca para a loja (quando implementado)
function handleShopSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    // Implementar lógica de busca
}

// Manipulação de filtros da loja
function toggleShopView(viewMode) {
    console.log('View mode changed to:', viewMode);
    // Implementar mudança de visualização
}

// Newsletter signup
function handleNewsletterSignup(email) {
    console.log('Newsletter signup:', email);
    alert('Cadastro realizado com sucesso! Você receberá nossas novidades em breve.');
}

// Observador para animações on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.card-hover, .advantage-card, .category-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Lazy loading de imagens
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Utilities para formatação
function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function formatCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

// Detecção de dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Redimensionamento da janela
window.addEventListener('resize', function() {
    // Fechar menu mobile se a tela ficar grande
    if (!isMobile() && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

// Manipulação de cliques fora do menu mobile
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('.menu-toggle');
    
    if (isMobileMenuOpen && 
        !mobileMenu.contains(event.target) && 
        !menuButton.contains(event.target)) {
        closeMobileMenu();
    }
});

// Scroll spy para navegação
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Atualizar navegação ativa baseado na seção visível
            // Implementar se necessário
        }
    });
}

// Event listeners
window.addEventListener('scroll', updateActiveNavOnScroll);

// Inicializar animações e lazy loading quando a página carregar
window.addEventListener('load', function() {
    initScrollAnimations();
    initLazyLoading();
});

// Tratar formulários quando existirem
document.addEventListener('submit', function(event) {
    if (event.target.matches('#contact-form')) {
        handleContactForm(event);
    }
    
    if (event.target.matches('#newsletter-form')) {
        event.preventDefault();
        const email = event.target.querySelector('input[type="email"]').value;
        handleNewsletterSignup(email);
        event.target.reset();
    }
});

// Performance: Debounce para eventos de resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedResize = debounce(() => {
    lucide.createIcons();
}, 250);

window.addEventListener('resize', debouncedResize);

// Acessibilidade: Navegação por teclado
document.addEventListener('keydown', function(event) {
    // ESC para fechar menu mobile
    if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
    }
    
    // Tab trap no menu mobile
    if (isMobileMenuOpen && event.key === 'Tab') {
        const mobileMenu = document.getElementById('mobile-menu');
        const focusableElements = mobileMenu.querySelectorAll('button, a, input, select, textarea');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});

// SEO: Atualizar título da página
function updatePageTitle(page) {
    const titles = {
        home: 'Econorte - Higiene e praticidade para o seu ambiente',
        about: 'Sobre Nós - Econorte',
        shop: 'Loja - Econorte',
        contact: 'Contato - Econorte'
    };
    
    document.title = titles[page] || titles.home;
}

// Atualizar título quando navegar
const originalNavigateTo = navigateTo;
navigateTo = function(page) {
    originalNavigateTo(page);
    updatePageTitle(page);
};

// Analytics placeholder (Google Analytics, etc.)
function trackPageView(page) {
    // Implementar tracking quando necessário
    console.log('Page view:', page);
}

// LocalStorage para preferências do usuário
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`econorte_${key}`, JSON.stringify(value));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function getUserPreference(key, defaultValue) {
    try {
        const saved = localStorage.getItem(`econorte_${key}`);
        return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
        console.warn('Could not read from localStorage:', e);
        return defaultValue;
    }
}

// Inicializar preferências
document.addEventListener('DOMContentLoaded', function() {
    const savedPage = getUserPreference('lastPage', 'home');
    // Opcional: restaurar última página visitada
    // navigateTo(savedPage);
});

// Salvar página atual
window.addEventListener('beforeunload', function() {
    saveUserPreference('lastPage', currentPage);
});

console.log('Econorte app initialized successfully!'); 