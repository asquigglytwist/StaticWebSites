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
    xhr.onreadystatechange = function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            if (!xhr.responseXML)// || xhr.responseXML.length)
            {
                return;
            }
            var ndGalRoot = xhr.responseXML.getElementsByTagName(MSN.sTagGallery)[0],
							allGalleryItems = ndGalRoot.children;
            if (allGalleryItems) {
                document.getElementById('LoadingMsg').innerHTML = "Loading Images...  Please wait.  We'll make sure it is worth the wait."
                for (var i = 0; i < allGalleryItems.length; i++) {
                    var ndTemp = document.createElement(MSN.sDOMWrappingTag);
                    ndTemp.innerHTML = allGalleryItems[i].outerHTML;
                    MSN.ndDivImages.appendChild(ndTemp);
                }
            }
            else {
                if (window.DOMParser) {
                    document.getElementById('LoadingMsg').innerHTML = "Loading Images...  Please wait.  We'll make sure it is worth the wait."
                    MSN.sDOMWrappingTag = 'div';
                    var xmlDoc = undefined;
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
                    ndGalRoot = xmlDoc.getElementsByTagName(MSN.sTagGallery)[0], allGalleryItems = ndGalRoot.childNodes;
                    for (var i = 0; i < allGalleryItems.length; i++) {
                        if (Node.ELEMENT_NODE != allGalleryItems[i].nodeType)
                            continue;
                        var ndWrap = document.createElement(MSN.sDOMWrappingTag), ndEvent = document.createElement('div');
                        ndEvent.setAttribute('class', 'event');
                        var ndTitle = ((allGalleryItems[i].getElementsByTagName("h3")[0]).cloneNode(true)), ndDesc = ((allGalleryItems[i].getElementsByTagName("h4")[0]).cloneNode(true)), ndDateAndOrganizer = ((allGalleryItems[i].getElementsByTagName("div")[0]).cloneNode(true)), ndVenue = ((allGalleryItems[i].getElementsByTagName("div")[1]).cloneNode(true));
                        ndTitle.setAttribute('class', 'eventtitle');
                        var ndTitlePara = document.createElement("p");
                        ndTitlePara.appendChild(ndTitle);
                        ndEvent.appendChild(ndTitlePara);
                        ndEvent.appendChild(ndDateAndOrganizer);
                        ndEvent.appendChild(ndVenue);
                        var ndaImages = allGalleryItems[i].getElementsByTagName("img");
                        var ndImgPara = document.createElement("p");
                        for (var j = 0; j < ndaImages.length; j++) {
                            var ndImg = document.createElement("img");
                            ndImg.setAttribute('src', ndaImages[j].getAttribute('src'));
                            ndImg.setAttribute('class', 'thumb');
                            ndImgPara.appendChild(ndImg);
                        }
                        ndEvent.appendChild(ndImgPara);
                        ndEvent.appendChild(ndDesc);
                        MSN.ndDivImages.appendChild(ndEvent);
                    }
                }
            }
            var script = document.createElement('script');
            script.src = "/scripts/gallery_static.js";
            script.onload = function () {
                MSN.fnStaticGallery();
            };
            document.head.appendChild(script);
        }
    };
    xhr.open("GET", MSN.sGalleryXML, MSN.bAsyncRequest);
    xhr.send();
};