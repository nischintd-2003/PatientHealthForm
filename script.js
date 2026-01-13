document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('healthForm');

    // Helper Functions 

    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        const formGroup = element.closest('.form-group');
        formGroup.classList.add('error');

        if (message) {
            const errorMsg = formGroup.querySelector('.error-message');
            if(errorMsg) errorMsg.innerText = message;
        }
    }

    function clearError(elementId) {
        const element = document.getElementById(elementId);
        const formGroup = element.closest('.form-group');
        formGroup.classList.remove('error');
    }

    function showGroupError(groupId, message) {
        const groupElement = document.getElementById(groupId);
        groupElement.classList.add('error');
        
        if (message) {
            const errorMsg = groupElement.querySelector('.error-message');
            if(errorMsg) errorMsg.innerText = message;
        }
    }

    function clearGroupError(groupId) {
        document.getElementById(groupId).classList.remove('error');
    }

    //Validation Logic 

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        let firstErrorElement = null;

        function validate(condition, id, message, isGroup = false) {
            if (!condition) {
                isValid = false;
                isGroup ? showGroupError(id, message) : showError(id, message);
                if (!firstErrorElement) firstErrorElement = document.getElementById(id);
            } else {
                isGroup ? clearGroupError(id) : clearError(id);
            }
            return condition;
        }

        // 1. Full Name
        const fullName = document.getElementById('fullName');
        validate(fullName.value.trim() !== '', 'fullName', 'Full Name is required.');

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

        // 3. Email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailFilled = validate(email.value.trim() !== '', 'email', 'Email is required.');
        if (emailFilled) {
            validate(emailPattern.test(email.value), 'email', 'Invalid email format.');
        }

        // 4. Phone
        const phone = document.getElementById('phone');
        const phonePattern = /^\d{10}$/;
        const phoneFilled = validate(phone.value.trim() !== '', 'phone', 'Phone number is required.');
        if (phoneFilled) {
            validate(phonePattern.test(phone.value), 'phone', 'Phone Number must be 10 digits.');
        }

        // 5. Height (100-250)
        const height = document.getElementById('height');
        const heightFilled = validate(height.value !== '', 'height', 'Height is required.');
        if (heightFilled) {
            validate(height.value >= 100 && height.value <= 250, 'height', 'Height must be 100-250cm.');
        }
        
        // 6. Weight (30-200)
        const weight = document.getElementById('weight');
        const weightFilled = validate(weight.value !== '', 'weight', 'Weight is required.');
        if (weightFilled) {
            validate(weight.value >= 30 && weight.value <= 200, 'weight', 'Weight must be 30-200kg.');
        }
        
        // 7. Blood Type
        const bloodType = document.getElementById('bloodType');
        validate(bloodType.value !== '', 'bloodType', 'Blood type is required.');

        // 8. Chronic Diseases 
        const diseases = form.querySelectorAll('input[name="disease"]:checked');
        validate(diseases.length > 0, 'diseaseGroup', 'Select at least one (or None).', true);

        // 9. Exercise Frequency 
        const exercise = form.querySelector('input[name="exercise"]:checked');
        validate(exercise !== null, 'exerciseGroup', 'Please select an option.', true);

        // 10. Privacy
        const privacy = document.getElementById('privacy');
        validate(privacy.checked, 'privacyGroup', 'You must agree to the privacy policy.', true);

        // Final Submission
        if (isValid) {
            alert("Form submitted successfully!");
            readData();
            clearForm();
        } else {
            const errorSection = document.querySelector('.form-group.error');
            if (errorSection) {
                errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });


    function clearForm(){

        document.getElementById('fullName').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('height').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('bloodType').value = '';
        document.getElementById('bp').value = '';
        document.getElementById('temp').value = '';

        document.getElementById('medications').value = '';
        document.getElementById('allergies').value = '';

        document.getElementById('sleep').value = '';
        document.getElementById('diet').value ='';

        const checkboxes = form.querySelectorAll('input[name="disease"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });

        const radioButtons = form.querySelectorAll('input[name="exercise"]');
        radioButtons.forEach(function(radio) {
            radio.checked = false;
        });

        document.getElementById('privacy').checked = false ;

    }

    function readData(){

        const patient = {};

        patient["name"] = document.getElementById('fullName').value;
        patient["dob"] = document.getElementById('dob').value;
        patient["email"] = document.getElementById('email').value;
        patient["phone"] = document.getElementById('phone').value;
        patient["height"] = document.getElementById('height').value;
        patient["weight"] = document.getElementById('weight').value;
        patient["bloodType"] = document.getElementById('bloodType').value;
        patient["bp"] = document.getElementById('bp').value;
        patient["temp"] = document.getElementById('temp').value;

        patient["medications"] = document.getElementById('medications').value;
        patient["allergies"] = document.getElementById('allergies').value;

        patient["sleep"] = document.getElementById('sleep').value;
        patient["diet"] = document.getElementById('diet').value;

         patient["diseases"] = []

        const checkboxes = form.querySelectorAll('input[name="disease"]:checked');
        
        checkboxes.forEach(function(checkbox) {
            patient["diseases"].push(checkbox.value);
        });

        patient["diseases"] = patient["diseases"].join(", ");
        
        patient["exercise"] = form.querySelector('input[name="exercise"]:checked').value;

        console.log(patient);

    }

});

