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

## More VIM Settings

