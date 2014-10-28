# Haskell notes

|   There aren't   |         There are        |
|:----------------:|:------------------------:|
|   Assignations   |         Recursion        |
|       Loops      |         Functions        |
| Var declarations | Computationally complete |
|      Status      |           Easy           |
|    Von Neuman    |         Reliable         |
|     Efficency    |          Elegant         |
|                  |                          |

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




