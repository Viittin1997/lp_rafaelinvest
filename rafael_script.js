document.addEventListener('DOMContentLoaded', function() {
    // Animações e interatividade
    initAnimations();
    initButtonEffects();
    initScrollEffects();
    initParticles();
    
    // Tracking de eventos
    trackButtonClicks();
});

// Inicializar animações
function initAnimations() {
    // Animação de entrada dos elementos
    const elementsToAnimate = document.querySelectorAll('.profile, .subtitle, .hero, .feature-box, .benefit-card, .bottom-cta');
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Animação de pulse para os botões CTA após um tempo
    setTimeout(() => {
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.classList.add('pulse');
            
            // Remover a classe após a animação para permitir repetições
            button.addEventListener('animationend', () => {
                button.classList.remove('pulse');
                
                // Repetir a animação periodicamente
                setInterval(() => {
                    button.classList.add('pulse');
                    button.addEventListener('animationend', () => {
                        button.classList.remove('pulse');
                    }, { once: true });
                }, 10000); // Repetir a cada 10 segundos
            }, { once: true });
        });
    }, 2000);
}

// Inicializar efeitos de botões
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        // Efeito de hover em dispositivos móveis
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// Inicializar efeitos de scroll
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax para elementos de fundo
        document.body.style.backgroundPosition = `center ${scrollPosition * 0.05}px`;
        
        // Revelar elementos quando estiverem visíveis
        const elementsToReveal = document.querySelectorAll('.feature-box, .benefit-card');
        
        elementsToReveal.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// Inicializar partículas de fundo
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Criar partículas
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

// Criar uma partícula individual
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Tamanho aleatório
    const size = Math.random() * 5 + 1;
    
    // Velocidade aleatória
    const speedX = (Math.random() - 0.5) * 0.2;
    const speedY = (Math.random() - 0.5) * 0.2;
    
    // Opacidade aleatória
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Aplicar estilos
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
    
    // Animar a partícula
    animateParticle(particle, posX, posY, speedX, speedY);
}

// Animar uma partícula
function animateParticle(particle, posX, posY, speedX, speedY) {
    let x = posX;
    let y = posY;
    
    function update() {
        // Atualizar posição
        x += speedX;
        y += speedY;
        
        // Verificar limites
        if (x < 0 || x > 100) {
            x = Math.max(0, Math.min(100, x));
            speedX = -speedX;
        }
        
        if (y < 0 || y > 100) {
            y = Math.max(0, Math.min(100, y));
            speedY = -speedY;
        }
        
        // Aplicar nova posição
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Continuar animação
        requestAnimationFrame(update);
    }
    
    update();
}

// Rastrear cliques nos botões para Facebook Pixel
function trackButtonClicks() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Rastrear evento de clique no Facebook Pixel
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: 'Rafael Invest - Telegram Group',
                    content_category: 'Telegram Subscription'
                });
            }
            
            // Adicionar efeito visual ao clicar
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    });
}

// Funções de utilidade
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adicionar funcionalidade de smooth scroll para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar contador de pessoas online (simulado)
function initOnlineCounter() {
    const counterElement = document.querySelector('.online-counter');
    
    if (counterElement) {
        // Gerar número aleatório entre 120 e 250
        const baseCount = Math.floor(Math.random() * (250 - 120 + 1)) + 120;
        counterElement.textContent = baseCount;
        
        // Atualizar periodicamente
        setInterval(() => {
            // Adicionar ou subtrair um pequeno número aleatório para simular flutuação
            const change = Math.floor(Math.random() * 7) - 3; // -3 a +3
            const newCount = parseInt(counterElement.textContent) + change;
            
            // Manter dentro de limites razoáveis
            if (newCount >= 110 && newCount <= 260) {
                counterElement.textContent = newCount;
            }
        }, 5000);
    }
}

// Inicializar contador se o elemento existir
if (document.querySelector('.online-counter')) {
    initOnlineCounter();
}

// Adicionar data dinâmica para elementos com a classe 'current-date'
document.querySelectorAll('.current-date').forEach(element => {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    element.textContent = now.toLocaleDateString('pt-BR', options);
});

// Detectar se o usuário está em um dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Ajustar a experiência com base no dispositivo
if (isMobile) {
    document.body.classList.add('mobile-device');
    
    // Otimizações para dispositivos móveis
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.display = 'none';
    });
}

// Adicionar CSS para animações
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 136, 204, 0.7);
    }
    70% {
        box-shadow: 0 0 0 15px rgba(0, 136, 204, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(0, 136, 204, 0);
    }
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
}

.pulse {
    animation: pulse 1s ease-in-out;
}

.particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}

.particle {
    position: absolute;
    background-color: rgba(0, 136, 204, 0.3);
    border-radius: 50%;
}
</style>
`);
