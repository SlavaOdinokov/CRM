const tableView = (function(model){
    const statuses = model.getStatuses()
    const DOMstrings = {
        table: '#tableBody',
        selectCourse: '#selectCourse',
        tableItem: '.tableItem',
        allFiltersStatuses: '[data-status]',
        badgeAll: '[data-all]',
        badgeNew: '[data-new]',
        badgeWork: '[data-work]',
        badgeCompleted: '[data-completed]',
        badgeArchive: '[data-archive]',
        colorBadge: '[data-color]'
    }
    
    // При перезагрузке страницы выбранный курс сохраняется
    function setActiveCourse(){
        document.querySelector(DOMstrings.selectCourse).value = model.getFilter().selectedCourse
        // document.querySelector(DOMstrings.selectCourse).value = JSON.parse(localStorage.getItem('selectedCourse'))
    }
    // При перезагрузке страницы выбранный статус заявки сохраняется
    function setActiveStatus(){
        let allStatuses = document.querySelectorAll(DOMstrings.allFiltersStatuses) 
        
        // Выделяем активный фильтр левой и верхней панели
        allStatuses.forEach(function(item) {
            item.classList.remove('active')
            
            if (item.getAttribute('data-status') === model.getFilter().selectedStatus) {
                item.classList.add('active')
            }
        })
    }

    // Создаем новую запись в таблице
    function createItems(obj){
        // Очищаем всю таблицу
        document.querySelector(DOMstrings.table).innerHTML = ''
        
        // Создаем новые записи
        for (let i = 0; i < obj.length; i++) {
            
            const html = `<tr data-course="${obj[i].product}" data-filter-status="${obj[i].status.label}" class="tableItem">
                        <th scope="row">${obj[i].id}</th>
                        <td>${obj[i].date}</td>
                        <td>${obj[i].product}</td>
                        <td>${obj[i].name}</td>
                        <td>${obj[i].email}</td>
                        <td>${obj[i].phone}</td>
                        <td>
                            <div data-color class="${statuses[obj[i].status.name].badgeColor} badge badge-pill">
                                ${statuses[obj[i].status.name].label}
                            </div>
                        </td>
                        <td>
                            <a href="03-crm-edit-bid.html?id=${obj[i].id}">Редактировать</a>
                        </td>
                    </tr>`

            document.querySelector(DOMstrings.table).insertAdjacentHTML('afterbegin', html)
        }
        createBadge()
    }
    
    // Создаем бейджи с счетчиком заявок
    function createBadge(){
        let allItems = model.getData()

        document.querySelector(DOMstrings.badgeAll).textContent = allItems.length
        
        document.querySelector(DOMstrings.badgeNew)
            .textContent = allItems.filter(item => item.status.name === 'new').length
        document.querySelector(DOMstrings.badgeWork)
            .textContent = allItems.filter(item => item.status.name === 'inWork').length
        document.querySelector(DOMstrings.badgeCompleted)
            .textContent = allItems.filter(item => item.status.name === 'complete').length
        document.querySelector(DOMstrings.badgeArchive)
            .textContent = allItems.filter(item => item.status.name === 'archive').length
    }

    return {
        init: function(){
            setActiveCourse()
            setActiveStatus()
        },
        getDomStrings: function() {
            return DOMstrings
        },
        createItems: createItems,
        setActiveCourse: setActiveCourse,
        setActiveStatus: setActiveStatus
    }
})(model)

tableView.init()
