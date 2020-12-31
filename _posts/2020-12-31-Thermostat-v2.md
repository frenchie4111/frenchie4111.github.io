---
title: "v2 Updates to my HomeKit Thermostat - Making it into something i can u"
subject: More updates to my thermostat project
tags: Projects
layout: post_plain
---

![v2 of thermostat completed, sitting on my desk](/images/homekit_thermostat_v2/completed_desk.jpg)

The v1 post did really well, thank you guys for reading about it. I had a few more days in vacation, and wasn't quite satisfied with the v1, so I decided to make some more updates.

{: style="background-color: gray; color: white;"}
I am considering taking the steps to make this into something that I can sell to you. If you'd be interested in buying a hackable thermostat, let me know in this form [here](https://docs.google.com/forms/d/e/1FAIpQLSePJdT7qP9IMAK_TZLCWFs1sodBei73pinnji0GxVe9dMl8Zg/viewform).

<br/>

## Where we were at v1

[My last post on this blog details the v1 thermostat](/2020/12/27/building-my-own-homekit-thermostat-v1), but I'll throw a brief recap in here. The v1 was a thermostat in a black box built with an ESP32 and a relay I found on amazon. The basic goal was to allow me to control my heating system from my phone, even though I couldn't buy an eecobee (or at the time I thought I couldn't at least).

![v1 of thermostat on my wall](/images/homekit_thermostat_v2/v1.jpg)

<br/>

## Plans for v2

My main goal for v2 is to turn this into something I feel comfortable using every day. To get there I wanted to accomplish these tasks:

- New Adafruit temperature sensor (MCP9808)
- Small OLED display that shows status
- Buttons for standard control (incase you don't have your phone around)
- Put most of the components on a nicer project board, so I don't have to have 6 WAGOs shoved in the case this time
- A couple suggestions from the hackernews comments on the last post:
    - 5 minute minimum runtime so I don't upset my poor ol'furnace
    - Use a running average (rather than just the last temp read) to protect from a finicky temp sensor

<br/>

## Testing out the new stuff

A few new components in this build, so naturally the first thing to do was to test them all out.

![New components on a breadboard working](/images/homekit_thermostat_v2/breadboard.jpg)

I intentionally bought an I2C display to make it easier to wire things together. The thermometer is i2c as well, so this reduces the number of wires that need to go from ESP → Project Board.

Thanks to the hilariously easy to use adafruit libraries both the thermometer and display were working in a matter of minutes. ([Adafruit SSD1306](https://github.com/adafruit/Adafruit_SSD1306.git?utm_source=platformio&utm_medium=piohome) and [Adafruit MCP9808](https://github.com/adafruit/Adafruit_MCP9808_Library?utm_source=platformio&utm_medium=piohome)). I would throw in some code for how I am controlling these devices, but it's literally just the example projects with some stuff deleted out of the middle.

<br/>

## Binding it all together

v2 is intended to be used for quite a while, so I wanted things secured pretty well on a project board, rather than having a nest (heh) of wires shoved into a box.

{: .center}
![Project board with basic layout](/images/homekit_thermostat_v2/project_board_1.jpg){: style="width: 49%"}
![Project board front with buttons and screen](/images/homekit_thermostat_v2/project_board_2.jpg){: style="width: 49%"}

{: .center}
![Project board back with no pull down resistors](/images/homekit_thermostat_v2/project_board_3.jpg){: style="width: 49%"}
![Completed project board](/images/homekit_thermostat_v2/project_board_4.jpg){: style="width: 49%"}

Basically went down without a hitch. I did forget to include pull down resistors for my button originally, but you can barely even tell they were added as an afterthought in the finished product (the yellow heatshrinked 10k resistors).

I am pretty satisfied with how the project board came out. Things lined up pretty well naturally, and I had enough space to include a debug header on the back for all of the connections to the ESP32. I plan to continue to make changes to this project, so I am trying to avoid more permanent soldering jobs to the ESP32, to save myself some de-soldering time down the line.

<br/>

## Case Updates

With the new components and display, the case needed to be expanded to comfortably fit everything in. After some quick modeling and an afternoon of 3d printing, the new case was born.

![Me modeling this in fusion 360](/images/homekit_thermostat_v2/modeling_computer.jpg)

{: .center}
![3d printer printing the front](/images/homekit_thermostat_v2/3d_printer.jpg){: style="width: 49%;"}
![Image of the printed case on my desk](/images/homekit_thermostat_v2/modeling_desk.jpg){: style="width: 49%;"}

![Image of the front of the case test](/images/homekit_thermostat_v2/model_test.jpg)

<br/>

## Code Updates

One of the new requirements for the v2 was that the heater will stay on for a minimum of 5 minutes, no exceptions, even if you manually turn it off it will still stay on for 5 minutes. In order to support this new mode, I have added the concept of "Waiting" to the state machine. Now instead of going to an off state, if it has been <5 minutes since the thermostat was turned on, the thermostat will go into waiting instead.

![v2 state machine](/images/homekit_thermostat_v2/state_machine_v2.jpg)

Some have argued that using a state machine for this problem is overcomplicating the issue. That's pretty valid, this state machine is fairly complex, but I really like that the state machine makes it really easy to code and understand both the current state of the thermostat and the transitions of the thermostat. As I continue to complicate the main control logic (example: adding a cooling mode or adding different stages of heating) it will only get more complicated, so I prioritized a more scalable solution over a simple solution.

Other than that the rest of the updates were pretty straight forward. The Adafruit display library made it as easy as printf to draw the current status onto the display, so there's nothing really to phone home about there. And the buttons just fire actions that were already implemented for the homekit control system.

<br/>

## Final Installation

The only thing left to do was install it. I am honestly a bit disappointed that the LED shines through the plastic, but at least that makes it easy to see the current state of the relay. It's now almost the same size as old thermostat, in future revisions the relay will shrink to a much smaller switching relay, so hopefully the size will shrink closer to that of an eecobee or nest.

![Completed thermostat on my wall](/images/homekit_thermostat_v2/completed_wall.jpg)

<br/>

## Future Plans

{: style="background-color: gray; color: white;"}
I am pretty strongly considering turning this thing into something people can buy. If you'd be interested in buying an open sourced hackable home thermostat, let me know in this [form](https://docs.google.com/forms/d/e/1FAIpQLSePJdT7qP9IMAK_TZLCWFs1sodBei73pinnji0GxVe9dMl8Zg/viewform) (or reach out to my email directly). 

v3 improvements already planned:

- A much smaller "mini switching relay" to control the heater, the current one is way way overkill, and takes up 1/3 of the space in the case
- A custom PCB. I want to at least give my Mom one, so I am going to make a custom PCB and get it printed on DirtyPCBs so I don't have to spend 3 hours soldering together another one
- HomeAssistant integration. I already have a few different ways I want to hook it up with my other smart home devices, so I am going to prioritize haas integration asap

{% include stay_connected.html %}

## Parts used / other references

Asside from the parts used in v1, here are the new things used:
 - New thermometer is a [Adafruit MCP9808](https://www.adafruit.com/product/1782)
 - Screen is a: [GeeekPi 5PCS 0.96 Inch OLED Module 12864 128x64 White SSD1306](https://www.amazon.com/gp/product/B0833PF7ML/ref=ppx_yo_dt_b_asin_title_o04_s02?ie=UTF8&psc=1)
