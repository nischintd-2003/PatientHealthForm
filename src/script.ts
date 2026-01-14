document.addEventListener('DOMContentLoaded',()=>{

    const form  = document.getElementById('healthForm') as HTMLFormElement ;

    function showError(elementId : string , message : string): void{
        const element = document.getElementById(elementId);

        if(!element) return;
        
        const formGroup = element.closest('.form-group');

        if(formGroup){
            formGroup.classList.add('error');
            const errorMsg = formGroup.querySelector('.error-message') as HTMLElement;
            if (errorMsg) errorMsg.innerText = message;
        }
        
    }
    
    function clearError(elementId : string) : void{
        const element = document.getElementById(elementId);
        
        if(!element) return;

        const formGroup = element.closest('.form-group');

        if(formGroup){
            formGroup.classList.remove('error');
            const errorMsg = formGroup.querySelector('.error-message') as HTMLElement;
            if (errorMsg) errorMsg.innerText = '';
        }

    }

    function showGroupError(groupId : string , message : string):void {
        const groupElement = document.getElementById(groupId);
        if(!groupElement) return;
        groupElement.classList.add('error');

        if(message){
            const errorMsg = groupElement.querySelector('.error-message') as HTMLElement;
            if(errorMsg) errorMsg.innerText = message;
        }
    }

    function clearGroupError(groupId : string) : void {
        const groupElement  = document.getElementById(groupId);
        if(!groupElement) return;
        groupElement.classList.remove('error')
    }

    // Validation

    form.addEventListener('submit',function(e){
        e.preventDefault();

        let isValid = true;
        let firstErrorElement : HTMLElement | null = null;

        function validate(condition : boolean, id : string, message : string, isGroup = false) {
            if (!condition) {
                isValid = false;
                isGroup ? showGroupError(id, message) : showError(id, message);
                if (!firstErrorElement) firstErrorElement = document.getElementById(id);
            } else {
                isGroup ? clearGroupError(id) : clearError(id);
            }
            return condition;
        }    
        
        
        const fullName = document.getElementById('fullName') as HTMLInputElement;
        validate(fullName.value.trim() !== '', 'fullName', 'Full Name is required.');

        const dob = document.getElementById('dob') as HTMLInputElement;
        let ageValid = false;
        if (dob.value) {
            const birthDate = new Date(dob.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            // Check if 18+
            if (age < 18) {
                showError('dob', 'You must be at least 18 years old.');
                isValid = false;
                if (!firstErrorElement) firstErrorElement = dob;
            } else {
                clearError('dob');
                ageValid = true;
            }
        } else {
            showError('dob', 'Date of birth is required.');
            isValid = false;
            if (!firstErrorElement) firstErrorElement = dob;
        }
        
        
        const email = document.getElementById('email') as HTMLInputElement;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailFilled = validate(email.value.trim() !== '', 'email', 'Email is required.');
        if (emailFilled) {
            validate(emailPattern.test(email.value), 'email', 'Invalid email format.');
        }
        
        const phone = document.getElementById('phone') as HTMLInputElement;
        const phonePattern = /^\d{10}$/;
        const phoneFilled = validate(phone.value.trim() !== '', 'phone', 'Phone number is required.');
        if (phoneFilled) {
            validate(phonePattern.test(phone.value), 'phone', 'Phone Number must be 10 digits.');
        }        
        
        const height = document.getElementById('height') as HTMLInputElement;
        const heightValue = parseFloat(height.value);
        const heightFilled = validate(height.value !== '', 'height', 'Height is required.');
        if (heightFilled) {
            validate(heightValue >= 100 && heightValue <= 250, 'height', 'Height must be 100-250cm.');
        }
        
        const weight = document.getElementById('weight') as HTMLInputElement;
        const weightValue = parseFloat(weight.value);
        const weightFilled = validate(weight.value !== '', 'weight', 'Weight is required.');
        if (weightFilled) {
            validate(weightValue >= 30 && weightValue <= 200, 'weight', 'Weight must be 30-200kg.');
        }


        const bloodType = document.getElementById('bloodType') as HTMLSelectElement;
        validate(bloodType.value !== '', 'bloodType', 'Blood type is required.');


        const diseases = form.querySelectorAll('input[name="disease"]:checked');
        validate(diseases.length > 0, 'diseaseGroup', 'Select at least one (or None).', true);

        const exercise = form.querySelector('input[name="exercise"]:checked');
        validate(exercise !== null, 'exerciseGroup', 'Please select an option.', true);

        const privacy = document.getElementById('privacy') as HTMLInputElement;
        validate(privacy.checked, 'privacyGroup', 'You must agree to the privacy policy.', true);


        if(isValid){
            console.log("Validation Successful!");
            alert("Form submitted successfully!");
        }else{
            
            const errorSection = document.querySelector('.form-group.error');
            if (errorSection) {
                errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

    })

})