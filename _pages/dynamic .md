---
title: "dynamic"
excerpt: "dynamic."
sitemap: false
permalink: /dynamic
gallery:
  - url: /assets/images/image-alignment.jpg
    image_path: /assets/images/image-alignment.jpg
    alt: "placeholder image 1"
    title: "Image 1 title caption"
  - url: /assets/images/image-alignment.jpg
    image_path: /assets/images/image-alignment.jpg
    alt: "placeholder image 2"
    title: "Image 2 title caption"
  - url: /assets/images/image-alignment.jpg
    image_path: /assets/images/image-alignment.jpg
    alt: "placeholder image 3"
    title: "Image 3 title caption"
  - url: /assets/images/image-alignment.jpg
    image_path: /assets/images/image-alignment.jpg
    alt: "placeholder image 4"
    title: "Image 4 title caption"
  - url: /assets/images/image-alignment.jpg
    image_path: /assets/images/buymeacoffee3.png
    alt: "placeholder image 4"
    title: "Image 4 title caption"
---

<figure class="third">
<!-- {% for post in site.posts offset: 1 %}
<div class="post-gallery">
      <!a-- <img src="{{ post.image | default: '/assets/images/image-alignment.jpg' }}" alt="{{ post.title }}"> -->
            <!-- <a class="post-link" href="{{ post.url }}" style="background-image: url('{{ post.image | default: '/assets/images/image-alignment.jpg' }}');"> -->
        <!-- <h2>{{ post.title }}</h2> -->
        <!-- <p>{{ post.date | date: "%B %-d, %Y" }}</p> -->
      <!-- </a> --34>

<!-- </div> -->
<!-- {% endfor %} -->
        <div class="gallery">
            {% for post in site.posts %}
            <div class="gallery-item">
                <h2>{{ post.title }}</h2>
                <img src="{{ post.image }}" alt="{{ post.title }}">
            </div>
            {% if forloop.index == 3 %}
                {% assign forloop.index = 0 %}
            </div>
            <div class="gallery">
            {% endif %}
            {% endfor %}
        </div>
</figure>