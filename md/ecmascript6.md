# ECMAScript 6 | ES2015 | ES6

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


# Interesting links
+ [Understanding ECMAScript 6 book](https://leanpub.com/understandinges6/read)
+ [ECMAScript 6 (ES6): What’s New In The Next Version Of JavaScript](https://www.smashingmagazine.com/2015/10/es6-whats-new-next-version-javascript/)
+ [Let’s Learn ES2015](https://css-tricks.com/lets-learn-es2015/)
+ [Getting started with ECMAScript 6](http://www.2ality.com/2015/08/getting-started-es6.html)
