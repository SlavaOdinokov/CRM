const generateTestData = (function(){
    const ExampleItem = function(name, phone, email, product){
        this.name = name,
        this.phone = phone,
        this.email = email,
        this.product = product
    }
    
    const testData = [
        new ExampleItem('Иван', '+7 777 777 7777', 'Ivan@mail.ru', 'Курс по VUE JS'),
        new ExampleItem('Василий', '+7 111 111 1111', 'Vasiliy@mail.ru', 'Курс по PHP'),
        new ExampleItem('Роман', '+7 333 333 3333', 'Roman@mail.ru', 'Курс по JavaScript'),
        new ExampleItem('Марк', '+7 999 999 9999', 'Mark@mail.ru', 'Курс по WordPress'),
        new ExampleItem('Петрович', '+7 555 555 5555', 'Petrovich@mail.ru', 'Курс по верстке')
    ]
    
    function getRandomInt(max){
        return Math.floor(Math.random()*max)
    }
    
    function insertInUi(){
        let random = getRandomInt(testData.length)
        let randomItem = testData[random]

        document.querySelector('#formName').value = randomItem.name
        document.querySelector('#formPhone').value = randomItem.phone
        document.querySelector('#formEmail').value = randomItem.email
        document.querySelector('#formProduct').value = randomItem.product
    }
    
    return {
        init: insertInUi
    }
})()

generateTestData.init()
