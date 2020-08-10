const formController = (function(formUi){
    // Слушаем клик по кнопки
    let setupEventListeners = function(){
        let DOM = formUi.getDomStrings()
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem)
    }

    function ctrlAddItem(e){
        e.preventDefault()
        // Получаем данные из формы
        let input = formUi.getInput()
        // Добавляем полученные из формы данные в модель
        model.addItem(input.name, input.phone, input.email, input.product)
        // Отчищаем форму
        // formUi.clearFields()
        generateTestData.init()
    }

    return {
        init: function(){
            console.log('App started!')
            setupEventListeners()
        }
    }
})(formView)

formController.init()
