# Haskell notes

|   There aren't   |         There are        |
|:----------------:|:------------------------:|
|   Assignations   |         Recursion        |
|       Loops      |         Functions        |
| Var declarations | Computationally complete |
|      Status      |           Easy           |
|    Von Neuman    |         Reliable         |
|     Efficency    |          Elegant         |
|                  |        Verifiable        |

## Theorem
Any recursive algorythm can be transformed into an iterative one and vice
versa. Corollary: We haven't loose calculation power.

## Haskell
+ Purest functional language. Referential transparency (an expression has the
same value anywhere in the program).
+ Not strict.
+ Lazy evaluation.
+ Infinite structures
  ```
  HUGS>[1..]
  returns [1,2,3,4... and doesn't end
  ```
+ Strongly typed. There's no `void`. Haskell infers type.

## Currying
|      Maths      |    Haskell    |
|:---------------:|:-------------:|
|     f(2, 3)     |     f 2 3     |
| f(a, b) ± c * d | f a b ± c * d |
|     g(a) + b    |    g a + b    |
|   f(a + b, c)   |  f (a + b) c  |
|    f(x, g(y))   |   f x (g y)   |

+ `--` is a one line comment (//)
+ `{- whatever -}` is a multiline comment (/* whatever */)
+ A simple function:
  ```
  g::Int -> Int
  g x = x + 1 -- gets an integer and returns one more
  ```
+ Another simple function:
  ```
  f:: Int -> Int -> Int
  f x y = x + y + 1 -- addition of x and y plus 1
  ```
+ Function names and variables must be in lowercase, can't start with a
number, accept `'`, digits, `_` and `-`.
+ Types start with uppercase.
+ More examples:
  ```
  --double::Int->Int
  double x = x + x
  --quadruple::Int->Int
  quadruple x = double (double x)
  --We don't need to ad fn::type->type, the compilers infers it
  twice f x = f(fx)
  ```

## Hugs
To load a program with hugs use :l (or :load) program.hs

## Redex: Reduction expression
It is better to evaluate from outside to inside

```
square::Int->Int
square x = x * x

>2 + square 3 -> 2 + (3 * 3) -> 2 + (9) -> 11
>square(square 3) -> (square 3)*(square 3) -> (3 * 3) * (square 3) ->
-> 9 * (square 3) -> 9 * (3 * 3) -> 9 * 9 -> 81
```

+ Impacient evaluation: redex from inside to outside
+ Lazy evaluation: redex from outside to inside

Haskell uses some kind of lazy evaluation with `sharing`, a graphs structure.
I'll try to explain it here:

```
square 3 -> · * · -> 9, where · points to 3
square (square 3) -> · * · where · points to square 3 ->
  -> · * · where each · points to ~ * ~ where ~ points to 3 -> 
  -> · * · where · points to 9 -> 81
```

## Comparisions
(==), (<), (>), (<=), (>=), (/=)

## Types
+ Bool: True False
+ Int
+ Integer
+ Float
+ Doble
+ Char: 'a', '\n', '\t', '\''

Example: `>True < 'a'` returns Type Error

The command `>:set +t` returns the type used to have more info, like a debug.

### Tuple
Mixed component where the type of each component can be different.
+ `(1, 'a', 3.0, True)::(Int, Char, Float, Bool)`.
+ `()` is an empty tuple.
+ Unitary tuple like (3) has no sense, the compiler understands it as a 3.
+ Example:
  ```
  predSuc::Int -> (Int, Int)
  predSuc n = (n - 1, n + 1)
  ```

### Lists
Must be of the same type, but there's no limit of elements. Lists doesn't have
pointers.
+ `[]` empty list. []::[a] means type a, anything.
+ `(:)` is used to join an element to a list (but not a list to a list).
  + `1:[]`.
+ `(:)::a -> [a] -> [a]`.
+ `3:1:[]` makes [3, 1].
+ `'a':3:[]` throws Type Error.
+ `(1:(2:(3:(4:(5:[])))))` joins from the right. The parenthesys aren't needed.
+ `[1..5]` means from 1 to 5 -> `[1, 2, 3, 4, 5]'
+ String = [char] -> `['h', 'o', 'm', 'e'] -> 'home'`

## The arrow (->)
It's used to construct types.
Having `t1, t2, ..., tn, tr` can construct something like
`t1 -> t2 -> ... -> tn -> tr` which means that it takes a type `t1`, type `t2`,
..., type `tn`, and returns a type `tr`.

## Pattern adjustment
Haskell evaluates several functions in order and when it finds a rule that
works correctly, returns that. Example:
```
f::Int -> Bool
f 1 = True
f 2 = False
f x = False
>f 1 -> True
>f 2 -> False
>f 3 -> False -- If we didn't put "f x = False" this will throw an error.

f:Int -> Bool
f x = True
f 2 = False
>f 2 -> True -- Because it evaluates first "f x" and it matches.
```

### Recursive examples
+ Factorial
  ```
  fact::Int->Int
  fact 0 = 1                  -- base
  fact n = n * fact (n - 1)   -- recursive

  >fact 0 -> 0
  >fact 3 -> 6
  >fact 117 -> 0 out of range
  ```

  We can fix this in two ways, one is to declare it as `fact::Integer->Integer`
  so in this way it will not run out of range. Another fix could be removing
  the type declaration, in this way the compiler will infer the type and put
  something like `fact::Num a => a -> a`, we can see this with `hugs` putting
  `:t fact` (or `:type`).

+ Returns the addition of elements of a list
  ```
  sum::[Int]->Int
  sum [] = 0
  sum (x:xs) = x + sum xs -- x is the first element and xs are the following.
  ```
+ Concat two lists of numbers
  ```
  conc::[Int]->[Int]->[Int]
  conc [] xs = xs
  conc (x:xs) ys = x:(conc xs ys)
  >conc [1,2] [3,4,5] -> [1,2,3,4,5]

  -- This is already defined in Haskell with (++)
  >[1,2] ++ [3,4,5] -> [1,2,3,4,5]
  ```

### More patterns
+ Anonymous pattern or underlined
  ```
  first2::(Int, Int)->Int
  first2 (x, y) = x -- or we can put "first2 (x, _) = x" because we don't care
  first3::(Int, Int, Int)->Int
  frist3 (x, _, _) = x
  ```
+ Arythmetic ones, patherns n+k being k a constant
  ```
  fact::Int->Int
  fact 0 = 1
  fact (n + 1) = (n + 1) * fact n
  ```
+ Named patterns, it's like an alias for an expression
  ```
  fact::Int->Int
  fact 0 = 1
  fact m@(n+1) = m * fact n
  ```

## Definition of functions by cases
```
  sign::Int->Int
  sign x  | x > 0 = 1 -- These are called guards
          | x < 0 = -1
          | otherwise = 0
```

```
  abs::Int->Int
  abs x   | x >= 0 = x
          | otherwise = -x
```

## Conditionals
```
  ifThenElse::Bool->Int->Int->Int
  ifThenElse True x _ = x
  ifThenElse False _ y = y
```

## Case expressions
```
  sum::[Int]->Int
  sum xs = case xs of
            [] = 0
            (y:ys) -> y + sum ys
```

## Error function
```
  head::[Int]->Int
  head [] = error 'list is empty'
  head (x:_) = x
```

## Local definitions
For this example we'll solve the equation `ax²+bx+c=0` with
(-b±sqrt(d))/2a being d = b²-4ac
```
  roots::(Float, Float, Float) -> (Float, Float)
  roots (a, b, c)
    | d >= 0 = ((-b + sqrt d) / (2 * a), (-b - sqrt d) / (2 * a)
    | otherwise = error "..."
    where : d = b * b - 4 * a * c
  {-
    we could add also in where more local definitions like
    "rd = sqrt d" and "da = 2 * a" and replace them in the equation.
  -}
```

We could also create a type, for example:
```
  type Complex=(Float, Float)
  roots::(Float, Float, Float) -> (Complex, Complex)
```

## Local declarations
+ where (we saw it before)
+ let: `let f x = x * x in f 8 -> 64`. So we could rewrite roots like this:
  ```
    roots (a, b, c) = let
                        d = b * b - 4 * a * c
                        da = 2 * a
                      in
                        if (d >= 0) then (..., ...)
                        else error "..."
  ```

Important! guards, let, where, of, do... must be correctly indented!!

## Operators
```
  >1 + 2
  3
  >(+) 1 3
  4
  >mod 10 3
  1
  >10 `mod` 3
  1
```

### List of infix operators
`: ! # $ % & * + · / < = > ? @ \ ^ | - ~ && || /= //`

### Declaring operators
```
infix <priority [0..9]> <op-name>
infixr <priority> <op> -- from right
infixl <priority> <op> -- from left
--
infixr 9 ·
infixl 9 !!
infixr 8 ^, ^^, **
infixr 3 &&
infixl 2 ||
--
infixr 2 ||| --exclusive or
(|||)::Bool->Bool->Bool
True ||| True = False
False ||| False = False
_ ||| _ = True
```

## Superior order
An argument is a function or returns a function
```
  twice::(Int -> Int) -> Int -> Int
  twice f x = f (f x)

  dev,inc::Int->Int
  inc x = x + 1
  dec x = x - 1

  twice inc 10 -> inc (inc 10) -> inc (10 + 1) -> inc 11 -> 11 + 1 -> 12
```

### Examples
+ Map with integers
  ```
  map:: (Int -> Int) -> [Int] -> [Int]
  map f [] = []
  map f (x:xs) = f x : map f xs
  --
  >map inc [1..5] -> [2..6]
  >:t map
  (a -> b) -> [a] -> [b]
  ```

+ Filter (actually defined in Haskell as filter::)
  ```
  removeCond::(Int->Bool)->[Int]>[Int]
  removeCond p [] = []
  removeCond p (x:xs)   | p x = removCond p xs
                        | otherwise = x:eliminaCond p xs

  removeZero xs = removeCond p xs
                  where p 0 = True
                        p _ = False
  ```

## Anonymous Functions. Lambda-expression. λ
`(λx -> x + 1)::Int->Int`
In Haskell, lambda is written with `\` instead of `λ`.
  ```
  >\x -> x + 1
  << function >>::Int->Int
  >(\x -> x + 1) 3
  4
  ```

### Some examples
+ Bubble pattern
  ```
  bubble::[Int]->[Int]
  bubble xs = baux xs [] False
    where
      baux [] yx False = ys
      baux [] ys True = baux ys [] False
      baux [x] ys b = baux [] (ys ++ [x]) b
      baux (x1:x2:xs) ys b
        | (odd x1 && even x2) = baux (x2:xs) (ys++[x1]) True
        | otherwise = baux (x1:xs) (ys++[x2]) b
  ```
+ Reverse
  ```
  rev::[a]->[a]
  rev [] = []
  rev (x:xs) = rev xs ++ [x]

  rev2::[a]->[a]
  rev2 cs = revaux xs[]
    where
      revaux [] ys = ys
      revaux (x:xs) ys = revaux xs (x:ys)
  ```

## Partial application
`f::(t1->(t2->...->(tx->...->(tn->(tr)))))`

`f e1 e2... ek::tk+1 -> ... tn -> tr`

Example:
```
  f::Int->Int->Int->Int
  f x y z = x * (2 * y + z)
  >f
  <<function>>::Int -> (Int -> (Int -> Int))
  >f 2
  <<function>>::Int -> (Int -> Int)
  >f 2 3
  <<function>>::Int -> Int
  >f 2 3 4 -- Total application
  20
```

## Sections
Binary operators partially applied with recieve only an argument.

