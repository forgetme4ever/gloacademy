'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let servicePercentPrice;
let fullPrice;
let allServicePrices;
let service1;
let service2;
const rollback = 30;

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}


const asking = function() {
    title = prompt("What is the name of your project?", "Layout calculator");
    screens = prompt('What types of screens have to be developed', 'simple');

    do {
        screenPrice = +prompt('What is the price for this project?');
    }
    while (!isNumber(screenPrice))

    adaptive = confirm('Is adaptive needed');
}

const getAllServicePrices = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Any extra services needed?');
        } else if (i === 1) {
            service2 = prompt('Any extra services needed?');
        }
    sum += (() => {
        let n;
        do {
            n = prompt('How much it will be cost?');
        } while (!isNumber(n));
            return +n;
        })();    
    }
    return sum;
};

function getFullPrice() {
    return screenPrice + allServicePrices;
};

const getTitle = function() {
    return title.trim().charAt(0).toLocaleUpperCase() + title.trim().slice(1).toLowerCase();
};

const getServicePercentPrice = function() {
    return Math.ceil(fullPrice - (fullPrice * (rollback/100)))
};

const getRollbackMessage = function() {
    switch (true) {
        case fullPrice >= 30000:
            return 'You are eligible for 10% discount';
        case fullPrice >= 15000:
            return 'You are eligible for 5% discount';
        case fullPrice < 15000:
            return 'You are not eligible for discount';
        default:
            return 'Something went wrong';
        }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);
console.log(getRollbackMessage());
console.log(screens.trim().toLowerCase().split(','));
console.log(servicePercentPrice);
