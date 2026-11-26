// ======================================
// ملف الفلاتر والبحث المتقدم
// ======================================

// نظام الفلترة للعقارات
class PropertyFilters {
    constructor() {
        this.properties = document.querySelectorAll('.property-card');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupSearchFunctionality();
        this.setupSortOptions();
        this.setupPriceRangeFilter();
    }

    setupFilterButtons() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // إزالة التفعيل من جميع الأزرار
                this.filterBtns.forEach(b => b.classList.remove('active'));

                // تفعيل الزر المضغوط
                btn.classList.add('active');

                // الحصول على الفئة
                const filter = btn.dataset.filter;
                this.activeFilter = filter;

                // تطبيق الفلتر
                this.applyFilter(filter);
            });
        });
    }

    applyFilter(filter) {
        this.properties.forEach((property, index) => {
            const category = property.dataset.category;

            // إخفاء جميع العقارات أولاً
            property.style.display = 'none';
            property.style.opacity = '0';
            property.style.transform = 'scale(0.8)';

            // إظهار العقارات المطابقة
            setTimeout(() => {
                if (filter === 'all' || category === filter) {
                    property.style.display = 'block';

                    setTimeout(() => {
                        property.style.transition = 'all 0.5s ease-out';
                        property.style.opacity = '1';
                        property.style.transform = 'scale(1)';
                    }, index * 50);
                }
            }, 200);
        });

        // تحديث عدد النتائج
        this.updateResultsCount();
    }

    updateResultsCount() {
        setTimeout(() => {
            const visibleProperties = Array.from(this.properties).filter(
                p => p.style.display !== 'none'
            );

            console.log(`عدد العقارات المعروضة: ${visibleProperties.length}`);
        }, 300);
    }

    setupSearchFunctionality() {
        const searchInputs = document.querySelectorAll('.search-field input[type="text"]');

        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.searchProperties(searchTerm);
            });
        });
    }

    searchProperties(term) {
        this.properties.forEach(property => {
            const title = property.querySelector('.property-title').textContent.toLowerCase();
            const location = property.querySelector('.property-location').textContent.toLowerCase();

            if (title.includes(term) || location.includes(term) || term === '') {
                property.style.display = 'block';
                property.style.opacity = '1';
            } else {
                property.style.display = 'none';
                property.style.opacity = '0';
            }
        });
    }

    setupSortOptions() {
        // إنشاء قائمة الترتيب
        const sortContainer = document.createElement('div');
        sortContainer.className = 'sort-container';
        sortContainer.style.cssText = `
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
            gap: 10px;
            align-items: center;
        `;

        sortContainer.innerHTML = `
            <label style="color: #6c757d; font-weight: 600;">ترتيب حسب:</label>
            <select class="sort-select" style="
                padding: 10px 20px;
                border: 2px solid #f8f9fa;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                font-weight: 600;
                color: #1a1a2e;
            ">
                <option value="default">الافتراضي</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="newest">الأحدث</option>
                <option value="area-asc">المساحة: من الأصغر للأكبر</option>
                <option value="area-desc">المساحة: من الأكبر للأصغر</option>
            </select>
        `;

        const propertiesSection = document.querySelector('.properties');
        if (propertiesSection) {
            const filtersContainer = propertiesSection.querySelector('.property-filters');
            if (filtersContainer) {
                filtersContainer.parentNode.insertBefore(sortContainer, filtersContainer.nextSibling);
            }
        }

        const sortSelect = sortContainer.querySelector('.sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.sortProperties(e.target.value);
        });
    }

    sortProperties(sortType) {
        const propertiesGrid = document.querySelector('.properties-grid');
        const propertiesArray = Array.from(this.properties);

        propertiesArray.sort((a, b) => {
            switch(sortType) {
                case 'price-asc':
                    return this.getPrice(a) - this.getPrice(b);
                case 'price-desc':
                    return this.getPrice(b) - this.getPrice(a);
                case 'area-asc':
                    return this.getArea(a) - this.getArea(b);
                case 'area-desc':
                    return this.getArea(b) - this.getArea(a);
                case 'newest':
                    return 0; // يمكن إضافة تاريخ للعقارات
                default:
                    return 0;
            }
        });

        // إعادة ترتيب العناصر في DOM
        propertiesArray.forEach(property => {
            propertiesGrid.appendChild(property);
        });

        // تطبيق أنيميشن
        propertiesArray.forEach((property, index) => {
            property.style.opacity = '0';
            property.style.transform = 'translateY(20px)';

            setTimeout(() => {
                property.style.transition = 'all 0.5s ease-out';
                property.style.opacity = '1';
                property.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    getPrice(property) {
        const priceText = property.querySelector('.property-price').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        return price || 0;
    }

    getArea(property) {
        const features = property.querySelectorAll('.property-features span');
        let area = 0;

        features.forEach(feature => {
            if (feature.textContent.includes('م²')) {
                area = parseInt(feature.textContent.replace(/[^0-9]/g, ''));
            }
        });

        return area;
    }

    setupPriceRangeFilter() {
        // يمكن إضافة فلتر نطاق الأسعار هنا
        const priceSelects = document.querySelectorAll('.search-field select');

        priceSelects.forEach(select => {
            if (select.options[0].textContent.includes('السعر')) {
                select.addEventListener('change', (e) => {
                    this.filterByPriceRange(e.target.value);
                });
            }
        });
    }

    filterByPriceRange(range) {
        if (!range || range === 'نطاق السعر') {
            this.applyFilter(this.activeFilter);
            return;
        }

        this.properties.forEach(property => {
            const price = this.getPrice(property);
            let show = false;

            switch(range) {
                case 'أقل من 500,000':
                    show = price < 500000;
                    break;
                case '500,000 - 1,000,000':
                    show = price >= 500000 && price <= 1000000;
                    break;
                case '1,000,000 - 2,000,000':
                    show = price >= 1000000 && price <= 2000000;
                    break;
                case '2,000,000 - 5,000,000':
                    show = price >= 2000000 && price <= 5000000;
                    break;
                case 'أكثر من 5,000,000':
                    show = price > 5000000;
                    break;
            }

            if (show) {
                property.style.display = 'block';
                property.style.opacity = '1';
            } else {
                property.style.display = 'none';
                property.style.opacity = '0';
            }
        });
    }
}

// نظام البحث المتقدم
class AdvancedSearch {
    constructor() {
        this.searchCriteria = {
            location: '',
            type: '',
            rooms: '',
            price: '',
            area: '',
            amenities: []
        };
        this.init();
    }

    init() {
        this.createAdvancedSearchModal();
    }

    createAdvancedSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'advancedSearchModal';

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <button class="modal-close" onclick="closeModal('advancedSearchModal')">&times;</button>
                <h2>البحث المتقدم</h2>
                <form class="advanced-search-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>الموقع</label>
                            <input type="text" class="form-control" name="location" placeholder="المدينة أو الحي">
                        </div>
                        <div class="form-group">
                            <label>نوع العقار</label>
                            <select class="form-control" name="type">
                                <option value="">الكل</option>
                                <option value="villa">فيلا</option>
                                <option value="apartment">شقة</option>
                                <option value="land">أرض</option>
                                <option value="building">عمارة</option>
                                <option value="duplex">دوبلكس</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>عدد الغرف</label>
                            <select class="form-control" name="rooms">
                                <option value="">الكل</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>عدد الحمامات</label>
                            <select class="form-control" name="bathrooms">
                                <option value="">الكل</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4+">4+</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>السعر من</label>
                            <input type="number" class="form-control" name="priceMin" placeholder="0">
                        </div>
                        <div class="form-group">
                            <label>السعر إلى</label>
                            <input type="number" class="form-control" name="priceMax" placeholder="10,000,000">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>المساحة من (م²)</label>
                            <input type="number" class="form-control" name="areaMin" placeholder="0">
                        </div>
                        <div class="form-group">
                            <label>المساحة إلى (م²)</label>
                            <input type="number" class="form-control" name="areaMax" placeholder="1000">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>المميزات</label>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 10px;">
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" name="amenities" value="مسبح">
                                <span>مسبح</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" name="amenities" value="موقف">
                                <span>موقف سيارات</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" name="amenities" value="حديقة">
                                <span>حديقة</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" name="amenities" value="مصعد">
                                <span>مصعد</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" name="amenities" value="حراسة">
                                <span>حراسة</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" name="amenities" value="جيم">
                                <span>جيم</span>
                            </label>
                        </div>
                    </div>

                    <div style="display: flex; gap: 15px; margin-top: 30px;">
                        <button type="submit" class="btn-submit" style="flex: 1;">
                            <i class="fas fa-search"></i> بحث
                        </button>
                        <button type="button" class="btn-secondary" style="flex: 1; padding: 15px; border-radius: 10px;" onclick="this.closest('form').reset()">
                            <i class="fas fa-redo"></i> إعادة تعيين
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // معالج إرسال النموذج
        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performAdvancedSearch(new FormData(form));
            closeModal('advancedSearchModal');
        });
    }

    performAdvancedSearch(formData) {
        console.log('تنفيذ البحث المتقدم...');

        const criteria = {
            location: formData.get('location'),
            type: formData.get('type'),
            rooms: formData.get('rooms'),
            bathrooms: formData.get('bathrooms'),
            priceMin: formData.get('priceMin'),
            priceMax: formData.get('priceMax'),
            areaMin: formData.get('areaMin'),
            areaMax: formData.get('areaMax'),
            amenities: formData.getAll('amenities')
        };

        console.log('معايير البحث:', criteria);

        // تطبيق الفلاتر
        const properties = document.querySelectorAll('.property-card');

        properties.forEach(property => {
            let match = true;

            // فلتر حسب النوع
            if (criteria.type && property.dataset.category !== criteria.type) {
                match = false;
            }

            // يمكن إضافة المزيد من شروط البحث هنا

            if (match) {
                property.style.display = 'block';
                property.style.opacity = '1';
            } else {
                property.style.display = 'none';
                property.style.opacity = '0';
            }
        });

        showNotification('تم تطبيق معايير البحث بنجاح', 'success');
    }
}

// تهيئة أنظمة الفلترة
document.addEventListener('DOMContentLoaded', () => {
    new PropertyFilters();
    new AdvancedSearch();

    // إعداد زر تحميل المزيد
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';

            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus-circle"></i> عرض المزيد من العقارات';
                showNotification('تم تحميل المزيد من العقارات', 'success');
            }, 1500);
        });
    }
});

// إضافة أنماط CSS للفلاتر
const filterStyles = document.createElement('style');
filterStyles.textContent = `
    .sort-container {
        animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .sort-select:hover {
        border-color: #d4af37;
    }

    .sort-select:focus {
        outline: none;
        border-color: #d4af37;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }
`;

document.head.appendChild(filterStyles);

console.log('✅ تم تحميل ملف الفلاتر والبحث بنجاح');