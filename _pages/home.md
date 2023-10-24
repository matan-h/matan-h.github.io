---
title: "Programming Site"
layout: mysplash
permalink: /
date: 2016-03-23T11:48:41-04:00
header:
  image : /assets/images/buymeacoffee3.png
  image_size: 200px
#  overlay_color: "#000"
#  overlay_filter: "0.5"
#  overlay_image: /assets/images/buymeacoffee3.png
  # actions:
  #   - label: "Download"
  #     url: "https://github.com/mmistakes/minimal-mistakes/"
  #caption: "Photo credit: [**myself**](https://unsplash.com)"
excerpt: "Welcome to my site."
intro: 
  - excerpt: 'Welcome to my site! I hope you find my tools useful. Any comments are welcome. All tools are free to use with attribution (see individual licenses).'
---

{% include feature_row id="intro" type="center" %}

<div class="gallery">
  {% for post in site.posts %}
  <a class="gallery-item" href="{{ post.url }}" style="background-image: url('{{ post.image|default: '/assets/images/image-alignment-300x200.jpg' }}');{{post.image_custom_style}}">
  <span class="image-gradient"></span>
  <div class='card-content'>
      <h2 class='card-title'>{{ post.title }}</h2>
       <p class="card-date">{{ post.date | date: "%B %d, %Y" }}</p>
  </div>
  </a>
  {% endfor %}
</div>
