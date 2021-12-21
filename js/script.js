'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number ');

const rollbackSlider = document.querySelector('.rollback > div > input');
const rangeValue = document.querySelector('.rollback > div > span');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resettBtn = document.getElementsByClassName('handler_btn')[1];


const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalOther = document.getElementsByClassName('total-input')[2];
const totalFull = document.getElementsByClassName('total-input')[3];
const totalRollback = document.getElementsByClassName('total-input')[4];

let screen = document.querySelectorAll('.screen');


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
        appData.addTitle();
        startBtn.addEventListener('click' , appData.checkValues);
        rollbackSlider.addEventListener('change', appData.getRollback);
        rollbackSlider.addEventListener('input', appData.getRollback);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
    },
    addTitle: function () {
        document.title = title.textContent;
    }, 
    start: function () {
        appData.addScreens();
        
        appData.addServices();
        appData.addPrices();
        
        // appData.getServicePercentPrice();
        // appData.logger();
        
        appData.showResult();
    },
    isError: false,
    checkValues: function () {
        appData.isError = false;
        screen = document.querySelectorAll('.screen');

        screen.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input[type=text]');

            if(select.value === '' || input.value === '0') {
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
        const count = 0;
        screen = document.querySelectorAll('.screen');
        
        screen.forEach(function(screen, index) {
            
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
        const cloneScreen = screen[0].cloneNode(true);
        screen[screen.length - 1].after(cloneScreen);
    },
    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');
            if(check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            };
        });
        otherItemsNumber.forEach(function(item) {
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
        
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }, 
};

appData.init();
