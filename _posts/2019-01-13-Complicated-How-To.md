---
title: How to make custom Apple Watch complications with Complicated
custom_title: Complicated
sticky_title: true
post_image: /images/complicated/icon.png
subject: Simple Apple Watch Complications via Webhooks
layout: complicated
tags: Projects iOS
featured: true
---

## What is Complicated?

Complicated is an iOS app that makes it easy to create custom apple watch complications with WebHooks.

## Step 1: Intialize Complicated

In order to initialize complicated, you need to add a complicated complication to your active watch face. This can be done either through the Watch app on your phone, or from the watch itself.

{: .center}
![Show on Phone](/images/complicated/show_on.png){: width="300px"}
![Phone Add Complicated](/images/complicated/phone_add.png){: width="300px"}
![Watch Add Complicated](/images/complicated/watch_add.jpg){: width="300px" style="veritcal-align: top;" }

Once you have installed the complication, open the Complicated app to initialize.

## Step 2: Choose a complication

Select the complication that you want to update using the selector in the Complicated App. You can use the preview screen to determine which complication is which.

{: .center}
![Show on Phone](/images/complicated/select_complication.png){: width="300px"}

## Step 3: Copy the link, and update your complication

Once you have selected a complication you want to update, tap the "Update Link (Tap to copy)" button in the bottom part of the app. This will copy the update link to your phone's clipboard. If you have a MacOS computer, it should automatically sync this to your computer's clipboard via iCloud.

The simplest way to update a link is via Curl in your command line. Simply paste your link in, and append a new value.

```bash
curl <Your update link>NewValue
```

Full Example:

```bash
curl https://complicated.mikelyons.org/complicated/set/1234abcd/utilitarianLarge?value=NewValue
```

Tips:


 - The value must be URL encoded, I suggest using a library for this, but some simple encoding is:
    - `%20` is a space
    - `%0A` is a newline (For multi-lined complications)
    - `%24` is a dollar sign
    - Example: `https://complicated.mikelyons.org/complicated/set/1234abcd/modularLarge?value=Stocks%0AAAPL%20%24152.29`
    sets Modular Large to "Stocks\n AAPL $152.29"
 - If you want to see the current value of your complications, change `set` to `get` in the url, and remove the complication type
    - Example `https://complicated.mikelyons.org/complicated/get/1234abcd/`
 - Watch OS Only lets you change a complication ~15 times and hour. More than that and you likely will get rate limited.

If you have any other questions please feel free to reach out. My email is **<a href="mailto:mdl0394@gmail.com">mdl0394@gmail.com</a>**
