---
title: "Unwritten Coding Standards: Vertical Whitespace"
subject: Simple vertical whitespace rules that will make any code easier to read
tags: Coding mike8
layout: post_plain
---

An often overlooked style element of code is the tactical use of vertical whitespace. 
Just like in writing, whitespace can be used in code to separate code into related
chunks and create a better reading experience. In this post I will define a ruleset
you can use in your style guidelines to help standardize your whitespace usage.
Learning to properly utilize whitespace in your code can drastically improve your
code's readability without needing to refactor anything.

{% include coding_standards.html %}

## What is Vertical Whitespace?

When I say whitespace, I mean the addition of empty lines between sections of code.
A lot of code I have read does not utilize whitespace at all, maybe because the author
didn't even realize it could help. It's good to remember that vertical space in code
is free, and can be used to drastically improve the readability of your code.

As an example we will create a function that handles running a specified job with
inputs, logging the run and outputting any results. _Note: This code is chosen to
illustrate the concept of whitespace, but it likely should also be refactored into
smaller functions :D_

```python
# ❌ Bad:
def run_processing_job(job_name, input_data_id):
    session = database_manager.get_session()
    input_data = lookup_input_data(session, input_data_id)
    if input_data is None:
        raise Exception('Bad input data')
    job = get_job_by_name(job_name)
    job_run = job.create_job_run(session, 'STARTED')
    try:
        job.setup()
        job_return_data = job.process(session, input_data)
        job_run.update_status(session, 'SUCCEEDED', output=job_return_data)
    except Exception as e:
        job_run.update_status(session, 'FAILED', exception=e)
        raise e
    finally:
        session.close()
    return job_return_data

# ✅ Good:
def run_processing_job(job_name, input_data_id):
    session = database_manager.get_session()

    input_data = lookup_input_data(session, input_data_id)
    if input_data is None:
        raise Exception('Bad input data')

    job = get_job_by_name(job_name)
    job_run = job.create_job_run(session, 'STARTED')

    try:
        job.setup()
        job_return_data = job.process(session, input_data)
        job_run.update_status(session, 'SUCCEEDED', output=job_return_data)
    except Exception as e:
        job_run.update_status(session, 'FAILED', exception=e)
        raise e
    finally:
        session.close()

    return job_return_data
```

The two are exactly the same code, but because of the addition of 4 empty lines,
the second is significantly easier to parse. This post will create rules for
standardizing and enforcing the use of whitespace in your code.

The Python coding standard pep8 defines a light standard for whitespace [here](https://www.python.org/dev/peps/pep-0008/#blank-lines)
this post is intended to expand and concrete the rules outlined there.

## Guiding Principle

The best metaphor for whitespace in code is the usage of paragraphs in language.
Each line of code is like a sentence and each block of code is like a paragraph.
Whitespace in code can be used in the same way as whitespace in text. A block of
code should have a clear goal, all lines in the block should be steps towards that
goal. If forced you should be able to leave a short comment before any block
describing it's purpose (although you should rarely have to, most code function
should be fairly self-explanatory).

## Rules

In order to cover a majority of cases, these rules will be split into two sections: 

- **What to Separate** this will detail rules for types of code that should always
be separated from each other by a single empty line.
- **What to Combine** this will detail rules for types of code that should alway
 be grouped together (no empty new-lines)

These rules should cover a majority of cases, if ever in doubt, refer back to the
guiding principles.

## What to Separate

These sections of code should always be separated by a single newline.

### Separate: Functions

Functions should always be separated from each other.

```python
# ❌ Bad:
def get_user():
    return user
def get_moths():
    return moths

# ✅ Good:
def get_user():
    return user;

def get_moths():
    return moths
```

### Separate: Imports and Code

The import (or include, or require) section in your code should always be separated
from the remainder of the file.

```python
# ❌ Bad:
import random
def get_random():
    return 4; # Chosen by fair dice roll.
            	# guaranteed to be random

# ✅ Good:
import random

def get_random():
    return 4; # Chosen by fair dice roll.
              # guaranteed to be random
```

### Separate: Setup, Running, Returning

Code can generally be categorized into 3 functionalities: setup, running and returning.
At a minimum each of these should be separated. In this example the setup is getting
a user from the database, the running is setting the new value and saving, and the
returning is returning the user that was just updated:

```python
# ❌ Bad:
def update_user_first_name(user_id, first_name):
    user = get_user(user_id)
    user.first_name = first_name
    user.save()
    return user

# ✅ Good:
def update_user_first_name(user_id, first_name):
    user = get_user(user_id)

    user.first_name = first_name
    user.save()

    return user
```

### Separate: Getting data from different sources

If your code needs to pull information from a variety of different places, the
pulling and validation of data pulled should be separated by source.

```python
# ❌ Bad:
def update_user_address(user_id, address_string):
    user = get_user(user_id)
    if user is None:
        raise RuntimeError('User not found')
    google_place_id = get_google_place_ID(address_string)
    # ... Set user, save, return

# ✅ Good:
def update_user_address(user_id, address_string):
    user = get_user(user_id)
    if user is None:
        raise RuntimeError('User not found')

    google_place_id = get_google_place_ID(address_string)

    # ... Set user, save, return
```

There are likely more rules here, I haven't thought through all the rules yet

## What to Combine

These types of code should always be combined into a single block. Just as it's
important to separate different logical blocks, it's also important to combine
certain blocks together.

### Combine: A variable's "get" with its validation

Getting a variable should always be combined with the validation of that variable.

```python
# ❌ Bad:
def order_alcohol(user_id, drink):
    user = get_user(user_id)

    if user.age < 21:
        raise UnderageException()

    # ... Order Alcohol for user

# ✅ Good:
def order_alcohol(user_id, drink):
    user = get_user(user_id)
    if user.age < 21:
        raise UnderageException()

    # ... Order Alcohol for user
```

### Combine: Call sequences

A series of related function calls should be grouped together to give clarity.

In this example the Bad puts an empty line between everything. This is just as
bad as not using any empty lines at all. The two different sets of calls should
be combined together.

```python
# ❌ Bad:
def create_account(username, password):
    validate_username(username)

    validate_password(password)

    user = User.create({username})

    user.set_password(password)

# ✅ Good:
def create_account(username, password):
    validate_username(username)
    validate_password(password)

    user = User.create({username})
    user.set_password(password)
```

## Thanks

{% include stay_connected.html %}
