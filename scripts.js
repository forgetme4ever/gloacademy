'use strict';

const title = prompt("What is the name of your project?")
const screens = prompt('What types of screens have to be developed', 'simple, complex or interactive')
const screenPrice = +prompt('What is the price for this project?')
const rollback = 99
let adaptive = !!prompt('Is adaptive needed', 'yes or no')
const service1 = prompt('Any extra services needed?')
const service1Price = +prompt('How much it will be cost?', 'price in USD')
const service2 = prompt('Any extra services needed?')
const service2Price = +prompt('How much it will be cost?', 'price in USD')
const fullPrice = screenPrice + service1Price + service2Price
const servicePercentPrice = fullPrice - rollback

console.log(servicePercentPrice);

switch(true){
case fullPrice >= 30000:
    console.log('You are eligible for 10% discount');
    break
case fullPrice >= 15000:
    console.log('You are eligible for 5% discount');
    break
case fullPrice < 15000:
    console.log('You are not eligible for discount');
    break
default:
    console.log('Something went wrong');  
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log('Price layout screens ' + screenPrice + 'USD' + ' Website development cost ' + fullPrice + 'USD');
console.log(screens.toLowerCase().split(','));
console.log('Brokers fee ' + fullPrice * (rollback/100));
console.log(adaptive);