interface Patient {
    name: string;
    dob: string;
    email: string;
    phone: string;
    height: string;
    weight: string;
    bloodType: string;
    bp: string;
    temp: string;
    diseases: string; 
    medications: string;
    allergies: string;
    exercise: string;
    sleep: string;
    diet: string;
}

let selectedRow: HTMLTableRowElement | null = null;

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
            const paitentData = readData();
            if(selectedRow == null){
                insertNewRecord(paitentData);
                alert("Form submitted successfully!");
            }else{
                updateRecord(paitentData);
                alert("Record updated successfully!");
            }
            clearForm();
        }else{
            
            const errorSection = document.querySelector('.form-group.error');
            if (errorSection) {
                errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        function clearForm(){

            (document.getElementById('fullName') as HTMLInputElement).value = '';
            (document.getElementById('dob') as HTMLInputElement).value = '';
            (document.getElementById('email') as HTMLInputElement).value = '';
            (document.getElementById('phone') as HTMLInputElement).value = '';
            (document.getElementById('height') as HTMLInputElement).value = '';
            (document.getElementById('weight') as HTMLInputElement).value = '';
            (document.getElementById('bloodType') as HTMLSelectElement).value = '';
            (document.getElementById('bp') as HTMLInputElement).value = '';
            (document.getElementById('temp') as HTMLInputElement).value = '';

            (document.getElementById('medications') as HTMLInputElement).value = '';
            (document.getElementById('allergies') as HTMLInputElement).value = '';

            (document.getElementById('sleep') as HTMLInputElement).value = '';
            (document.getElementById('diet') as HTMLSelectElement).value ='';

            const checkboxes = form.querySelectorAll('input[name="disease"]') as NodeListOf<HTMLInputElement>;
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });

            const radioButtons = form.querySelectorAll('input[name="exercise"]') as NodeListOf<HTMLInputElement>;
            radioButtons.forEach(function(radio) {
                radio.checked = false;
            });

            (document.getElementById('privacy') as HTMLInputElement).checked = false ;

        }

        function readData() : Patient{
            const name  = (document.getElementById('fullName') as HTMLInputElement).value;
            const dob = (document.getElementById('dob') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const phone = (document.getElementById('phone') as HTMLInputElement).value;
            const height = (document.getElementById('height') as HTMLInputElement).value;
            const weight = (document.getElementById('weight') as HTMLInputElement).value;
            const bloodType = (document.getElementById('bloodType') as HTMLSelectElement).value;

            const bpInput = (document.getElementById('bp') as HTMLInputElement).value;
            const bp = bpInput ? bpInput : "N/A";

            const tempInput = (document.getElementById('temp') as HTMLInputElement).value;
            const temp = tempInput ? tempInput : "N/A";
 
            const medsInput = (document.getElementById('medications') as HTMLTextAreaElement).value;
            const medications = medsInput ? medsInput : "N/A";
 
            const algInput = (document.getElementById('allergies') as HTMLTextAreaElement).value;
            const allergies = algInput ? algInput : "N/A";
 
            const sleep = (document.getElementById('sleep') as HTMLInputElement).value;
            const diet = (document.getElementById('diet') as HTMLSelectElement).value;

            const diseaseCheckboxes = form.querySelectorAll('input[name="disease"]:checked') as NodeListOf<HTMLInputElement>;
            const diseaseArr: string[] = [];
            diseaseCheckboxes.forEach((checkbox) => {
                diseaseArr.push(checkbox.value);
            });
            const diseases = diseaseArr.join(", ");

            const exerciseRadio = form.querySelector('input[name="exercise"]:checked') as HTMLInputElement;
            const exercise = exerciseRadio ? exerciseRadio.value : "None";

            return {name, dob ,email ,phone ,height, weight, bloodType , bp , temp , medications ,allergies , sleep ,diet , diseases , exercise};
        }


        function insertNewRecord(data : Patient) : void{

            const table = document.getElementById('medical-patientlist') as HTMLTableElement;
            
            const tbody = table.getElementsByTagName('tbody')[0] as HTMLTableSectionElement;
            const newRow = tbody.insertRow(tbody.rows.length);

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
            <button class="del" id="deleteRecord" onClick="onDelete(this)" style="background-color:#f56565; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button>`;

        }


        function updateRecord(data: Patient) {

            if(!selectedRow) return;

            if(selectedRow.cells[0]?.innerHTML != undefined){
  
                selectedRow.cells[0].innerHTML = data.name;
            }
            if(selectedRow.cells[1]?.innerHTML != undefined){

                selectedRow.cells[1].innerHTML = data.dob;
            }
            if(selectedRow.cells[2]?.innerHTML != undefined){

                selectedRow.cells[2].innerHTML = data.email;
            }
            if(selectedRow.cells[3]?.innerHTML != undefined){

                selectedRow.cells[3].innerHTML = data.phone;
            }
            if(selectedRow.cells[4]?.innerHTML != undefined){

                selectedRow.cells[4].innerHTML = data.height;
            } 
            if(selectedRow.cells[5]?.innerHTML != undefined){

                selectedRow.cells[5].innerHTML = data.weight;
            }
            if(selectedRow.cells[6]?.innerHTML != undefined){

                selectedRow.cells[6].innerHTML = data.bloodType;
            }  
            if(selectedRow.cells[7]?.innerHTML != undefined){

                selectedRow.cells[7].innerHTML = data.bp;
            }
            if(selectedRow.cells[8]?.innerHTML != undefined){

                selectedRow.cells[8].innerHTML = data.temp;
            }  
            if(selectedRow.cells[9]?.innerHTML != undefined){

                selectedRow.cells[9].innerHTML = data.diseases;
            }
            if(selectedRow.cells[10]?.innerHTML != undefined){

                selectedRow.cells[10].innerHTML = data.medications;
            }
            if(selectedRow.cells[11]?.innerHTML != undefined){

                selectedRow.cells[11].innerHTML = data.allergies;
            }
            if(selectedRow.cells[12]?.innerHTML != undefined){

                selectedRow.cells[12].innerHTML = data.exercise;
            }
            if(selectedRow.cells[13]?.innerHTML != undefined){

                selectedRow.cells[13].innerHTML = data.sleep;
            }
            if(selectedRow.cells[14]?.innerHTML != undefined){

                selectedRow.cells[14].innerHTML = data.diet;
            }                                                                                                                                                                  
                
            selectedRow = null;

            const deleteButton = document.getElementById('deleteRecord') as HTMLButtonElement;
            deleteButton.disabled = false;
            deleteButton.style.opacity = "1";
            deleteButton.style.cursor = "pointer"

            const submitBtn = document.querySelector(".btn-submit") as HTMLButtonElement;
            submitBtn.innerHTML = 'Submit Assessment <i class="ri-send-plane-fill"></i>';
            
        }        


    })

})

    function onDelete(td : HTMLElement) {
        if (confirm('Are you sure you want to delete this record?')) {
            const row = td.parentElement?.parentElement;
            if(row) row.remove();
        }
    }

    function onEdit(td : HTMLElement) {
        
        selectedRow = td.parentElement?.parentElement as HTMLTableRowElement;

        if(!selectedRow) return;

        if(selectedRow.cells[0]?.innerHTML !== undefined) {
            (document.getElementById("fullName") as HTMLInputElement).value = selectedRow.cells[0].innerHTML;
        }

        if(selectedRow.cells[1]?.innerHTML !== undefined){
            (document.getElementById("dob") as HTMLInputElement).value = selectedRow.cells[1].innerHTML;
        }
        
        if(selectedRow.cells[2]?.innerHTML !== undefined){
            (document.getElementById("email") as HTMLInputElement).value = selectedRow.cells[2].innerHTML;
        }        
        
        if(selectedRow.cells[3]?.innerHTML !== undefined){   
            (document.getElementById("phone") as HTMLInputElement).value = selectedRow.cells[3].innerHTML;
        }

        if(selectedRow.cells[4]?.innerHTML !== undefined){
            (document.getElementById("height") as HTMLInputElement).value = selectedRow.cells[4].innerHTML;
        }

        if(selectedRow.cells[5]?.innerHTML !== undefined){
            
            (document.getElementById("weight") as HTMLInputElement).value = selectedRow.cells[5].innerHTML;
        }
        
        if(selectedRow.cells[6]?.innerHTML !== undefined){
            
            (document.getElementById("bloodType") as HTMLSelectElement).value = selectedRow.cells[6].innerHTML;
        }        
 
        if(selectedRow.cells[7]?.innerHTML !== undefined){
            const bpVal = selectedRow.cells[7].innerHTML;
            (document.getElementById("bp") as HTMLInputElement).value = bpVal === "N/A" ? "" : bpVal;
        }        
        
        if(selectedRow.cells[8]?.innerHTML !== undefined){

            const tempVal = selectedRow.cells[8].innerHTML;
            (document.getElementById("temp") as HTMLInputElement).value = tempVal === "N/A" ? "" : tempVal;
        }        
 
        if(selectedRow.cells[9]?.innerHTML !== undefined){

            
            const diseasesStr = selectedRow.cells[9].innerHTML;
            const diseaseList = diseasesStr.split(", ");
            const checkboxes = document.querySelectorAll('input[name="disease"]') as NodeListOf<HTMLInputElement>;
            checkboxes.forEach(cb => {
                cb.checked = diseaseList.includes(cb.value);
            });
        } 
        
        if(selectedRow.cells[10]?.innerHTML !== undefined){
  
            const medsVal = selectedRow.cells[10].innerHTML;
            (document.getElementById("medications") as HTMLTextAreaElement).value = medsVal === "N/A" ? "" : medsVal; 
        }        
        
        if(selectedRow.cells[11]?.innerHTML !== undefined){

            const algVal = selectedRow.cells[11].innerHTML;
            (document.getElementById("allergies") as HTMLTextAreaElement).value = algVal === "N/A" ? "" : algVal;
            
        }      
        
        if(selectedRow.cells[12]?.innerHTML !== undefined){
            
            const exerciseValue = selectedRow.cells[12].innerHTML;
            const radio = document.querySelector(`input[name="exercise"][value="${exerciseValue}"]`) as HTMLInputElement;
            if (radio) radio.checked = true;
        }
        
        if(selectedRow.cells[13]?.innerHTML !== undefined){
            (document.getElementById("sleep") as HTMLInputElement).value = selectedRow.cells[13].innerHTML;
        }
        
        if(selectedRow.cells[14]?.innerHTML !== undefined){
            (document.getElementById("diet") as HTMLSelectElement).value = selectedRow.cells[14].innerHTML;
        }       
        
        const deleteButton = document.getElementById('deleteRecord') as HTMLButtonElement;
        deleteButton.disabled = true;
        deleteButton.style.opacity = "0.5";
        deleteButton.style.cursor = "not-allowed"    
        
        const submitBtn = document.querySelector(".btn-submit") as HTMLButtonElement;
        submitBtn.innerHTML = 'Update Assessment <i class="ri-edit-line"></i>';
        
    }    

    