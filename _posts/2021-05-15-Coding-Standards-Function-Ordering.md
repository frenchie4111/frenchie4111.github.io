---
title: "Unwritten Coding Standards: Function Ordering"
subject: A few words on how you should order parameters to maximize codebase consistency and scalability
tags: Coding mike8
layout: post_plain_toc
hide_intro_cta: true
intro: "
A subtle choice we have to make every day as software engineers, is how to order our functions/methods in a file. I have noticed that a lot of more senior developers have a very specific way we prefer functions to be ordered, but we rarely explicitly discuss these rules. In keeping with the spirit of this Unwritten Coding Standards series, I will try to break down these rules and be overly concrete about something people normally don't care about enough to write down.
"
---

## What is function ordering, and why should I care?

Whenever we break some functionality out into it's own method or function, we need to decide, where in the file will that method or function be placed. For small projects it often doesn't really matter, but as a codebase grows, unorganized files can become difficult for new team members to grok. Unwieldy files can really slow down new developers onboarding when they are trying to become accustomed to your project.

There are several ways to stop files from becoming organized, this post will focus on how we can order the functions within a file to make that file easier to grok. I plan to write a few more posts on the issue of file organization, specifically around the questions of "What should be a function" and "What should be a file", if you are interested in those, subscribe to be notified when they are published.

So, How do we order the functions in our files to maintain the core pillars of consistency and scalability? Like with most standards, the rules almost don't matter, it's the having of rules and standards that matters. In this post I will lay out my personal preferences, and the rules that I have found to be the most logically valid (as in, they break under the least cases allowing you to maintain consistency when possible).

## Rule 1: Functions should be laid out using the call tree

The core of the function ordering system I will go over in this post uses what I'll call the "function call tree".

A good mental model for functions in a file is a tree structure. In general you will have some root nodes that are "entrypoints" into your file. These could be exported functions, main functions, or whatever else. These entrypoints will call some other functions, that may call some other functions, etc, etc. This graph of function calls represents the function call tree.

Here's a toy example. This code:

```jsx
function A() {
    B()
    C()
}

function B() {
    D()
}

function C() {}

function E() {}
```

Could be loosely represented as this tree:

```jsx
A
├─ B
│  ├─ D
├─ C
E
```

This tree structure represents the first rule. **Functions should always be ordered according to the function call tree.**

A function should always be grouped with its leafs, and should be defined before any of its branch/leaf functions. If a branch has it's own branches (like in the case of `B()` calling `D()` above) it should be defined before the next branch (`D()` should be defined before `C()`)

### Rule 1.5: The Reverse Call Tree

As an aside. My personal preference, and the preference of a lot of developers, is to use what I'll call the "reverse call tree". This is exactly the same principle as the standard tree, except leaf nodes are defined before their callers. It can be helpful to identify if a file is in standard or reverse tree structure, as it will help you grok the file much faster.

The reverse tree of the above code would look like this. All functions are defined before they are used:

```jsx
E
│  ├─ D
├─ B
├─ C
A
```

**Fun fact:** This is a hold-over from the days of single pass compilers, where the compiler would only read a file once, and you were required to define a function before it was called.

It doesn't really matter if you choose to use the standard or reverse tree structure. What matters is that you choose one of the two and stick with it.

## Rule 2: Functions of the same tree depth should be sorted in call order

This rule was implied above, but in the spirit of writing the unwritten, I will cement it here.

Functions that are the same depth, should be sorted in the order that they are called. The above definition would be invalid if `C()` was defined before `D()`

```jsx
function A() {
    B()
    C()
}

// ❌ Bad: C() should be after B() because it is called after B
function C() {}

function B() {
    D()
}

function E() {}
```

Even in the reverse-tree discussed above. Functions of the same tree depth should be ordered in the order they are called (not reversed).

## Rule 3: Functions shared in multiple places are their own root nodes

One very common that easily breaks the above rules, is if a function is being used by multiple functions in the file. In this scenario, I prefer to make shared functions their own tree root, and sort them after (or before when reversed) they are called.

```jsx
function A() {
    C()
}

function B() {
    C()
}

function C() {}
```

The function call tree would be flat, because they are all root nodes:

```jsx
A
B
C
```

## Feedback?

If you have any feedback on the rules I laid out here, I would love to hear it. What has worked for you in the past? Do you know of any linters that can verify these rules so I don't have to complain about them in PR? Feel free to reach out directly to me: mdl0394@gmail.com

I have more UCS posts in the works, planned for the coming months. If you are interested in getting notified sign up to my mailing list or RSS feeds.

{% include stay_connected.html %}

<br/>

This is a running series on stay caffienated, if you enjoyed this you might also enjoy:

<br/>

{% assign project_posts = site.tags.Coding %}
{% for featured_post in project_posts %}
{% if featured_post.url != page.url %}
{% include post_description.html post=featured_post %}
{% endif %}
{% endfor %}
