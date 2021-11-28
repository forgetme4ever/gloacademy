let title
let screens
let screenPrice
let rollback
let fullPrice
let adaptive


title = 'project'
screens = 'simple, complex, interactive'
screenPrice = 777
rollback = 99
fullPrice = 1000
adaptive = true

console.log(title);
console.log(fullPrice);
console.log(adaptive);
console.log(screens.length);
console.log('Price layout screens ' + screenPrice + 'USD' + ' Website development cost ' + fullPrice + 'USD');

screens.toLowerCase()

console.log('Brokers fee ' + fullPrice * (rollback/100));

alert('any text')
console.log('other any');