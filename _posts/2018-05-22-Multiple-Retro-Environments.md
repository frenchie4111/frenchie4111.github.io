---
title: Running Multiple Retro Environments
subject: Using retrowrapper to easily run environments as subprocesses
tags: [ AI/ML, Retro ]
layout: post
---

Due to constraints on Retro, it is not possible to run multiple retro environments
in the same process. This restriction will will cause creating multiple environments
this to raise the following error:

```python
import retro

env1 = retro.make( game='SonicTheHedgehog2-Genesis', state='MetropolisZone.Act1' )
env2 = retro.make( game='SonicTheHedgehog2-Genesis', state='MetropolisZone.Act2' )
```

```error
RuntimeError: Cannot create multiple emulator instances per process
```

Due to this restriction, it can be hard to do parallel joint training of agents.
Thankfully the [retrowrapper](https://github.com/MaxStrange/retrowrapper) project
makes it very easy to run environments as subprocess and interact with them as
if they were a standard gym environment.

Using retrowrapper is easy. First install via pip:

```none
pip install retrowrapper
```

Then simply import and create your environments.

```python
import retrowrapper

env1 = retrowrapper.RetroWrapper(
    game='SonicTheHedgehog2-Genesis',
    state='MetropolisZone.Act1' 
)
env2 = retrowrapper.RetroWrapper( 
    game='SonicTheHedgehog2-Genesis', 
    state='MetropolisZone.Act2' 
)
```

Now you should no longer get the "Cannot create multiple emulator instances per process" 
error.

The retrowrapper library also allows you to specify a custom make function, this is
useful when you want to apply custom wrappers to the environment. It is also useful
during the retro-contest, allowing you to use the retro_contest.local make function
that applies the contest wrappers.

To use retrowrapper with the retro_contest make function you simply need to set 
it before create your environments.

```
import retrowrapper
from retro_contest.local import make

retrowrapper.set_retro_make( make )

env1 = retrowrapper.RetroWrapper(
    game='SonicTheHedgehog2-Genesis',
    state='MetropolisZone.Act1' 
)
env2 = retrowrapper.RetroWrapper( 
    game='SonicTheHedgehog2-Genesis', 
    state='MetropolisZone.Act2' 
)
```

The environments are now created using the retro_contest.local make function.
