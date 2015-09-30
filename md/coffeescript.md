# Quick CoffeeScript guide (copy from an old 2013 repo)

## Vars
There's no need to worry about global scope, hoisting and similar, CS handles that moving vars to the top of the scope.
```coffeescript
name = "Sergio"
year = 2013
```
## Strings
It omits returns
```coffeescript
text = "This is a
    test"
console.log text # 'This is a test'
```
If we want returns, we must use `"""`
```coffeescript
text = """
  This is a
  test"""
console.log text # 'This is a
test'
```
## Comments
```coffeescript
# This is a comment
```
Same as with Strings, we can make them multiline with `###`
```coffeescript
###
This is a
multiline comment
###
```
## String interpolation
```coffeescript
name = "Sergio"
text = "My name is #{name}"
```
## IFs
```coffeescript
if name === "Sergio"
  me = true
else
  me = false

if name is "Sergio" then me = true else me = false
me = (if name is "Sergio" then true else false)
me = true if name is "Sergio"
me = false if name isnt "Sergio"
me = false unless name is "Sergio"
```
## Loops
### While / Until
```coffeescript
count = 0
while count <= 10
  count++

while count <= 10 then count++
unless count is 10 then count++

```
### For
```coffeescript
animals = ["dog", "cat", "cow"]
for animal in animals
  console.log animal

# modifying the increment
for animal in animals by 2
  console.log animal
  # it returns "dog", "cow"

console.log animal for animal in animals by 2

# con condicionales
console.log animal for animal in animal when animal[0] is "c" #"cat","cow"
```
### Loop
```coffeescript
count = 0
loop
  break if count is 10
  count++
```
## Aliases and operators
`=== is`
`!== isnt`
`|| or`
`&& and`
`! not`
`?` operator of existence, to make stuff like:
```coffeescript
name = names[0] ? "Sergio" #by default
player?.fire?() # if player exists and fire method exists, executes it
```
@ this
`@name = "Sergio" # this.name = "Sergio"`
:: prototype
`player::life = 5`
## Functions
```coffeescript
hello = -> "world"
do hello
###
var hello = function() {
  return "world";
}
hello()
###
hi = (a = "Sergio) -> "hello #{a}"
hi() # "hello Sergio"
hi "Mike" # "hello Mike"
###
var hi = function(a) {
  if (a == null) {
    a = "Sergio"
  }
  return "hello " + a;
}
###
sum = (numbers...) ->
  result = 0
  numbers.forEach (number) -> result = result + number
  resultB
miSuma = sum 1, 2, 3, 4, 5
alert sum 1, 2, 3, 4, 5 #alert(sum(1,2,3,4,5))
```
### Scope
It's defined with the first assign of a var
### Context
With `new` the context is the new object
With `call` and `apply` is the first argument
If it isn't any of those, the context is global
### Changing context in functions
Declaring them with fat arrow `=>` instead of normal arrow.
## Objets
Can be declared without curly braces or comas:
```coffeescript
inhabitants =
  eri:
    age: 27
    occupation: "Doctor"
  sergio:
    age: 27
    occupation: "Developer"
```
Another oneliner example
`fellowship = wizard: 'Gandalf', hobbits: ['Frodo', 'Pippin', 'Sam']`
Knowing if a property exists in an object:
`console.log wizard of fellowship`
## Arrays
Brackets are needed `[]`, commas aren't
Ex:
`Math.max [1,10,3,6,2]...` #returns 10
We can use reduce, reduceRight, map...
`console.log [1..10], [10..1] #[1,2,3,4,5,6,7,8,9,10] [10,9,8,7,6,5,4,3,2,1]`
`console.log [1...10] #[1,2,3,4,5,6,7,8,9] I mean, it's like [1,10)`
## Classes
### Prototype
```coffeescript
Hero = (@power) ->
  Hero::says = -> console.log "My superpower is #{@power}!"

#mixing prototype and static
Hero = (@power) ->
  Hero.count++
  @number = Hero.count
  @says()
Hero.count = 0
Hero::says = -> console.log "#{@number}. My superpower is #{@power}!"
```
### Classes
```coffeescript
class Hero
  #static private
  _count = 0
  constructor: (@power) ->
    _count++
    @says ()

  #Instance methods
  says: -> console.log "#{@number()}. My superpower is #{@power}!"

  number: -> _count

  #static public method
  @count: -> console.log "Number of instances #{_count}"

superman = new Hero "fly"
batman = new Hero "a belt with gadgets"
Hero.count() # 'Number of instances 2'
```
### Inheritance
```coffeescript
class Vehicle
  fuel: 100
  constructor: (@type, @hero) ->
  use: ->
    @fuel--
    if @fuel > 0
      console.log "#{@hero} is using a #{@type}"
    else
      console.log "Upps!! No fuel in the tank of #{@constructor.name}"

class BatMobile extends Vehicle
  constructor: -> super "car", "Batman"
batmobile = new BatMobile()
batmobile.use() # 'Batman is using a car'

class BatPod extends Vehicle
  fuel: 0
  constructor: -> super "moto", "Robin"
  refuel: ->
    @fuel = 10
batpod = new BatPod()
batpod.use() # 'Upps!! No fuel in the tank of BatPod'
batpod.refuel()
batpod.use() # 'Robin is using a moto'
```
### Polimorfism
Different behaviours for one function
```coffeescript
class Vehicle
  constructor: (@fuel = 10) ->
  burnout: ->
    throw new Error "I'm an abstract method"

class BatMobile extends Vehicle
  constructor: ->
    super fuel = 50
  burnout: ->
    console.log @fuel / 25

class BatPod extends Vehicle
  burnout: ->
    console.log @fuel / 8
```
## Modularization
### Namespaces
A way to solve it is declaring a global var and puting inside what we need, this way we can work with several works and all of them will have that global object
```coffeescript
(global or window).libjs = {}

#math.coffee
libjs.math =
  sum: (a, b) -> a + b
  rest: (a, b) -> a - b
#const.coffee
libjs.CONST =
  MIN: 10
  MAX: 50
#classes.coffee
class jibjs.Hero
```
### Mixins
```coffeescript
extend = (obj, mixin) ->
  obj[name] = method for name, method of mixin obj

include = (class_reference ,mixin) ->
  extend class_reference.prototype, mixin

include Hero ,film: true
(new Hero).film
```
