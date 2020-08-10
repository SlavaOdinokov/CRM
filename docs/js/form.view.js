const formView = (function(){
    const DOMstrings = {
        inputName: '#formName',
        inputPhone: '#formPhone',
        inputEmail: '#formEmail',
        selectProduct: '#formProduct',
        form: '#form'
    }
    
    // Собираем значения из формы
    function getInput(){
        return {
            name: document.querySelector(DOMstrings.inputName).value,
            phone: document.querySelector(DOMstrings.inputPhone).value,
            email: document.querySelector(DOMstrings.inputEmail).value,
            product: document.querySelector(DOMstrings.selectProduct).value
        }
    }

    // Функция очистки формы после ввода данных
    function clearFields(){
        let inputName, inputPhone, inputEmail

        inputName = document.querySelector(DOMstrings.inputName)
        inputPhone = document.querySelector(DOMstrings.inputPhone)
        inputEmail = document.querySelector(DOMstrings.inputEmail)

        inputName.value = ''
        inputName.focus()
        inputPhone.value = ''
        inputEmail.value = ''
    }

    return {
        getInput: getInput,
        getDomStrings: function() {
            return DOMstrings
        },
        clearFields: clearFields
    }

})()
