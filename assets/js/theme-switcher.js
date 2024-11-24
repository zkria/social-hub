class ThemeSwitcher {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // تعيين الثيم المحفوظ
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // تهيئة زر تبديل الثيم
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            this.updateToggleButton(themeToggle);
            themeToggle.addEventListener('click', () => this.toggleTheme(themeToggle));
        }
    }

    toggleTheme(button) {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateToggleButton(button);
    }

    updateToggleButton(button) {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = this.theme === 'light' 
                ? 'fas fa-moon' 
                : 'fas fa-sun';
        }
    }
}

// تهيئة مبدل الثيم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('checkbox');
    
    // التحقق من الوضع المحفوظ
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }

    // تبديل الوضع
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            animateSwitch('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            animateSwitch('light');
        }
    });

    // إضافة حركة للتبديل
    function animateSwitch(mode) {
        const switchCircle = document.querySelector('.switch-circle');
        const switchNight = document.querySelector('.switch-night');
        
        if (mode === 'dark') {
            switchCircle.style.transform = 'translateX(40px)';
            switchNight.style.opacity = '1';
        } else {
            switchCircle.style.transform = 'translateX(0)';
            switchNight.style.opacity = '0.5';
        }
    }
}); 