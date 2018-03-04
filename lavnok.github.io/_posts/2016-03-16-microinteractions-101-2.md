---
layout: post
title: MicroInteractions – 101.2
date: 2016-03-16 15:51
author: Saba
comments: true
category: Web
tags: [CSS, Effects, MicroInteractions, Tips &amp; Tricks, Tutorials]
---
<p><a href="/posts/microinteractions-101-1">(For the previous article in the same series, MicroInteractions – 101.1)</a></p>
<ul>
<li>
<h2>Pull-Siblings Effect</h2>
When hovered on, the element pulls its siblings towards itself.
<code>
{% highlight css linenos %}
ul li {
  padding-right: 10px;
  padding-left: 10px;
  display: inline-block;
}
ul li:hover, ul li:focus {
  padding-left: 1px;
  padding-right: 1px;
}
{% endhighlight %}
</code>
</li>
<li>
<h2>Alternate-Dancing Images Effect</h2>
What would you say when you can have alternating elements of the same type behave almost similar but with a  difference, one subtle enough to let the user distinguish it from its siblings but also let him know its part of the same group?  This code does the trick.  Although I say Images, it can be applied to any HTML element.  This one follows the same trick used in the Zebra striped (CSS based) table rows.
<code>
{% highlight css linenos %}
#Dancer img:nth-child(odd):focus, #Dancer img:nth-child(odd):hover {
  transform: rotate(-20deg);
}
#Dancer img:nth-child(even):focus, #Dancer img:nth-child(even):hover {
  transform: rotate(20deg);
}
{% endhighlight %}
</code>
</li>
</ul>
&nbsp;
For a live demo on <a href="http://codepen.io/lavnok/pen/emdrKP" title="On CodePen" target="_blank">CodePen</a>
&nbsp;
