---
title: "Designing a guitar with hot-swappable pickups"
subject: I made a custom guitar with hot-swappable pickups
tags: Projects
layout: post_plain
post_image: "/images/guitar/giphy.gif"
---

## Overview

Lately I've been learning to play guitar. I wanted to be able to try out a bunch of different pickups on my guitar, to get a feel for what sound I prefer. However, the only guitars on the market with hot swappable pickups are made by [Relish Guitars](https://relish.swiss/) and their cheapest guitar is $4800, a bit outside of my price range. I decided to build my own, because \"how hard could it be™\"

{:.center}
![/images/guitar/giphy.gif](/images/guitar/giphy.gif)

## A few requirements

Before jumping into any design I like to throw together some requirements. In order to stop this project from growing too much, I gave my self the following limitations & requirements:

- **MUST** Actually make a playable guitar
- **MUST** be able to swap pickups in 30-60 seconds without removing any screws. Unlike the Relish Guitar, I don't need to be able to swap pickups mid song. As long as I can easily change between pickups without unscrewing anything I'll be happy.
- **MUST** be able to build the guitar using hand tools and my 3D printer
- **MUST** be able to fit a majority of pickups, Humbucker size and smaller

## Some research

### Relish Guitar's Magnet System

{: .center}
![/images/guitar/relish.jpg](/images/guitar/relish.jpg){: style="width: 400px;"}

The relish guitar system uses 4 magnets to attach the pickups to the guitar body. It's hard to find good images of this online, but the best I can tell they avoid any magnetic interference by keeping the magnets pretty far from the pickup. I believe I will be able to use a similar magnetic system in my designs.

### Kwikplug - Solderless Pickup Connection

{: .center}
![/images/guitar/KKPBAN.jpg](/images/guitar/KKPBAN.jpg)

The wonderful site GuitarFetish makes a [solderless pickup connect system]([https://www.guitarfetish.com/Introducing-the-Kwikplug-Quick-Change-Pickup-System_c_636.html](https://www.guitarfetish.com/Introducing-the-Kwikplug-Quick-Change-Pickup-System_c_636.html)). This will be the simplest way to plug the pickups into my guitar electronics. I'd like to avoid making my own connection system on top of everything else.

### Pickup Springs

On every electric guitar, the pickups have dampening springs. From trolling online guitar forums, it sounds like these are pretty important for dampening some vibrations from affecting the pickup. In my design, I will be sure incorporate similar springs.

## Designing

#### Starting with the hard part - The removal mechanism

Like with most projects, I tried to start at the most unsure / hardest part of the design first, and did my best to validate it fully before moving on. The most novel part of this project is definitely the removable pickups, so I started there.

The system I designed consists of 3 different precisely cut holes in the wood, and two 3D printed pieces (one that attaches to the pickup, and one to the guitar). The holes were designed to be cut with a handheld trim router (that's all I have).

{: .center}
![/images/guitar/Pickup-Prototype-v48.gif](/images/guitar/Pickup-Prototype-v48.gif){: style="width: 49%; display: inline-block; vertical-align: middle;"}
![/images/guitar/Untitled.png](/images/guitar/Untitled.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}

Here you can see the pickup and 3d printed parts. I chose to 3d print the guitar-side attachment as well to reduce the coupling in the design. This way if I need to re-design the attachment method, I can easily 3d print a new part, and not have to cut into the wood. In the animation, the black piece is attached to the guitar, and the red piece is attached to the pickup. The two pieces are held together by magnets when the pickup is inserted.

{: .center}
![/images/guitar/Untitled%201.png](/images/guitar/Untitled%201.png)

The wood side of the project is 3 different depths of cut. The front most cut (smallest hole) is the most precise by far as I want this to fit pretty precisely to the pickups. For this cut I will be doing a lot of sanding for finish to make sure it's very precise.

#### Lots and Lots and Lots of prototyping

My favorite part of having a 3d printer is how fast I can prototype parts. For this part I designed and printed 5 iterations of the mechanism before I was satisfied. The biggest challenge here was figuring out how big I needed the holes to be, and finding the smallest size magnet that would work.

{: .center}
![/images/guitar/04A1CF82-A386-4316-A6C5-2966899B3414_1_201_a.jpg](/images/guitar/04A1CF82-A386-4316-A6C5-2966899B3414_1_201_a.jpg)

#### 3D Printing Router templates

Once I figured out the design, the next challenge was figuring out how the hell I was going to router it into the wood. This is a technique I figured out on my own, I am surprised I don't see more woodworkers online doing this. It was very easy to 3d print the exact templates I needed for this project, pictured below.

{: .center}
![/images/guitar/4D72F75B-5D46-4929-8B84-C6C96F46A77D_1_201_a.jpg](/images/guitar/4D72F75B-5D46-4929-8B84-C6C96F46A77D_1_201_a.jpg)

Using the above templates from left to right gives you a very precise cut of my design.

{: .center}
![/images/guitar/0AE3FB20-477F-454D-9562-77CEEB79F5ED_1_105_c.jpeg](/images/guitar/0AE3FB20-477F-454D-9562-77CEEB79F5ED_1_105_c.jpeg){: style="width: 49%; display: inline-block; vertical-align: middle;"}
![/images/guitar/6A3E761A-8859-4535-A4CE-11346706D981_1_105_c.jpeg](/images/guitar/6A3E761A-8859-4535-A4CE-11346706D981_1_105_c.jpeg){: style="width: 49%; display: inline-block; vertical-align: middle;"}

Naturally, I prototyped and tested this cut many many times before I was sure that it would work. The biggest challenge with this design is that the corner radius on the front cut is too small for my router. On the final cut it took quite a lot of hand filing to get it to size.

### Designing the Guitar itself

As this is my first guitar, I started with the easiest design to cut, the Telecaster (or T-Type if you are scared of trademarks). I bought a wooden router template off ebay, and whipped up a design in fusion-360 so I had measurements to guide my cuts. Here is the final design:

![/images/guitar/Untitled%202.png](/images/guitar/Untitled%202.png)

## The build

Definitely the hardest part of this project, but also the least interesting for a blog post. Instead of boring you with the details I'll just show a bunch of photos of the process. I ended up relying pretty heavily on 3d printing templates in this build, as they were a great way to print precise dimensions for measurement.

{: .center}
![/images/guitar/Untitled%203.png](/images/guitar/Untitled%203.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}
![/images/guitar/Untitled%204.png](/images/guitar/Untitled%204.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}

{: .center}
![/images/guitar/Untitled%205.png](/images/guitar/Untitled%205.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}
![/images/guitar/Untitled%206.png](/images/guitar/Untitled%206.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}

{: .center}
![/images/guitar/Untitled%207.png](/images/guitar/Untitled%207.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}
![/images/guitar/Untitled%208.png](/images/guitar/Untitled%208.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}

{: .center}
![/images/guitar/Untitled%209.png](/images/guitar/Untitled%209.png){: style="width: 49%; display: inline-block; vertical-align: middle;"}
![/images/guitar/704F19F6-0A99-4252-800A-F24C640518A5_1_105_c.jpeg](/images/guitar/704F19F6-0A99-4252-800A-F24C640518A5_1_105_c.jpeg){: style="width: 49%; display: inline-block; vertical-align: middle;"}

## Final Thoughts

{: .center}
![/images/guitar/IMG_0417.jpeg](/images/guitar/IMG_0417.jpeg)

This project probably took me around 200 hours to complete, but was a huge joy to work on. I spend most of my day staring at a computer screen so it was great to build something with my hands for a change.

There are a few things I will do differently next time I build a guitar:

- Invest in a drill press. While it is possible to build a guitar without a drill press, all of my holes came out crooked, and the finished product would feel much higher quality if I had used a drill press.
- Invest in a better guitar neck. For this build I chose to buy a cheap guitar neck off Amazon. The neck is definitely the worst part of the guitar experience, and I will likely be upgrading it to a custom Warmoth neck soon.

As with all my projects, if you are interested in any of my design files or want to chat about anything at all, feel free to reach out to me directly at mdl0394@gmail.com. If you want to hear about future projects subscribe to my mailing list or RSS feed.

My next posts will be about my processes for solving problems like these through writing, and building my own custom guitar pedal, so subscribe if you want to read more.

{% include stay_connected.html %}

If you liked this post, you can also check out some other things I made here:
<br/><br/>

{% assign project_posts = site.tags.Products %}
{% for featured_post in project_posts %}
{% include post_description.html post=featured_post %}
{% endfor %}
