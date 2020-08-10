const model = (function(){
    
    // Чтение данных из LocalStorage при загрузке страницы
    let data
    function getData(){
        data = JSON.parse(localStorage.getItem('application')) || []
    }
    
    const filter = {
        selectedCourse: JSON.parse(localStorage.getItem('selectedCourse')) || 'course-all',
        selectedStatus: JSON.parse(localStorage.getItem('selectedStatus')) || 'Все'
    }

    // Создаем статусы заявок
    const statuses = {
        all: 'Все',
        new: {
            name: 'new',
            badgeColor: 'badge-new',
            label: 'Новые'
        },
        inWork: {
            name: 'inWork',
            badgeColor: 'badge-warning',
            label: 'В работе'
        },
        complete: {
            name: 'complete',
            badgeColor: 'badge-success',
            label: 'Завершенные'
        },
        archive: {
            name: 'archive',
            badgeColor: 'badge-archive',
            label: 'Архив'
        },
        waitPayment: {
            name: 'waitPayment',
            badgeColor: 'badge-wait-payment',
            label: 'Ожидается оплата'
        },
        refusal: {
            name: 'refusal',
            badgeColor: 'badge-danger',
            label: 'Отказ'
        }
    }
    
    // Создаем класс для заявок
    class Application {
        constructor(product, name, email, phone, status){
            this.id = data.length ? data[data.length - 1].id + 1 : 1
            this.date = new Date().toLocaleString()
            this.product = product
            this.name = name
            this.email = email
            this.phone = phone
            this.status = status
        }
    }

    // Создание новой заявки
    function addItem(name, phone, email, product){
        // Обновляем localStorage
        getData()
        // Cоздаем новый объект
        const newItem = new Application(product, name, email, phone, statuses.new)
        // Записываем новый объект в общий массив
        data.push(newItem)
        // Записываем новый объект в LocalStorage
        localStorage.setItem('application', JSON.stringify(data))
    }

    // Фильтр данных
    function filterData() {
        // Получаем значения фильтров из LocalStorage
        const statusLS = JSON.parse(localStorage.getItem('selectedStatus')) || 'Все'
        const courseLS = JSON.parse(localStorage.getItem('selectedCourse')) || 'course-all'
        
        // Обрабатываем данные по фильтрам
        let filteredData = data
        
        if (courseLS !== 'course-all') {
            filteredData = filteredData.filter(item => courseLS === item.product)
        }
        if (statusLS !== 'Все') {
            filteredData = filteredData.filter(item => statusLS === item.status.name)
        }

        return filteredData
    }
    // console.log(filter)

    return {
        init: function() {
            getData()
            filterData()
        },
        getData: function(){
            return data
        },
        getStatuses: function(){
            return statuses
        },
        getFilter: function(){
            return filter
        },
        addItem: addItem,
        filterData: filterData
    }
})()

model.init()
