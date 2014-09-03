# Python

## Print stuff
```python
print('Hello world')
```

## Variables
```python
msg = 'Hello world'
print(msg)
```

## Types
```python
print(type(msg)) #str
print(type(5)) #int
```

## Booleans
`True`, `False`

## IF
```python
if var == True:
  # do something
elif var <= 5 or var >= 10:
  # do something
else:
  # the last thing
```

## Lists
```python
colours = ['Red', 'Green', 'Blue]
print('Green' in colours) #prints True
colours.append('White') #adds White
more_colours = ['Black', 'Yellow']
colours.extend(more_colours) #joins lists
even_more = ['Purple']
colours = colours + even_more #joins lists too
len(colours) #returns the length of the list
colours = colours + [more_colours] #this will duplicate some
set(colours) #returns a set which has no duplicates in it
```

## For
```python
users = ['Mike', 'John', 'Robert', 'Lucy', 'Vanessa', 'Helen']
for user in users:
  print(user)
```

## Strings
```python
print('This is a message: ' + msg)
print('This is a number: ' + str(5))
sentence = 'Here is my phrase'
sentence[0] #first letter
sentence[16] #last
sentence[:4] #'Here'
sentence[-6:] #'phrase'
sentence[4:6] #'is'
sentence.split(' ') # ['Here', 'is', 'my', 'phrase']
```

## Tuples
```python
user = ('Sergio', 27)
user[1] # 27
extended_user = ('Sergio', 27, 'Developer') #tuples can be any lenght
```

## Dictionaries
```python
phones = {
  'Mike': '123456789',
  'Helen': '666123456',
  'Rob': '612123123'
}
phones['Rob'] #'612123123'
'Mike' in phones # True
'123456789' in phones # True
'Sergio' in phones # False
del phones['Helen'] #removes a key:value
for name in phones: #loop over a dict
  print(name, phones[name])
```
