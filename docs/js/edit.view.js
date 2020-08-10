const editView = (function(){
    const DOMstrings = {
        appID: '#appID',
        appDate: '#appDate',
        appName: '#appName',
        appEmail: '#appEmail',
        appPhone: '#appPhone',
        selectCourse: '#selectCourse',
        selectStatus: '#selectStatus',
        btnSave: '#btnSave',
        btnDelete: '#btnDelete'
    }

    // Получаем заявку и выводим ее данные в форму редактирования
    function createEditItem(item) {
        document.querySelector(DOMstrings.appID).textContent = item.id
        document.querySelector(DOMstrings.appDate).textContent = item.date
        document.querySelector(DOMstrings.appName).value = item.name
        document.querySelector(DOMstrings.appEmail).value = item.email
        document.querySelector(DOMstrings.appPhone).value = item.phone
        document.querySelector(DOMstrings.selectCourse).value = item.product
        document.querySelector(DOMstrings.selectStatus).value = item.status.name
    }

    return {
        getDomStrings: function() {
            return DOMstrings
        },
        createEditItem: createEditItem
    }

})()
