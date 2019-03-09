---
title: Update your Apple Watch from IFTTT
custom_title: Complicated
sticky_title: true
post_image: /images/complicated/icon.png
subject: Use IFTTT and Complicated to update your Apple Watch
layout: complicated
tags: Projects iOS
custom_menu: complicated
---

Let me show you how to use IFTTT and Complicated to integrate Google Sheets with your Apple Watch.

<br/>

## Step 0:

Download, and configure Complicated. For instructions on how to do this, see [this post](/2019/01/13/Complicated-How-To.html)

<br/>

## Step 1: Set up Google Sheets on IFTTT

Go to your applets, a [https://ifttt.com/my_applets](https://ifttt.com/my_applets) and create a new applet. Select
the "This" section, search and select for Google Sheets.

{: .center}
<img height="250" src="/images/complicated/ifttt/choose_sheets.png" />
<img height="250" src="/images/complicated/ifttt/configure_sheets_box.png" />

Now load in the information for the cell that you want to update your watch.

{: .center}
<img height="350" src="/images/complicated/ifttt/configure_sheets_bottom.png">

<br/>

## Step 2: Set up Complicated on IFTTT

To use Complicated with IFTTT, you need to select the WebHook option. So search/select
the WebHook Applet.

{: .center}
<img height="250" src="/images/complicated/ifttt/choose_webhooks.png" />
<img height="250" src="/images/complicated/ifttt/configure_webhook_box.png" />

Now you need to get the update URL for the Complication that you want to update.
You can get this by hitting the "Update Link (Tap to copy)" button in the Complicated
app, after initializing your app.

{: .center}
<img width="250" src="/images/complicated/ifttt/app.png">

Paste this URL into the IFTTT configuration window as follows:

{: .center}
<img width="450" src="/images/complicated/ifttt/configure_webhook.png">

You can put in your new value right after the pasted link. If you hit the "Add
ingredient" button and select "Value" it will use the new value of the sheets
cell as the update value.

And your done! Just hit save, and you should be good to go.

If you want to see if your applet is working, update the cell, wait about 5 minutes,
and check the "Activity" page of IFTTT.

{: .center}
<img width="450" src="/images/complicated/ifttt/applet_ran.png">

<br/>

If you have any other questions please feel free to reach out. My email is **<a href="mailto:mdl0394@gmail.com">mdl0394@gmail.com</a>**

<div id="footer">
    Made with &#9829; by <a href="/">Mike Lyons</a>
</div>
