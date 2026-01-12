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


})