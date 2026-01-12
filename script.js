document.addEventListener('DOMContentLoaded' , () => {
    const form = document.getElementById('healthForm')

    //Helper function 

    function showError(elementId , message){
        const element  = document.getElementById(elementId)
        const formGroup = element.closest('.form-group');
        formGroup.classList.add('error');

        if(message){
            formGroup.querySelector('.error-message').innerText = message;
        }
    }

    function clearError(elementId){
        const element = document.getElementById(elementId);
        const formGroup = element.closest('.form-group');
        formGroup.classList.remove('error');
    }

    function showGroupError(groupId) {
        document.getElementById(groupId).classList.add('error');
    }

    function clearGroupError(groupId) {
        document.getElementById(groupId).classList.remove('error');
    }

    form.addEventListener('submit' , function(e){

        e.preventDefault();

        let isValid = true;
        let firstErrorElement = null;

        function validate(condition , id , isGroup=false){
            if(!condition){
                isValid = false
                isGroup ? showGroupError(id) : showError(id);
                if (!firstErrorElement) firstErrorElement = document.getElementById(id);
            }else{
                isGroup ? clearGroupError(id) : clearError(id);
            }
            return condition
        }

        // 1 .Full Name
        const fullName = document.getElementById('fullName');
        validate(fullName.value.trim() !== '', 'fullName');
        

        // 2. Date of Birth 
        const dob = document.getElementById('dob');
        let ageValid = false;
        if (dob.value) {
            const birthDate = new Date(dob.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            ageValid = age >= 18;
            if (age < 18) showError('dob', 'You must be 18+ years old.');
            else clearError('dob');
        } else {
            showError('dob', 'Date of birth is required.');
        }
        if (!ageValid) isValid = false;


        // 3. Email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validate(emailPattern.test(email.value), 'email');

        // 4. Phone
        const phone = document.getElementById('phone');
        const phonePattern = /^\d{10}$/;
        validate(phonePattern.test(phone.value), 'phone');

        // 5. Height (100-250)
        const height = document.getElementById('height');
        validate(height.value >= 100 && height.value <= 250, 'height');

        // 6. Weight (30-200)
        const weight = document.getElementById('weight');
        validate(weight.value >= 30 && weight.value <= 200, 'weight');

        // 7. Blood Type
        const bloodType = document.getElementById('bloodType');
        validate(bloodType.value !== '', 'bloodType')

        // 8. Chronic Diseases 
        const diseases = document.querySelectorAll('input[name="disease[]"]:checked');
        validate(diseases.length > 0, 'diseaseGroup', true);

        // 9. Exercise Frequency 
        const exercise = document.querySelector('input[name="exercise"]:checked');
        validate(exercise !== null, 'exerciseGroup', true);

        // 10. Privacy
        const privacy = document.getElementById('privacy');
        validate(privacy.checked, 'privacyGroup', true);

        if(isValid){
            alert("Form submitted successfully!");
        }else{
            
            const errorSection = document.querySelector('.form-group.error');
            if (errorSection) {
                errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

    })

})