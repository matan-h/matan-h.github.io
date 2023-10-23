---
id: 263
title: 'Google has a secret browser hidden inside the settings'
date: '2023-06-26T11:09:31+00:00'
author: matan.honig2@gmail.com
guid: 'https://matan-h.com/?p=263'
permalink: /google-has-a-secret-browser-hidden-inside-the-settings/
image: /assets/images/liveoverflow-in-settings.png
categories:
    - cyber
tags:
    - android
    - browser
    - cyber
    - google
    - hidden
---
## <span style="text-decoration: underline;">Important Update:</span> **google reopen my report**
Today, 3 days after I posted this blog, and it got extensive media coverage (mainly in [English](https://winaero.com/a-secret-hidden-browser-in-android-allows-bypassing-parental-controls/) and in the [mainstream](https://hi-tech.mail.ru/news/101108-na-vashem-android-pryachetsya-sekretnyij-brauzer-kak-ego-zapustit/) [Russian](https://club.dns-shop.ru/digest/98942-polzovatel-matan-h-obnarujil-sekretnyii-brauzer-google-dlya-andr/) [news](https://trashbox.ru/link/2023-06-27-google-sekretnyj-brauzer-na-android)), Google announced that they will reconsider my report

![a](/assets/images/google-update-sized-1024x288.png)

<figcaption class="caption-center">Google message about reopening my report</figcaption>

<hr>
I recently discovered a secret browser located inside the "Manage my account" popup that Android has in various apps (quite important apps, such as Settings, and all Google suite apps). The browser even bypasses parental control!

![My site open inside Settings app in my Android phone](/assets/images/settings-open-in-matan-h-com-3.png)

## How to get there?

Getting there…. takes some work:  


1. Go into Settings→Google (or any app that lets you choose your account) and click on "Manage my account".  
2. Then go to the "Security" tab. In there, scroll down until you find "Password Manager". Click on it.  
3. Click on the `Settings` icon in the top-right.  
4. Scroll down until "Set up on-device encryption" appears. Click on it, then click on "Learn more about on-device encryption".  
5. Now you are in the browser. But you want to go to Google.com! So click on the hamburger menu, then click "Privacy Policy".  
6. Tap the nine dots at the top, wait 5 seconds (it takes some time to load) and click "Search" (If you don’t find the search icon, you can also scroll down until `Google` and click on that)  
7. Logout from your Google account.  
8. You got the secret browser ! You can go anywhere. You can also play YouTube videos (with ads, unfortunately), and all of this is in the settings app (or whatever app you choose) !

![](/assets/images/liveoverflow-in-settings.png)
<figcaption class="caption-center">LiveOverflow in Settings app</figcaption>

### Browser overview:

Pros: It’s a pretty private browser : it has no history and it auto logs out of all Google accounts that were logged-in, at the end of the session.

Cons: the most obvious one is the back key, which means every time you press the back key, instead of going back one address in the history, it goes back into the password manage settings, but I guess it could be considered an advantage – as an emergency key for privacy.

The same goes for no address bar. (But look at the glass half full: it still doesn’t [advertise itself on the installation page of other browsers](https://www.pcmag.com/news/microsoft-is-displaying-multiple-edge-ads-on-googles-chrome-download-page)).

But there are another things that prevent this browser from being a secure browser: The dangerous functions.

### The dangerous functions:

As I was using this browser, I discovered a strange thing. A weird JavaScript object named `mm`. To see this, go to [eruda](https://eruda.liriliri.io/), (just because it’s the best mobile JavaScript console I know) and type `mm`

![Screenshot of eruda expend the `mm` object](/assets/images/eruda-mm.png)
<figcaption class="caption-center">Screenshot of eruda expend the 'mm' object </figcaption>

As you see, there are three functions:

Let’s start with `closeView`() function, because it’s the only clear function: it just closes your browser, as would happen if you press the back key. Not a standard JavaScript function, but nothing to worry about. (you can try it right there by typing into eruda `mm.closeView()`)

Then you have two methods which I don’t know what they do, but they sound scary. As this is a secret-browser of the `on-device encryption` feature, I can guess, they are both used to **set your local encryption keys**. So it looks like a malicious website can put their keys there, and try to make you pay for them!

I think this is the time to tell you that I already reported this to Google, and they say this is not a security vulnerability (probably because this secret browser is not very popular), and that the parental control bypass is the "Intended Behavior" 🙂

![](/assets/images/google-response-browser.png)
<figcaption class="caption-center">Google’s answer to my report</figcaption>

If you enjoy using it, please let me know in the comments what you did with it.

Hope you enjoy your (new?) browser that you didn’t know you had !

There is a cool [Hacker News discussion](https://news.ycombinator.com/item?id=36478206) on this article.

Since I posted this blog, It received a lot of media attention, here are some of the websites that shared this blog

<details markdown=block><summary>English (click to expand)</summary>

- [winaero](https://winaero.com/a-secret-hidden-browser-in-android-allows-bypassing-parental-controls) (the company that created "Winaero Tweaker")
- [techweekmag](https://www.techweekmag.com/news/mobile/google-has-a-secret-browser-on-android-and-here-is-how-to-find-it)(They managed to get through this article without talking about parental controls at all)
- [cross-post to beehaw](https://beehaw.org/post/790282)(an alternative reddit)
- [socialbites](https://socialbites.ca/tech-scifi/304172.html)
- [gamingdeputy](https://www.gamingdeputy.com/top-secret-browser-found-on-android-smartphones/) (looks like translation of the Russian news. It kind of misunderstood the last paragraph:"he was told that the browser is indeed safe")


 </details><details markdown=block><summary>Russian (click to expand)</summary>

- [dns-shop.ru](https://club.dns-shop.ru/digest/98942-polzovatel-matan-h-obnarujil-sekretnyii-brauzer-google-dlya-andr) (looks like a DNS company)
- [iguides.ru](https://www.iguides.ru/main/other/na_android_smartfonakh_nashli_sverkhsekretnyy_brauzer/)
- [trashbox.ru](https://trashbox.ru/link/2023-06-27-google-sekretnyj-brauzer-na-android)
- [https://hi-tech.mail.ru](https://hi-tech.mail.ru/news/101108-na-vashem-android-pryachetsya-sekretnyij-brauzer-kak-ego-zapustit) (this is probably the most popular site to cover this)
- [habr.com/ru](https://habr.com/ru/companies/cloud4y/news/744120/) (full translation of this article, with currently 42 comments, which are very reminiscent of the responses I received on hackernews)

 </details><details markdown=block><summary>Other (click to expand)</summary>
 
- Japanese: [gigazine.net](https://gigazine.net/news/20230627-parental-control-bypass/)
- Portuguese:[argonalyst.com](https://www.argonalyst.com/article/como-acessar-um-navegador-secreto-no-android-e-burlar-o-controle-parental-xq3i4z)
- Mandarin (Chinese): [mandarinian.news](https://mandarinian.news/%E8%B0%B7%E6%AD%8C%E5%9C%A8%E8%AE%BE%E7%BD%AE%E4%B8%AD%E9%9A%90%E8%97%8F%E4%BA%86%E4%B8%80%E4%B8%AA%E7%A7%98%E5%AF%86%E6%B5%8F%E8%A7%88%E5%99%A8)(word-for-word translation)
- French: [clubic.com](https://www.clubic.com/os-mobile/android/actualite-475828-astuce-ou-faille-decouvrez-ce-navigateur-secret-sur-android-qui-passe-outre-le-controle-parental.html) (Winners in terms of the quality of the responses, but there are just two there)

 </details>