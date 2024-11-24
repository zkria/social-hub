// تفعيل زر تبديل المظهر
const themeBtn = document.querySelector('.theme-btn');
const themeIcon = themeBtn.querySelector('i');

// دالة تحديث أيقونة المظهر
function updateThemeIcon(isDark) {
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// دالة تبديل المظهر
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // حفظ التفضيل في localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // تحديث الأيقونة
    updateThemeIcon(isDark);
}

// تحقق من التفضيل المحفوظ
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
}

// إضافة مستمع الحدث لزر تبديل المظهر
themeBtn.addEventListener('click', toggleTheme); 