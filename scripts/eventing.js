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
MSN.iDivIxToShow = 0;
MSN.ndTicker = undefined;
MSN.tmrTicker = undefined;
MSN.chkTicker = undefined;
MSN.fnGetNodeValue = undefined;

MSN.fnIsIE = function () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
MSN.fnGetNodeValue = function(ndNode) {
	return ndNode.firstChild.nodeValue;
};
MSN.fnCreateTicker = function()
{
	MSN.ndTicker = document.getElementById("Ticker");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function()
	{
		if ((xhr.readyState == 4) && (xhr.status == 200))
		{
			if(!xhr.responseXML || xhr.responseXML.length)
			{
				MSN.ndTicker.innerHTML = "No upcoming events.";
				MSN.ndTicker.style.display = "block";
				MSN.ndTicker.style.opacity = 1;
				return;
			}
			var allUpcomingEvents = xhr.responseXML.getElementsByTagName(MSN.sTagEvent);
			for(var i = 0; i < allUpcomingEvents.length; i++)
			{
				var sTitle = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtTitle)[0]),
					sDesc = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtDesc)[0]),
					sWhen = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhen)[0]),
					sWhere = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhere)[0]);
				if(!sTitle)
					sTitle = " ";
				if(!sDesc)
					sDesc = " ";
				if(!sWhen)
					sWhen = " ";
				if(!sWhere)
					sWhere = " ";
				var ndEvtTitle = document.createElement("h2");
				ndEvtTitle.innerHTML = sTitle;
				var ndEvtDesc = document.createElement("h3");
				ndEvtDesc.innerHTML = sDesc;
				var ndEvtWhenWhere = document.createElement("h3");
				ndEvtWhenWhere.innerHTML = ("on&nbsp;&nbsp;" + sWhen + "&nbsp;&nbsp;at&nbsp;&nbsp;" + sWhere);
				ndEvtWhenWhere.setAttribute("class", "onat");
				var ndTemp = document.createElement(MSN.sTagToUse);
				ndTemp.appendChild(ndEvtTitle);
				ndTemp.appendChild(ndEvtWhenWhere);
				ndTemp.appendChild(ndEvtDesc);
				MSN.fnHideNode(ndTemp);
				MSN.ndEventDivs.push(ndTemp);
				MSN.ndTicker.firstElementChild.innerHTML += ".";
				MSN.ndTicker.appendChild(ndTemp);
			}
			MSN.chkTicker = document.getElementById("PauseTicker");
			MSN.ndTicker.style.display = "block";
			MSN.ndTicker.style.opacity = 1;
			if(MSN.ndEventDivs.length > 0)
			{
				MSN.fnUpdateTicker();
				if(MSN.ndEventDivs.length == 1)
				{
					MSN.chkTicker.disabled = true;
				}
				else
				{
					if(MSN.fnOneTime)
						MSN.fnOneTime();
					MSN.tmrTicker = setInterval(function() { MSN.fnUpdateTicker() }, MSN.iDelay);
				}
			}
			else
			{
				MSN.chkTicker.disabled = true;
				MSN.ndTicker.innerHTML = "No upcoming events.";
			}
		}
	}
	xhr.open("GET", MSN.sUpComingXML, MSN.bAsyncRequest);
	xhr.send();
}
MSN.fnUpdateTicker = function() {
	MSN.fnHideNode(MSN.ndTicker);
	if(MSN.ndTicker.style.backgroundImage.length > 0)
		MSN.ndTicker.style.backgroundImage = "none";
	if(MSN.ndTicker.childNodes.length > 0)
	{
		MSN.fnHideNode(MSN.ndEventDivs[MSN.iDivIxToShow]);;
	}
	MSN.iDivIxToShow++;
	if(MSN.iDivIxToShow > (MSN.ndEventDivs.length - 1))
	{
		MSN.iDivIxToShow = 0;
	}
	MSN.fnShowNode(MSN.ndEventDivs[MSN.iDivIxToShow]);
	MSN.fnShowNode(MSN.ndTicker);
};
MSN.fnHideNode = function (ndNode) {
	ndNode.style.opacity = 0;
	ndNode.style.height = "0";
};
MSN.fnShowNode = function (ndNode) {
	ndNode.style.opacity = 1;
	ndNode.style.height = "auto";
};
MSN.fnOneTime = function() {
	MSN.ndTicker.setAttribute("class", "");
	MSN.ndTicker.firstElementChild.style.display = "none";
	if(MSN.ndEventDivs.length > 0)
		MSN.chkTicker.disabled = false;
	MSN.fnOneTime = undefined;
};
MSN.fnOnTickerToggled = function () {
	if(MSN.chkTicker.checked)
	{
		clearInterval(MSN.tmrTicker);
	}
	else
	{
		MSN.tmrTicker = setInterval(function() { MSN.fnUpdateTicker() }, MSN.iDelay);
	}
};
window.onload = function() {
	try
	{
		MSN.fnCreateTicker();
	}
	catch(ex)
	{
		MSN.ndTicker.innerHTML = "No upcoming events.";
		MSN.ndTicker.style.display = "block";
		MSN.ndTicker.style.opacity = 1;
	}
};