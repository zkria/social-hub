// التحقق من وجود صفحة سابقة
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.display = window.history.length > 1 ? 'flex' : 'none';
    }
});

// تفعيل القائمة النشطة
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    if (item.getAttribute('href') === window.location.pathname) {
        item.classList.add('active');
    }
}); 