document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('healthForm');
    let selectedRow = null;

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
            const data = readData();
            if(selectedRow == null){
                insertNewRecord(data);
                alert("Form submitted successfully!");
            }else{

            }
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
        patient["bp"] = document.getElementById('bp').value || "N/A";
        patient["temp"] = document.getElementById('temp').value || "N/A";

        patient["medications"] = document.getElementById('medications').value || "N/A";
        patient["allergies"] = document.getElementById('allergies').value || "N/A";

        patient["sleep"] = document.getElementById('sleep').value;
        patient["diet"] = document.getElementById('diet').value;

         patient["diseases"] = []

        const checkboxes = form.querySelectorAll('input[name="disease"]:checked');
        
        checkboxes.forEach(function(checkbox) {
            patient["diseases"].push(checkbox.value);
        });

        patient["diseases"] = patient["diseases"].join(", ");
        
        patient["exercise"] = form.querySelector('input[name="exercise"]:checked').value;

        return patient;

    }


    function insertNewRecord(data){

        const table = document.getElementById('medical-patientlist').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(table.length);

        newRow.insertCell(0).innerHTML = data.name;
        newRow.insertCell(1).innerHTML = data.dob;
        newRow.insertCell(2).innerHTML = data.email;
        newRow.insertCell(3).innerHTML = data.phone;
        newRow.insertCell(4).innerHTML = data.height;
        newRow.insertCell(5).innerHTML = data.weight;
        newRow.insertCell(6).innerHTML = data.bloodType;
        newRow.insertCell(7).innerHTML = data.bp;
        newRow.insertCell(8).innerHTML = data.temp;
        newRow.insertCell(9).innerHTML = data.diseases;
        newRow.insertCell(10).innerHTML = data.medications;
        newRow.insertCell(11).innerHTML = data.allergies;
        newRow.insertCell(12).innerHTML = data.exercise;
        newRow.insertCell(13).innerHTML = data.sleep;
        newRow.insertCell(14).innerHTML = data.diet;
 
        newRow.insertCell(15).innerHTML = `
            <button class="edit" onClick="onEdit(this)" style="background-color:#ecc94b; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; margin-right:5px;">Edit</button>
            <button class="del" onClick="onDelete(this)" style="background-color:#f56565; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button>
        `;
    }

});

    function onDelete(td) {
        if (confirm('Are you sure you want to delete this record?')) {
            const row = td.parentElement.parentElement;
            row.remove();
        }
    }

    function onEdit(td) {
        
        selectedRow = td.parentElement.parentElement;
    
        document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
        document.getElementById("dob").value = selectedRow.cells[1].innerHTML;
        document.getElementById("email").value = selectedRow.cells[2].innerHTML;
        document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
        document.getElementById("height").value = selectedRow.cells[4].innerHTML;
        document.getElementById("weight").value = selectedRow.cells[5].innerHTML;
        document.getElementById("bloodType").value = selectedRow.cells[6].innerHTML;

        if(selectedRow.cells[7].innerHTML == "N/A"){
            document.getElementById("bp").value = ""
        }else{
            document.getElementById("bp").value = selectedRow.cells[7].innerHTML;
        }

        if(selectedRow.cells[8].innerHTML == "N/A"){
            document.getElementById("temp").value = ""
        }else{
            document.getElementById("temp").value = selectedRow.cells[8].innerHTML;
        }       
        
        
        const diseases = selectedRow.cells[9].innerHTML.split(", ");
        const checkboxes = document.querySelectorAll('input[name="disease"]');
        checkboxes.forEach(cb => {
            cb.checked = diseases.includes(cb.value);
        });
    

        if(selectedRow.cells[10].innerHTML == "N/A"){
            document.getElementById("medications").value = ""
        }else{
            document.getElementById("medications").value = selectedRow.cells[10].innerHTML;
        }

        if(selectedRow.cells[11].innerHTML == "N/A"){
            document.getElementById("allergies").value = ""
        }else{
            document.getElementById("allergies").value = selectedRow.cells[11].innerHTML;
        }        
        
        const exerciseValue = selectedRow.cells[12].innerHTML;

        const radio = document.querySelector(`input[name="exercise"][value="${exerciseValue}"]`);
        
        if (radio){
            radio.checked = true;
        }
    
        document.getElementById("sleep").value = selectedRow.cells[13].innerHTML;
        document.getElementById("diet").value = selectedRow.cells[14].innerHTML;
    
        document.querySelector(".btn-submit").innerHTML = 'Update Assessment <i class="ri-edit-line"></i>';
        
    }


