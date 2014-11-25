// JavaScript Document
var MSN = MSN || {};
MSN.iDelay = 7000;
MSN.bAsyncRequest = true;
MSN.sUpComingXML = "data/upcoming.xml";
MSN.sTagEvent = "event";
MSN.sTagEvtTitle = "title";
MSN.sTagEvtDesc = "desc";
MSN.sTagEvtWhen = "when";
MSN.sTagEvtWhere = "where";
MSN.sTagToUse = "div";
MSN.ndEventDivs = [];
MSN.iDivIxToShow = 1;
MSN.ndTicker = undefined;
MSN.tmrTicker = undefined;
MSN.getNodeValue = undefined;

MSN.isIE = function () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
MSN.createTicker = function()
{
	var xhr = new XMLHttpRequest();
	var sEvtTxt = "";
	/*if(MSN.isIE())
		MSN.getNodeValue = function(ndNode) { return ndNode.text; };
	else
		MSN.getNodeValue = function(ndNode) { return ndNode.innerHTML; };*/
	MSN.getNodeValue = function(ndNode) { return ndNode.firstChild.nodeValue; };
	xhr.onreadystatechange=function()
	{
		if (xhr.readyState == 4)// && xhr.status == 200)
		{
			MSN.ndTicker = document.getElementById("Ticker");
			//MSN.ndTicker.innerHTML ="";
			var allUpcomingEvents = xhr.responseXML.getElementsByTagName(MSN.sTagEvent);
			for(var i = 0; i < allUpcomingEvents.length; i++)
			{
				var ndEvtTitle = document.createElement("h2");
				ndEvtTitle.innerHTML = MSN.getNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtTitle)[0]);//.innerHTML;
				var ndEvtDesc = document.createElement("h3");
				ndEvtDesc.innerHTML = MSN.getNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtDesc)[0]);//.innerHTML;
				var ndEvtWhenWhere = document.createElement("h3");
				ndEvtWhenWhere.innerHTML = ("on&nbsp;&nbsp;" + MSN.getNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhen)[0])/*.innerHTML*/ +
									  "&nbsp;&nbsp;at&nbsp;&nbsp;" + MSN.getNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhere)[0])/*.innerHTML*/);
				ndEvtWhenWhere.setAttribute("class", "onat");
				var ndTemp = document.createElement(MSN.sTagToUse);
				ndTemp.appendChild(ndEvtTitle);
				ndTemp.appendChild(ndEvtWhenWhere);
				ndTemp.appendChild(ndEvtDesc);
				MSN.hideNode(ndTemp);
				MSN.ndEventDivs.push(ndTemp);
				MSN.ndTicker.firstElementChild.innerHTML += ".";
				MSN.ndTicker.appendChild(ndTemp);
			}
			//MSN.ndTicker.innerHTML = sEvtTxt;
			MSN.ndTicker.style.display = "block";
			MSN.ndTicker.style.opacity = 1;
			if(MSN.ndEventDivs.length > 0)
				MSN.tmrTicker = setInterval(function() { MSN.updateTicker() }, MSN.iDelay);
			else
				MSN.ndTicker.innerHTML = "No upcoming events.";
		}
	}
	xhr.open("GET", MSN.sUpComingXML, MSN.bAsyncRequest);
	xhr.send();
}
MSN.updateTicker = function() {
	MSN.hideNode(MSN.ndTicker);
	if(MSN.oneTime)
		MSN.oneTime();
	if(MSN.ndTicker.style.backgroundImage.length > 0)
		MSN.ndTicker.style.backgroundImage = "none";
	if(MSN.ndTicker.childNodes.length > 0)
	{
		MSN.hideNode(MSN.ndEventDivs[MSN.iDivIxToShow]);;
	}
	MSN.iDivIxToShow++;
	if(MSN.iDivIxToShow > (MSN.ndEventDivs.length - 1))
	{
		MSN.iDivIxToShow = 0;
	}
	MSN.showNode(MSN.ndEventDivs[MSN.iDivIxToShow]);
	MSN.showNode(MSN.ndTicker);
};
MSN.hideNode = function (ndNode) {
	ndNode.style.opacity = 0;
	ndNode.style.height = "0";
};
MSN.showNode = function (ndNode) {
	ndNode.style.opacity = 1;
	ndNode.style.height = "auto";
};
MSN.oneTime = function() {
	MSN.ndTicker.setAttribute("class", "");
	MSN.ndTicker.firstElementChild.style.display = "none";
	MSN.oneTime = undefined;
	/*var style = MSN.ndTicker.currentStyle || window.getComputedStyle(MSN.ndTicker, false);
	style.backgroundImage = "none";*/
};
window.onload = function() {
	MSN.createTicker();
	//setTimeout(MSN.createTicker(), (MSN.iDelay / 4));
};