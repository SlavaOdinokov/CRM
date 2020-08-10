const editController = (function(view, model){
    
    const statuses = model.getStatuses()
    const DOM = view.getDomStrings()
    const data = model.getData()
    let currentApp

    const setupEventListeners = function() {
        document.querySelectorAll(DOM.btnSave).forEach(item => {
            item.addEventListener('click', saveApp)
        })
        document.querySelectorAll(DOM.btnDelete).forEach(item => {
            item.addEventListener('click', saveApp)
        })
    }

    // Получаем данные заявки в форму редактора
    function getEditItem(){
        // Получаем id текущей заявки
        const currentAppId = window.location.search.substr(1).split('=')[1]
        // Находим текущую заявку в массиве и выводим ее данные на странице редактированния
        currentApp = data[currentAppId - 1]
        view.createEditItem(currentApp)
    }
    
    // Схранение/Удаление заявки
    function saveApp(e){
        currentApp.name = document.querySelector(DOM.appName).value
        currentApp.email = document.querySelector(DOM.appEmail).value
        currentApp.phone = document.querySelector(DOM.appPhone).value
        currentApp.product = document.querySelector(DOM.selectCourse).value
        // Определяем по какой кнопки кликнули сохранить/удалить
        if (e.target.getAttribute('data-btn') === 'delete') {
            currentApp.status.name = statuses.archive.name
        } else {
            currentApp.status.name = document.querySelector(DOM.selectStatus).value
        }
        currentApp.status.badgeColor = statuses[currentApp.status.name].badgeColor
        currentApp.status.label = statuses[currentApp.status.name].label

        // Находим индекс текущей заявки в массиве заявок
        const index = data.findIndex(item => item.id === currentApp.id) 
        // Если индекс найден, заменяем данные текущей заявки в массиве
        if (index !== -1) {
            data.splice(index, 1, currentApp)
        }
        // Записываем обновленный массив в localStorage
        localStorage.setItem('application', JSON.stringify(data))
    }

    return {
        init: function() {
            getEditItem()
            setupEventListeners()
        }
    }

})(editView, model)

editController.init()
