# ECMAScript 6 | ES2015 | ES6

## Index
* [Variables](#variables)
    * [let](#let)
    * [const](#const)
    * [Replace IIFEs with blocks](#replace-iifes-with-blocks)
* [New Methods](#new-methods)
    * [Arrays](#arrays)
    * [Math](#math)
* [String templates](#string-templates)
* [Destructuring](#destructuring)
    * [Spread operator](#spread-operator)
* [Function parameters](#function-parameters)
* [Arrow functions](#arrow-functions)
* [Classes](#classes)
* [Getters and setters](#getters-and-setters)
* [Modules](#modules)
* [Data structures](#data-structures)
* [Symbols](#symbols)
* [Iterators](#iterators)
* [Generators](#generators)

# Content

## Variables

### `let`
It is like `var` but with blocking (what is inside curly braces) scope.
```js
if (true) {
    let test = 'hello';
}
console.log(test); // undefined
```

### `const`
Just like `let` but it's read only. Anyway you can modify a property of that const.
```js
const test = 'hello';
test = 'hi'; // Uncaught TypeError: Assignment to constant variable.

// But this will work correctly
const test2 = {
    text = 'hello'
}
test2.text = 'hi';
console.log(test2); // {text: 'hi'}
```

### Replace IIFEs with blocks
```js
// Instead of using IIFEs to keep variables local
(function() {
    var test = 'hello';
})()
console.log(test); // ReferenceError
// We can now use a block
{
    let test = 'hello';
}
console.log(test); // ReferenceError
```

## New Methods

### Arrays
```js
// Get first element which equals a condition
let numbers = [1, 2, 3, 4];
let firstEven = numbers.find((x) => x % 2 === 0));
console.log(firstEven); // returns 2

// Get the index of the first element which equals a condition
let firstEvenIndex = numbers.findIndex((x) => x % 2 === 0));
console.log(firstEvenIndex); // returns 1

// Get an iterator to loop through an array
let entries = numbers.entries();
console.log(entries.next()); // returns [0, 1] where 0 is index and 1 is value
console.log(entries.next()); // returns [1, 2]

// Create an array from another array-like object
Array.from('hi'); // ['h', 'i']
Array.from([1, 2]); // [1, 2]
// It accepts a second param with a function to do like a '.map()'
Array.from([2, 3], (x) => x * 2); // [4, 6]
// Or from an object
let helloWorld = Array.from({length: 3, 1: 'hello', 2: 'world'}); // [undefined, 'hello', 'world']

// Create an array from params
Array.of('hello', 'world'); // ['hello', 'world']

// Get keys of values
console.log(helloWorld.keys()); // [0, 1, 2]
console.log(helloWorld.values()); // [undefined, 'hello', 'world']

// Fills array with something
new Array(2).fill(27); // [27, 27]
```

### Math
```js

```

## String templates
Instead of use string concatenation like
```js
var a = 'a',
    b = 'b',
    c = 'c',
    msg = 'My string is ' + a + ' and ' + b + ' and ' + c;
```
We can use templates
```js
let a = 'a',
    b = 'b',
    c = 'c',
    msg = `My string is ${a} and ${b} and ${c} plus javascript ops ${2+3}`
```

## Destructuring
To extract values from objects and arrays
```js
// Instead of extract from an array
var a = [1, 2, 3],
    first = a[0],
    second = a[1],
    third = a[2];
// we can destructurate it
let b = [4, 5, 6],
    [first2, second2, third2] = b;
// and the same with objects
let c = { a: 1, b: 2, c: 3 },
    { first3, second3, third3 } = obj;
console.log(first3, third3) // returns 1, 3
```

### Spread operator
It gets `what remains`
```js
let arr = [1, 2, 3, 4, 5]
    [head, ...tail] = arr,
    obj = { a: 6, b: 7, c: 8},
    {a, ...rest}; = obj,
    [last, ...init] = arr.reverse();
console.log(head, tail, a, rest); // 1, [2,3,4,5], 6, {b:7,c:8}
console.log(last, init); // 5, [4,3,2,1]
```

## Function parameters
Is a new (and needed) way to pass default params or optional ones.
```js
function sum(a = 0, b = 0) {
    return a + b;
}
console.log(sum(1)); // returns 1
```
You can also use spread operator
```js
function sum (...nums) {
    return nums.reduce((sum, n) => sum + n, 0);
}
console.log(sum(1, 2, 3)); // returns 7
```

## Arrow functions
Cleaner functions
```js
let incr = n => n + 1;
console.log(incr(4)); // 5
```
Avoid the usage of `this`, now you can bound a function to the scope it's
defined in, and avoid using bind or `var that = this`
```js
function foo(values) {
    this.values = values;
    this.incr = function() {
        this.values.map(function (n, i) {
            this.values[i] += 1;
        }.bind(this));
        return this.values;
    };
};
var op = new foo([1, 2, 3]);
op.incr(); // return [2, 3, 4]

// in ES6
function foo2(values) {
    this.values = values;
    this.incr = function() {
        this.values.map((n, i) => this.values[i] += 1);
        return this.values;
    };
}
var op2 = new foo2([1, 2, 3]);
op2.incr(); // return [2, 3, 4]
```

## Classes
We've been doing this by using other libraries, or coffeescript, but this way
makes it easier. Also, inheritance was made using .call, and now we can
`extend` our classes and call `super` to use the parent.
```js
class Animal {
    constructor(name, years) {
        this.name = name;
        this.years = years;
    }
    desc() {
        return `${this.name} is ${this.years} years old`;
    }
}

class Cat extends Animal {
    constructor (name, years) {
        super(name, years);
    }
    desc() {
        return `${super.desc()} and says Meow`;
    }
}

let cat = new Cat('Jiji', '1,7');
let cat2 = new Cat('Yuki', '0,5')
console.log(cat.desc()); // Jiji is 1,7 years old and says Meow
console.log(cat2.desc()); // Yuki is 0,5 years old and says Meow
```

## Getters and setters
Is a way of manipulate data when accessed and to validate data when set.
```js
class Person {
    constructor: function(name, gender) {
        this.name = name;
        this.gender = gender
    }
    get name() {
        return gender === 'male' : `Mr. ${this.name}` : `Mrs. ${this.name}`;
    }
    set name(newName) {
        if (!newName) {
            console.log('Name can\'t be empty');
        } else {
            this.name = newName;
        }
    }
}
let person = new Person('Mike', 'male');
console.log(person.name); // Mr. Mike
person.name = null; // Name can't be empty
person.name = 'Mikaela';
person.gender = 'female';
console.log(person.name); // Mrs. Mikaela
```

## Modules
New way to import export modules without using require or similar tools.
```js
// Instead of
var MyLib = require('MyLib');
// You can do
import MyLib from 'MyLib';
// Or even get just what you need from that library
import { MyMethod as MyLibMethod } from 'MyLib';

// Instead of
module.exports = {
    MainThing: MyLibClass,
    MyMethod: SuperCoolMethod
}
// You can do
export default MyLibClass;
export { SuperCoolMethod as MyMethod };
```

## Data structures
Now there are real sets and hashmaps
```js
// hashmap in ES5
var hash = {},
    key2 = 'key2';
hash['key1'] = 'val1';
hash[key2] = 'val2';
hash.key3 = 'val3';
console.log(hash); // {"key1":"val1","key2":"val2", "key3":"val3"}

// hashmap in ES6
let key2 = 'key2';
let hash = new Map([
    ['key1', 'val1'],
    [key2, 'val2'],
    [true, 'yes']
]);
//hash.key3 = 'val3';
console.log(hash.get(true)); // yes
console.log(hash.has('key3')); // false

for (let [key, val] of hash.entries()) {
    console.log(key, val);
    // returns
    // key1, val1
    // key2, val2
    // true, yes
}

// sets in ES6
let set = new Set([1, 2, 1, 1, 3, 4, 5, 4, 3]);
console.log(set.size); // 5
console.log(set.has(5)); // true
set.forEach(n => console.log(n)); // 1, 2, 3, 4, 5
```

## Symbols
```js

```

## Iterators
```js

```

## Generators
```js

```

---
# Interesting links
+ [Understanding ECMAScript 6 book](https://leanpub.com/understandinges6/read)
+ [ECMAScript 6 (ES6): What’s New In The Next Version Of JavaScript](https://www.smashingmagazine.com/2015/10/es6-whats-new-next-version-javascript/)
+ [Let’s Learn ES2015](https://css-tricks.com/lets-learn-es2015/)
+ [Getting started with ECMAScript 6](http://www.2ality.com/2015/08/getting-started-es6.html)
+ [ES6Cheatsheet.com](https://es6cheatsheet.com)
