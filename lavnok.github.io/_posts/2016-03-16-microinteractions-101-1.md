---
layout: post
title: MicroInteractions - 101.1
date: 2016-03-16 14:59
author: Saba
comments: true
category: Web
tags: [CSS, Effects, MicroInteractions, Tips &amp; Tricks, Tutorials]
---
<p>So, <strong>MicroInteractions</strong>, huh?  Been hearing the word but not sure how to get it done?  Everyone starts there.  Micro-Interactions are those minor and subtle changes in the UI or behavior in a Digital Product be it in a website or a desktop or mobile.  These are changes that don't necessarily hog the user's attention but definitely make their experience a better one.  Ones that may even be taken for granted when present but will be sorely missed when not.</p>
<p>Here are a few things we did to get the show on road.  Please continue reading below.</p>
<p>(As a disclaimer, I came up with names for these effects when I was a bit off the charts if you know what I mean.)</p>
<ul>
<li>
<h2>RainWater Effect</h2>
An element that is marked with this class and hovered on, moves down a bit.  Now, when each item under a huge ordered or unordered list has this class and the user continuously scrolls down the list, it gives an appearance of rain water dripping down.
<code>
{% highlight css linenos %}
.fxRainWater {
  margin-top: 3px;
}
.fxRainWater:focus, .fxRainWater:hover {
  margin-top: 8px;
}
{% endhighlight %}
</code>
</li>
<li>
<h2>Gun-Recoil Effect</h2>
An element that is marked with this class and hovered on, gives the impression of a Gun-Recoiling - a fire first, a complete wind-down and then a slow release.
<code>
{% highlight css linenos %}
.fxGunRecoil {
  display: inline-block;
  border-top: 3px solid rgba(255,79,0,1.00);
  padding-right: 5px;
  width: 100%;
}
.fxGunRecoil:focus, .fxGunRecoil:hover {
  padding-right: 15px;
  width: auto;
}
{% endhighlight %}
</code>
</li>
</ul>
&nbsp;
For a live demo on <a href="http://codepen.io/lavnok/pen/WbGJXE" title="On CodePen" target="_blank">CodePen</a>
<p><a href="/posts/microinteractions-101-2">(For the next article in the same series, MicroInteractions – 101.2)</a></p>
&nbsp;
