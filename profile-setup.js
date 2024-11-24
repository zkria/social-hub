// ملف خاص بإعداد الملف الشخصي
class ProfileSetup {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.forms = document.querySelectorAll('.setup-form');
        this.steps = document.querySelectorAll('.step');
        this.nextBtn = document.querySelector('.next');
        this.backBtn = document.querySelector('.back');
        this.avatarInput = document.getElementById('avatarInput');
        this.avatarPreview = document.getElementById('avatarPreview');
        
        this.initializeEvents();
        this.initializeValidation();
    }

    initializeEvents() {
        // أزرار التنقل
        this.nextBtn?.addEventListener('click', () => this.handleNavigation('next'));
        this.backBtn?.addEventListener('click', () => this.handleNavigation('back'));

        // معاينة الصورة الشخصية
        this.avatarInput?.addEventListener('change', (e) => this.handleAvatarUpload(e));

        // ربط حسابات التواصل
        document.querySelectorAll('.connect-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialConnect(e));
        });
    }

    initializeValidation() {
        // التحقق من صحة البيانات في كل خطوة
        this.forms.forEach(form => {
            form.addEventListener('input', () => this.validateCurrentStep());
        });
    }

    handleNavigation(direction) {
        if (direction === 'next' && this.currentStep < this.totalSteps) {
            if (this.validateCurrentStep()) {
                this.currentStep++;
                this.updateUI();
            }
        } else if (direction === 'back' && this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        } else if (direction === 'next' && this.currentStep === this.totalSteps) {
            this.submitProfile();
        }
    }

    updateUI() {
        // تحديث الخطوات والنماذج
        this.forms.forEach(form => form.classList.remove('active'));
        this.steps.forEach(step => step.classList.remove('active'));

        document.querySelector(`[data-step="${this.currentStep}"]`).classList.add('active');
        this.forms[this.currentStep - 1].classList.add('active');

        // تحديث أزرار التنقل
        this.backBtn.style.display = this.currentStep === 1 ? 'none' : 'flex';
        this.nextBtn.innerHTML = this.currentStep === this.totalSteps ? 
            'إنهاء <i class="fas fa-check"></i>' : 
            'التالي <i class="fas fa-arrow-left"></i>';
    }

    validateCurrentStep() {
        const currentForm = this.forms[this.currentStep - 1];
        const requiredFields = currentForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                this.showFieldError(field);
            } else {
                this.removeFieldError(field);
            }
        });

        return isValid;
    }

    async handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (file) {
            if (this.validateImage(file)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.avatarPreview.src = e.target.result;
                    this.avatarPreview.classList.add('uploaded');
                };
                reader.readAsDataURL(file);
            }
        }
    }

    async handleSocialConnect(e) {
        const button = e.currentTarget;
        const platform = button.closest('.social-account').querySelector('.platform-icon i').className;
        
        try {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الربط...';
            
            // هنا يتم تنفيذ منطق ربط الحساب
            await this.connectSocialAccount(platform);
            
            button.innerHTML = '<i class="fas fa-check"></i> تم الربط';
            button.classList.add('connected');
        } catch (error) {
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> فشل الربط';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-link"></i> ربط الحساب';
                button.disabled = false;
            }, 3000);
        }
    }

    async submitProfile() {
        try {
            const formData = this.collectFormData();
            
            // إظهار حالة التحميل
            this.showSubmitLoading();
            
            // إرسال البيانات للخادم
            const response = await this.submitProfileAPI(formData);
            
            if (response.success) {
                // التوجيه إلى لوحة التحكم
                window.location.href = '/dashboard.html';
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    collectFormData() {
        // جمع البيانات من جميع النماذج
        const formData = new FormData();
        
        // البيانات الشخصية
        formData.append('avatar', this.avatarInput.files[0]);
        formData.append('firstName', document.querySelector('[name="firstName"]').value);
        formData.append('lastName', document.querySelector('[name="lastName"]').value);
        formData.append('bio', document.querySelector('[name="bio"]').value);
        
        // حسابات التواصل
        const socialAccounts = {};
        document.querySelectorAll('.social-account').forEach(account => {
            const platform = account.querySelector('.platform-icon i').className;
            const url = account.querySelector('input').value;
            if (url) socialAccounts[platform] = url;
        });
        formData.append('socialAccounts', JSON.stringify(socialAccounts));
        
        // الموقع الإلكتروني
        formData.append('website', document.querySelector('[name="website"]').value);
        
        return formData;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.querySelector('.setup-container').prepend(errorDiv);
        
        setTimeout(() => errorDiv.remove(), 3000);
    }
}

// تهيئة مدير إعداد الملف الشخصي
new ProfileSetup(); 