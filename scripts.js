'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true, 
    servicePercentPrice: 0,
    fullPrice: 0,
    allServicePrices: 0,
    services: {},
    rollback: 30,
    asking: function() {
        do {
            appData.title = prompt('What is the name of your project?');
        }
        while (appData.isNumber(appData.title));

        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;
            do {
                name = prompt('What types of screens have to be developed?');
            }
            while (appData.isNumber(name));

            do {
                price = +prompt('What is the price for this project?');
            }
            while (!appData.isNumber(price));

            appData.screens.push({id: i, name: name, price: price});
        }
        
        

        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;

            do {
                name = prompt('Any extra services needed?');
            }
            while (appData.isNumber(name));
           
            do {
                price = prompt('How much it will be cost?');
            } while (!appData.isNumber(price))
            
            appData.services[name] = +price;
        };

        appData.adaptive = confirm('Is adaptive needed');

        
    },
    
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getFullPrice: function() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function(title) {
        appData.title = appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
        },

    getServicePercentPrice: function() {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)))
    },

    getRollbackMessage: function() {
        switch (true) {
        case appData.fullPrice >= 30000:
            return 'You are eligible for 10% discount';
        case appData.fullPrice >= 15000:
            return 'You are eligible for 5% discount';
        case appData.fullPrice < 15000:
            return 'You are not eligible for discount';
        default:
            return 'Something went wrong';
        }
    },
    
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getTitle();
        appData.getFullPrice();
        appData.getServicePercentPrice();
        appData.logger();
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }, 
};

appData.start();
