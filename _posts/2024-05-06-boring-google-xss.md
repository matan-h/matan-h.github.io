---
title: Common Google XSS
excerpt: "A simple XSS in Google application"
permalink: /common-google-xss
image: /assets/images/google-xss-continue-page.webp

tags:
  - cyber
  - XSS
  - google
categories:
  - cyber

date: 2024-05-06T12:23:22.400Z
---

When I was searching for a vulnerability in google DNS from Google Cloud, I came across [this](https://www.rcesecurity.com/2017/03/ok-google-give-me-all-your-internal-dns-information) article by [Julien Ahrens](https://twitter.com/MrTuxracer). The article is about an SSRF vulnerability in the Google website `https://toolbox.googleapps.com`, so I started researching this site.

## Simple research ⇾ XSS

The site has many apps, all of them are listed inside the `robots.txt` file:

```ini
#apps-toolbox
User-Agent: *
Allow: /apps/main
Allow: /apps/browserinfo
Allow: /apps/checkmx
Allow: /apps/dig
Allow: /apps/har_analyzer
Allow: /apps/loganalyzer
Allow: /apps/loggershark
Allow: /apps/messageheader
Allow: /apps/recovery
Allow: /apps/useragent
Allow: /apps/other_tools
Allow: /apps/encode_decode
Allow: /apps/screen_recorder
Disallow: *
```

Most of the tools are accessible from the /apps/main menu, however, the recovery app (at `/apps/recovery`) isn't.

From a simple search in google I see the recovery app has these sub-pages:

```
recovery/domain_in_use
recovery/form
recovery/ownership
```

All of which receive many parameters from the query string in URL (parameters in `{url}?parm1=1&param2=2...`): `visit_id`, `user`, `domain`, `email` and some more.

In google search I also spotted a result that has `Verify that you own example.com` title, with this link : `https://toolbox.googleapps.com/apps/recovery/ownership?domain=example.com&email=email@example.com&case=45500368&continue=/apps/recovery/...`

The server apparently just verifies that the email matches the domain, then presents a page with some thank you text and a continue button:

<img src="../assets/images/google-xss-continue-page.webp" title="screenshot of the google continue page" alt="google-continue-page.png" data-align="center">
<figcaption class='caption-center'>google continue page</figcaption>

And the link in the continue button, was ... you guessed it: just taken from the `continue` URL parameter. 

So I tried placing there `continue=javascript:alert(document.domain)`, and... It works! 

The site didn't use any CSP, or any protection at all. So I also could send and receive data from external sites: (e.g. `continue=javascript:fetch(%27https://api.ipify.org?format=json%27).then(response=%3Eresponse.text()).then(data=%3E{alert(data);%20})`, which `alert`s the user public ip). I reported it to Google.

## Reward

![google reward table screenshot](../assets/images/google-xss-reward.webp)

<figcaption class='caption-center'>google reward table screenshot.</figcaption>

Since this is an XSS, and its on a `normal Google application`, it falls into the `3133$` square in google rewards. Therefore, I got more than twice than I got to both [parental](https://matan-h.com/google-has-a-secret-browser-hidden-inside-the-settings) [control](https://matan-h.com/another-secret-browser) bypasses (googles secret browsers) combined. 

I name this article "Common" because it's really an `openredirect->xss` by the book. No thinking is required, just trying to change random parameters on URLs.
<offwhite>
Did you find the Easter egg in this article?
</offwhite>

<div id="redirectButton"> </div>

<script>
// Congratulations! You've discovered the hidden Easter egg :)
var _continue = new URL(location.href).searchParams.get("continue")
if (_continue && _continue.includes(":")) {
    const style = `
.continue-button {
    color: #FFF;
    background-color:#009688;
    border: none;
    position: relative;
    height: 36px;
    margin: 0;
    min-width: 64px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: 0;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 36px;
    vertical-align: middle;
}
    `;
    // append the button style:
    const newStyle = document.createElement("style");
    newStyle.innerHTML = style;
    document.getElementsByTagName("head")[0].appendChild(newStyle);
    // append the button as <a> to div.
    const div = document.getElementById("redirectButton")
    const continueA = document.createElement('a');
    const continueBtn = document.createElement('button');
    continueBtn.innerText = "Continue to a super-safe URL"
    continueBtn.classList.add("continue-button")
    continueA.href = decodeURIComponent(_continue.trim())
    continueA.appendChild(continueBtn)
    div.appendChild(continueA)
}
else{
    // Let's notify people about the Easter egg, but only once in 7 times :)
    if (Math.floor(Math.random() * 7)===1){
    const url = new URL(location);url.searchParams.set("continue", "");history.pushState({},"",url)
    }
}

</script>