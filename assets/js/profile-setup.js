document.addEventListener('DOMContentLoaded', () => {
    initSetupForms();
    initSocialConnections();
    initAISettings();
});

// إدارة نماذج الإعداد
function initSetupForms() {
    const steps = document.querySelectorAll('.step');
    const forms = document.querySelectorAll('.setup-form');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 0;

    // التنقل بين الخطوات
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateCurrentForm()) {
                currentStep++;
                updateFormDisplay();
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            updateFormDisplay();
        });
    });

    // تحديث عرض النماذج
    function updateFormDisplay() {
        forms.forEach((form, index) => {
            form.classList.toggle('active', index === currentStep);
        });
        
        steps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentStep);
        });
    }

    // التحقق من صحة النموذج الحالي
    function validateCurrentForm() {
        const currentForm = forms[currentStep];
        const requiredFields = currentForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'هذا الحقل مطلوب');
            } else {
                clearError(field);
            }
        });

        return isValid;
    }
}

// ربط حسابات التواصل الاجتماعي
function initSocialConnections() {
    const connectButtons = document.querySelectorAll('.connect-account');
    
    connectButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const platform = button.closest('.social-account-card').querySelector('h3').textContent;
            try {
                const connected = await connectSocialAccount(platform);
                if (connected) {
                    button.textContent = 'تم الربط';
                    button.classList.add('connected');
                }
            } catch (error) {
                showError(button, 'فشل الاتصال. حاول مرة أخرى.');
            }
        });
    });
}

// إعدادات الذكاء الاصطناعي
function initAISettings() {
    const aiSettingsForm = document.getElementById('aiSettingsForm');
    
    if (aiSettingsForm) {
        aiSettingsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const settings = {
                replyStyle: document.getElementById('replyStyle').value,
                replySpeed: document.getElementById('replySpeed').value,
                postFrequency: document.getElementById('postFrequency').value
            };

            try {
                await saveAISettings(settings);
                window.location.href = '/dashboard';
            } catch (error) {
                showError(aiSettingsForm, 'حدث خطأ في حفظ الإعدادات');
            }
        });
    }
}

// محاكاة ربط حساب اجتماعي
async function connectSocialAccount(platform) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1500);
    });
}

// محاكاة حفظ إعدادات الذكاء الاصطناعي
async function saveAISettings(settings) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('aiSettings', JSON.stringify(settings));
            resolve(true);
        }, 1000);
    });
}

// عرض رسائل الخطأ
function showError(element, message) {
    clearError(element);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

// إزالة رسائل الخطأ
function clearError(element) {
    const errorDiv = element.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
} 