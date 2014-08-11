# VIM

## Modes
* Insert Mode: `i`
* Command Mode: by default, or `Esc` in in Insert mode
* Visual Mode: `v` -> to select stuff
  * if the cursor is in a bracket or similar, `%` selects the whole scope
* Visual Line: `V` -> same but per lines

## Typical commands
* Save: `:w <name>`
* Quit: `:q`

## Movement
* `hjkl` -> left down up right
* `w` -> word; `W` -> whole word
* `b` -> word back; `B` -> whole word back
* `$` -> end of line; `^` -> beginning of line (without space); `0` -> beginning of line
* `gg` -> beginning of file; `G` -> end of file; `X + gg` -> go to line X;
* `}` -> next paragraph; `{ `-> previous P
* `f{P}` -> jumps to first word that starts with P; `F{P}` -> the opposite
* `t{P}` -> jumps just before that character; `T{P}` -> the opposite
* `Number + command` -> repeat X times a command
* `:{X}` -> go to X line

## Editing
* `:edit {X}` -> Open X file
* `x` -> delete char in cursor
* `u` -> undo
* `dw` -> delete word; `db` -> delete previous word
* `dd` -> delete line; `cc` -> delete line and insert mode
* `cw` -> delete word and enter insert mode
* `ct{X}` -> remove from the cursor until X character
* `ci{X}` -> remove inside X (ex: 'asd xx-xx asd' cursor in -, `ci'` leaves ''
* `ca{X}` -> remove around X (ex: ['asd-asd'], `ca'` leaves [])
* `O` -> insert blank line before; `o` -> insert blank line after

## Cut/Copy/Paste
* `d` -> cut; `x` -> cut char; `X` -> cut prev char
* `p` -> paste after cursor; `P` -> paste before cursor
* `yw` -> copy word; `yy` -> copy line

## Search
* `/test` -> search "test" word; `n` -> search the next; `N` -> previous
* `?function` -> search "function" backword; `n` -> previous; -> `N` -> next
* `:noh` -> unhighlight
* `d/test` -> delete until test word
* `c/test` -> delete until test word and insert mode

## Replace
* `:%s/Text1/Text2/g` -> Changes Text1 with Text2 in the whole file

## Macros
* `q{X}` -> start recording macro in X register; `q` again ends the recording
* `:registers` -> show registers
* `@{X}` -> starts X macro registered

## Command line in vim
* `:!{X}` -> launch command X, for example, `:!ls` list files
* `:read !{X}` -> put the output of X in your open file
  * ex. `:r !curl --silent http://test/file.js`
  * ex. go to visual line mode, select some coffee code, do colon and ! and write coffee -c -s -p, and it will convert the code selected

## Buffers
* `:ls` -> list buffers oppened
* `:bn` or :bnext -> shows next buffer; `:bf` or `:bprev` -> shows previous
* `:b#` -> show last opened, so you can jump between two files with `:b#`
* `:bf` -> jump to first one
* `:bd{X}` -> removes X buffer, the number watched when executing `:ls`

## Windows and tabs
* `:vs` or `:vsplit` -> vertical split; `:sp` or `:split` -> horizontal split
* `Ctrl W {hjkl}` -> Move cursor to left down up right window
* `Ctrl W {HJKL}` -> Place window to that position
* `Ctrl W {+-}` -> Resizes window height, with Ctrl W 10 +, increases 10px
* `Ctrl W {<>}` -> Resized window width
* `Ctrl W` = -> Resize window equally
* `:sb{X}` -> Split with buffer X
* `:vert sb{X}` -> Split vertically with buffer X
* `:tabedit {X}` -> Open {X} file in a tab
* `gt` -> go to next tab; `gT` -> go to previous tab

## Indents and Folds
* `>>` -> indent
* `<<` -> indent back
* `>{X}` -> indent X times
  * you can also go to visual mode, select some lines, do `>>`, and indent all
  * or go to visual mode, select some bad indented text, and hit `=`
* `gg=G` -> indent everything
* in insert mode: `Ctrl+t` indents; `Ctrl+d` indents back
* `zf{X}{Y}` -> folds X times in Y direction. ex. `zf5j`
* `zo` -> open fold; `zc` -> close fold; `zd` -> delete fold; `zO` -> open all
* in a ({ `zf%` -> fold to closing })
* `zi` -> fold/unfold every fold

## OmniCompletion
* `Ctrl+X, Ctrl+O` shows the omnicomplete menu
* `Ctrl+X, Ctrl+P` complete the keyword
* `Ctrl+X, Ctrl+L` complete the line
