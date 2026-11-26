// ======================================
// ملف التأثيرات والأنيميشن
// ======================================

// تأثيرات التمرير المتقدمة
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.observeElements();
        this.setupParallax();
        this.setupCounters();
    }

    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.aos;
                    const delay = element.dataset.aosDelay || 0;

                    setTimeout(() => {
                        element.classList.add('aos-animate');
                        this.applyAnimation(element, animation);
                    }, delay);

                    observer.unobserve(element);
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }

    applyAnimation(element, animation) {
        switch(animation) {
            case 'fade-up':
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                element.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 10);
                break;

            case 'fade-down':
                element.style.opacity = '0';
                element.style.transform = 'translateY(-50px)';
                element.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 10);
                break;

            case 'fade-right':
                element.style.opacity = '0';
                element.style.transform = 'translateX(-50px)';
                element.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                }, 10);
                break;

            case 'fade-left':
                element.style.opacity = '0';
                element.style.transform = 'translateX(50px)';
                element.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                }, 10);
                break;

            case 'zoom-in':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                element.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                }, 10);
                break;

            case 'flip-left':
                element.style.opacity = '0';
                element.style.transform = 'perspective(1000px) rotateY(-45deg)';
                element.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'perspective(1000px) rotateY(0)';
                }, 10);
                break;
        }
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');

        const countUp = (element, target, duration = 2000) => {
            let current = 0;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString('ar-SA');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString('ar-SA');
                }
            }, 16);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    countUp(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }
}

// تأثيرات الماوس
class MouseEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupCardTilt();
        this.setupCursorFollow();
        this.setupHoverEffects();
    }

    setupCardTilt() {
        const cards = document.querySelectorAll('.property-card, .feature-card, .service-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    setupCursorFollow() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid #d4af37;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    }

    setupHoverEffects() {
        const buttons = document.querySelectorAll('button, .btn, a.nav-link');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                this.style.setProperty('--mouse-x', x + 'px');
                this.style.setProperty('--mouse-y', y + 'px');
            });
        });
    }
}

// تأثيرات الصفحة
class PageEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageTransition();
        this.setupLoadingAnimation();
        this.setupSectionReveal();
    }

    setupPageTransition() {
        window.addEventListener('beforeunload', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease-out';
        });
    }

    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease-in';
                document.body.style.opacity = '1';
            }, 100);
        });
    }

    setupSectionReveal() {
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease-out';

            section.classList.add('section-hidden');
            observer.observe(section);
        });

        // إضافة CSS للأقسام المرئية
        const style = document.createElement('style');
        style.textContent = `
            .section-visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// تأثيرات النصوص
class TextEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriter();
        this.setupTextReveal();
    }

    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');

        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            let i = 0;

            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        });
    }

    setupTextReveal() {
        const revealElements = document.querySelectorAll('.text-reveal');

        revealElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.animation = `fadeInChar 0.5s ease-out ${index * 0.03}s forwards`;
                element.appendChild(span);
            });
        });

        // إضافة CSS للأنيميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInChar {
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// تأثيرات الجسيمات (Particles)
class ParticleEffect {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';

        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        const count = 50;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
            this.ctx.fill();
        });

        // رسم الخطوط بين الجسيمات القريبة
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// تهيئة جميع التأثيرات
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new MouseEffects();
    new PageEffects();
    new TextEffects();

    // تطبيق تأثير الجسيمات على Hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        new ParticleEffect(heroSection);
    }
});

// تأثيرات إضافية للبطاقات
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.property-card, .feature-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

console.log('✅ تم تحميل ملف التأثيرات والأنيميشن بنجاح');