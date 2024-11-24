---
title: History Game
excerpt: I made a game that detect browser history.
image: "/assets/images/history-game-urls.png"
tags:
    - code
    - css
    - cyber
    - html
categories:
    - cyber
date: 2024-11-24T12:15:43.643Z
gallery:
    - image_path: /assets/images/history-snake2.webp
      title: snake game with the label 'press space after collecting an apple'
    - image_path: /assets/images/history-dino.webp
      title: dino-like game when the dino need to jump over the obstacles
---
While I was reading information about CSS-only games, I stumbled across a CSS Pseudo-class [like `:hover`] called [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited) that can be used to style links that the user already visited [for example, purple if they have been visited and blue if they haven't been visited yet.].
I went on created a game that uses `:visited` to detect in which popular websites you have been.
You can [try it now](/falling-history). *[not for phones.]*

![video screenshot of the history game where user click on falling characters](/assets/images/history-game-gif.gif){: .centered }


## :visited security
My first instinct was to try and see if a site can detect if this is applied. I was far from the first one to try this, and the browser already puts quite a few [security measures](https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_:visited_selector). For example, you can only change the colors. No other CSS properties allowed. Moreover, the color's alpha will be kept as in the unvisited link (that means, a color like `transparent` will make the element fully transparent even if the `:visited` CSS rule says otherwise). Btw, JS API, and copy-pasting of HTML lie about `:visited`.

Eventually, I gave up on the site detecting which colors are displayed to the user. Instead, I started thinking how it can change the entire user experience.

Imagine a phishing website popup with two `close` buttons, both links to different sites, when the default color is white, and it turns black if the link is in the user browser history. (Another `close` button appears after some time to rescue you if you haven't visited either of those sites) <offwhite>[I probably visit too many Chinese phishing websites :)] </offwhite>

This led me to start searching for a game to get users to tell me which sites they’ve visited.

![colored blocks where each block is a history link](/assets/images/history-image.webp){: .small-img.centered}
<figcaption class="caption-center">
each pixel [block] is a popular link, and the red ones are links the user has visited
</figcaption>

## games
I tried various types of games [mostly written by GPT] to find the best fit. 

{% include gallery caption="on the left, snake game. On the right, dino-like game" %} 

Eventually, I settled on a 'catch the falling objects' type of game because I have no reliable way to check if the user looses (as I rely on them to provide this information). In a game like Snake, for instance, the user would expect me to know when they eat an apple. Additionally, the accuracy is very high for both sides—there’s less chance of the user clicking on a transparent object, and I can detect if they click on an object of any color, allowing me to fake knowledge effectively.

## falling history game
It took some effort to make GPT avoid using the canvas, but eventually I got to this: a random character created every `N` ms with the link location from a file with the most visited websites.

If the link hasn't been visited, the character's color matches the background. If it has been visited, the character displays in a bold color. These links fall down the screen at an increasing speed.

Each time you click on any `<a>` tag, your score increases. Occasionally, the link corresponds to the current site, which I know is visited. If those links go unclicked, your score decreases.

Since the `<a>` tag behaves unpredictably with hovering and clicking (e.g., if I want to cancel hovering and prevent the click from navigating to the `href`, I need to cancel all events, which also prevents capturing the click), it makes sense to wrap each `<a>` tag with a `<div>` that can be clicked.

The biggest issue was to avoid object colliding, because then when the users click the object they see, they accidentally also click the invisible element they don't. To solve that I needed to make all elements move in the same speed, and use better random location spawner.

For the random character I've found [Unicode range](https://jrgraphix.net/r/Unicode/2600-26FF) from `0x1F300` to `0x1F5FF` perfect for emojis that HTML supports and can be colored.

## top websites list
Every *most-visited websites list* that I could find used traffic or connections to websites to measure the visit level of the site. In this case, this is clearly a wrong measure, as I want to know which URL is most likely to be in the user *browser history*. For example `googleusercontent.com` homepage, while getting a lot of traffic, will not be in any browser history unless the user opens his Google profile picture in new tab, *then deletes the path*. Same about `storage.googleapis.com`.
Finally, I created a list based on myself, and on compilations from other lists.
It gave me the option to do a programming-focused list, and add some funny stuff, such as the [StackOverflow Question](https://stackoverflow.com/questions/11828270/how-do-i-exit-vim) of how to exit vim. And also, <a class="rick" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">this important video</a>
<offwhite>(the video link should only be displayed if you don't have 'never give you up' in your browser history)</offwhite>



[go try it now](/falling-history){: .run-btn}