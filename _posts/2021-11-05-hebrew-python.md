---
id: 129
title: 'Hebrew python'
date: '2021-11-05T09:05:28+00:00'
author: matan.honig2@gmail.com
guid: 'https://matan-h.com/?p=129'
permalink: /hebrew-python/
image: /assets/images/Screenshot-from-2021-11-05-11-07-30.png
categories:
    - dev-tools
tags:
    - hebrew
    - 'not english'
    - python
---

<div class="wp-block-image"><figure class="aligncenter size-full">!["hello" in hebrew-python](/assets/images/Screenshot-from-2021-11-05-11-07-30.png)<figcaption>“hello” in hebrew-python</figcaption></figure></div>Want to learn python but English is a problem? Introducing [hebrew-python](https://github.com/matan-h/hebrew-python), a library for writing python in Hebrew.

After installing this library you can write a script like:

```
<pre class="wp-block-code" title="hebrew python simple program with imports">```python
מתוך בנוי.אקראי יבא מספר_אקראי
משתנה_כלשהו = מספר_אקראי(1,9)
הראה(משתנה_כלשהו)
```
```

Name the file `something.hepy` and you can run it with `hepy something.hepy`.

## try it online – In python-editor for this site

<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex"><div class="wp-block-button has-custom-width wp-block-button__width-100">[try it online](https://matan-h.com/python-editor/?hebrew_mode=1&code=%22%22%22%0AThe%20equal%20code%20section%20(roughly)%20in%20English%3A%0A%0Aimport%20hepy.random%20as%20random%3A%0Aprint(%22hello%20world%22)%0Aprint(%22Number%20between%201%20and%20100%3A%22)%3A%0Aprint(random.random_number(1%2C100))%0A%22%22%22%0A%0A%D7%99%D7%91%D7%90%20%D7%91%D7%A0%D7%95%D7%99.%D7%90%D7%A7%D7%A8%D7%90%D7%99%20%D7%91%D7%AA%D7%95%D7%A8%20%D7%90%D7%A7%D7%A8%D7%90%D7%99%0A%0A%D7%94%D7%A8%D7%90%D7%94(%22%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A2%D7%95%D7%9C%D7%9D%22)%0A%D7%94%D7%A8%D7%90%D7%94(%22%D7%9E%D7%A1%D7%A4%D7%A8%20%D7%91%D7%99%D7%9F%201%20%D7%9C%20100%22)%0A%D7%94%D7%A8%D7%90%D7%94(%D7%90%D7%A7%D7%A8%D7%90%D7%99.%D7%9E%D7%A1%D7%A4%D7%A8_%D7%90%D7%A7%D7%A8%D7%90%D7%99(1%2C100))%0A%0A)</div></div>## Installing

```
<pre class="wp-block-code">```bash
pip install hebrew-python
```
```

## jupyter/ipython

`hebrew-python` support [jupyter](https://jupyter.org/) and [ipython](https://ipython.org/) intercative console by ipython extension. to use:

install jupyter-notebook by : `pip install notebook`  
start jupyter-notebook by : `jupyter notebook`. then create new python3 by the new button.

on the first cell enter the text `%load_ext hebrew_python` and pross contoll+enter.

and then you can write hebrew-python in all notebook