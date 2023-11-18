---
title: I analyzed stackoverflow
excerpt: I analyzed stackoverflow for secrets and leaks.
date: 2023-11-15T14:33:28.125Z
permalink: /analyze-stackoverflow
image: /assets/images/stackoverflow-random-data2.webp
tags:
  - cyber
  - debug
  - leaks
  - stackoverflow
  - rust
categories:
  - cyber
---

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

## backstory

I read hackernews sometimes, and articles like [I mirrored all the code from PyPI to GitHub and analysed it](https://py-code.org/stats) made me think, maybe there are less obvious places with leaked information. 

This was in the back of my mind until recently, when I tried to [contribute](https://github.com/kivy/buildozer/pull/1709) to the [buildozer](https://github.com/kivy/buildozer) project. 
I implemented rich logs, and I felt like I understood buildozer, so I searched for [stackoverflow](https://stackoverflow.com/tags/buildozer) questions about it. Then I discovered that buildozer, [unlike beeware](https://github.com/beeware/briefcase/blob/4db325af8381789ad5e049fb80bb4f03d1810208/src/briefcase/console.py#L402) , actually dumps the [full](https://github.com/kivy/buildozer/blob/dda7eaaf94d56813f48570b277752318555301f6/buildozer/logger.py#L81) environment when a command fails (for example output, see [this](https://stackoverflow.com/questions/66628535/facing-buildozer-error-stating-command-failed) old question), and thought "what if this user built the app with a sensitive api ?"

![screenshot of stackoverflow quistion with random (fake) ghp tokens instead of the buildozer logs. ](/assets/images/stackoverflow-random-data2.webp){: .centered }

# parsing

So, I downloaded stackOverflow from the [stackexchange archive.org dump](https://archive.org/download/stackexchange), and started to think how to parse it. It's a huge (103G) XML file, where each line is a question or answer. 

I tried different "leak detect" tools, most of them crashed or taking too much cpu:

- gitleaks : `fatal error: runtime: out of memory` (Update: After I posted this article, [@zricethezav](https://github.com/zricethezav) from GitHub made a [gitleaks PR](https://github.com/gitleaks/gitleaks/pull/1292) to fix this, and now (v8.18.1) it does not crash.)

- truffleHog : Actually works (and takes 100% cpu), but giving very poor results (e.g. a simple `%s` is considered a SQL server base64 encoded: `Detector Type: SQLServer,Decoder Type: BASE64,Raw result: %s` ).

- ripsecrets : no output 1 hour after I run it.

- (Yelp) detect-secrets: `Traceback (most recent call last): ... MemoryError`

- ripgrep : freeze my system after few minutes.

So I ended up returning to my zsh and doing `grep`  , and even writing a my own rust script to do the searches.

# results

As I suspected , there are a lot of leaks in stackoverflow (on the graph, only unique and not junk data is displayed. click on a label to hide it ): 

<div>
  <canvas id="overview-chart"></canvas>
</div>
<script>
      const ctx = document.getElementById('overview-chart');
      const labels = ['openai-api-key','gitlab-pat','slack-user-token','discord-client-id','shopify-private-app-access-token','twilio-api-key','sendgrid-api-token','slack-bot-token','algolia-api-key','flutterwave-encryption-key','flutterwave-secret-key','jwt-base64','stripe-access-token','github-pat','rapidapi-access-token','telegram-bot-api-token','gcp-api-key','jwt','private-key','aws-access-token','other']
      const data = [10,12,12,13,13,20,21,21,37,38,38,49,77,78,122,283,995,1147,1569,2897,55]
        new Chart(ctx, {
            'type':'pie',
            data:{
                labels:labels,
                datasets:[{label:"Stack Overflow data",data:data,}]
            }
  })
</script>

As you can see, a lot of data. 

Then, I asked myself, what could an attacker do with this information? Turns out, most of it is useless:

For using most data, you need more information than just the api key. For example, for stripe , you need the customer ID. For grafana, an instance url. For aws, a site url.

And even if you have an api key which goes to a centralized location without need for a "username", most of the data is old. All the JWTs ([JSON Web Tokens](https://jwt.io)) - forget about them, the average life of a JWT is a month.

Until I run a simple scan (again using the best hacking tools : `xargs` and `curl` ) against all the 74 real looking GitHub user tokens (which is a token that grants access to pretty much the full GitHub user) and discovered that 6 of them are actually valid. 

Still, only 2 of them actually have bio and email, but one of them (a c/c++ developer)  has a repo with `3.4k` stars. So I finally found the path an attacker would take.

I sent both developers an email (I told them about this research and referred them to the question where they leak the token, with a little "if you find this message helpful, you can [buy me a coffee](https://www.buymeacoffee.com/matanh)" at the end) and they both revoked the tokens (and both actually bought me a coffee, the first time I got money since I opened this buymeacoffee account in March 2021!).

I obviously couldn't verify all the secrets. From most of them I'll probably be banned,  so I stooped here.

## cause

Unlike PyPi and GitHub leaks articles, this article is not because of people leaving the password in their `deploy-to-server.py` and accidentally committing it (well, sometimes they copy `deploy-to-server-example.py` into stackoverflow and forget to mask the id ...).

Most leaks are in the output of tools, a long output that people like to copy/paste right into stackoverflow, without actually looking at it,  because of people publish **the output/ the tool config file** of the tool they using (e.g. did you know that `curl -v` also displays your request with the headers, or that a long `package.json` with private dependencies can contain `git+your-private-gh-token` ? )

<div style='overflow: hidden;color:transparent' markdown='block'>

```log
why is this not working?  I run this command curl -v --path-as-is 'https://matan-h.com/[redundant]'
and I get this output:
*   Trying 185.199.108.153:80...
* Connected to matan-h.com (185.199.108.153) port 80 (#0)
> GET /404/../ddebug/../my-windows-shell/../list-of-online-converter-tools/../exec_python_code_super_secret_4h0a4b?code=print("hi") HTTP/1.1
> Host: matan-h.com
> User-Agent: curl/40.4.0
> Accept: */*
> Accept-Encoding: deflate, gzip, br
>
< HTTP/1.1 301 Moved Permanently
```

</div>

I hope you enjoyed the article, and pay more attention to what you copy/paste in StackOverflow.