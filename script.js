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
    console.log('Toggle mobile menu called'); // Debug
    isMobileMenuOpen = !isMobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!mobileMenu || !menuIcon || !closeIcon) {
        console.error('Menu elements not found'); // Debug
        return;
    }
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.add('open');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Previne scroll
    } else {
        mobileMenu.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        document.body.style.overflow = ''; // Restaura scroll
    }
    
    // Recriar ícones após mudança
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function closeMobileMenu() {
    if (isMobileMenuOpen) {
        isMobileMenuOpen = false;
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (mobileMenu && menuIcon && closeIcon) {
            mobileMenu.classList.remove('open');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            document.body.style.overflow = ''; // Restaura scroll
            
            // Recriar ícones após mudança
            setTimeout(() => {
                lucide.createIcons();
            }, 100);
        }
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

// Careers Page Functionality
let submissionAttempts = 0;
const MAX_ATTEMPTS = 3;
let lastSubmissionTime = 0;
const RATE_LIMIT_MS = 60000; // 1 minute

// Supabase Configuration (replace with your actual config)
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize careers page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCareersPage();
});

function initCareersPage() {
    const careersForm = document.getElementById('careers-form');
    if (careersForm) {
        setupFormValidation();
        setupFileUpload();
        setupFormSubmission();
    }
}

// Form Validation System
function setupFormValidation() {
    const form = document.getElementById('careers-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
            updateSubmitButton();
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let message = '';

    // Clear previous validation
    field.classList.remove('valid', 'invalid');
    const validation = field.closest('.input-group, .file-upload-area').querySelector('.field-validation');
    validation.classList.remove('show', 'success', 'error');

    // Basic required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Este campo é obrigatório.';
    }

    // Specific validations
    if (value && isValid) {
        switch (fieldType) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Por favor, insira um e-mail válido.';
                }
                break;
                
            case 'tel':
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    message = 'Formato: (95) 99999-9999';
                }
                break;
                
            case 'text':
                if (fieldName === 'name') {
                    if (value.length < 3) {
                        isValid = false;
                        message = 'Nome deve ter pelo menos 3 caracteres.';
                    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                        isValid = false;
                        message = 'Nome deve conter apenas letras e espaços.';
                    }
                }
                break;
                
            case 'file':
                const file = field.files[0];
                if (file) {
                    if (file.type !== 'application/pdf') {
                        isValid = false;
                        message = 'Apenas arquivos PDF são aceitos.';
                    } else if (file.size > 1 * 1024 * 1024) { // 1MB
                        isValid = false;
                        message = 'Arquivo deve ter no máximo 1MB.';
                    }
                }
                break;
        }
    }

    // Apply validation result
    if (isValid && value) {
        field.classList.add('valid');
        if (validation) {
            validation.textContent = '✓ Campo válido';
            validation.classList.add('show', 'success');
        }
    } else if (!isValid) {
        field.classList.add('invalid');
        if (validation) {
            validation.textContent = message;
            validation.classList.add('show', 'error');
        }
    }

    return isValid;
}

// File Upload Functionality
function setupFileUpload() {
    const fileInput = document.getElementById('resume-file');
    const uploadArea = document.querySelector('.file-upload-area');
    const uploadContent = document.querySelector('.file-upload-content');
    const fileSelected = document.querySelector('.file-selected');
    const fileName = document.querySelector('.file-name');
    const fileRemove = document.querySelector('.file-remove');

    if (!fileInput || !uploadArea) return;

    // File input change
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect();
        }
    });

    // Remove file
    if (fileRemove) {
        fileRemove.addEventListener('click', () => {
            fileInput.value = '';
            uploadContent.style.display = 'flex';
            fileSelected.style.display = 'none';
            validateField(fileInput);
            updateSubmitButton();
        });
    }

    function handleFileSelect() {
        const file = fileInput.files[0];
        if (file) {
            fileName.textContent = file.name;
            uploadContent.style.display = 'none';
            fileSelected.style.display = 'flex';
            validateField(fileInput);
        } else {
            uploadContent.style.display = 'flex';
            fileSelected.style.display = 'none';
        }
        updateSubmitButton();
    }
}



// Form Submission
function setupFormSubmission() {
    const form = document.getElementById('careers-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

async function handleFormSubmission(event) {
    event.preventDefault();
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmissionTime < RATE_LIMIT_MS) {
        showNotification('Aguarde um minuto antes de enviar novamente.', 'error');
        return;
    }
    
    // Submission attempts check
    if (submissionAttempts >= MAX_ATTEMPTS) {
        showNotification('Muitas tentativas. Tente novamente mais tarde.', 'error');
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
    
    // Honeypot check
    if (formData.get('website')) {
        console.log('Bot detected');
        return;
    }

    // Validate all fields
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isFormValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showNotification('Por favor, corrija os erros no formulário.', 'error');
        return;
    }

    // Show loading state
    showLoadingState(true);
    submissionAttempts++;
    lastSubmissionTime = now;

    try {
        // Upload file to Supabase Storage (if configured)
        let resumeUrl = null;
        const resumeFile = formData.get('resume');
        
        if (resumeFile && resumeFile.size > 0) {
            resumeUrl = await uploadFileToSupabase(resumeFile);
        }

        // Prepare submission data
        const submissionData = {
            name: sanitizeInput(formData.get('name')),
            email: sanitizeInput(formData.get('email')),
            phone: sanitizeInput(formData.get('phone')),
            position: formData.get('position'),
            resume_url: resumeUrl,
            submitted_at: new Date().toISOString(),
            ip_address: await getUserIP(),
            user_agent: navigator.userAgent
        };

        // Submit to Supabase (if configured)
        await submitToSupabase(submissionData);
        
        // Success
        showNotification('Candidatura enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
        resetFormState();
        submissionAttempts = 0; // Reset on success
        
    } catch (error) {
        console.error('Submission error:', error);
        showNotification('Erro ao enviar candidatura. Tente novamente.', 'error');
    } finally {
        showLoadingState(false);
    }
}

// Supabase Integration
async function uploadFileToSupabase(file) {
    // This is a placeholder - implement with your Supabase configuration
    try {
        const fileName = `resumes/${Date.now()}_${file.name}`;
        // const { data, error } = await supabase.storage
        //     .from('careers')
        //     .upload(fileName, file);
        
        // if (error) throw error;
        // return data.path;
        
        // For now, return a placeholder URL
        return `placeholder_url_${Date.now()}`;
    } catch (error) {
        console.error('File upload error:', error);
        throw new Error('Erro ao fazer upload do currículo');
    }
}

async function submitToSupabase(data) {
    // This is a placeholder - implement with your Supabase configuration
    try {
        // const { error } = await supabase
        //     .from('job_applications')
        //     .insert([data]);
        
        // if (error) throw error;
        
        // For now, simulate success
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Application submitted:', data);
    } catch (error) {
        console.error('Database submission error:', error);
        throw new Error('Erro ao salvar candidatura');
    }
}

// Utility Functions
function sanitizeInput(input) {
    if (!input) return '';
    return input.toString().trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'unknown';
    }
}

function updateSubmitButton() {
    const form = document.getElementById('careers-form');
    const submitBtn = document.querySelector('.btn-submit-application');
    
    if (!form || !submitBtn) return;
    
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let allValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim() || field.classList.contains('invalid')) {
            allValid = false;
        }
    });
    
    submitBtn.disabled = !allValid;
}

function showLoadingState(loading) {
    const submitBtn = document.querySelector('.btn-submit-application');
    const btnContent = submitBtn.querySelector('.btn-content');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (loading) {
        btnContent.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
    } else {
        btnContent.style.display = 'flex';
        btnLoading.style.display = 'none';
        updateSubmitButton();
    }
}

function resetFormState() {
    const form = document.getElementById('careers-form');
    const uploadContent = document.querySelector('.file-upload-content');
    const fileSelected = document.querySelector('.file-selected');
    
    // Reset file upload display
    if (uploadContent && fileSelected) {
        uploadContent.style.display = 'flex';
        fileSelected.style.display = 'none';
    }
    
    // Clear all validations
    const validations = form.querySelectorAll('.field-validation');
    validations.forEach(validation => {
        validation.classList.remove('show', 'success', 'error');
    });
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    

}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${iconName}" class="notification-icon ${type}"></i>
            <div class="notification-text">
                <div class="notification-title">${type === 'success' ? 'Sucesso!' : 'Erro'}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Phone number formatting
function formatPhoneNumber(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    } else if (numbers.length >= 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
    return value;
}

// Apply phone formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('candidate-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const cursorPosition = e.target.selectionStart;
            const oldLength = e.target.value.length;
            e.target.value = formatPhoneNumber(e.target.value);
            const newLength = e.target.value.length;
            const newCursorPosition = cursorPosition + (newLength - oldLength);
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        });
    }
});

// WhatsApp for Careers
function openWhatsAppCareers() {
    const message = 'Olá! Gostaria de saber mais informações sobre as vagas disponíveis na Econorte.';
    const url = `https://wa.me/559591747792?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Update page titles for careers
const originalUpdatePageTitle = updatePageTitle;
updatePageTitle = function(page) {
    const titles = {
        home: 'Econorte - Higiene e praticidade para o seu ambiente',
        about: 'Sobre Nós - Econorte',
        shop: 'Loja - Econorte',
        careers: 'Trabalhe Conosco - Econorte',
        contact: 'Contato - Econorte'
    };
    
    document.title = titles[page] || titles.home;
};

console.log('Econorte app initialized successfully!'); 