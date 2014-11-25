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

MSN.createTicker = function()
{
	var xhr = new XMLHttpRequest();
	var sEvtTxt = "";
	xhr.onreadystatechange=function()
	{
		if (xhr.readyState == 4)// && xhr.status == 200)
		{
			MSN.ndTicker = document.getElementById("Ticker");
			MSN.ndTicker.innerHTML ="";
			var allUpcomingEvents = xhr.responseXML.getElementsByTagName(MSN.sTagEvent);
			for(var i = 0; i < allUpcomingEvents.length; i++)
			{
				var ndEvtTitle = document.createElement("h2");
				ndEvtTitle.innerHTML = allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtTitle)[0].innerHTML;
				var ndEvtDesc = document.createElement("h3");
				ndEvtDesc.innerHTML = allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtDesc)[0].innerHTML;
				var ndEvtWhenWhere = document.createElement("h3");
				ndEvtWhenWhere.innerHTML = ("on&nbsp;&nbsp;&nbsp;&nbsp;" + allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhen)[0].innerHTML +
									  "&nbsp;&nbsp;&nbsp;&nbsp;at&nbsp;&nbsp;&nbsp;&nbsp;" + allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhere)[0].innerHTML);
				ndEvtWhenWhere.setAttribute("class", "onat");
				var ndTemp = document.createElement(MSN.sTagToUse);
				ndTemp.appendChild(ndEvtTitle);
				ndTemp.appendChild(ndEvtWhenWhere);
				ndTemp.appendChild(ndEvtDesc);
				MSN.hideNode(ndTemp);
				MSN.ndEventDivs.push(ndTemp);
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
	var ndToHide;
	MSN.hideNode(MSN.ndTicker);
	if(MSN.ndTicker.childNodes.length > 0)
	{
		//MSN.ndTicker.removeChild(MSN.ndEventDivs[MSN.iDivIxToShow]);
		//ndToHide = MSN.ndEventDivs[MSN.iDivIxToShow];
		MSN.hideNode(MSN.ndEventDivs[MSN.iDivIxToShow]);;
	}
	MSN.iDivIxToShow++;
	if(MSN.iDivIxToShow > (MSN.ndEventDivs.length - 1))
	{
		MSN.iDivIxToShow = 0;
	}
	//MSN.ndTicker.appendChild(MSN.ndEventDivs[MSN.iDivIxToShow]);
	//setTimeout(function(){}, 3500);
	MSN.showNode(MSN.ndEventDivs[MSN.iDivIxToShow]);
	MSN.showNode(MSN.ndTicker);
//	if(ndToHide)
//		MSN.hideNode(ndToHide);
};
MSN.hideNode = function (ndNode) {
	ndNode.style.opacity = 0;
	//ndNode.style.display = "none";
	ndNode.style.height = "0";
};
MSN.showNode = function (ndNode) {
	ndNode.style.opacity = 1;
	//ndNode.style.display = "block";
	ndNode.style.height = "auto";
};
window.onload = function() {
	setTimeout(MSN.createTicker(), (MSN.iDelay / 2));
};