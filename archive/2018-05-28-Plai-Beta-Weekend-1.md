---
title: PlAI Beta Event
subject:
tags: Projects AI/ML
layout: post_plain
---

# Plai Beta Event

Plai is hosting the first

## What is PlAI



## Cool, how do I compete?

First install the plai library

```bash
pip install -U git+git://github.com/frenchie4111/plai
```

Then create your agent and connect!

{: #expand_random .expand_facet .expand}
Click to expand **random_agent.py**

{: #random .expand_block}
```python 
# Example random agent
from plai import RemoteEnv

env = RemoteEnv( 'sample_api_key' )

obs = env.reset() # Wait for game to start

while True:
    obs, rew, done, info = env.step( env.action_space.sample() )

    if done:
        if rew == 1:
            print( 'I won!' )
        elif rew == -1:
            print( 'I lost!' )
        obs = env.reset() # Wait for next game to start
```
