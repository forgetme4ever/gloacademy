'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number ');

const rollbackSlider = document.querySelector('.rollback > div > input');
const rangeValue = document.querySelector('.rollback > div > span');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resettBtn = document.getElementsByClassName('handler_btn')[1];
const checkBoxes = document.querySelectorAll('.custom-checkbox');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalOther = document.getElementsByClassName('total-input')[2];
const totalFull = document.getElementsByClassName('total-input')[3];
const totalRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true, 
    servicePercentPrice: 0,
    fullPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 0,
    init: function () {
        this.addTitle();
        startBtn.addEventListener('click' , this.checkValues);
        rollbackSlider.addEventListener('change', this.getRollback);
        rollbackSlider.addEventListener('input', this.getRollback);
        buttonPlus.addEventListener('click', this.addScreenBlock);
        resettBtn.addEventListener('click', this.resetForm);

    },
    addTitle: function () {
        document.title = title.textContent;
    }, 

    resetForm: function () {
        startBtn.style.display = 'block';
        resettBtn.style.display = 'none';

        appData.screens = [];
        appData.screenPrice = 0;
        appData.servicePercentPrice = 0;
        appData.fullPrice = 0;
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        appData.rollback = 0;       
        
        total.value = 0;
        totalCount.value = 0;
        totalOther.value = 0;
        totalFull.value = 0;
        totalRollback.value = 0;
        rangeValue.textContent = 0 + '%';
        rollbackSlider.value = 0;
                
        otherItemsPercent.forEach((box) => {
            box.querySelector('input[type=checkbox').checked = false;   
        });
        otherItemsNumber.forEach((box) => {
            box.querySelector('input[type=checkbox').checked = false;   
        });

        // remove screens blocks
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen) => {
            if (screen != screens[0]) {
                screen.remove();
            };
            screens[0].querySelector('input').value = '';
            screens[0].querySelector('select').value = '';
        });
        appData.inputEnable();
             
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        
        // appData.getServicePercentPrice();
        // appData.logger();
        appData.showResult();
        startBtn.style.display = 'none';
        resettBtn.style.display = 'block';
        this.inputDisable();  

    },
    isError: false,
    checkValues: function () {
        appData.isError = false;
        
        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input[type=text]');

            if(select.value === '' || input.value <= 0) {
                appData.isError = true;
            };    
        });

        if(!appData.isError) {
            appData.start();
        } else {
            alert('Input type and how many screens')
            }
        },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.totalCount;
        totalOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalFull.value = appData.fullPrice;
        totalRollback.value = appData.servicePercentPrice;
        
    },
    addScreens: function () {               
        screens.forEach((screen, index) => {  
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
                      
            appData.screens.push({
                id: index, 
                name: selectName, 
                price: +select.value * +input.value,
                count: +input.value
            });   
        });      
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.querySelector('input').value = '';
        screens[screens.length - 1].after(cloneScreen);   
        screens = document.querySelectorAll('.screen');
    },
    addServices: function() {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');
            if(check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            };
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if(check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            };
        });
    },
    
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        };
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        };

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100);
        };
    
        appData.totalCount = appData.screens.reduce((a,b) => a + b.count, 0);
        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
    },

    getRollback: function (event) {
        rangeValue.textContent = event.target.value + '%';
        appData.rollback = event.target.value;       
    },
        
    inputDisable: function () {
        screens.forEach((screen) => { 
            screen.querySelector('select').disabled = true;
            screen.querySelector('input').disabled = true;
        });
        checkBoxes.forEach((box) => { 
            box.disabled = true;
        });
        rollbackSlider.disabled = true;
        buttonPlus.disabled = true;
    },
    inputEnable: function () {
        screens.forEach((screen) => { 
            screen.querySelector('select').disabled = false;
            screen.querySelector('input').disabled = false;
        });
        checkBoxes.forEach((box) => { 
            box.disabled = false;
        });
        rollbackSlider.disabled = false;
        buttonPlus.disabled = false;
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }, 
};

appData.init();
