---
layout: full-raw
title: "Visual Sitemap"
permalink: /vsitemap/
sitemap: true
excerpt: "A visual sitemap - yes, the one with colors"
---

   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <title>Sitemap</title>
      <link rel="stylesheet" type="text/css" href="/assets/css/vsitemap.css" />
   </head>
   <body>
      <div class="sitemap">
         <h1>Visual Sitemap</h1>
         <h2>most css is from <a href= 'https://github.com/mattbrailsford/css-sitemap/blob/master/sitemap.css'>mattbrailsford/css-sitemap</a> on github</h2>
         <nav class="primary">
	         <ul>
{% for post in site.posts %}
  <li id="{{ post.slug }}">
    <a href="{{ post.url }}">
      <i></i> {{ post.title }} <small>{{ post.excerpt | markdownify | strip_html | truncate: 160 }}</small>
    </a>
  </li>
{% endfor %}
</ul>
</nav>

<nav class="secondary">
	         <ul>
{% for post in site.pages %}
{% if post.sitemap != false %}
{% if post.title %}
  <li id="{{ post.slug }}">
    <a href="{{ post.url }}">
      <i></i> {{ post.title }} <small>{{ post.excerpt | markdownify | strip_html | truncate: 160 }}</small>
    </a>
  </li>
    {% endif %}
        {% endif %}

{% endfor %}
	         </ul>
         </nav>

</div>

</body>
