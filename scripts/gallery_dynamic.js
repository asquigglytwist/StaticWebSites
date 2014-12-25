// JavaScript Document

var MSN = MSN || {};
MSN.iDelay = 7000;
MSN.bAsyncRequest = true;
MSN.sGalleryXML = "data/gallery.xml";
MSN.sDivImages = "Images";
MSN.sTagGallery = "dyngallery";
MSN.ndDivImages = undefined;

MSN.fnDynamicGallery = function () {
	MSN.ndDivImages = document.getElementById(MSN.sDivImages);
	MSN.fnFetchDynamicXML();
};
MSN.fnFetchDynamicXML = function () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function ()
	{
		if ((xhr.readyState == 4) /*&& (xhr.status == 200)*/)
		{
			if(!xhr.responseXML || xhr.responseXML.length)
			{
				return;
			}
			var ndGalRoot = xhr.responseXML.getElementsByTagName(MSN.sTagGallery)[0],
							allGalleryItems = ndGalRoot.children;
			for(var i = 0; i < allGalleryItems.length; i++)
			{
				var ndTemp = document.createElement('div');
				ndTemp.innerHTML = allGalleryItems[i].outerHTML;
				//MSN.ndDivImages.innerHTML += allGalleryItems[i].outerHTML;
				MSN.ndDivImages.appendChild(ndTemp);
			}
		}
	}
	xhr.open("GET", MSN.sGalleryXML, MSN.bAsyncRequest);
	xhr.send();
};