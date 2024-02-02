---
title: Google has another secret browser
excerpt: "another hidden browser which is accessible by a link"
date: 2024-02-02T09:00:33.192Z
image: /assets/images/todepond-gms.png
tags:
    - android
    - browser
    - google
    - hidden
    - screen-pinning
    - parental-control
categories:
    - cyber
permalink: /another-secret-browser

---
I recently discovered [[another](/google-has-a-secret-browser-hidden-inside-the-settings/)] secret browser that is inside Google Play Services. The uniqueness of this browser is that it is accessible by a link. That means, it not only bypasses the "normal" google parental control, it also bypasses the "lock-down" mode (the "lock-down" mode is the "your device has been locked" screen in parental control). I also discovered a similar method which can be used to bypass the [Android screen pinning](https://support.google.com/android/answer/9455138) feature from the Contacts app
![Todepond video in google play services app](/assets/images/todepond-gms.png){:.p75}
<figcaption markdown="block">
[TodePond](https://www.youtube.com/@TodePond) YouTube video in Google Play Services app 
</figcaption>

# How to get there?
1. Enter the Contacts app - using the "emergency call" button after the normal unlock of the phone. (assuming you not are reading this blog in lock-down mode, you can just open the normal Contacts app). 
2. Edit existing contact (or add new contact), then edit it, and scroll until "More fields" and click on it.
3. In the "Website" field enter this website: "https://gds.google.com/gmsdrops". 
4. Save the contact, then click on the link.
5. You should now see "Your Android device just got better" (it's a Google lie 🙂). Click "Show me".
6. Click "Learn more". If you don't have that, click "next" until you have it.
7. Now you are in the browser. Resize it by moving it up. Click the hamburger menu, then click the big "Google Help" text.
8. Click the hamburger menu again. This time just click "Google".
9. You may or may not be already signed in to this browser. If you are signed in, you can log out from Google. It does not affect your Chrome browser.
There you have it. A full untraceable browser inside the parental lock-down mode!

## Why does it work?
In lock-down mode, google "locks" all apps (including the android launcher and parts of the system) apart from "Google Play Services" (which is used to display the popup message and enforce restrictions) and the Contacts app (for phone).
As last time, It's still the fault of the same app: `Google play services`. 
`https://gds.google.com/gmsdrops` is a deeplink to the Android "what's new". (you can also open it from here, and if your browser forwards deeplinks you probably get a message asking you if you want to continue to external app/google play).
While parental control doesn't allow you to open deeplinks, it does allow the Contacts app to do so. When you click on the website field of a Contact, it's the Contact app which opens the link. So it's not blocked.

# Screen pinning bypass
android (11+) has an [Android screen pinning](https://support.google.com/android/answer/9455138) feature, which basically make it possible to give your phone to someone, open on a specific app, and prevent the user to move to another without your permission. I haven't done research on that, but I believe the most popular use-case is when you give your phone to someone to make a phone call.
This time we cannot use the same link as before, as screen-pinning prevents opening new apps, and the previous link opens the "Google Play Services" app.
But we can use another deeplink which is managed by the same app: [Google Podcast](https://podcasts.google.com). It's possible because this deeplink is opened as a popup window instead of a full app.

1. Add website to contact in the same way as before. Enter the website "https://podcasts.google.com"
2. Click the link when the app is pinned.
3. You should now see the Google podcasts popup window. Click on the big icon of your Google account, then click "Content policies". 
Now you are in the default browser. The exact place where you should not be when someone gives you their phone to call. For breakthrough use the same instructions as before:
4. Click the hamburger menu, then click the big "Google Help" text.
5. Click the hamburger menu again. This time just click "Google".
You got it. A complete bypass.

# Google Response
I reported it to Google, as two different cases : one for parental control bypass, and another one for android screen pinning bypass.
They merged the parental one into the screen pinning bypass one, then they managed to "forget" about the duplicate cases.
This is the response I've on the screen bypassing case (because of course screen bypassing and parental controls **is intended** to be bypassed):
![Android screen pinning bypass is the intended behavior](/assets/images/google-android-screenpin-intended.png)
<figcaption class="caption-center">
Google answer : Android screen pinning bypassing is the intended behavior
</figcaption>

and this confusing response about the duplication:
![confusing google response about duplicate issues](/assets/images/google-was-not-a-duplicate.png)
<figcaption class="caption-center" markdown="block">
Its not a duplicate. the issue was closed as duplicate of *potentially* another issue. It's a seperate rewards program, and not our problem. 
</figcaption>
<hr />
I hope you enjoy your secret untraceable browser.