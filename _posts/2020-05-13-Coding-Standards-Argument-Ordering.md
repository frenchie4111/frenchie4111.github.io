---
title: Argument Ordering
subject: How should you order your functions arguments?
tags: Coding mike8
layout: post_plain
---

When defining methods and functions, how do we choose what order the arguments are in? This is the first of a series of posts where I attempt to put words and rules to the subtle programming decisions we make every day. A majority of the examples will be given in Javascript, as this is my home language. But they likely can and should be extended to other languages as well.

**Pillar 1: Consistency** A common theme throughout these posts is that maintaining consistency of code is key. Ideally your arguments will be so consistent that an engineer working on your codebase can guess the ordering of a functions variables, just from the name. As such the rules laid out here will be focussed on allowing as much consistency as possible.

**Pillar 2: Scalability** The second most important thing to consider when creating a coding standard, is the scalability of your code. How will this codebase grow in the future, and how how can we define our standard in a way that makes that as easy as possible.

<br/>

## Common Arguments First

A large number of the codebases have had standard arguments you need to pass to a large percentage of functions. Often this is something like `database_connection` or `transaction` or `user_id`. If you find that more than a handful of functions have the same argument, standardize your codebase to put that argument first.

```js
// Bad:
function setName(user_id, name, transaction) {}
function createOrder(user_id, transaction, order_details) {}
function installDevice(device_serial, transaction) {}

// Good:
function setName(transaction, user_id, name) {}
function createOrder(transaction, user_id, order_details) {}
function installDevice(transaction, device_serial) {}
```

**Justification** In order to maintain consistency, the only two options are to put the common argument first, or last. Putting the common argument last causes issues with the requirements scalability of your codebase. As a codebase grows, the behaviors and arguments of any function will get more and more nuanced. Often leading to a need to add more optional arguments to a function. If we standardize our common arguments to the end, it becomes harder to change the arguments of a function.

<br/>

## Targets Before Values

A large amount of functions boil down to "do something, to something". This could be the `setName` example from above, or things like `downloadFile`, `createOrder`, etc. When a function follows this pattern, the target should always be before the values.

```js
// Good:
function setName(user_id, first_name, last_name) {}
function setPassword(user_id, password) {}
function setEmail(user_id, email) {}

// Bad:
function setName(first_name, last_name, user_id) {}
function setPassword(password, user_id) {}
function setEmail(email, user_id) {}
```

**Justification** This, like the common argument standard, is designed to support a codebase that will grow over time. If in the future a function needs additional arguments added to it, putting the target first makes it much easier to add additional values. If in the future we added an optional `middle_name` parameter to the `setName` function, we do not need to update every call to this function to re-order the arguments, we only need to update calls that have a middle name to pass.

<br/>

## Optionals Last

In languages that support optional arguments or arguments with default values. The optional argument should always come last. Ideally, the more likely an argument is to be omitted, the later it should appear in the option list.

```js
// Good
function setName(user_id, first_name, last_name, middle_name='') {}

// Bad
function setName(user_id, first_name, middle_name='', last_name) {}
function setName(user_id, first_name, middle_name, last_name) {
    if(!middle_name) middle_name = 'None';
    // ...
}
```

**Justification** In Javascript this specification makes it easier to call any given function. It makes it so that you can pass only the minimally required arguments to a function to perform the operation you are requesting. If the code that interacts with your function is simpler, it makes it easier to refactor later.

#### Thanks

If you have any feedback, email me at mdl0349 at gmail.com. I'd love to chat about these or anything else really :^)
