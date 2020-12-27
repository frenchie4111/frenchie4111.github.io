---
title: "Building my own HomeKit Thermostat"
subject: Holiday 2020 project, building a custom HomeKit enabled thermostat
tags: Projects
layout: post_plain
---

I'm pretty obsessed with controlling most of the electronics in my house from my
phone. One of the last remaining devices was the thermostat. I don't want a Nest
because it doesn't work with HomeKit, and I can't use an EcoBee because I don't
have a neutral wire. So I resolved to build my own.

If you are building your own thermostat, or any hardware really, and want some
help or just want to show it off, feel free to shoot me an email at mdl0394@gmail.com. 
Also I plan to continue to expand this project to have a screen and some buttons,
if you want to hear about that signup to my email list and I'll let you know when
I do it.

## Figuring out hot to turn on the heat

So I turns out my heater runs on a really simple control protocol. There are just
two wires run from the heater to the current thermostat, when you connect them it
turns on, and when you disconnect it turns off. The only unfortunate part of it is
that the wires are 24vac, so to be safe I need to use a solid state relay for
switching.

{: .center}
![Old Thermostat Closeup showing two pins that need to be connected](/images/homekit_thermostat/old_thermostat_closeup.jpeg){: style="width: 350px"}

## The prototype

I am building this whole thing on an esp32, with a big overkill relay I got on
amazon prime. I will link the exact parts below. The current thermometer is an
old tmp102 sparkfun board I had lying around, but it's off by around 6 degrees,
so in v2 I will be replacing it with hopefully a more accurate one.

{: .center}
![Fully wired breadboard](/images/homekit_thermostat/breadboard.jpeg){: style="width: 250px;"}
![Breadboard taped to wall](/images/homekit_thermostat/wall_taped.jpeg){: style="width: 250px;"}

After wiring it all together, and taping it to my wall for a day or two, I was
satisfied with the components, and wanted to get started on prettying it up a bit.

## The code

The thermostat control runs on a pretty simple state machine. I am a big fan of
drawing things out ahead of time, so I drew this diagram for myself before coding.
In C this is implemented as two enums (actions, states) and a bunch of switch case
statements.

{: .center}
![State machine for thermostat control](/images/homekit_thermostat/state_machine.png){: style="width: 250px;"}

{: .expand .expand_facet #expand_model_code}
Click Here to toggle the code
<div id="model_code" class="expand_block">
<pre><code>// Enums:

typedef enum {
    TC_HEATER_MODE_OFF,
    TC_HEATER_MODE_ON,
    TC_HEATER_MODE_AUTO_ON,
    TC_HEATER_MODE_AUTO_OFF
} tc_heater_mode_t;

typedef enum {
    TC_HEATER_ACTIONS_SET_TO_AUTO,
    TC_HEATER_ACTIONS_SET_TO_OFF,
    TC_HEATER_ACTIONS_SET_TO_ON,
    TC_HEATER_ACTIONS_TEMPERATURE_CHANGE,
    TC_HEATER_ACTIONS_THRESHOLD_CHANGE
} tc_heater_action_t;

// ... Somewhere else:

switch (s_current_heater_mode) {
    case TC_HEATER_MODE_OFF:
        switch(tc_action) {
            case TC_HEATER_ACTIONS_SET_TO_AUTO:
                s_current_heater_mode = TC_HEATER_MODE_AUTO_OFF;
                s_current_heater_mode = tc_update_auto_mode(s_current_heater_mode);
                break;
            case TC_HEATER_ACTIONS_SET_TO_OFF:
                break;
            case TC_HEATER_ACTIONS_SET_TO_ON:
                s_current_heater_mode = TC_HEATER_MODE_ON;
                break;
            case TC_HEATER_ACTIONS_TEMPERATURE_CHANGE:
                break;
            case TC_HEATER_ACTIONS_THRESHOLD_CHANGE:
                break;
        }
        break;
    case TC_HEATER_MODE_ON:
        switch(tc_action) {
            case TC_HEATER_ACTIONS_SET_TO_AUTO:
                s_current_heater_mode = TC_HEATER_MODE_AUTO_ON;
                s_current_heater_mode = tc_update_auto_mode(s_current_heater_mode);
                break;
            case TC_HEATER_ACTIONS_SET_TO_OFF:
                s_current_heater_mode = TC_HEATER_MODE_OFF;
                break;
            case TC_HEATER_ACTIONS_SET_TO_ON:
                break;
            case TC_HEATER_ACTIONS_TEMPERATURE_CHANGE:
                break;
            case TC_HEATER_ACTIONS_THRESHOLD_CHANGE:
                break;
        }
        break;
    case TC_HEATER_MODE_AUTO_ON:
    case TC_HEATER_MODE_AUTO_OFF:
        switch(tc_action) {
            case TC_HEATER_ACTIONS_SET_TO_AUTO:
                break;
            case TC_HEATER_ACTIONS_SET_TO_OFF:
                s_current_heater_mode = TC_HEATER_MODE_OFF;
                break;
            case TC_HEATER_ACTIONS_SET_TO_ON:
                s_current_heater_mode = TC_HEATER_MODE_ON;
                break;
            case TC_HEATER_ACTIONS_TEMPERATURE_CHANGE:
                s_current_heater_mode = tc_update_auto_mode(s_current_heater_mode);
                break;
            case TC_HEATER_ACTIONS_THRESHOLD_CHANGE:
                s_current_heater_mode = tc_update_auto_mode(s_current_heater_mode);
                break;
        }
        break;
}</code></pre>
</div>

It was very important to me that the thermostat worked on homekit, thankfully
there are already great homekit (hap) resources for the esp32. After some digging
I decided on this homekit package, as it's a clean port of the expressif homekit
library to arduino. There are about 15 different homekit frameworks for arduino,
so at some point I just had to choose one and start running.

{: .center}
![Homekit screenshot showing thermostat](/images/homekit_thermostat/homekit.jpeg){: .style="width: 250px;"}

After a whole bunch of fucking around I managed to get my esp32 to show up as a thermostat from my phone.

A few gotcha's that I encountered along the way: (some specific to this library, some specific to homekit)

- With this HomeKit library if you want to factory reset, you have to do it *after* you initialize. Also be sure to remove the device from homekit on your phone before factory resetting the device
- Be sure that you have unique id and pairing codes for your device, I have another esp32 on my homekit and they kept colliding
- Be sure that your device cid matches with the services you are providing, otherwise you will get annoying silent failures from homekit

## Making things pretty

After getting the code into a place I liked, all that was left was to make it
look less like a bomb strapped to my living room wall. I 3d printed an enclosure,
and soldered the correct wires in the correct places. Unfortunately my board
requires constant a 5V micro-usb power source, so as of right now I have it
powered off of a huge battery pack. Maybe in vN (for very large values of N)
I will go nest style with an internal LiPo and an AC-DC converter.

{: .center}
![Soldered together](/images/homekit_thermostat/soldered.jpeg){: style="width: 200px;"}
![3d printed enclosure](/images/homekit_thermostat/enclosure.jpeg){: style="width: 200px;"}
![Enclosure mounted to wall and plugged in](/images/homekit_thermostat/pretty.jpeg){: style="width: 200px;"}

## What's Next?

I have already bought a few parts for a planned v2, so stay tuned. In v2 I will be adding:

- New thermometer board (Going to use this overpriced adafruit breakout here [https://www.amazon.com/gp/product/B00OKCQX96/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B00OKCQX96/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1))
- Adding a small status display OLED screen [https://www.amazon.com/gp/product/B0833PF7ML/ref=ppx_yo_dt_b_asin_title_o01_s03?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B0833PF7ML/ref=ppx_yo_dt_b_asin_title_o01_s03?ie=UTF8&psc=1)
- Add a few buttons to allow non-phone control of the device [https://www.amazon.com/gp/product/B0722LBKV7/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B0722LBKV7/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1)

{% include stay_connected.html %}

## Parts used / Other references

- Way too big of a relay: [https://www.amazon.com/gp/product/B07KXNCL91/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B07KXNCL91/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1)
- ESP32 Doit Devkit v1 boards: [https://www.amazon.com/gp/product/B07Q576VWZ/ref=ppx_yo_dt_b_asin_title_o08_s01?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B07Q576VWZ/ref=ppx_yo_dt_b_asin_title_o08_s01?ie=UTF8&psc=1)
- HomeKit framework esp-homekit-arduino-sdk [https://github.com/Brawrdon/esp-homekit-arduino-sdk?utm_source=platformio&utm_medium=piohome](https://github.com/Brawrdon/esp-homekit-arduino-sdk?utm_source=platformio&utm_medium=piohome)
