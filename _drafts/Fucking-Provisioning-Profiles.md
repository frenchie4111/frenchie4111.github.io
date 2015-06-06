---
layout: post
subject: One mans struggle to get iOS building on CI
tags: iPhone iOS Apple
---

This is my story of how I got my iOS project building and deploying off a CI server.

I recently spent multiple long days cursing at Apples provsioning profiles, and am
now writing about it to save you that time. This will be a chronicle about how I set
up an automated build server for an iOS project.

<br>

#### Danger

I learned the hard way, that if you try to mess with OS X keychains through command
line without backing them up, you WILL break your user account, and you WILL have to
do a clean wipe of your Mac to fix this.

To avoid this problem I *highly suggest* creating a new user account to use soley
for testing the CI build sequence, or some other way to sandbox your keychain. Not
only will this protect your account, but it will provide a clean starting state for
the build.

<br>

#### What you will need for the battle ahead

- *CI Server* - This is *not* an explanation of how to set up your computer as a CI build server. I
highly suggest using a 3rd party CIaaS such as [*CircleCI*](http://circleci.com/) as
your CI server, it is not worth the hassle of managing your own.
- *Apple Development Account* - This is the account that you will get your signing certificates from
- *An iOS project to build* - An iOS project that you want to build

#### First steps - Getting the profiles

