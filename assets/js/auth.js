document.addEventListener('DOMContentLoaded', () => {
    initAuthForm();
    initPasswordToggle();
    initSocialLogin();
});

// تهيئة نموذج تسجيل الدخول
function initAuthForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            try {
                const response = await authenticateUser({ email, password, remember });
                if (response.success) {
                    // تخزين بيانات المستخدم
                    localStorage.setItem('authToken', response.token);
                    localStorage.setItem('userData', JSON.stringify(response.user));
                    
                    // توجيه المستخدم للوحة التحكم
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                showError('فشل تسجيل الدخول. يرجى التحقق من بياناتك.');
            }
        });
    }
}

// تبديل رؤية كلمة المرور
function initPasswordToggle() {
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleBtn.querySelector('i').classList.toggle('fa-eye');
            toggleBtn.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

// تسجيل الدخول بحسابات التواصل الاجتماعي
function initSocialLogin() {
    const googleBtn = document.querySelector('.btn-google');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            try {
                const response = await initGoogleAuth();
                if (response.success) {
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                showError('فشل تسجيل الدخول باستخدام Google');
            }
        });
    }
}

// محاكاة عملية المصادقة
async function authenticateUser(credentials) {
    // هنا يتم الاتصال بالخادم للتحقق من البيانات
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                token: 'mock_token_123',
                user: {
                    id: 1,
                    name: 'مستخدم تجريبي',
                    email: credentials.email
                }
            });
        }, 1000);
    });
}

// محاكاة تسجيل الدخول باستخدام Google
async function initGoogleAuth() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                token: 'google_mock_token_123'
            });
        }, 1000);
    });
}

// عرض رسائل الخطأ
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.getElementById('loginForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => errorDiv.remove(), 3000);
} 