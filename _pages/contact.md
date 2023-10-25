---
id: 139
title: Contact
author: matan.honig2@gmail.com
permalink: /contact/
guid: "https://matan-h.com/?page_id=139"
excerpt: 'Contact me'
---

I’d be happy to here from you on any subject! Fill in the form and I’ll get back to you shortly.

<link rel="stylesheet" href="/assets/css/contact.css">
<script type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
    emailjs.init('{{site.env.EMAILJS_SITEKEY}}')
</script>

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<form id="form">
    <div class="field">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" required>
    </div>
    <div class="field"> 
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required>
    </div>
    <div class="field">
      <label for="message">Message</label>
      <input type="text" name="message" id="message" required>
    </div>

<div class="field">
    <div class="g-recaptcha" data-sitekey="{{site.env.RECAPTCHA_SITEKEY | default: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}}"></div>
    <!-- 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI is a test key for recaptcha -->
</div>

<input type="submit" id="button" class='btn' value="Send Email" style="margin-top: 15px;">
  </form> 
<script>
    const btn = document.getElementById('button');
    document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    btn.value = 'Sending...';
    const serviceID = 'default_service';
    const templateID = 'matan_h_contact_form';
    //
    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
    btn.value = 'Send Email';
    document.getElementById("form").hidden = true;
    document.getElementById("thank-you").hidden = false
    }, (err) => {
    btn.value = 'Send Email';
    alert(JSON.stringify(err));
    });
    });
</script>
<div class="thank-you" id="thank-you" hidden>
    <h1>Thanks for contacting me!</h1>
    <p>I will be in touch with you shortly</p>
</div>
