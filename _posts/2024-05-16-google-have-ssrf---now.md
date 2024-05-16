---
title: Google has SSRF - now
excerpt: An SSRF vulnerability in Google
date: 2024-05-16T12:22:17.669Z
image: /assets/images/google-ssrf-info2.webp
tags:
    - cyber
    - google
    - ssrf
    - base64
categories:
    - cyber
type: default
permalink: /google-has-ssrf-now
---

I recently landed on the Google site "appsheet.com", which is a Google `no-code app builder`, from one of the other google sites (apigee).

From a simple look through the site, it has [this URL](https://www.appsheet.com/Account/AddSource) (you can navigate there from "My account"→"New Data Source"), which lets you connect to a remote database. You have 12 choices, and three of them caught my eye:

1. OData (Beta)
2. On-premises Database
3. Cloud Database (i.e. SQL database)

All of which let the user input a URL to connect to.

So, I set up my [webhook.site](https://webhook.site), and I started experimenting:
![Screenshot of the disclosed metadata header [censored]](/assets/images/google-ssrf-info2.webp)

## SSRF
\[explanation what is ssrf [here](https://portswigger.net/web-security/ssrf)]
### Endpoints
I didn't succeed with the "Cloud Database", but in the other two SSRF works, with almost no limitations:

* On both, the URL `127.0.0.1` \[or `localhost`] results in `Cannot assign requested address [::1]`.
* The odata endpoint can only be HTTPS. ("for security reasons"). Redirects are not followed.

The Odata option can result in mainly 4 states:

* `SSL connection could not be established` - http server \[e.g. https://metadata]
* `Name or service not known` - invalid domains, IPs and localhost
* `No connection could be made because the target machine actively refused it` - closed ports. This is very slow.

I guess at this stage I could try to scan the internal network, but the API is very slow, especially when most of the IPs are going to fall into the `target machine actively refused` category.

The `on-promise` option is more blind but has even fewer limitations:
it's meant to connect with [DreamFactory](https://www.dreamfactory.com) servers,
You can use both HTTP and HTTPS. Other protocols results in asp.net error like this one:

```cs
Unable to cast object of type 'System.Net.FtpWebRequest' to type 'System.Net.HttpWebRequest'.
```
### Information Disclose
When I sent some HTTP requests to my webhook.site, I saw some weird headers.

Turns out, if you send the same **HTTP** request **twice**, it will be requested from the proxy, in this case, [envoy proxy](https://www.envoyproxy.io).
Due to a [misconfiguration](https://my.f5.com/manage/s/article/K000135744), envoy sends the headers `X-envoy-peer-metadata`, and `x-envoy-peer-metadata-id`.

The metadata-id contains `sidecar~10.32.xx.xxx~appsheet-server-cxfxxxd.appsheet~appsheet.svc.cluster.local` but second header (`X-envoy-peer-metadata`), which is base64 encoded, includes a surprising amount of information:

```yml
APP_CONTAINERS: appsheet-server
CLUSTER_ID: xxx-appsheet-prod-europe-westx-main-cluster-europe-westx
INSTANCE_IPS: 10.32.xx.xxx
ISTIO_VERSION:1.xx.xxx
app: appsheet-server
deploy.cloud.google.com/release-id:main-server-xxxx
security.istio.io/tlsMode: istio
service.istio.io/canonical-name: appsheet-server
service.istio.io/canonical-revision: latest
skaffold.dev/run-id/5/3xxxxxx
MESH_ID: proj-10xxxxxx
NAME: appsheet-server-xxxx
NAMESPACE: appsheet
gcp_gke_cluster_url: https://container.googleapis.com/v1/projects/appsheet-prod/locations/europe-westx/clusters/main-cluster-europe-westx
gcp_location: europe-westx
gcp_project: appsheet-prod
gcp_project_number: 10xxxxx
WORKLOAD_NAME: appshet-server
```

(I did censor the information, but at the time of writing this anyone can just get this info)

## Google

I reported it to google.
Sometimes you [get lucky](/common-google-xss), sometimes not. This time, google closed my report with "Intended Behavior" 

![google response about ssrf](/assets/images/google-response-ssrf2.webp)
<figcaption class="caption-center">
Google Response: this is not "true" SSRF, and this is the Intended Behavior.
</figcaption>


I hope you enjoyed the article, and enjoyed this hidden intended feature of the appsheet :)

<offwhite>
INSTANCE_IPS: 10.32.xx.xxx
</offwhite>