---
id: 245
title: 'List of online converter tools'
date: '2022-12-15T17:45:41+00:00'
author: matan.honig2@gmail.com
guid: 'https://matan-h.com/?p=245'
permalink: /list-of-online-converter-tools/
image: /assets/images/ring-of-fire-g94ab22bd2_1920.webp
excerpt: 'What you want to convert'
categories:
    - dev-tools
tags:
    - python
    - shell
---

![](/assets/images/ring-of-fire-g94ab22bd2_1920.webp)
<figcaption class="caption-center" markdown='block' >Image by [Fruity-Paws](https://pixabay.com/users/fruity-paws-1593822) from [Pixabay](https://pixabay.com)
</figcaption>

Every time I want to convert something, I search for it in google. And every time I found some ad-bloated and slow sites (if they even work), so I make this list of open source and good online converter tools.

Name of tool link to web demo, GitHub link to GitHub

- Multilingual: 
    - [Transform-tools](https://transform.tools/) ([GitHub](https://github.com/ritz078/transform)): JSON to a format for configuration files (TOML, YAML, etc.) GraphQL to struct, and more
- Programming languages: 
    - [Processing-p5-convert](https://dkessner.github.io/processing-p5-convert/) ([GitHub](https://github.com/dkessner/processing-p5-convert)): convert [processing-java](https://processing.org/) to [p5js](https://p5js.org/)
    - [TypeScriptToLua](https://typescripttolua.github.io/play) ([GitHub](https://github.com/TypeScriptToLua/TypeScriptToLua)) – convert [typescript](https://www.typescriptlang.org/) to [Lua](https://www.lua.org/) (work in the AST level, so it’s very reliable converter, and even has extensions to [VSCode](https://code.visualstudio.com/) and [WebStorm](https://www.jetbrains.com/webstorm/))
    - [Icsharpcode-CodeConverter](https://icsharpcode.github.io/CodeConverter/) ([GitHub](https://github.com/icsharpcode/CodeConverter)) – Convert code from [C#](https://dotnet.microsoft.com/en-us/languages/csharp) to [VB.NET](https://learn.microsoft.com/en-us/dotnet/visual-basic/) and vice versa
- Command line tools 
    - [Curlconverter](https://curlconverter.com) ([GitHub)](https://github.com/curlconverter/curlconverter): convert [curl](https://curl.se) command into programming language at your choice
    - [Jc](https://jc-web.onrender.com) ([GitHub](https://github.com/kellyjonbrazil/jc)): convert the output of popular command-line tools (like `dig`, ⁣`ping`, ⁣`pip list,etc` – at the time of writing this, it has around 180 different parsers) to JSON or YAML
- Markup: 
    - [Pandoc](https://pandoc.org/try/) ([GitHub](https://github.com/jgm/pandoc)) : convert from ANY markup format to another
    - [Turndown](https://mixmark-io.github.io/turndown/) ([GitHub](https://github.com/mixmark-io/turndown)) : convert HTML to markup
- database 
    - [Quicktype](https://app.quicktype.io/) ([GitHub](https://github.com/quicktype/quicktype)) : convert JSON to struct in a popular programming language
    - Sqlitebiter ([GitHub](https://github.com/thombashi/sqlitebiter)) (offline only) : convert table file to SQL (support Excel, HTML, JSON, CSS, TSV, and a lot more)   
        (I added it though it has no web online version because it really converts anything to SQL – in the GitHub example : `sqlitebiter url "https://en.wikipedia.org/wiki/Comparison_of_firewalls"` will extract all the tables from the Wikipedia page, then convert them to SQL database)
- images 
    - [webp2jpg](https://imagestool.com/webp2jpg-online/) ([GitHub](https://github.com/renzhezhilu/webp2jpg-online)) – Use browser image functionality to converter images formats, resize, rotate, watermark, trim and rename images.

Do you know other good converter tools? Let me know in the comments!