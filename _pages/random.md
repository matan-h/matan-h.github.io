---
title: "Random page"
sitemap: true
permalink: /random
layout: full-raw
---
<script>
const posts = [
{% for post in site.posts %}"{{post.url}}",{% endfor %}
]
const random_post = (posts[Math.floor(Math.random() * posts.length)])
window.location.pathname = random_post
</script>
## Redirect to a random page

<noscript markdown="block">
# Sorry, but this feature only works with JavaScript  
</noscript>

<p id='redirect-p' hidden>If you are not redirected automatically, follow <a id='redirect-a' href=''>this link</a></p>
<script>
    document.getElementById("redirect-p").hidden = false;document.getElementById("redirect-a").href = random_post
</script>