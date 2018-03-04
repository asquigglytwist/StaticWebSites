self.addEventListener('message', function(e) {
	var imgpaths = e.data.toString().split(",");
	for(var i = 0, iLenAllImgPaths = imgpaths.length; i < iLenAllImgPaths; i++)
	{
		var xhr = new XMLHttpRequest(), sPath = imgpaths[i].trim();
		if(sPath.length > 4)
		{
			xhr.open('GET', imgpaths[i], false);
			xhr.responseType = 'blob';
			xhr.send();
		}
	}
}, false);