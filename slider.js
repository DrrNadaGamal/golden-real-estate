// ======================================
// ملف إدارة السلايدر والعروض المتحركة
// ======================================


// سلايدر Hero الرئيسي
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.currentSlide = 0;
        this.dots = [];
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.createDots();
        this.setupNavigation();
        this.startAutoplay();
        this.setupTouchGestures();
    }

    createDots() {
        const dotsContainer = document.querySelector('.hero-dots');
        if (!dotsContainer) return;

        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'hero-dot';
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoplay();
            });

            this.dots.push(dot);
            dotsContainer.appendChild(dot);
        });
    }

    setupNavigation() {
        const prevBtn = document.querySelector('.hero-prev');
        const nextBtn = document.querySelector('.hero-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.resetAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoplay();
            });
        }
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        if (this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.remove('active');
        }

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        if (this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.add('active');
        }
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }

    setupTouchGestures() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;

        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleGesture();
        }, { passive: true });

        const handleGesture = () => {
            if (touchEndX < touchStartX - 50) {
                this.nextSlide();
                this.resetAutoplay();
            }
            if (touchEndX > touchStartX + 50) {
                this.previousSlide();
                this.resetAutoplay();
            }
        };

        this.handleGesture = handleGesture;
    }
}

// سلايدر الشهادات
class TestimonialSlider {
    constructor() {
        this.container = document.querySelector('.testimonials-slider-container');
        this.track = document.getElementById('testimonialsTrack');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.getElementById('testimonialPrev');
        this.nextBtn = document.getElementById('testimonialNext');
        
        this.currentIndex = 0;
        this.autoplayTimer = null;
        this.init();
    }

    init() {
        if (!this.track || this.cards.length === 0) return;

        this.setupLayout();
        this.setupNavigation();
        this.setupAutoplay();
        this.setupHoverPause();
    }

    setupLayout() {
        // توحيد ارتفاع الكروت لشكل متناسق
        let maxHeight = 0;
        this.cards.forEach(card => {
            card.style.height = 'auto';
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        this.cards.forEach(card => card.style.minHeight = `${maxHeight}px`);

        // إظهار أزرار التنقل لو عدد الكروت أكثر من 1
        if (this.cards.length > 1 && this.prevBtn && this.nextBtn) {
            this.prevBtn.style.display = 'flex';
            this.nextBtn.style.display = 'flex';
        }

        this.updateSlider();
    }

    setupNavigation() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.slide('prev'));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.slide('next'));
        }
    }

    slide(direction) {
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        }
        this.updateSlider();
    }

    updateSlider() {
        // حساب نسبة الإزاحة بالتوافق مع اتجاه اللغة العربية RTL
        const isRTL = document.documentElement.dir === 'rtl' || document.body.dir === 'rtl';
        const cardWidth = this.cards[0].offsetWidth + 32; // عرض الكارت + الـ gap
        const offset = this.currentIndex * cardWidth;

        this.track.style.transform = `translateX(${isRTL ? offset : -offset}px)`;
        
        // إبراز الكارت النشط
        this.cards.forEach((card, index) => {
            card.style.opacity = index === this.currentIndex ? '1' : '0.6';
            card.style.transition = 'all 0.4s ease';
        });
    }

    setupAutoplay() {
        this.startAutoplay();
    }

    startAutoplay() {
        if (this.cards.length <= 1) return;
        this.autoplayTimer = setInterval(() => {
            this.slide('next');
        }, 5000);
    }

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
        }
    }

    setupHoverPause() {
        if (!this.container) return;
        
        // إيقاف الحركة التلقائية عند الماوس ما ييجي على السكشن
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }
}

// تشغيل الكلاس بعد تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
});
// سلايدر الشركاء
class PartnersSlider {
    constructor() {
        this.slider = document.querySelector('.partners-slider');
        this.init();
    }

    init() {
        if (!this.slider) return;

        this.setupInfiniteScroll();
    }

    setupInfiniteScroll() {
        const logos = this.slider.querySelectorAll('.partner-logo');
        if (logos.length === 0) return;

        // نسخ الشعارات لإنشاء تأثير التمرير اللانهائي
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            this.slider.appendChild(clone);
        });

        let scrollPosition = 0;
        const scrollSpeed = 1;

        const animate = () => {
            scrollPosition += scrollSpeed;

            if (scrollPosition >= this.slider.scrollWidth / 2) {
                scrollPosition = 0;
            }

            this.slider.style.transform = `translateX(-${scrollPosition}px)`;
            requestAnimationFrame(animate);
        };

        // animate();
    }
}

// معرض الصور للعقارات
class PropertyGallery {
    constructor(propertyId) {
        this.propertyId = propertyId;
        this.images = [];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createGalleryModal();
    }

    createGalleryModal() {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-content">
                <button class="gallery-close">&times;</button>
                <button class="gallery-prev"><i class="fas fa-chevron-right"></i></button>
                <button class="gallery-next"><i class="fas fa-chevron-left"></i></button>
                <img class="gallery-image" src="" alt="عقار">
                <div class="gallery-counter">
                    <span class="gallery-current">1</span>
                    /
                    <span class="gallery-total">1</span>
                </div>
                <div class="gallery-thumbnails"></div>
            </div>
        `;

        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);
        this.modal = modal;
        this.setupGalleryControls();
    }

    setupGalleryControls() {
        const closeBtn = this.modal.querySelector('.gallery-close');
        const prevBtn = this.modal.querySelector('.gallery-prev');
        const nextBtn = this.modal.querySelector('.gallery-next');

        closeBtn.addEventListener('click', () => this.closeGallery());
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // إغلاق عند الضغط خارج الصورة
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeGallery();
            }
        });

        // التحكم بلوحة المفاتيح
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') this.nextImage();
                if (e.key === 'ArrowRight') this.previousImage();
                if (e.key === 'Escape') this.closeGallery();
            }
        });
    }

    openGallery(images, startIndex = 0) {
        if (!images || images.length === 0) return;
        this.images = images;
        this.currentIndex = startIndex;
        this.updateGallery();
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeGallery() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    updateGallery() {
        const image = this.modal.querySelector('.gallery-image');
        const current = this.modal.querySelector('.gallery-current');
        const total = this.modal.querySelector('.gallery-total');

        image.src = this.images[this.currentIndex];
        current.textContent = this.currentIndex + 1;
        total.textContent = this.images.length;

        this.updateThumbnails();
    }

    updateThumbnails() {
        const container = this.modal.querySelector('.gallery-thumbnails');
        container.innerHTML = '';

        this.images.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.className = 'gallery-thumb';
            if (index === this.currentIndex) thumb.classList.add('active');

            thumb.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateGallery();
            });

            container.appendChild(thumb);
        });
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateGallery();
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateGallery();
    }
}

// سلايدر مقارنة الصور (Before/After)
class ComparisonSlider {
    constructor(container) {
        this.container = container;
        if (this.container) this.init();
    }

    init() {
        const beforeImage = this.container.querySelector('.before-image');
        const handle = this.container.querySelector('.comparison-handle');

        if (!beforeImage || !handle) return;

        let isDragging = false;

        const updateSlider = (x) => {
            const containerRect = this.container.getBoundingClientRect();
            const position = Math.max(0, Math.min(x - containerRect.left, containerRect.width));
            const percentage = (position / containerRect.width) * 100;

            beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            handle.style.left = percentage + '%';
        };

        handle.addEventListener('mousedown', () => {
            isDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSlider(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // دعم اللمس
        handle.addEventListener('touchstart', () => {
            isDragging = true;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSlider(e.touches[0].clientX);
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
}

// تهيئة جميع السلايدرات
document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider
    new HeroSlider();

    // Testimonial Slider
    new TestimonialSlider();

    // Partners Slider
    new PartnersSlider();

    // Property Gallery
    window.propertyGallery = new PropertyGallery();

    // إعداد معرض الصور للعقارات
    document.querySelectorAll('.property-image').forEach(image => {
        image.addEventListener('click', function() {
            const imgEl = this.querySelector('img');
            if (imgEl && imgEl.src) {
                const images = [imgEl.src];
                window.propertyGallery.openGallery(images, 0);
            }
        });
    });
});

// دالة للتحكم في السلايدر من الخارج
window.changeSlide = function(direction) {
    const event = new CustomEvent('slideChange', { detail: { direction } });
    document.dispatchEvent(event);
};

// استماع لتغيير السلايد
document.addEventListener('slideChange', (e) => {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        if (e.detail.direction === 1) {
            document.querySelector('.hero-next')?.click();
        } else {
            document.querySelector('.hero-prev')?.click();
        }
    }
});

console.log('✅ تم تحميل ملف السلايدر بنجاح');