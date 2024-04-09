# tmux command

## Without tmux
+ `tmux` -> start tmux cmd
+ `tmux new -s <name>` -> start new session called <name>
+ `tmux a` -> attach to last session
+ `tmux a -t <name>` -> attach to <name> session
+ `tmux ls` -> list sessions
+ `tmux kill-session -t <name>` -> kills <name> session
+ `tmux kill-session -a` -> kills all sessions but current

## With tmux started
+ `C-b $` -> rename session
+ `C-b d` -> detach from session
+ `C-b w` -> session/window preview
+ `C-b (` or `C-b )` -> move to previous or next session
+ `C-b c` -> create window
+ `C-b ,` -> rename current window
+ `C-b &` -> close current window
+ `C-b p` or `C-b n` -> move to previous or next window
+ `C-b 0..9` -> switch window by number

### Panes
+ `C-b ;` -> toggle last active pane
+ `C-b %` -> split vertically
+ `C-b "` -> split horizontally
+ `C-b {` or `C-b }` -> move current pane left or right
+ `C-b <arrow>` -> switch panes to that direction
+ `C-b q` -> show pane numbers
+ `C-b q 0..9` -> select pane
+ `C-b x` -> close current pane
+ `C-b <spacebar>` -> toggle between pane layouts
+ `C-b C-<arrow>` -> resize current pane

### Copy mode
+ `C-b [` -> enter copy mode
    + <spacebar> start selection
    + <esc> cancel selection
    + <enter> copy selection
+ `C-b ]` -> paste contents on buffer_0

