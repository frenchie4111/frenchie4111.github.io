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

# Figuring out hot to turn on the heat

So I turns out my heater runs on a really simple control protocol. There are just
two wires run from the heater to the current thermostat, when you connect them it
turns on, and when you disconnect it turns off. The only unfortunate part of it is
that the wires are 24vac, so to be safe I need to use a solid state relay for
switching.

![Old Thermostat Closeup showing two pins that need to be connected](/images/homekit_thermostat/old_thermostat_closeup.jpeg)

