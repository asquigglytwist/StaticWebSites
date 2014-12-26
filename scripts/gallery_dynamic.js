// JavaScript Document

var MSN = MSN || {};
MSN.iDelay = 7000;
MSN.bAsyncRequest = true;
MSN.sGalleryXML = undefined;
MSN.sDivImages = "Images";
MSN.sTagGallery = "dyngallery";
MSN.sDOMWrappingTag = "article";
MSN.ndDivImages = undefined;

MSN.fnDynamicGallery = function (sXMLFilePath) {
	MSN.sGalleryXML = (sXMLFilePath ? sXMLFilePath : "data/gallery.xml");
	MSN.ndDivImages = document.getElementById(MSN.sDivImages);
	MSN.fnFetchDynamicXML();
};
MSN.fnFetchDynamicXML = function () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function ()
	{
		if ((xhr.readyState == 4) && (xhr.status == 200))
		{
			if(!xhr.responseXML || xhr.responseXML.length)
			{
				return;
			}
			var ndGalRoot = xhr.responseXML.getElementsByTagName(MSN.sTagGallery)[0],
							allGalleryItems = ndGalRoot.children;
			for(var i = 0; i < allGalleryItems.length; i++)
			{
				var ndTemp = document.createElement(MSN.sDOMWrappingTag);
				ndTemp.innerHTML = allGalleryItems[i].outerHTML;
				//MSN.ndDivImages.innerHTML += allGalleryItems[i].outerHTML;
				MSN.ndDivImages.appendChild(ndTemp);
			}
		}
	}
	xhr.open("GET", MSN.sGalleryXML, MSN.bAsyncRequest);
	xhr.send();
};