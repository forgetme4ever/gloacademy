let num = 266219

let mult = 1
for (i of num.toString().split('')) {
    mult *= i
}
console.log(mult);

mult **= 3

console.log(mult.toString().slice(0, 2));