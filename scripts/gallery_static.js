var MSN = MSN || {};
MSN.sGalleryDivID = "Images";
MSN.ndGallery = undefined;
MSN.sEventsClass = ".event";
MSN.ndAllEvents = [];
MSN.sEventTitleAttrib = "data-title";
MSN.sEventDateAttrib = "data-on";
MSN.sEventLocationAttrib = "data-at";
MSN.sEventDescAttrib = "data-desc";
MSN.sAllEventTitles = [];
MSN.sAllEventTimes = [];
MSN.sAllEventLocations = [];
MSN.ndAllImgs = [];
MSN.sFullScreenDivID = "FullScreen";
MSN.ndFullScreen = undefined;
MSN.sFSImgID = "FSImage";
MSN.ndFSImage = undefined;
MSN.sFSTitleID = "FSTitle";
MSN.ndFSTitle = undefined;
MSN.sFSCaptionID = "FSCaption";
MSN.ndFSCaption = undefined;
MSN.sFSHUDID = "FSHUD";
MSN.sHUDCount = "0/0";
MSN.ndFSHUD = undefined;

MSN.fnSleep = function (iMilliSec) {
	var msUntil = (new Date().getTime() + iMilliSec);
	while(new Date().getTime() < msUntil){ /* do nothing */ }
};
MSN.fnFullScreen = function () {
	if(MSN.ndFullScreen && MSN.ndFSImage)
	{
		MSN.fnLoadImage(this);
		MSN.ndFullScreen.style.display = "block";
	}
};
MSN.fnGetFullImagePath = function (sPath) {
	return sPath.replace("/thumbs/", "/full/");
};
MSN.fnLoadImage = function (ndTemp) {
    MSN.ndFSImage.style.opacity = 0;
    MSN.ndFSImage.src = MSN.fnGetFullImagePath(ndTemp.getAttribute("src"));
    MSN.ndFSImage.style.opacity = 1;
    var iTemp = Number(ndTemp.getAttribute("data-eventid"));
    if (MSN.sAllEventTitles[iTemp].length > 0)
        MSN.ndFSTitle.innerHTML = MSN.sAllEventTitles[iTemp];
    else
        MSN.ndFSTitle.innerHTML = "M.S.Natyalaya";
    MSN.ndFSImage.setAttribute("data-imageid", ndTemp.getAttribute("data-imageid"));
    MSN.ndFSHUD.innerHTML = ((window.parseInt(ndTemp.getAttribute("data-imageid")) + 1) + MSN.sHUDCount);
    var sTitle = ndTemp.getAttribute("title");
    if (sTitle && sTitle.length > 0)
        MSN.ndFSCaption.innerHTML = sTitle;
    else
        MSN.ndFSCaption.innerHTML = "";
};
MSN.fnHideFS = function () {
	if(MSN.ndFullScreen)
	{
		MSN.ndFullScreen.style.display = "none";
	}
};
MSN.fnPrevImage = function () {
	var ixPrev = Number(MSN.ndFSImage.getAttribute("data-imageid")) - 1;
	if(ixPrev > -1)
		MSN.fnLoadImage(MSN.ndAllImgs[ixPrev]);
};
MSN.fnNextImage = function () {
	var ixNext = Number(MSN.ndFSImage.getAttribute("data-imageid")) + 1;
	if(ixNext < MSN.ndAllImgs.length)
		MSN.fnLoadImage(MSN.ndAllImgs[ixNext]);
};
MSN.fnFSKeyUp = function (evt) {
	var bHandled = false;
	if(MSN.ndFullScreen && ("block" == MSN.ndFullScreen.style.display))
	{
		if(evt.keyCode == 27)
		{
			MSN.fnHideFS();
		}
		else if(evt.keyCode == 37)
		{
			MSN.fnPrevImage();
			bHandled = true;
		}
		else if(evt.keyCode==39)
		{
			MSN.fnNextImage();
			bHandled = true;
		}
		else if(evt.keyCode==38)
		{
			bHandled = true;
		}
		else if(evt.keyCode==40)
		{
			bHandled = true;
		}
	}
	if(bHandled)
	{
		evt.preventDefault();
	}
};
MSN.fnStaticGallery = function () {
    MSN.ndGallery = document.getElementById(MSN.sGalleryDivID);
    MSN.ndAllEvents = MSN.ndGallery.querySelectorAll(MSN.sEventsClass);
    var sImgPaths = "";
    for (var i = 0, iLenAllEvts = MSN.ndAllEvents.length; i < iLenAllEvts; i++) {
        var sTitle = MSN.ndAllEvents[i].getAttribute(MSN.sEventTitleAttrib),
			sDate = MSN.ndAllEvents[i].getAttribute(MSN.sEventDateAttrib),
			sLocation = MSN.ndAllEvents[i].getAttribute(MSN.sEventLocationAttrib),
			sDesc = MSN.ndAllEvents[i].getAttribute(MSN.sEventDescAttrib);
        if (!sTitle) {
            sTitle = MSN.ndAllEvents[i].getElementsByTagName('h3')[0].textContent;
        }
        if (!sDate) {
            sDate = ((MSN.ndAllEvents[i].getElementsByTagName('div')[0]).getElementsByTagName('span')[0]).textContent;
        }
        if (!sLocation) {
            sLocation = ((MSN.ndAllEvents[i].getElementsByTagName('div')[1]).getElementsByTagName('span')[0]).textContent;
        }
        if (!sDesc) {
            sDesc = MSN.ndAllEvents[i].getElementsByTagName('h4')[0].innerHTML;
        }
        MSN.sAllEventTitles.push(sTitle);
        MSN.sAllEventTimes.push(sDate);
        MSN.sAllEventLocations.push(sLocation);

        var tmpAllImgs = MSN.ndAllEvents[i].getElementsByTagName("img");
        for (var j = 0, iLenAllImgs = tmpAllImgs.length; j < iLenAllImgs; j++) {
            tmpAllImgs[j].setAttribute("data-eventid", i.toString());
            tmpAllImgs[j].setAttribute("data-imageid", MSN.ndAllImgs.length.toString());
            tmpAllImgs[j].onclick = MSN.fnFullScreen;
            tmpAllImgs[j].src = tmpAllImgs[j].src ? tmpAllImgs[j].src : tmpAllImgs[j].getAttribute('src');
            sImgPaths += ((MSN.fnGetFullImagePath(tmpAllImgs[j].src)) + ",");
            MSN.ndAllImgs.push(tmpAllImgs[j]);
        }
    }
    MSN.ndFullScreen = document.getElementById(MSN.sFullScreenDivID);
    MSN.ndFSImage = document.getElementById(MSN.sFSImgID);
    MSN.ndFSTitle = document.getElementById(MSN.sFSTitleID);
    MSN.ndFSCaption = document.getElementById(MSN.sFSCaptionID);
    MSN.ndFSHUD = document.getElementById(MSN.sFSHUDID);
    MSN.sHUDCount = (" / " + MSN.ndAllImgs.length);
    if(document.getElementById('LoadingMsg'))
        document.getElementById('LoadingMsg').style.display = "none";
    if (typeof (Worker) !== "undefined") {
        MSN.imgFetcher = new Worker('scripts/imgfetcher.js');
        MSN.imgFetcher.postMessage(sImgPaths);
    }
};
