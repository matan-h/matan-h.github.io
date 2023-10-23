---
id: 220
title: 'My Linux .config files'
date: '2022-07-12T15:44:34+00:00'
author: matan.honig2@gmail.com
guid: 'https://matan-h.com/?p=220'
permalink: /my-linux-config-files/
image: /assets/images/my-config-files.png
categories:
    - linux
tags:
    - aliases
    - arch
    - config
    - linux
    - manjaro
    - oh-my-zsh
    - screensaver
    - zsh
    - zshrc
---

![](/assets/images/my-config-files.png)
I recently switched to Linux, and I spent a lot of time on editing my config files. I hope it will be useful to others. All the files are in my GitHub repository [.config](https://github.com/matan-h/.config). Each command is documented in the comments.

Here are the main features:

**aliases (in the [.aliases](https://github.com/matan-h/.config/blob/master/.aliases) file)**

Shortcuts to commands I usually use, or that have long and complicated options, or to common applications. In addition there are useful hacks. For example:

```bash
alias hsi='history | grep -i' 
```

This is a shortcut for command history. Usage example would be `hsi beep` to search for "beep" in bash history.

```bash
alias cvenv"=python -m venv venv" 
```

This is a shortcut to create a Python virtual environment. I think I use this most often.

```bash
alias "cd.."="cd .."
```

This fixes a common error of forgetting the space between the `cd` command and the `..` directory.

```bash
alias "$"="" 
```

This is for copy/pasting commands like `"$ apt install"` etc.

There are many more aliases in my file, check them out.

**.zshrc**

These commands customise the Oh-my-zsh. This file runs at Terminal startup and has many useful configurations.

```bash
if [[ -n "$ZSH_CUSTOM_THEME" ]]
then
    ZSH_THEME="$ZSH_CUSTOM_THEME"
else
    ZSH_THEME="agnoster"
fi
```

This command checks for the environment variable `$ZSH_CUSTOM_THEME` and if it exists it changes the [oh-my-zsh theme](https://github.com/ohmyzsh/ohmyzsh/wiki/themes) to the given theme. I use this to change my VSCode terminal theme without affecting the regular zsh windows.Some themes do not look good in VSCode and other applications.

```bash
plugins=(git-extras colored-man-pages command-not-found encode64 extract sudo fzf yarn copypath archlinux gh web-search copyfile copybuffer dirhistory httpie aliases)
```

These are my zsh plugins. Note that plugins are separated by space and not by comma. All these plugins are highly recommended. Most are for command completion and aliases, but all are important. For example the `sudo` plugin adds "sudo" to the last command by pressing `esc` twice. `copypath` easily copies current directory path to clipboard. Checkout the full list in my [github](https://github.com/matan-h/.config/blob/master/.zshrc).

```bash
ZSH_WEB_SEARCH_ENGINES=(
    archwiki "https://wiki.archlinux.org/index.php?search="
    gmail "https://mail.google.com/mail/u/0/#search/"
)
```

This adds the option to search arch and gmail by alias.

```bash
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
```

I am using Manjaro (based on Arch), and it has a package for [syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) in zsh, and also [auto-suggestions](https://github.com/zsh-users/zsh-autosuggestions) for commands. In other platforms you can clone the GitHub packages.

Other files
- [settings.json](https://github.com/matan-h/.config/blob/master/.config/Code/User/settings.json)>settings.json holds some very useful [VSCode](https://code.visualstudio.com/) settings.

- [.xscreensaver](https://github.com/matan-h/.config/blob/master/.xscreensaver) has cool screen savers (from [xscreensaver](https://www.jwz.org/xscreensaver/) application)

- [init.vim](https://github.com/matan-h/.config/blob/master/.config/nvim/init.vim) has simple [neovim](https://neovim.io/) settings.


What are your most used aliases and configuration tricks? Let me know in the comments!