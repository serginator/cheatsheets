# TypeScript

## Index
* [Types](#types)
    * [Boolean](#boolean)
    * [Number](#number)
    * [String](#string)
    * [Array](#array)
    * [Tuple](#tuple)
    * [Enum](#enum)
    * [Any](#any)
    * [Void](#void)
    * [Null and Undefined](#null-and-undefined)
    * [Never](#never)
* [Interfaces](#interfaces)
* [Classes](#classes)
* [Generics](#generics)
* [Modules](#modules)
* [Decorators](#decorators)
* [Type assertions](#type-assertions)
* [Type inference](#type-inference)
* [Type compatibility](#type-compatibility)
* [Type guards](#type-guards)
* [Type aliases](#type-aliases)
* [Type parameters](#type-parameters)
* [Type inference](#type-inference)
* [Type compatibility](#type-compatibility)
* [Type guards](#type-guards)
* [Type aliases](#type-aliases)
* [Type parameters](#type-parameters)

# Content

## Types

### Boolean

```ts
let isDone: boolean = false;
```

### Number

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### String

```ts
let color: string = "blue";
color = 'red';
```

### Array

```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

### Tuple

```ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

### Enum

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

### Any

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

### Void

```ts
function warnUser(): void {
    alert("This is my warning message");
}
```

### Null and Undefined

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

### Never

```ts
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}
// Inferred return type is never
function fail() {
    return error("Something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}
```

## Interfaces

```ts
interface LabelledValue {
    label: string;
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

## Classes

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
```

## Generics

```ts
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("myString");  // type of output will be 'string'
let output = identity("myString");  // type of output will be 'string'
```

## Modules

```ts
// file1.ts
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
// file2.ts
import { StringValidator } from "./StringValidator";
export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
// file3.ts
import { ZipCodeValidator } from "./ZipCodeValidator";
let myValidator = new ZipCodeValidator();
// Some samples to try
console.log(myValidator.isAcceptable("...")); // false
console.log(myValidator.isAcceptable("98052")); // true
console.log(myValidator.isAcceptable("101")); // false
```

## Decorators

```ts
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

### Type assertions

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

## Type inference

```ts
let x = 3;
```

## Type compatibility

```ts
interface Named {
    name: string;
}
class Person {
    name: string;
}
let p: Named;
// OK, because of structural typing
p = new Person();
```

## Type guards

```ts
function isNumber(x: any): x is number {
    return typeof x === "number";
}
function isString(x: any): x is string {
    return typeof x === "string";
}
function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

## Type aliases

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
```

## Type parameters

```ts
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: <T>(arg: T) => T = identity;
```

# Resources

* [TypeScript](https://www.typescriptlang.org/)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
* [TypeScript Playground](https://www.typescriptlang.org/play/index.html)
* [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html)
