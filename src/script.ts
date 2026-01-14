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

})