---
layout: post
title: HTTPS and Online Security - 101
date: 2016-09-22 13:59
author: Saba
comments: true
category: Security
tags: [Security, Online, HTTPS, Tips &amp; Tricks]
---
Just HTTP(S) alone, may have been secure probably 16 years ago; Not anymore.&nbsp;&nbsp;Because:
<ol>
	<li>It is now a technology that is 20+ years old.</li>
	<li>And was officially incorporated as an RFC since 2000 i.e., available world-wide for about 16 years now.</li>
	<li>Majority of the websites have been switching to HTTPS since the 2010 i.e., for about 6 years now.&nbsp;&nbsp;And 6 years is a very very long time in the computer industry, especially for a security technology.</li>
</ol>
Feeling secure yet?<br />
But, not to fear.&nbsp;&nbsp;Knowledge powers security.&nbsp;&nbsp;After all, trust me when I say, you're both the strongest and weakest link in the secure communication channel.

---

<h2>So, what exactly is this?</h2>
[HTTPS](https://en.wikipedia.org/wiki/HTTPS) was originally HTTP over SSL (Secure Socket Layer) and then became HTTP over [TLS (Transport Layer Security)](https://en.wikipedia.org/wiki/Transport_Layer_Security).&nbsp;&nbsp;Meaning, instead of a end-point to end-point secure connection for HTTP communication, the security is enforced at the OS' Network Stack - Transport Layer level.&nbsp;&nbsp;So, Mr. HTTPS here, offers only a minimum level of security.&nbsp;&nbsp;Even with HTTPS, an MITM (a Man In The Middle) is very much possible.

<h2>How do you verify if you're communicating in a secure channel?</h2>
Not to panic yet.&nbsp;&nbsp;You're still in control of your actions.&nbsp;&nbsp;Below is how you can verify if you're communicating in a secure channel.
<ol>
	<li>In your browser, click on the Green PadLock icon in the address bar, just an inch before the address (or URL) you'd typed.</li>
	<li>Click on "More Information" in FF or "Details" in Chrome and "View Certificates" in IE.</li>
	<li>
Once in,
		<ol>
			<li>FF requires an additional step; Click on "View Certificate" button and then go to the "Details" tab (2nd Tab);</li>
			<li>Chrome requires an additional step; Click on "View Certificate" button in the bottom pane (Under Security tab in developer tools);</li>
			<li>In both IE and Chrome, "Details" &amp; "Certification Path" tabs - 2nd &amp; 3rd tabs respectively;</li>
		</ol>
	</li>
	<li>Once you've found the details, check for at-least these fields as a bare minimum check:
		<ol>
			<li>Issuer;</li>
			<li>Issued To (or Subject):&nbsp;&nbsp;This field should correspond to the actual URL displayed in the address bar; If not quit right away.</li>
			<li>Valid From and Valid To:&nbsp;&nbsp;These should be valid date ranges covering your current system date and time.</li>
			<li>Signature Hash and Signature Hash Algorithm:&nbsp;&nbsp;Should be SHA256 or higher.&nbsp;&nbsp;Meaning, if you see a number less than 256, quit right away.</li>
		</ol>
	</li>
</ol>

<h2>What does that mean to me (and you)?</h2>
Now for a serious security de-briefing.
<ol>
	<li>Do not trust anything / anyone.</li>
	<li>Question the authenticity of every page you visit.
		<ol>
			<li>If it seems suspicious, it most likely is;</li>
			<li>If it seems too good to be true, it definitely is.</li>
		</ol>
	</li>
	<li>And the most important rules of thumb,
		<ol>
			<li>There is no free speech and there are no free chocolates.</li>
			<li>The Internet is not an inconsequential toy.</li>
		</ol>
	</li>
	<li>Do not share anything that you think the asker (Website or App or even the salesman at your doorstep) doesn't need.</li>
</ol>

<h2>What is Confidential (or Sensitive) information?</h2>
This list is not an exhaustive one.  These are some of the basic information that I've noticed people share without a second thought and hence my opinion that they're worthy of mention here.
<ol>
	<li>Your Credit and Debit card numbers (I know, right!);</li>
	<li>Name;</li>
	<li>Email &amp; Mobile No.</li>
	<li>Date of Birth, Anniversaries, Spouse or parents' details;</li>
	<li>Public IP address;</li>
	<li>Private IP address;</li>
	<li>Names of your family members;</li>
</ol>