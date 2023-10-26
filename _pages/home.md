---
title: Programming Site
layout: mysplash
permalink: /
date: 2023-10-25T10:14:48.572Z
header:
  image: /assets/images/buymeacoffee3.webp
  image_size: 200px
  alt: "matan logo"
excerpt: Welcome to my site.
intro:
  - excerpt: Welcome to my site! I hope you find my tools useful. Any comments are welcome. All tools are free to use with attribution (see individual licenses).
---

{% include feature_row id="intro" type="center" %}

<div class="gallery">
  {% for post in site.posts %}
  <a class="gallery-item" href="{{ post.url }}" style="background-image: url('{{ post.image|default: '/assets/images/image-alignment-300x200.webp' }}');{{post.image_custom_style}}">
  <span class="image-gradient"></span>
  <div class='card-content'>
      <h2 class='card-title'>{{ post.title }}</h2>
       <p class="card-date">{{ post.date | date: "%B %d, %Y" }}</p>
  </div>
  </a>
  {% endfor %}
</div>
