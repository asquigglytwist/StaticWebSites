---
layout: post
title: CSS Based Tables
date: 2016-03-15 13:35
author: Saba
comments: true
category: Web
tags: [CSS, Tables, Tips &amp; Tricks, Tutorials]
---
Tables have been used, misused and abused since the early days of HTML. I'm here to talk about the use of HTML tables to represent data or information that can be tabulated. Not the (ab)use of tables for a website layout. The next best thing to graphical representation of data is the data itself and a tabulated one at that, if I may be so particular about it.
<ul>
	<li>So, to begin with, the first thing to do is to create a container element with its display set to table.
<code>
.container {
display: table;
}
</code></li>
	<li>Under the container, each item can be represented as either a table row or as a table column.
<code>
.row {
display: table-row;
}
</code></li>
	<li>Cells are grouped under a row or column.
<code>
.cell {
display: table-cell;
}
</code></li>
</ul>
This Table based representation is very helpful when you want the adjacent elements (say siblings that are all divs) to be uniformly tall but also be able to grow as much as their content instead of a fixed height value. Table cells grow as tall as their tallest sibling (unless explicitly constrained) but are always of equal size within their container be it a row or a column. Additionally, the always annoying part of vertically aligning content (especially the middle) can as well be done easily inside a table cell.

<strong>Putting it all together</strong>
<ul>
	<li>HTML
<code>
{% highlight html linenos %}
<div class="container">
    <div class="row">
        <div class="cell">1</div>
        <div class="cell">I</div>
        <div class="cell">A</div>
        <div class="cell">a</div>
        <div class="cell">!</div>
    </div>
    <div class="row">
        <div class="cell">2</div>
        <div class="cell">II</div>
        <div class="cell">B</div>
        <div class="cell">b</div>
        <div class="cell">@</div>
    </div>
</div>
{% endhighlight %}
</code></li>
	<li>CSS
<code>
{% highlight css linenos %}
.container {
    display: table;
}
.row {
    display: table-row;
}
.cell {
    display: table-cell;
    vertical-align: middle;
}
{% endhighlight %}
</code></li>
</ul>
That's pretty much a basic setup that even plain HTML tables are capable of achieving. To make the table responsive, a nifty hack that I use is to combine the above CSS code with a media query (the below is only a sample). When the width is too narrow for the entire row of cells to be present within the viewport, I convert them into individual rows. The breaking point in width depends on your content. The example below is only for illustration and does not fully demonstrate the appropriate usage.
<code>
{% highlight css linenos %}
@media only screen and (max-width : 680px) {
    .cell {
        display: table-row;
    }
}
{% endhighlight %}
</code>

For a live demo on <a title="On CodePen" href="http://codepen.io/lavnok/pen/WborBd">CodePen</a>

<strong>References</strong>
<ul>
	<li><a title="W3Schools" href="http://www.w3schools.com/cssref/pr_class_display.asp">W3Schools</a></li>
	<li><a title="VanSeoDesign" href="http://www.vanseodesign.com/blog/demo/vertical-centering/table-cell.php">VanSeoDesign</a></li>
	<li><a title="CSS-Tricks" href="http://css-tricks.com/snippets/css/media-queries-for-standard-devices/">CSS-Tricks</a></li>
</ul>
&nbsp;

Wishing everyone a very Happy New Year 2015.
