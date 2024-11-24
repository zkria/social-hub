// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    initAIFeatures();
    initThemeSwitch();
    initScrollEffects();
});

// تهيئة الميزات الذكية
function initAIFeatures() {
    // الرد التلقائي
    const autoReply = {
        analyze: (message) => {
            // تحليل الرسالة باستخدام AI
            return {
                intent: 'استفسار',
                sentiment: 'إيجابي',
                priority: 'متوسط'
            };
        },
        
        generateResponse: (analysis) => {
            // توليد رد مناسب
            return {
                message: 'شكراً لتواصلك معنا',
                suggestions: ['خدمة العملاء', 'الدعم الفني']
            };
        }
    };

    // جدولة المحتوى
    const contentScheduler = {
        analyzeBestTimes: () => {
            // تحليل أفضل أوقات النشر
            return {
                weekday: '18:00',
                weekend: '20:00'
            };
        },
        
        optimizeContent: (content) => {
            // تحسين المحتوى
            return {
                optimizedText: content,
                suggestedHashtags: ['#AI', '#DigitalMarketing']
            };
        }
    };

    // تحليل الهاشتاغات
    const hashtagAnalyzer = {
        trackTrends: () => {
            // تتبع الهاشتاغات الشائعة
            return {
                trending: ['#التسويق_الرقمي', '#الذكاء_الاصطناعي'],
                engagement: ['high', 'medium']
            };
        }
    };

    // تصدير الوظائف للاستخدام العام
    window.aiFeatures = {
        autoReply,
        contentScheduler,
        hashtagAnalyzer
    };
}

// تأثيرات التمرير
function initScrollEffects() {
    const elements = document.querySelectorAll('.feature-card, .ai-tool');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    elements.forEach(element => observer.observe(element));
}

// تبديل الثيم
function initThemeSwitch() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.setAttribute('data-theme',
                document.documentElement.getAttribute('data-theme') === 'dark' 
                    ? 'light' 
                    : 'dark'
            );
            localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
        });
    }
}

// تبديل اللغة
function initLanguageSwitch() {
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = document.documentElement.getAttribute('lang');
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            document.documentElement.setAttribute('lang', newLang);
            document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
            localStorage.setItem('lang', newLang);
        });
    }
}

// القائمة المتنقلة
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.nav-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
} 