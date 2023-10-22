---
id: 229
title: 'My Windows shell'
date: '2022-09-02T07:54:43+00:00'
author: matan.honig2@gmail.com
guid: 'https://matan-h.com/?p=229'
permalink: /my-windows-shell/
image: /assets/images/prompt.jpg
categories:
    - dev-tools
tags:
    - aliases
    - config
    - powershell
    - shell
    - windows
---

<figure class="wp-block-image size-full">![](/assets/images/prompt.jpg)</figure>Sometimes I have to use Windows instead of my Linux. Windows is very similar to Linux, but there are some things Linux does far better then Windows. One of them is the Shell. This is the Windows cmd prompt:

<figure class="wp-block-image size-full">![](/assets/images/image.png)<figcaption>windows cmd</figcaption></figure>Compare this to my Linux shell (as I setup it in [my .config](https://matan-h.com/my-linux-config-files/) – [oh-my-zsh](https://ohmyz.sh) ,[syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) and [more](https://github.com/matan-h/.config)):

<figure class="wp-block-image size-large">![](/assets/images/screenshot-zsh-1024x505.png)<figcaption>linux zsh</figcaption></figure>So, first I try to use [git-bash](https://gitforwindows.org/) as it similar to the Linux [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)), but while I was able to use more than half of my [aliases](https://github.com/matan-h/.config/blob/master/.aliases) with only some find/replace, I was not able to change the shell look and feel, and I needed to use cmd a lot (which i don’t like very much).

I decided to look at Windows powershell (that looks a little bit better), then I learned about [PSReadLine](https://github.com/PowerShell/PSReadLine),(something that controls the powershell prompt) – and got these:

<figure class="wp-block-image size-full">![](/assets/images/prompt-1.jpg)<figcaption>the final shell</figcaption></figure>I even made an [installation script](https://github.com/matan-h/.pw/blob/main/install.ps1) to install this shell (it’s not fully automatic – you will need to follow the [installation guide](https://github.com/matan-h/.pw/blob/main/install.md) to setup the fonts).

Now it’s much easier to use the shell in windows.

To install – follow the [installation guide](https://github.com/matan-h/.pw/blob/main/install.md)