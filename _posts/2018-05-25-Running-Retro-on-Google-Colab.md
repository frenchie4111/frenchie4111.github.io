---
title: Retro on Colab
subject: Using Google Colab to run OpenAI's Gym Retro
post_image: /images/losswise/colab-icon.png
tags: [ AI/ML, Colab, Retro ]
layout: post
---

#### Google Colab

I have previously [written]({% post_url 2018-05-21-Colab-and-Losswise %}) about [Google Colab](http://colab.research.google.com/), but if you don't
know about it yet: Google Colab is a Jupyter Notebook hosting and colaboration platform provided by 
Google. It supports Google Docs style interactive sharing, and they provide free shared access to a Nvidia
K80 GPU. This makes it an excelent choice for Machine Learning Practitioners on a budget. If you haven't
checked it out I highly suggest doing so.

#### Gym Retro

OpenAI recently released [Gym Retro](https://blog.openai.com/gym-retro/): a platform that allows you to play
over 1,000 games on several different emulators. This allows you to easily test RL Agents accross a wide
variaty of games. The biggest problem with RL is the intense amount of compute required to create meaninful
agent. This is where Google Colabs free K80 use comes in.

![Gym Retro](/images/retro_colab/heavy_tile.png)

#### Google Colab + OpenAI Gym Retro

There are a few steps to get started running retro on Google Colab. The code blocks
below are intended to be run in their own jupyter notebook cells.

I have created a [public Colab notebook](https://drive.google.com/file/d/11Mxg30mXEvhk8jB0iJ-cFw1k0wICkf8e/view?usp=sharing) 
that follows along with these steps. Feel free to clone and play around with it.

##### Step 1: Install the required dependencies

Colab allows you to run shell commands by prepending them with a `!`. This allows you to
install the required dependencies and packages through `apt-get` and `pip`. 

First install some `apt-get` packages that you need to install and run retro.

```bash
!apt-get install pkg-config lua5.1 build-essential libav-tools git
```

Then install `gym-retro` and some other useful pip dependencies. The second line is installing
my personal AI/ML monorepo `dumbrain` which has some useful tools for running gym-retro.

```bash
!pip install tqdm retrowrapper gym-retro
!pip install -U git+git://github.com/frenchie4111/dumbrain.git
```

##### Step 2: Install your games

The trickiest part of getting Colab running is getting the games installed for the emulator. In my
`dumbrain` package I have created two different ways to install games. If you wish to use pre-installed
retro games, then feel free to skip this step.

The first way is to use colab's built in file upload tool.

```python
from dumbrain.rl.retro_contest.install_games import colabInstallGames
colabInstallGames()
```

![Upload game zip](/images/retro_colab/upload.png)

This should allow you to upload and install games via a zip-file.

The second way is to download the rom zipfile from a server. I use this to download my roms from
my personal fileserver. (If you don't own the games, please don't download them from my server)

```bash
!python -m dumbrain.rl.retro_contest.install_games http://aiml.mikelyons.org/datasets/sonic/Sonic%20Roms.zip 
```

This will download the zipfile at that url and install any roms found in the package.

Once the games are installed you should be able to list them using:

```python
import retro
retro.list_games()
```

This list should now include your installed games.

##### Step 3: Create an env using retrowrapper

Now that we have our games installed we can create a environment that runs the game. I suggest
using the retrowrapper package to create your environments. This stops you from getting errors
due to accidentally creating multiple environments in the same process.

```python
import retrowrapper

env = retrowrapper.RetroWrapper(
    game='SonicTheHedgehog2-Genesis',
    state='MetropolisZone.Act1' 
)
```

For more information about retrowrapper, see my post about [using RetroWrapper to run multiple retro environments]({% post_url 2018-05-22-Multiple-Retro-Environments %})

##### Step 4: Play the game

Once you have your env you can begin stepping through your environment as usual. If you want
to visualize the game you can use plt.imshow.

```python
%matplotlib inline
import retrowrapper
import matplotlib.pyplot as plt

observation = env.reset()
for i in range( 100 ): # Take random actions for 100 steps
    random_action = env.action_space.sample()
    observation, reward, done, info = env.step( random_action )
    if done: # If the env is done make sure you reset it
        observation = env.reset()

plt.imshow( observation )
```

{: .center}
![Plt Imshow Output](/images/retro_colab/imshow.png)

#### What Next?

Now that you have retro running you can begin to play around with the current state of the art
reinforcement learning algorithms. I suggest taking a look at the [retro-baselines](https://github.com/openai/retro-baselines) provided by
OpenAI.

If you are competing in the [OpenAI contest](https://contest.openai.com) consider reading my
post about using [retrowrapper]({% post_url 2018-05-22-Multiple-Retro-Environments %}) with custom
make functions.

If you are training a model, and want graphical outuput, take a look at my post about [Colab + Losswise]({% post_url 2018-05-21-Colab-and-Losswise %}). 
Losswise is a great (and free!) platform for visualizing your model's training.
