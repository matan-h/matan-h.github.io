---
title: Moving from WordPress to Jekyll
excerpt: Why and how I move to Jekyll.
permalink: /moving-from-wordpress-to-jekyll
image: ../assets/images/matan-h-com-gallery.webp
description: ""
date: 2023-10-30T16:10:14.628Z
toc: false
tags: []
categories: []
---

## Why

### Plugins

I didn't like the plugin ecosystem of WordPress. 
I want these things (which I think should be pretty much built in): 

- Insert HTML code (with script tags) to my pages (and have HTML highlighting while I edit them)
- have a contact form.
- Have a custom 404 page
- have a redirect page
- add syntax highlighting to my code blocks.
- Change my home page
- have an `opengraph` meta tags and sitemap.xml for SEO.

That's right : to do these 7 basic things I had to install 7 different plugins

1. **HTML Editor Syntax Highlighter** -for creating HTML pages

2. **WPForms** - to have a contact form

3. **Smart Custom 404 error page** - for a custom HTML 404 page

4. **Redirect URL to Post** - for, well, redirect a URL to different post

5. **Code Syntax Block** - for highlighting in my code blocks.

6. **Header Footer Code Manager** - unfortunately, my theme wasn't the kind that could be customized (at least if you didn't buy the pro version), so I used a JavaScript code snippet to change my homepage as a sort of hacky method.

7. **The SEO Framework** - for opengraph and sitemap.xml

This alone was annoying. And from these 7 plugins, 4 (WPForms, Header Footer Code Manager, The SEO Framework) have a pro or a paid extension, that added banners and emails to convince me to upgrade.

But hey, there is another method instead of plugins - the raw PHP method:

##### The raw PHP method

PHP is a terrible language - especially for security.  [I recently covered](one-lfi-bypass-to-rule-them-all-using-base64) a real website (written in PHP using a tutorial), which has an `include` statement to include `txt` files.  The website was hacked in 2021, and the author add a filter to block including files which do not have ".txt" or start with "http". *In most languages it would be a pretty good filter*. But PHP is different - it has a `php://filter` URL which allows PHP text to be injected.

[I don't like PHP](http://web.archive.org/web/20170701052621/http://www.phpwtf.org). I always fear I'll break something. 

### Security

On WordPress, security is a real issue - I needed to make sure I used the most up-to-date WordPress and up-to-date and trusted plugins, and even then, new vulnerabilities are discovered every month (mostly in plugins and WordPress PHP files), so I have to update it at least once a month.

In a static site, security is almost guaranteed : since there are no dynamic files running on the server, the only thing a hacker can do is to read your HTML and images files. (yes, that means the hacker can read your keys if you store there your secret keys)

🤫 <span style='color:transparent'>`id:AKIAIOSFODNN7TMATANH`</span>

When you store keys in your HTML, you need to make sure it's safe to show the key to the user.

## Rethinking what I enjoy on WordPress.

I have a WordPress `blog` - that mean, I enjoy the WordPress great markdown-like editor, I enjoy the emails from the Comment section and Contact form (although, not when they only contain `please upgrade to pro`). 

But what is the main advantage of WordPress - databases, and user management.
Since it's my personal blog, I don't use these features.

Since most of my blog is articles, I do not need dynamic pages as my posts are not changing while you look at them (well, apart from my [404 page](/404)). 
So I can use a static site and get a three times faster site without PHP code which I'm afraid to touch.

## Static site challenges

[Jekyll](https://jekyllrb.com) is not the only choice for static site generator. There's also [Hugo](https://gohugo.io/), [Zola](https://www.getzola.org), and you can also build a static site with [react](https://react.dev) If you want. But Jekyll and Zola are the only ones who really built for blogs, and Zola ... well, it was [too much HTML](https://www.getzola.org/documentation/getting-started/overview/#home-page) to write by hand, and I admit I don't like the idea of a single binary that can't be expanded by plugins.

So first I needed to find a theme : just like WordPress, Jekyll also has [lots of themes](https://github.com/topics/jekyll-theme) where the most popular (the awesome [minimal mistakes](https://github.com/mmistakes/minimal-mistakes)) is the one I use right now.

In my opinion, it looks pretty good by default.  But there are two things I didn't like: the homepage and the sitemap.

### The homepage

by default, the homepage is just a list of the Recent Posts:

![default-mmistakes-homepage](../assets/images/default-minimal-mistakes-homepage.webp)

I wanted featured images, so what I really want is a gallery, not a list.
To solve this I created a liquid-based page, to generate a gallery based on the posts I have.

`liquid` is Jekyll template language: it "runs" one time, at the build step to generate the static site. Since it runs only once for the site, and not once for each user, it is inherently safe.
In liquid, I can do for loops on the posts/pages/files, if statements, and so on.

So, the code to create the gallery was (you can see the full home page in [my GitHub](https://github.com/matan-h/matan-h.github.io/blob/main/_pages/home.md?plain=1)):
{% raw %}

```liquid
<div class='gallery'>
    {% for post in site.posts %}
    <a class="gallery-item" 
    href="{{ post.url }}"
    style="background-image: url('{{ post.image }}')">

        <div class='card-content'>
            <h2>{{ post.title }}</h2>
            <p class="card-date">{{ post.date | date: "%B %d, %Y" }}</p>
        </div>
    </a>
    {% endfor %}
</div>
```

{% endraw %}
and now, it looks like this:

<img title="" src="../assets/images/matan-h-com-gallery.webp" alt="the gallery in matan-h.com homepage" data-align="center">
<figcaption class='caption-center'>The homepage gallery</figcaption>

## The sitemap

Most people do not care about sitemaps in sites. It looks like an old, maybe even a robots-only way to navigate site. Modern websites should already have menu with all pages, and homepage with all the posts, right?

But efficiency is the key here. If you want to look at my posts, probably the homepage wins. But if you want to navigate **fast** to a page in my site, I think that the HTML sitemap wins.

The default HTML sitemap is in exactly the same spirit as the homepage: just a list of pages, then a list of posts. 

While it possible that some person would accidentally use it, I don't think it would be a great experience.

(I left [one of these HTML sitemaps](/sitemap) on my site, so that robots think I'm making the site accessible to people. Don't tell them that a sane person wouldn't use it)

But what if there was a convenient way to see the pages and posts like a row of blocks?

For this, I built a `Visual Sitemap` in Liquid that does exactly this: displays my posts and pages as blocks. I used [mattbrailsford/css-sitemap](https://github.com/mattbrailsford/css-sitemap/blob/master/sitemap.css) (well, I also modified it a bit) to make an HTML list that looks like blog.
Here is part of the code:
{% raw %}

```liquid
<nav class="primary">
    <ul>
        {% for post in site.posts %}
        <li id="{{ post.slug }}">
            <a href="{{ post.url }}">
                <i></i> {{ post.title }} <small>{{ post.excerpt | markdownify | strip_html | truncate: 160}}</small>
            </a>
        </li>
        {% endfor %}
    </ul>
</nav>
```

{% endraw %}

The list looks like this without [mattbrailsford/css-sitemap](https://github.com/mattbrailsford/css-sitemap/blob/master/sitemap.css):

![vsitemap without the css](../assets/images/vsitemap-without-css.webp)

and the list looks like this with [mattbrailsford/css-sitemap](https://github.com/mattbrailsford/css-sitemap/blob/master/sitemap.css):

![vsitemap with my css](../assets/images/vsitemap-with-my-css.webp)

Well, I lied. **This** is how it would look with the original [mattbrailsford/css-sitemap](https://github.com/mattbrailsford/css-sitemap/blob/master/sitemap.css):

![vsitemap with the original css](../assets/images/vsitemap-origianl-css.webp) As you can see, I modified it a bit.

---

And now I really enjoy Jekyll:
I love the fact I could do transparent text easily in this article.
I'm using `MarkText` markdown editor right now, so I can copy-paste pictures, and it automatically puts them in my Assets folder.

Do you have a Jekyll blog (or another static site generator) ? 

Do you have a WordPress blog?

Are you satisfied with it?

Let me know in the comment section.
