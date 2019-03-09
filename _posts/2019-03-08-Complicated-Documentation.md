---
title: Complicated API Documentation
custom_title: Complicated
sticky_title: true
post_image: /images/complicated/icon.png
subject: API Documentation
layout: complicated
tags: Projects iOS
custom_menu: complicated
---

The complicated API is incredibly simple. It's only a single endpoint!

<br/>

## Base URL

The API is available at

```
base_url = 'https://customcomplication.mikelyons.org/complicated/set/'
```
<br/>

## Authentication

The API is authenticated using an API key. You can get your API key from the app 
once you have initialized it (by installing the app, see 
[Complicated How To](/2019/01/13/Complicated-How-To.html)). To use the API, append
your API key to the base url.


```
request_url = base_url + api_key
// example: https://customcomplication.mikelyons.org/complicated/set/abc1234
```

<br/>

## Update complication text

You can use this new endpoint to update any complication in the app. If you want
to copy a pre-prepared link, you can do so from the update link part of the app 
after selecting a complication.

All requests are **GET** requests

The endpoint structure is as follows:

```bash
GET https://customcomplication.mikelyons.org/complicated/set/<api key>/<complication type>?value=<new value>
```

The values you need to fill in here are:
 
 - `<api key>` get this from the settings page on the app
 - `<complication type>` Specify one of the following complication types:
   - `modularLarge`
   - `modularSmall`
   - `utilitarianSmall`
   - `utilitarianLarge`
   - `circularSmall`
   - `extraLarge`
   - `graphicCorner`
   - `graphicRectangular`
   - `graphicBezel`
 - `<new value>` The new text for your complication. The value must be URL encoded, I suggest using a library for this, but some simple encoding is:
    - `%20` is a space
    - `%0A` is a newline (For multi-lined complications)
    - `%24` is a dollar sign

### Example request

```
curl https://customcomplication.mikelyons.org/complicated/set/1234abcd/modularLarge?value=Stocks%0AAAPL%20%24152.29
```

This request will set the modularLarge complication to:

```
Stocks
AAPL $152.29
```

<i>Note: Watch OS Only lets you change a complication ~15 times and hour. More than that and you likely will get rate limited.</i>

If you have any other questions please feel free to reach out. My email is **<a href="mailto:mdl0394@gmail.com">mdl0394@gmail.com</a>**

## Other Tutorials

Here are some other resources you may find interesting once you have Complicated running:
 - [Update your Apple Watch from IFTTT](/2019/03/07/Complicated-Apple-Watch-IFTT.html)
