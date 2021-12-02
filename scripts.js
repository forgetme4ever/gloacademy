'use strict';

const title = prompt("What is the name of your project?");
const screens = prompt('What types of screens have to be developed', 'simple, complex or interactive');
const screenPrice = +prompt('What is the price for this project?');
const rollback = 30;
const adaptive = confirm('Is adaptive needed');
const service1 = prompt('Any extra services needed?');
const service1Price = +prompt('How much it will be cost?', 'price in USD');
const service2 = prompt('Any extra services needed?');
const service2Price = +prompt('How much it will be cost?', 'price in USD');
let servicePercentPrice;
let fullPrice;
let allServicePrices;

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const getAllServicePrices = function() {
    return service1Price + service2Price;
};
allServicePrices = getAllServicePrices();

function getFullPrice() {
    return screenPrice + allServicePrices;
}
fullPrice = getFullPrice();

const getTitle = function() {
    return title.trim().charAt(0).toLocaleUpperCase() + title.trim().slice(1).toLowerCase();
};

const getServicePercentPrice = function() {
    return fullPrice - (fullPrice * (rollback/100))
};
servicePercentPrice = getServicePercentPrice();

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


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
console.log(getRollbackMessage());
console.log(screens.split(','));
console.log(servicePercentPrice);