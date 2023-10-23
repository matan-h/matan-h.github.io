---
title: Python Editor
excerpt: Python editor.
permalink: /python-editor
description: run pyton online using only your browser
---
<head>
  <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/editor/editor.main.min.css">
  <link rel="stylesheet" type="text/css" href="/assets/css/python-editor.css">

  <script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>
  <script>
    var require = {
        paths: {
            'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs'
        }
    }
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/loader.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/editor/editor.main.nls.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/editor/editor.main.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/basic-languages/python/python.js"></script>
  
</head>

# code editor
Here you can try out various python snippets. Support my libraries!

To tryout Hebrew python online, click [here](/python-editor/?hebrew_mode=1&code=%22%22%22%0AThe%20equal%20code%20section%20(roughly)%20in%20English%3A%0A%0Aimport%20hepy.random%20as%20random%3A%0Aprint(%22hello%20world%22)%0Aprint(%22Number%20between%201%20and%20100%3A%22)%3A%0Aprint(random.random_number(1%2C100))%0A%22%22%22%0A%0A%D7%99%D7%91%D7%90%20%D7%91%D7%A0%D7%95%D7%99.%D7%90%D7%A7%D7%A8%D7%90%D7%99%20%D7%91%D7%AA%D7%95%D7%A8%20%D7%90%D7%A7%D7%A8%D7%90%D7%99%0A%0A%D7%94%D7%A8%D7%90%D7%94(%22%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A2%D7%95%D7%9C%D7%9D%22)%0A%D7%94%D7%A8%D7%90%D7%94(%22%D7%9E%D7%A1%D7%A4%D7%A8%20%D7%91%D7%99%D7%9F%201%20%D7%9C%20100%22)%0A%D7%94%D7%A8%D7%90%D7%94(%D7%90%D7%A7%D7%A8%D7%90%D7%99.%D7%9E%D7%A1%D7%A4%D7%A8_%D7%90%D7%A7%D7%A8%D7%90%D7%99(1%2C100))%0A%0A).

<body>

<div id="code-editor-div">
  <div id="container" style="height: 400px; border: 1px solid black;"></div>
  <p><button id="run" class="button">Run</button></p>
  <div>Output:</div>
  <p> <textarea id="output" class="output-textarea" rows="6" disabled></textarea></p>
  <div id="code-error" class="error-message"></div>
</div>
<script src="/assets/js/python-editor.js"></script>
</body>

