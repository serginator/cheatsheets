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

## Arrow functions

## Strings

### Template Literal

### Methods

## Arrays

## Math

## Destructuring

## Spread Operator

## Parameters

### Default values

### Rest

## Modules

## Classes

## Symbols

# Interesting links
+ [Understanding ECMAScript 6 book](https://leanpub.com/understandinges6/read)
+ [ECMAScript 6 (ES6): What’s New In The Next Version Of JavaScript](https://www.smashingmagazine.com/2015/10/es6-whats-new-next-version-javascript/)
+ [Let’s Learn ES2015](https://css-tricks.com/lets-learn-es2015/)
+ [Getting started with ECMAScript 6](http://www.2ality.com/2015/08/getting-started-es6.html)
