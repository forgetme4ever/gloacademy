let title = 'project'
let screens = 'simple, complex, interactive'
let screenPrice = 777
let rollback = 99
let fullPrice = 1000
let adaptive = true

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log('Price layout screens ' + screenPrice + 'USD' + ' Website development cost ' + fullPrice + 'USD');
console.log(screens.toLowerCase().split(','));
console.log('Brokers fee ' + fullPrice * (rollback/100));