# ECMAScript 6 | ES2015 | ES6

## Index
* [Variables](#variables)
    * [let](#let)
    * [const](#const)
    * [Replace IIFEs with blocks](#replace-iifes-with-blocks)
* [String templates](#string-templates)
* [Destructuring](#destructuring)
    * [Spread operator](#spread-operator)
* [Function parameters](#function-parameters)
* [Arrow functions](#arrow-functions)

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

# Interesting links
+ [Understanding ECMAScript 6 book](https://leanpub.com/understandinges6/read)
+ [ECMAScript 6 (ES6): What’s New In The Next Version Of JavaScript](https://www.smashingmagazine.com/2015/10/es6-whats-new-next-version-javascript/)
+ [Let’s Learn ES2015](https://css-tricks.com/lets-learn-es2015/)
+ [Getting started with ECMAScript 6](http://www.2ality.com/2015/08/getting-started-es6.html)
+ [ES6Cheatsheet.com](https://es6cheatsheet.com)
