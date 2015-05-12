# Advanced VIM

## Text Objects

### word

* `viw` selects inner word with the cursor on it
  * `v` stands for visual mode
  * `i` stands for inner
  * `w` stands for word
* `vaw` selects a full word with the following space
  * `a` stands for visualize around a word
* `diw` deletes inner word; `daw` deletes a word

### WORD
The difference between `word` is that `WORD` is everything delimited by spaces
and `word` can be a piece of chars, a dot, a slash... And has the same commands
as `word`.

### paragraph
* `vip` selects a paragraph; `vap` selects also the next empty line

### sentence
Like paragraph but selects until a dot.

* `giUs` makes a sentence Uppercase
* `das` deletes around a sentence

### tags
* `vit` selects a tag, what is inside `<a>X</a>` for example
* `vat` selects also the tag itself (opening and ending)
* `vi{X}` selects inner X
  * `vi(` selects the arguments of a function for example
  * `vi{` selects the content of the function for example.
* Also, `b` refers to `(` and `B` to `{`, so `viB` selects the content of a
  function

## Autocommands
It's a way to launch some commands when an event happens. The format is:

`autocmd event pattern command`

For example:

`autocmd BufRead,BufWritePre *.html normal gg=G`

The way to read this is: When BufRead or BufWritePre (when reads a file or
writes a file) with the pattern `*.html`, execute a normal command, gg=G, in this
case it will autoindent all the file from the beginning to the end.

The list of events is in `:help autocmd-events`

Another example, this will comment out a line in a html file with <leader>c
`au Filetype html nnoremap <leader>c I<!--<esc>A--><esc>`

* augroups
  It's a way to join some autocommands in a group. Ex:

  ```
  augroup JavaScript Cmds
    au Filetype javascript nnoremap <leader>r :!node %<cr>
    au Filetype javascript nnoremap <leader>c I//<esc>
  augroup END
  ```

* `autocmd!` deactivates the commands inside a group

## Registers  
* `:registers` show your registers in the vimrc and the saved ones
* `"add` adds a deleted line in register "a; `"ap` pastes register a
* Everything you yenk (yy) is copied also in register 0
* You can record a macro and it will be saved in a register, so you can
  edit that register to add or remove anything and save in that register again

## Actions in insert mode
* `Ctrl+h` backspace; `Ctrl+w` backspace a word; `Ctrl+w` backspace a line
* `Ctrl+v{X}` writes character X in unicode
* `Ctrl+o` you can move a line with hjkl.
* `Ctrl+r{X}` prints register X
* `Ctrl+r=` to write something that can be evaluated, like a multiplication

## More in regexp
* Useful remappings:
```
nnoremap / /\v
vnoremap / /\v
nnoremap ? ?\v
vnoremap ? ?\v
```

## More useful stuff
* `gj` and `gk` moves a visual line, so it's very useful when you have
  wrapped text
* `g0` and `g$` moves to the beginning and end of a visual line
* `gf` opens a file if the word where the cursor lays is the name of a file
* `r` replaces a letter; `R` enters in replace mode
* `zz` moves a line to the middle of the window
* in visual mode, `o` toggles the cursor in opposite corners;
  `O` toggles the cursor in the same line
* `.` repeats last change
* `A;` adds ; to the end of the line
* `fs` jumps to the next s; `;` jumps to the next one; `,` to the previous
* `\*` search for what is under the cursor; `#` searchs for the previous
* `%` in a parenthesys jumps to the ending one

## Functions
Example of function, call with `:call AddHelloToTop()`. The `!` replaces
the function so you can resource it without errors
```
function! AddHelloToTop ()
    normal HOhello thereA vim user0
    s/hello there/hi
    return "we added a message"
endfunction
```
If we add `command! Hello call AddHelloToTop()` we can use `:Hello` or also
do something like `nnoremap <leader>h :call AddHelloToTop()<cr>` and use `h`

## Better Autocompletion in VIM
```
function! InsertTabWrapper()
    let col = col(".") - 1
    if !col || getline(".")[col -1] !~ '\k'
        return "\<tab>"
    else
        return "\<c-n>"
endfunction

inoremap <tab> <c-r>=InsertTabWrapper()<cr>
inoremap <s-tab> <c-p>
```

## Language-Specific Settings
Just create a folder under `.vim` called `ftplugin` and, inside this one,
one called `javascript.vim`. Put some settings there, and this will be only
applied to `.js` files. Same with `css.vim`, `html.vim`, etc etc.

## Abbreviations
It's useful to fix some common problems when writting
`:abbrev teh the` will fix `teh` with `the`
`inoreabbrev teh the` will do the same in .vimrc
`:unabbrev the` gets rid of it

## Status line
`:set laststatus=2` shows the status line always
`:set statusline=%f\ \ line:%l/%L\ col:%c\ %p%%\ %y`

## Node debugging in VIM
`npm install -f vimdebug` [more info](https://github.com/sidorares/node-vim-debugger)
After that, you can debug a file with `node-vim-inspector file.js` and launch
`vim -nb` in another term to launch the file.
Shortcuts are:
  ```
  Ctrl+c -> continue
  Ctrl+i -> step in
  Ctrl+o -> step over
  Ctrl+n -> step next
  Ctrl+u -> move one stack frame up
  Ctrl+d -> move one stack frame down
  Ctrl+p -> set breackpoint at current location
  ```
