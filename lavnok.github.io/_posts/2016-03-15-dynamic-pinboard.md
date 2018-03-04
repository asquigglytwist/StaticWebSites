---
layout: post
title: Dynamic PinBoard
date: 2016-03-15 12:52
author: Saba
comments: true
category: Web
tags: [Dynamic Content, AJAX, Tutorials]
---
We've all wanted a webpage with dynamic content but doesn't come at the cost of a server side pre-processing or at the risk of breaking the page.  In this post, I'm going to update you on a little control that I'd created myself and used it in a live site as well.  The basic steps are:
<ul>
	<li>Create a Container (where the dynamic data will be displayed);</li>
	<li>Save the dynamic data to a known location;</li>
	<li>Make a request and wait for the response;</li>
	<li>Once the response is available (optionally, convert it to your desired format) and display it.</li>
</ul>
Yup! It's that simple. Now, on to the code:
Here, I've taken up the task to create a BillBoard that dynamically updates the page with a list of upcoming-events (displayed one at a time).
<ul>
<li>
HTML
<code>
{% highlight html linenos %}
<div id="BillBoard">
<div id="UpComingEvents" aria-live="assertive">
<div id="TickerControls">
<input type="checkbox" id="PauseTicker" onchange="fnOnTickerToggled();" disabled />
<label for="PauseTicker"></label>
</div>
<h1>Announcements / Upcoming Event(s)</h1>
<div id="Ticker" class="loadinganim">
<p>Looking up dynamic information, please wait...</p>
</div>
</div>
</div>
{% endhighlight %}
</code>
</li>
<li>
JS
<code>
Declarations:

{% highlight js linenos %}
var Lavnok = Lavnok || {};
Lavnok.iDelay = 7000;
Lavnok.bAsyncRequest = true;
Lavnok.bIsCallerUpdatesPage = false;
Lavnok.sUpComingXML = "data/upcoming.xml";
Lavnok.sTagEvent = "event";
Lavnok.sTagEvtTitle = "title";
Lavnok.sTagEvtDesc = "desc";
Lavnok.sTagEvtWhen = "when";
Lavnok.sTagEvtWhere = "where";
Lavnok.sTagEvtChiefGuestsList = "chiefguests";
Lavnok.sTagEvtGuest = "guest";
Lavnok.sTagToUse = "div";
Lavnok.ndEventDivs = [];
Lavnok.iDivIxToShow = 0;
Lavnok.ndTicker = undefined;
Lavnok.tmrTicker = undefined;
Lavnok.chkTicker = undefined;
Lavnok.fnGetNodeValue = undefined;

{% endhighlight %}

Utility Functions:
{% highlight js linenos %}
Lavnok.fnIsIE = function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
Lavnok.fnGetNodeValue = function(ndNode) {
    return ndNode.firstChild.nodeValue;
};
Lavnok.fnUpdateTicker = function() {
    Lavnok.fnHideNode(Lavnok.ndTicker);
    if (Lavnok.ndTicker.style.backgroundImage.length > 0)
        Lavnok.ndTicker.style.backgroundImage = "none";
    if (Lavnok.ndTicker.childNodes.length > 0) {
        Lavnok.fnHideNode(Lavnok.ndEventDivs[Lavnok.iDivIxToShow]);;
    }
    Lavnok.iDivIxToShow++;
    if (Lavnok.iDivIxToShow > (Lavnok.ndEventDivs.length - 1)) {
        Lavnok.iDivIxToShow = 0;
    }
    Lavnok.fnShowNode(Lavnok.ndEventDivs[Lavnok.iDivIxToShow]);
    Lavnok.fnShowNode(Lavnok.ndTicker);
};
Lavnok.fnHideNode = function(ndNode) {
    ndNode.style.opacity = 0;
    ndNode.style.height = "0";
};
Lavnok.fnShowNode = function(ndNode) {
    ndNode.style.opacity = 1;
    ndNode.style.height = "auto";
};
Lavnok.fnOneTime = function() {
    Lavnok.ndTicker.setAttribute("class", "");
    if (!Lavnok.bIsCallerUpdatesPage) {
        Lavnok.ndTicker.firstElementChild.style.display = "none";
        if (Lavnok.ndEventDivs.length > 1)
            Lavnok.chkTicker.disabled = false;
    }
    Lavnok.fnOneTime = undefined;
};
Lavnok.fnOnTickerToggled = function() {
    if (Lavnok.chkTicker.checked) {
        clearInterval(Lavnok.tmrTicker);
    } else {
        Lavnok.tmrTicker = setInterval(function() {
            Lavnok.fnUpdateTicker()
        }, Lavnok.iDelay);
    }
};
{% endhighlight %}

Main Functions:
{% highlight js linenos %}
Lavnok.fnCreateTicker = function() {
        if (document.location.href.indexOf("/updates.html") > 0) {
            Lavnok.bIsCallerUpdatesPage = true;
        }
        Lavnok.ndTicker = document.getElementById("Ticker");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
                if ((xhr.readyState == 4) & amp; & amp;
                    (xhr.status == 200)) {
                    if (!xhr.responseXML || xhr.responseXML.length) {
                        Lavnok.ndTicker.innerHTML = "No upcoming events.";
                        Lavnok.ndTicker.style.display = "block";
                        Lavnok.ndTicker.style.opacity = 1;
                        return;
                    }
                    var ndThisBody = document.body;
                    var allUpcomingEvents = xhr.responseXML.getElementsByTagName(Lavnok.sTagEvent);
                    for (var i = 0, iLenAllUEvts = allUpcomingEvents.length; i < iLenAllUEvts; i++) {
                        var sTitle = Lavnok.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(Lavnok.sTagEvtTitle)[0]),
                            sDesc = Lavnok.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(Lavnok.sTagEvtDesc)[0]),
                            sWhen = Lavnok.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(Lavnok.sTagEvtWhen)[0]),
                            sWhere = Lavnok.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(Lavnok.sTagEvtWhere)[0]);
                        if (!sTitle)
                            sTitle = & quot; & quot;;
                        if (!sDesc)
                            sDesc = & quot; & quot;;
                        if (!sWhen)
                            sWhen = & quot; & quot;;
                        if (!sWhere)
                            sWhere = & quot; & quot;;
                        var ndEvtTitle = document.createElement( & quot; h2 & quot;);
                        ndEvtTitle.setAttribute( & #039;itemprop&# 039;, & #039;name&# 039;);
                        ndEvtTitle.innerHTML = sTitle;
                        var ndEvtDesc = document.createElement( & quot; h3 & quot;);
                        ndEvtDesc.setAttribute( & #039;itemprop&# 039;, & #039;description&# 039;);
                        ndEvtDesc.innerHTML = sDesc;
                        var ndEvtWhenWhere = document.createElement( & quot; h3 & quot;);
                        ndEvtWhenWhere.innerHTML = ( & quot; on & nbsp; & nbsp; < span > " + sWhen + " < /span>&nbsp;&nbsp;at&nbsp;&nbsp;<span>" + sWhere + "</span > ");
                            ndEvtWhenWhere.setAttribute("class", "onat");
                            var ndTemp = document.createElement(Lavnok.sTagToUse); ndTemp.setAttribute('itemscope', ''); ndTemp.setAttribute('itemtype', 'http://schema.org/Event'); ndTemp.appendChild(ndEvtTitle); ndTemp.appendChild(ndEvtWhenWhere);
                            var ndAllGuestsGroup = allUpcomingEvents[i].getElementsByTagName(Lavnok.sTagEvtChiefGuestsList)[0],
                                ndAllGuests = ndAllGuestsGroup ? ndAllGuestsGroup.getElementsByTagName(Lavnok.sTagEvtGuest) : [],
                                ndGuestsTitle = document.createElement('h3')
                            ndGuestList = document.createElement('ul'); ndGuestsTitle.innerHTML = "Chief Guests"; ndGuestsTitle.setAttribute('class', 'gueststitle') for (var j = 0, iLenAllGst = ndAllGuests.length; j 0) {
                                Lavnok.fnUpdateTicker();
                                if (Lavnok.fnOneTime)
                                    Lavnok.fnOneTime();
                                if (!Lavnok.bIsCallerUpdatesPage) {
                                    var ndEvtLinkTo = document.createElement('a');
                                    ndEvtLinkTo.setAttribute('href', 'updates.html');
                                    ndEvtLinkTo.setAttribute('itemprop', 'url');
                                    ndEvtLinkTo.innerHTML = "For more details...";
                                    Lavnok.ndTicker.appendChild(ndEvtLinkTo);
                                    Lavnok.tmrTicker = setInterval(function() {
                                        Lavnok.fnUpdateTicker()
                                    }, Lavnok.iDelay);
                                }
                            } else {
                                Lavnok.chkTicker.disabled = true;
                                Lavnok.ndTicker.innerHTML = "No upcoming events.";
                            }
                        }
                    };
                    xhr.open("GET", Lavnok.sUpComingXML, Lavnok.bAsyncRequest);
                    xhr.send();
                };
                window.onload = function() {
                    try {
                        Lavnok.fnCreateTicker();
                    } catch (ex) {
                        Lavnok.ndTicker.innerHTML = "No upcoming events.";
                        Lavnok.ndTicker.style.display = "block";
                        Lavnok.ndTicker.style.opacity = 1;
                    }
                };
{% endhighlight %}
</code>
</li>
<li>XML
<code>
{% highlight xml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<upcomingevents>
<event>
<title>Sample Event 2015</title>
<desc>
Describe it as best as you want to. I'm leaving this task to you.
</desc>
<chiefguests>
<guest linkto="/">Guest 1</guest>
<guest linkto="https://www.google.com/">Google, And a lengthy address here...</guest>
</chiefguests>
<when>February 31, 2015</when>
<where>Somewhere on this planet, but not sure where.</where>
</event>
</upcomingevents>
{% endhighlight %}
</code>
</li>
<li>
CSS
<code>
Styling (optional)...
</code>
</li>
</ul>

For a live demo on <a title="On CodePen" href="http://codepen.io/lavnok/pen/vEevLG">CodePen</a>
