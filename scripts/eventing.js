var MSN = MSN || {};
MSN.iDelay = 7000;
MSN.bAsyncRequest = true;
MSN.bIsCallerUpdatesPage = false;
MSN.sUpComingXML = "data/upcoming.xml";
MSN.sTagEvent = "event";
MSN.sTagEvtTitle = "title";
MSN.sTagEvtDesc = "desc";
MSN.sTagEvtWhen = "when";
MSN.sTagEvtWhere = "where";
MSN.sTagEvtChiefGuestsList = "chiefguests";
MSN.sTagEvtGuest = "guest";
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
MSN.fnCreateTicker = function () {
    if (document.location.href.indexOf("/updates.html") > 0) {
        MSN.bIsCallerUpdatesPage = true;
    }
    MSN.ndTicker = document.getElementById("Ticker");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            if (!xhr.responseXML || xhr.responseXML.length) {
                MSN.ndTicker.innerHTML = "No upcoming events.";
                MSN.ndTicker.style.display = "block";
                MSN.ndTicker.style.opacity = 1;
                return;
            }
            var allUpcomingEvents = xhr.responseXML.getElementsByTagName(MSN.sTagEvent);
            for (var i = 0, iLenAllUEvts = allUpcomingEvents.length; i < iLenAllUEvts; i++) {
                var sTitle = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtTitle)[0]),
					sDesc = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtDesc)[0]),
					sWhen = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhen)[0]),
					sWhere = MSN.fnGetNodeValue(allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtWhere)[0]);
                if (!sTitle)
                    sTitle = " ";
                if (!sDesc)
                    sDesc = " ";
                if (!sWhen)
                    sWhen = " ";
                if (!sWhere)
                    sWhere = " ";
                var ndEvtTitle = document.createElement("h2");
                ndEvtTitle.setAttribute('itemprop', 'name');
                ndEvtTitle.innerHTML = sTitle;
                var ndEvtDesc = document.createElement("h3");
                ndEvtDesc.setAttribute('itemprop', 'description');
                ndEvtDesc.innerHTML = sDesc;
                var ndEvtWhenWhere = document.createElement("h3");
                ndEvtWhenWhere.innerHTML = ("on&nbsp;&nbsp;<span itemprop='startDate'>" + sWhen + "</span>&nbsp;&nbsp;at&nbsp;&nbsp;<span itemprop='location' itemscope itemtype='http://schema.org/Place'>" + sWhere + "</span>");
                ndEvtWhenWhere.setAttribute("class", "onat");
                var ndTemp = document.createElement(MSN.sTagToUse);
                ndTemp.setAttribute('itemscope', '');
                ndTemp.setAttribute('itemtype', 'http://schema.org/Event');
                ndTemp.appendChild(ndEvtTitle);
                ndTemp.appendChild(ndEvtWhenWhere);
                var ndAllGuestsGroup = allUpcomingEvents[i].getElementsByTagName(MSN.sTagEvtChiefGuestsList)[0],
                ndAllGuests = ndAllGuestsGroup ? ndAllGuestsGroup.getElementsByTagName(MSN.sTagEvtGuest) : [],
                ndGuestsTitle = document.createElement('h3')
                ndGuestList = document.createElement('ul');
                ndGuestsTitle.innerHTML = "Chief Guests";
                ndGuestsTitle.setAttribute('class', 'gueststitle')
                for (var j = 0, iLenAllGst = ndAllGuests.length; j < iLenAllGst; j++) {
                    var ndGuest = document.createElement('li');
                    var sGuestLinkTo = ndAllGuests[j].getAttribute("linkto");
                    if (sGuestLinkTo && sGuestLinkTo.length) {
                        var ndGuestLinkTo = document.createElement('a');
                        ndGuestLinkTo.setAttribute('href', sGuestLinkTo);
                        ndGuestLinkTo.innerHTML = ndAllGuests[j].textContent;
                        ndGuest.appendChild(ndGuestLinkTo);
                    }
                    else
                        ndGuest.innerHTML = ndAllGuests[j].textContent;
                    ndGuestList.appendChild(ndGuest);
                }
                if (ndAllGuests.length) {
                    ndGuestList.setAttribute('class', 'chiefguest');
                    ndTemp.appendChild(ndGuestsTitle);
                    ndTemp.appendChild(ndGuestList);
                }
                ndTemp.appendChild(ndEvtDesc);
                if (!MSN.bIsCallerUpdatesPage) {
                    MSN.fnHideNode(ndTemp);
                    MSN.ndTicker.firstElementChild.innerHTML += ".";
                }
                MSN.ndEventDivs.push(ndTemp);
                MSN.ndTicker.appendChild(ndTemp);
            }
            MSN.chkTicker = document.getElementById("PauseTicker");
            MSN.ndTicker.style.display = "block";
            MSN.ndTicker.style.opacity = 1;
            if (MSN.ndEventDivs.length > 0) {
                MSN.fnUpdateTicker();
                if (MSN.fnOneTime)
                    MSN.fnOneTime();
                if (!MSN.bIsCallerUpdatesPage) {
                    var ndEvtLinkTo = document.createElement('a');
                    ndEvtLinkTo.setAttribute('href', 'updates.html');
                    ndEvtLinkTo.setAttribute('itemprop', 'url');
                    ndEvtLinkTo.innerHTML = "For more details...";
                    MSN.ndTicker.appendChild(ndEvtLinkTo);
                    MSN.tmrTicker = setInterval(function () { MSN.fnUpdateTicker() }, MSN.iDelay);
                }
            }
            else {
                MSN.chkTicker.disabled = true;
                MSN.ndTicker.innerHTML = "No upcoming events.";
            }
        }
    };
    xhr.open("GET", MSN.sUpComingXML, MSN.bAsyncRequest);
    xhr.send();
};
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
MSN.fnOneTime = function () {
    MSN.ndTicker.setAttribute("class", "");
    if (!MSN.bIsCallerUpdatesPage)
        MSN.ndTicker.firstElementChild.style.display = "none";
    if (MSN.ndEventDivs.length > 1)
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