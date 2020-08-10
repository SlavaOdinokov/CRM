const tableController = (function(view, model){
    const DOM = view.getDomStrings()

    let setupEventListeners = function() {
        document.querySelector(DOM.selectCourse).addEventListener('change', filterCourse)
        document.querySelectorAll(DOM.allFiltersStatuses).forEach(item => {
            item.addEventListener('click', filterStatus)
        })
    }

    // Фильтр по названию курса
    function filterCourse() {
        let selectedCourse = document.querySelector(DOM.selectCourse).value
        // Записываем значение выбранного курса в localStorage
        localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse)) 
        // Прогоняем данные через фильтр и выводим отфильтрованные данные на страницу
        view.createItems(model.filterData())
        // При перезагрузке страницы выбранный курс сохраняется
        // view.setActiveCourse()
    }

    // Фильтр по статусам
    function filterStatus(e) {
        let selectedStatus = e.target.getAttribute('data-status')
        localStorage.setItem('selectedStatus', JSON.stringify(selectedStatus))
        model.getFilter().selectedStatus = JSON.parse(localStorage.getItem('selectedStatus'))
        view.createItems(model.filterData())
        view.setActiveStatus()
    }
    
    return {
        init: function() {
            setupEventListeners()
            view.createItems(model.filterData())
        }
    }

})(tableView, model)

tableController.init()
