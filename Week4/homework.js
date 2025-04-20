// write a variable that is a string and output to console (hint: it's console.log(variable name))
var str = "Hello, World!";
console.log(str);

// write a variable that is a number and output to console (hint: it's console.log(variable name))
let num = 17;
console.log(num);

// write a variable that takes any two numbers and adds them 
let sum = 16 + 32;
console.log(sum);

// write a variable that takes any two numbers and subtracts them and output to console
let diff = 1 - 16;
console.log(diff);

// write a variable that takes any two numbers and performs a modulo that has a value of 1 and output to console 
let mod = 13 % 3;
console.log(mod);

// write a variable that takes any two numbers and perform an exponential value and output to console 
let exp = 2 ** 7;
console.log(exp);

// write a statement that is false using a conditional statement and output to console 
let bool = 5 > 3 && 5 < 3;
console.log(bool);

// I have created an object below, output to console the value of "breed" (hint: the structure is ObjectName.value you want to call)
// the keyword "this" is self referencing the object 
let siggy = {
    breed : "cat", 
    baby: "big baby", 
    fluffy: "fluffy", 
    output: function() {

        return `Siggy is a ${this.breed} that is a ${this.fluffy} ${this.baby}`

    }
}

console.log(`\nBreed: ${siggy.breed}`);

// methods! You call methods the same way you call a function.  I'll call siggy.output() below. 
console.log(siggy.output()); 

// copy + paste the siggy object below and rename the variable from Siggy to an animal or name of your choice 
// then, I want you to change the object to the value of your choosing  
let rectangle = {
    width: 5,
    height: 8,
    perimeter: function() {
        return 2 * this.width + 2 * this.height;
    },
    area: function() {
        return this.width * this.height;
    }
}

// console.log the values of that object one by one. 
console.log(`\nWidth: ${rectangle.width}`);
console.log(`Height: ${rectangle.height}`);
console.log(`Perimeter: ${rectangle.perimeter()}`);
console.log(`Area: ${rectangle.area()}`);

// create an array 
let arr = [3, 2, 6, 5, 1, 4, 8, 7];

// call the value in the 3 position of this array and output to console 
console.log(`\n${arr[2]}`);

let someArray = ["Ishrat", "Is", "Really", "Proud", "Of", "You"]

// call all values in the array using a loop 
for (let i in someArray) {
    console.log(someArray[i]);
}

// what is the value of the variable ifStatement, leave your answer in the console. 

let ifStatement; 
let value = 5; 

if(value < 5)
{
    ifStatement = true;
}

else{
    ifStatement = false; 
}

console.log(`\nifStatement is false`);