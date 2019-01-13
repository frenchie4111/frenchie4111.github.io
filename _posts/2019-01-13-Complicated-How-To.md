---
title: How to make custom Apple Watch complications with Complicated
custom_title: Complicated
sticky_title: true
subject: Subject
layout: complicated
---

## Step 1: Intialize Complicated

In order to initialize complicated, you need to add a complicated complication
to your active watch face. This can be done either through the Watch app on
your phone, or from the watch itself.

### From the phone

### From the watch


## Step 2: Choose a complication

Select the complication that you want to update using the selector in the
Complicated App. You can use the preview screen to determine which complication
is which.

## Step 3: Copy the link, and update your complication

Once you have selected a complication you want to update, click the "Update Link"
button on the bottom part of the app. This will copy the update link to your
phone's clipboard. If you have a MacOS computer, it should automatically sync
this to your computer's clipboard via iCloud.

The simplest way to update a link is via Curl in your command line. Simply
paste

```bash
curl <Your update link>NewValue
```

Example

```bash
curl https://customcomplication.mikelyons.org/complicated/set/1234abcd/utilitarianLarge?value=NewValue
```

