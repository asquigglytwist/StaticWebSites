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
			if(!xhr.responseXML)// || xhr.responseXML.length)
			{
				return;
			}
			var ndGalRoot = xhr.responseXML.getElementsByTagName(MSN.sTagGallery)[0],
							allGalleryItems = ndGalRoot.children;
			if(allGalleryItems)
			{
				for(var i = 0; i < allGalleryItems.length; i++)
				{
					var ndTemp = document.createElement(MSN.sDOMWrappingTag);
					ndTemp.innerHTML = allGalleryItems[i].outerHTML;
					MSN.ndDivImages.appendChild(ndTemp);
				}
			}
			else
			{
				if (window.DOMParser)
				{
					var xmlDoc = undefined;
					parser = new DOMParser();
					xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
					ndGalRoot = xmlDoc.getElementsByTagName(MSN.sTagGallery)[0],
					allGalleryItems = ndGalRoot.childNodes;
					for(var i = 0; i < allGalleryItems.length; i++)
					{
						if(Node.ELEMENT_NODE != allGalleryItems[i].nodeType)
							continue;
						var ndTemp = document.createElement(MSN.sDOMWrappingTag);
						var ndTitle = allGalleryItems[i].getElementsByTagName("h3")[0], ndDesc = allGalleryItems[i].getElementsByTagName("h4")[0];
						ndTemp.appendChild(ndTitle.cloneNode(true));
						var ndaImages = allGalleryItems[i].getElementsByTagName("img");
						for(var j = 0; j < ndaImages.length; j++)
						{
							var ndImg = document.createElement("img");
							ndImg.setAttribute('src', ndaImages[j].getAttribute('src'));
							ndTemp.appendChild(ndImg);
						}
						ndTemp.appendChild(ndDesc.cloneNode(true));
						MSN.ndDivImages.appendChild(ndTemp);
					}
				}
			}
		}
	}
	xhr.open("GET", MSN.sGalleryXML, MSN.bAsyncRequest);
	xhr.send();
};