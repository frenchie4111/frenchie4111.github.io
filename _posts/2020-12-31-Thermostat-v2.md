---
title: "Building my own HomeKit Thermostat"
subject: More updates to my thermostat project
tags: Projects
layout: post_plain
---

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed6c9baf-0793-4878-8e83-abfce8f66129/0F9A740C-1771-4049-BC7F-61A6D70E30A1_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed6c9baf-0793-4878-8e83-abfce8f66129/0F9A740C-1771-4049-BC7F-61A6D70E30A1_1_105_c.jpeg)

The v1 post did really well, thank you guys for reading about it. I had a few more days in vacation, and wasn't quite satisfied with the v1, so I decided to make some more updates.

I am considering taking the steps to make this into something that I can sell to you. If you'd be interested in buying a hackable thermostat, let me know in this form here.

## Where we were at v1

My last post on this blog details the v1 thermostat, but I'll throw a brief recap in here. The v1 was a thermostat in a black box built with an ESP32 and a relay I found on amazon. The basic goal was to allow me to control my heating system from my phone, even though I couldn't buy an eecobee (or at the time I thought I couldn't at least).

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42097f0b-5423-4b7b-815f-43901b89f48f/36DC72C3-4D8C-482C-8110-FB03483FEA31_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42097f0b-5423-4b7b-815f-43901b89f48f/36DC72C3-4D8C-482C-8110-FB03483FEA31_1_105_c.jpeg)

## Plans for v2

My main goal for v2 is to turn this into something I feel comfortable using every day. To get there I wanted to accomplish these tasks:

- New Adafruit temperature sensor (MCP9808)
- Small OLED display that shows status
- Buttons for standard control (incase you don't have your phone around)
- Put most of the components on a nicer project board, so I don't have to have 6 WAGOs shoved in the case this time
- A couple suggestions from the hackernews comments on the last post:
    - 5 minute minimum runtime so I don't upset my poor ol'furnace
    - Use a running average (rather than just the last temp read) to protect from a finicky temp sensor

## Testing out the new stuff

A few new components in this build, so naturally the first thing to do was to test them all out.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6daab5a-3205-4213-b73e-2b1416290a9f/F73D5857-A093-46C5-8BC3-0CCED3BEE368_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6daab5a-3205-4213-b73e-2b1416290a9f/F73D5857-A093-46C5-8BC3-0CCED3BEE368_1_105_c.jpeg)

I intentionally bought an I2C display to make it easier to wire things together. The thermometer is i2c as well, so this reduces the number of wires that need to go from ESP → Project Board.

Thanks to the hilariously easy to use adafruit libraries both the thermometer and display were working in a matter of minutes. ([Adafruit SSD1306](https://github.com/adafruit/Adafruit_SSD1306.git?utm_source=platformio&utm_medium=piohome) and [Adafruit MCP9808](https://github.com/adafruit/Adafruit_MCP9808_Library?utm_source=platformio&utm_medium=piohome)). I would throw in some code for how I am controlling these devices, but it's literally just the example projects with some stuff deleted out of the middle.

## Binding it all together

v2 is intended to be used for quite a while, so I wanted things secured pretty well on a project board, rather than having a nest (heh) of wires shoved into a box.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/867f3f27-a567-4843-abc0-fbae24591e21/28B24D3E-8E3B-4F77-8224-38509E764D35_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/867f3f27-a567-4843-abc0-fbae24591e21/28B24D3E-8E3B-4F77-8224-38509E764D35_1_105_c.jpeg)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5550bccd-2698-48be-8b60-d9c8175f8048/E246C051-2173-474C-A492-0F936897E00E_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5550bccd-2698-48be-8b60-d9c8175f8048/E246C051-2173-474C-A492-0F936897E00E_1_105_c.jpeg)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6761cd0b-5d7e-4a6c-954f-d2b63bf4987b/CB514714-B0BC-4D09-A39A-5BFA35805A4F_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6761cd0b-5d7e-4a6c-954f-d2b63bf4987b/CB514714-B0BC-4D09-A39A-5BFA35805A4F_1_105_c.jpeg)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/13e29769-a333-4451-b63e-d8e80d7c001a/70F4E5C8-F197-4289-9668-D81522E07740_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/13e29769-a333-4451-b63e-d8e80d7c001a/70F4E5C8-F197-4289-9668-D81522E07740_1_105_c.jpeg)

Basically went down without a hitch. I did forget to include pull down resistors for my button originally, but you can barely even tell they were added as an afterthought in the finished product (the yellow heatshrinked 10k resistors).

I am pretty satisfied with how the project board came out. Things lined up pretty well naturally, and I had enough space to include a debug header on the back for all of the connections to the ESP32. I plan to continue to make changes to this project, so I am trying to avoid more permanent soldering jobs to the ESP32, to save myself some de-soldering time down the line.

## Case Updates

With the new components and display, the case needed to be expanded to comfortably fit everything in. After some quick modeling and an afternoon of 3d printing, the new case was born.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/661053b8-ff82-4b53-af8d-e289c431de25/49CC504A-AA7B-463D-A416-C8A44161B2A0_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/661053b8-ff82-4b53-af8d-e289c431de25/49CC504A-AA7B-463D-A416-C8A44161B2A0_1_105_c.jpeg)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8b8732b1-2d4c-4f11-9604-9f79c3280856/863B0E81-6B0C-434F-BAFD-9345AABDE4E8_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8b8732b1-2d4c-4f11-9604-9f79c3280856/863B0E81-6B0C-434F-BAFD-9345AABDE4E8_1_105_c.jpeg)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6beb6df2-5965-455b-8365-6c38bddb8cc9/06910928-2ECC-44B0-9C95-DF5397296CD7_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6beb6df2-5965-455b-8365-6c38bddb8cc9/06910928-2ECC-44B0-9C95-DF5397296CD7_1_105_c.jpeg)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c51ff066-6e84-4e8c-8b4e-2ee8e8ae1bac/1924243E-53A0-4320-9D5D-89AF4187DDAA_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c51ff066-6e84-4e8c-8b4e-2ee8e8ae1bac/1924243E-53A0-4320-9D5D-89AF4187DDAA_1_105_c.jpeg)

## Code Updates

One of the new requirements for the v2 was that the heater will stay on for a minimum of 5 minutes, no exceptions, even if you manually turn it off it will still stay on for 5 minutes. In order to support this new mode, I have added the concept of "Waiting" to the state machine. Now instead of going to an off state, if it has been <5 minutes since the thermostat was turned on, the thermostat will go into waiting instead.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15d7d6e3-c1e9-495d-8ce2-f5e5a6d1717a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15d7d6e3-c1e9-495d-8ce2-f5e5a6d1717a/Untitled.png)

Some have argued that using a state machine for this problem is overcomplicating the issue. That's pretty valid, this state machine is fairly complex, but I really like that the state machine makes it really easy to code and understand both the current state of the thermostat and the transitions of the thermostat. As I continue to complicate the main control logic (example: adding a cooling mode or adding different stages of heating) it will only get more complicated, so I prioritized a more scalable solution over a simple solution.

Other than that the rest of the updates were pretty straight forward. The Adafruit display library made it as easy as printf to draw the current status onto the display, so there's nothing really to phone home about there. And the buttons just fire actions that were already implemented for the homekit control system.

## Final Installation

The only thing left to do was install it. I am honestly a bit disappointed that the LED shines through the plastic, but at least that makes it easy to see the current state of the relay. It's now almost the same size as old thermostat, in future revisions the relay will shrink to a much smaller switching relay, so hopefully the size will shrink closer to that of an eecobee or nest.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8bf02081-23b3-470d-864d-89494ba78b6d/55859620-AF4D-4C03-ACD6-EBA458CFA6F9_1_105_c.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8bf02081-23b3-470d-864d-89494ba78b6d/55859620-AF4D-4C03-ACD6-EBA458CFA6F9_1_105_c.jpeg)

## Future Plans

I am pretty strongly considering turning this thing into something people can buy. If you'd be interested in buying an open sourced hackable home thermostat, let me know in this form (or reach out to my email directly). 

v3 improvements already planned:

- A much smaller "mini switching relay" to control the heater, the current one is way way overkill, and takes up 1/3 of the space in the case
- A custom PCB. I want to at least give my Mom one, so I am going to make a custom PCB and get it printed on DirtyPCBs so I don't have to spend 3 hours soldering together another one
- HomeAssistant integration. I already have a few different ways I want to hook it up with my other smart home devices, so I am going to prioritize haas integration asap