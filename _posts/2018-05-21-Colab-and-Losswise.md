---
title: Google Colab + Losswise
subject: Using Losswise as a replacement for Tensorboard on Colab
post_image: /images/losswise/colab-icon.png
tags: [ AI/ML, Colab ]
layout: post
---

#### Google Colab

I’ve been using [Google Colab](http://colab.research.google.com/) for a while now, 
if you haven’t checked it out I suggest doing so. It is a great way to run python 
notebooks in the cloud, it supports google docs style interactive sharing, and 
Google even gives you free shared time on a Nvidia K80 GPU for training (at least
as of May 2018). I use it whenever I need to train models and don’t want to throw
money at the problem Recently I used it for my [Sonic Collision Mapping]({% post_url 2018-05-20-Retro-OpenAI-Collision-Map %}) 
project.

#### Losswise

Although colab is great, one of the major downsides is that since you don’t have
direct server access, you can’t easily use Tensorboard to monitor & plot training
performance. This is where Losswise comes in. 

{: .center}
![Losswise Logo](/images/losswise/logo.svg){: style="background-color: black; padding: 10px;"}

![Losswise Screenshot](/images/losswise/screenshot.png)

Losswise is an easy to use external service that allows you to track model performance
in real time. By installing and setting up the losswise package, you can easily 
track your model's training perfomance on the with the losswise dashboard.

Using losswise is pretty straightforward, the only gotcha is that if you are sharing 
a model you probably don’t want your private Losswise API key saved in the notebook. 
Instead of hardcoding your Losswise token, it is better to use the python getpass 
module to accept it as a secret password field.

<pre><code>import getpass
import losswise

losswise.set_api_key(getpass.getpass(‘Enter your losswise API Token '))</code></pre>

After that it’s easy to integrate Losswise into your workflow. For my [Sonic Collision Map]({% post_url 2018-05-20-Retro-OpenAI-Collision-Map %})
project I used Keras, so integrating with Losswise was as simple as using their
Keras callback module:

<pre><code># In imports section
from losswise.libs import LosswiseKerasCallback

# In training section
history = model.fit_generator(
    # other arguments    
    callbacks=[
        LosswiseKerasCallback(),
        # other callbacks
    ]
)</code></pre>

Even if you are not using Keras, it's still very easy to use Losswise. If you are
interested I suggest checking out their great [documentation](https://docs.losswise.com/#introduction).

I have also created an [example Colab Notebook](https://colab.research.google.com/drive/1mAZKD2mZ_xOtXLZo_ECoHV4v-wJIeeZJ#scrollTo=KqpRKHZCqevL) 
so you can see it all in action
