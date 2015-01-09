// JavaScript Document

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
	MSN.ndFSImage.src = "";
	MSN.ndFSImage.src = MSN.fnGetFullImagePath(ndTemp.getAttribute("src"));//.replace("/thumbs/", "/full/");
	MSN.ndFSImage.style.opacity = 1;
	var iTemp = Number(ndTemp.getAttribute("data-eventid"));
	if(MSN.sAllEventTitles[iTemp].length > 0)
		MSN.ndFSTitle.innerHTML = MSN.sAllEventTitles[iTemp];
	else
		MSN.ndFSTitle.innerHTML = "M.S.Natyalaya";
	MSN.ndFSImage.setAttribute("data-imageid", ndTemp.getAttribute("data-imageid"));
	var sTitle = ndTemp.getAttribute("title");
	if(sTitle && sTitle.length > 0)
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
		//alert('' + evt.keyCode);
		if(evt.keyCode == 27)
		{
			//alert('Escape');
			MSN.fnHideFS();
		}
		else if(evt.keyCode == 37)
		{
			//alert('Left');
			MSN.fnPrevImage();
			bHandled = true;
		}
		else if(evt.keyCode==39)
		{
			//alert('Right');
			MSN.fnNextImage();
			bHandled = true;
		}
		else if(evt.keyCode==38)
		{
			//alert('Up');
			bHandled = true;
		}
		else if(evt.keyCode==40)
		{
			//alert('Down');
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
    for (var i = 0; i < MSN.ndAllEvents.length; i++) {
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

        /*var ndTitle = document.createElement("h3");
        ndTitle.innerHTML = sTitle;
        MSN.ndAllEvents[i].insertBefore(ndTitle, MSN.ndAllEvents[i].firstChild);
		
        var ndTime = document.createElement("span"), ndLoc = document.createElement("span");
        ndTime.innerHTML = sDate;
        ndLoc.innerHTML = sLocation;
        var ndWhenWhere = document.createElement("div");
        ndWhenWhere.innerHTML = "On ";
        ndWhenWhere.appendChild(ndTime);
        ndWhenWhere.innerHTML += " at ";
        ndWhenWhere.appendChild(ndLoc);
        //MSN.ndAllEvents[i].appendChild(ndWhenWhere);
        MSN.ndAllEvents[i].insertBefore(ndWhenWhere, MSN.ndAllEvents[i].firstChild);
        MSN.ndAllEvents[i].insertBefore(ndTitle, MSN.ndAllEvents[i].firstChild);
		
        var ndDesc = document.createElement("h4");
        ndDesc.innerHTML = sDesc;
        MSN.ndAllEvents[i].appendChild(ndDesc);*/

        var tmpAllImgs = MSN.ndAllEvents[i].getElementsByTagName("img");
        for (var j = 0; j < tmpAllImgs.length; j++) {
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
    document.getElementById('LoadingMsg').style.display = "none";
    if (typeof (Worker) !== "undefined") {
        MSN.imgFetcher = new Worker('scripts/imgfetcher.js');
        MSN.imgFetcher.postMessage(sImgPaths);
    }
};
