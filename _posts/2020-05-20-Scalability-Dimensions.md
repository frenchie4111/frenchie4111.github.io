---
title: Scalability Dimensions
subject: A few words on how you should order parameters to maximize codebase consistency and scalability
tags: Coding
layout: post_plain
---

A major consideration when designing systems is scalability. Here I will detail the different dimensions of scalability that should be considered when designing a system. For every dimension I will try to give a software design example, and a humans system design example.

I am writing this post now, as it will be referenced heavily in my Unwritten Coding Standard series, the first of which is up [here](/2020/05/13/Coding-Standards-Argument-Ordering.html)

<br/>

## Customer Count Scalability

Will my system be able to support N customers? This is often the form of scalability that people think of first when they consider scalability. A majority of the time when we are designing for Customer Count Scalability we employ the concept of "Horizontal Scalability". We design our systems in a way that allows us to seamlessly run copies of the system in order to support more customers.

Examples of Customer Count Scalability include:

- Designing your software to allow running more API nodes to support more customer demand
- Giving your Customer Support staff operational autonomy to remove bottlenecks and allow team scaling to match customer demand (More on Employee Count Scalability later)

<br/>

## Requirements Scalability

Can my design grow to meet new requirements? It is inevitable that the assumptions used to design a system will change over time. Good designs can adapt gracefully to support changes in the underlying assumptions. Often this takes the form of "modularity", if requirements are sectioned off into modules then the effect of any change in requirements can be reduced to a single module.

Examples of Requirements Scalability include:

- Splitting the business logic of your code into individual modules with tightly controlled APIs
- Keeping a good mix of generalist engineers on your teams to allow for flexibility when shifting company priorities

<br/>

## Contributor Scalability

Can my system be maintained by more than one person? Where does the design break down as we begin to add more maintainers. A system should be designed with clear separations of concerns to allow for maintainers to make changes independently of one another. This allows for more maintainers to be added without creating bottlenecks.

Examples of Contributor Scalability Include:

- Separating your frontend and backend with a clearly defined API, allowing for separate teams to execute.
- Splitting your sales team geographically to allow each sales person to execute independently of one another.

<br/>

## Cost/Value Scalability

Can we charge the most active customers the most money? This concept of scalability is less about systems design, and more about business model design. Does your business model scale such that the customers who are getting the most value out of your product also pay the most for it?

Examples of Cost/Charge Scalability:

- Charging a customer per-resource. This is often seen in SaaS as "cost per seat"

{% include stay_connected.html %}
