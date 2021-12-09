'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true, 
    servicePercentPrice: 0,
    fullPrice: 0,
    allServicePrices: 0,
    service1: '',
    service2: '',
    rollback: 30,
    asking: function() {
        appData.title = prompt("What is the name of your project?", "Layout calculator");
        appData.screens = prompt('What types of screens have to be developed', 'simple');
    
        do {
            appData.screenPrice = +prompt('What is the price for this project?');
        }
        while (!appData.isNumber(appData.screenPrice))
    
        appData.adaptive = confirm('Is adaptive needed');
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    allServicePrices: function () {
        let sum = 0;
        
        for (let i = 0; i < 2; i++) {
            let price = 0;

            if (i === 0) {
                appData.service1 = prompt('Any extra services needed?');
            } else if (i === 1) {
                appData.service2 = prompt('Any extra services needed?');
            }
            do {
                price = prompt('How much it will be cost?');
            } while (!appData.isNumber(price))
            sum += +price
        }
        return sum;
    },

    fullPrice: function() {
        return appData.screenPrice + appData.allServicePrices;
    },

    titleTrimmed: function() {
        return appData.title.trim()[0].toLocaleUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },

    servicePercentPrice: function() {
        return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)))
    },

    rollbackMessage: function() {
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
        appData.allServicePrices();
        appData.fullPrice();
        appData.servicePercentPrice();
        appData.titleTrimmed();
        appData.logger();
    },

    logger: function () {
        for (let key in appData) {
            console.log(`Key: ${key} value: ${appData[key]}`);
        }
    }
};

appData.start();
// const isNumber = function(num) {
//     return !isNaN(parseFloat(num)) && isFinite(num);
// }




// function getSum (msg, sum = 0) {
//     let n;
//     do {
//         n = prompt(msg);
//     } while (!isNumber(n));
//         return sum += +n;
//     }

// const getAllServicePrices = function() {
//     let sum = 0;
    
//     for (let i = 0; i < 2; i++) {
//         if (i === 0) {
//             appData.service1 = prompt('Any extra services needed?');
//         } else if (i === 1) {
//             appData.service2 = prompt('Any extra services needed?');
//         }
//         sum = getSum('How much it will be cost?', sum);
//     }
//     return sum;
// };

// function getFullPrice() {
//     return appData.screenPrice + appData.allServicePrices;
// };

// const getTitle = function() {
//     return appData.title.trim().charAt(0).toLocaleUpperCase() + appData.title.trim().slice(1).toLowerCase();
// };

// const getServicePercentPrice = function() {
//     return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)))
// };

// const getRollbackMessage = function() {
//     switch (true) {
//         case appData.fullPrice >= 30000:
//             return 'You are eligible for 10% discount';
//         case appData.fullPrice >= 15000:
//             return 'You are eligible for 5% discount';
//         case appData.fullPrice < 15000:
//             return 'You are not eligible for discount';
//         default:
//             return 'Something went wrong';
//         }
// };

// appData.allServicePrices = getAllServicePrices();
// appData.fullPrice = getFullPrice();
// appData.servicePercentPrice = getServicePercentPrice();

// console.log(appData.fullPrice);
// console.log(appData.servicePercentPrice);
