---
id: 340
title: 'How to set up a development environment in Android'
date: '2023-08-23T16:51:14+00:00'
author: matan.honig2@gmail.com
guid: 'https://matan-h.com/?p=340'
permalink: /how-to-set-up-a-development-environment-in-android/
image: /assets/images/termux_p10k_open_with_tools_small.png
categories:
    - dev-tools
    - linux
    - termux
tags:
    - android
    - code
    - config
    - development
    - setup
    - shell
    - termux
    - utility
---

There are a lot of situations where I have only my Android phone and I want to develop something – it can be an Android app, a React website or simple Python script. Here is how to set this up so your Android phone can become a dev environment.

This has a few steps.

1. Install and setup Termux – the best terminal emulator for Android. This will run your code such as Python or Node.js.
2. Get a file manager for Termux – a graphic user interface for easier use and manage your Termux files
3. Get a graphical file editor – sometimes, it’s better to edit your project with an actual GUI editor
4. Install AndroidIDE for coding Android apps from an Android phone – if you want to develop an Android project. (optional)

### Install Termux and basic Termux utility:

Install [Termux](https://termux.dev/en/) from [f-droid](https://f-droid.org/en/packages/com.termux/) or from [GitHub ](https://github.com/termux/termux-app#github)([google play is no longer an option](https://github.com/termux/termux-app#google-play-store-deprecated)). I recommend the following setup \[paste in Termux is a long click on the screen and click paste\]:

First, write the command `termux-setup-storage` – that will allow Termux to read and write (but not execute!) files from the shared storage (`/sdcard`).

Second, let’s install some utilities that I think every development environment should have (or at least these are the utilities I always use) :

```bash
pkg install git python micro zoxide fd sd ripgrep
```

Here is an explanation for each of the tools:

- [Git](https://xkcd.com/1597) – for clone, pull, and maybe even publishing projects
- [Python](https://www.python.org)– a simple and intuitive programming language. I find this very helpful even when I coded an Android app
- [Micro ](https://micro-editor.github.io)– the best editor for Termux that I know :   
    When I edit something in Termux, I need a simple and intuitive text editor. I cannot waste keystrokes by using an editor that’s built for a computer keyboard, and uses numbers and symbols a lot. In Android (with most keyboards) the symbols are 2 buttons away, but control is in the Termux keyboard anyway. So I wanted a text editor that has one mode, and uses simple control shortcuts. Micro-editor is exactly that: it uses <kbd>ctrl</kbd>+<kbd>s</kbd> to save, and <kbd>ctrl</kbd>+<kbd>z</kbd> is to undo, etc.
- [zoxide](https://github.com/ajeetdsouza/zoxide) – smarter cd command. It keeps track of the directories you use the most, so if you type `z  myproject`, it will remember that it is located in the `/sdcard/termux/projects/myproject`, for instance.
- [fd](https://github.com/sharkdp/fd) – a simpler `find` command, that uses `fd regx` to find all files containing `regx`, and `fd -e html` to find all files with extension `html`
- [sd](https://github.com/chmln/sd) – (far) better than `sed`. Find and replace regex just by `sd before after`, for example, to replace newlines with commas: `sd '\n' ','` ([here is how to do it with ](https://unix.stackexchange.com/a/114948/448375)`<a href="https://unix.stackexchange.com/a/114948/448375">sed</a>`)
- [Ripgrep](https://github.com/BurntSushi/ripgrep) – [fast](https://github.com/BurntSushi/ripgrep#quick-examples-comparing-tools) search for regex in all files in a directory (for example, `rg javascript:` to find all files that has the string "javascript:" in them)

Third, I really cannot work without [powerlevel10](https://github.com/romkatv/powerlevel10k) (or [oh-my-zsh](https://ohmyz.sh/), but that’s more like a framework instead of a theme. I still use it in my Termux, since my [config files for Linux](https://matan-h.com/my-linux-config-files) also use it), [zsh-autosuggestion](https://github.com/zsh-users/zsh-autosuggestions) and [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) plugins, so let’s install them:  
Install zsh using `pkg install zsh`, and then use `chsh -s zsh` to make it the default, then clone the plugins

```bash
git clone --depth 1 https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
git clone --depth 1 https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/.zsh/powerlevel10k
```

Then edit ~/.zshrc (the zsh config file) using micro: `micro ~/.zshrc` then write:

```bash
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

source ~/.zsh/powerlevel10k/powerlevel10k.zsh-theme
eval "$(zoxide init zsh)" 
```

Hit `ctrl+s` to save, then `ctrl+q` to quit micro.

Write the command `exec zsh` (which reload the shell). [Powerlevel10k Configuration wizard](https://github.com/romkatv/powerlevel10k#configuration-wizard) should come up, and ask you some questions: for the first question: yes, you want to install the recommended font. Otherwise, you will not see your theme nicely. Answer the other questions with you liking your shell to be. For the last question: yes, you want to modify your `.zshrc`

After this, you are done setting up Termux (although I would recommend you add some aliases to your `.zshrc` such as `alias l='ls'` to make the letter `l` do the same as `ls`)

![](/assets/images/termux_p10k_open_with_tools_small.png)

<figcaption class="caption-center">Screenshot of Termux with `powerlevel10k` theme and using `zoxide`, ⁣`fd` and `rg`</figcaption>

### Get a file manager for Termux

Unless you want to manage your Termux files using a terminal file manager like [nnn](https://github.com/jarun/nnn), you would probably be more comfortable using a graphic file manager.

There are only two file managers I know that can edit Termux files: the built-in (hidden) `files` app and `material files`, and they both require some steps to set up:

[The hidden `files` app](https://www.reddit.com/r/androidapps/comments/tnpitz/how_can_i_activate_this_powerful_hidden_explorer) (the screenshot on the left): the simplest way to access it is to install this [shortcut app](https://play.google.com/store/apps/details?id=com.marc.files) (it’s not open source, probably because it’s only a simple shortcut app, so it has very little code) created by [Marc apps &amp; software](https://github.com/Marc-JB). If you have [activity manager](https://github.com/sdex/ActivityManager) installed, you can search for `files` and discover you have a package called something like `com.google.android.documentsui`. You can create a shortcut to the activity `FilesActivity`.

Both ways give you access to the Android built-in file manager, that will allow you not just to manage your Termux files, but also to manage `android/data` folder which you can’t access with material files.

[Material files](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) (the screenshot on the right): install this from the play store, then click the hamburger menu, click `add storage...<font face="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif">,</font>` `External storage`. Click the hamburger menu again and click `Termux` then click `use this folder`.

![](/assets/images/aosp_pixel_files_on_termux_home.png)
<figcaption class="caption-center">The built-in `files` app in Android (in Pixel phones)</figcaption>

![](/assets/images/material_files_on_termux_home_banner.png)
<figcaption class="caption-center">Material files</figcaption>

### **Graphical text editors for full projects**
If you’re developing something like a React website, using the `micro` editor to edit individual files is simply not enough.  
For those types of projects I use [Acode](https://www.f-droid.org/packages/com.foxdebug.acode) which is like [vscode](https://code.visualstudio.com) to edit files while viewing the whole project.

![](/assets/images/acode-_opened_on_transform.png)
<figcaption class="caption-center">Screenshot of Acode opened on a React website</figcaption>
### Complete IDE for coding Android on Android

Setting up Android development using Termux and Acode is very hard (you need to install `openjdk`, install Gradle, install Android SDK, use a template to create new app…) and the sync/compile process is complicated (`gradle build`,⁣somehow get Gradle to sync without build, etc.). Fortunately, there is an open source app called [AndroidIDE](https://github.com/AndroidIDEOfficial/AndroidIDE) that does the things Android-studio does: sync Gradle in the background, view files in a convenient way, a run button, and even a built-in Termux (I am not kidding, the app has a full Termux inside).

To install it, follow the official [installation](https://androidide.com/docs/installation) docs. This is the only app I have that is not in any app store. And like most of the apps in this blog post, it is open source. However, it is [not on f-droid](https://github.com/AndroidIDEOfficial/AndroidIDE/issues/545), and you have to manually install it from an APK file.

![](/assets/images/androidide_open_in_appviewer.png)
<figcaption class="caption-center">Screenshot of AndroidIDE opened on a java project called appViewer</figcaption>
So, next time you’re armed with just your Android and a good idea for a project, remember, turning it into reality is just a few taps away. Happy coding with your pocket dev environment!