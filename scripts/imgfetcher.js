// JavaScript Document

self.addEventListener('message', function(e) {
	var imgpaths = e.data.toString().split(",");
	for(var i = 0; i < imgpaths.length; i++)
	{
		var xhr = new XMLHttpRequest(), sPath = imgpaths[i].trim();
		if(sPath.length > 4)
		{
			xhr.open('GET', imgpaths[i], false);
			xhr.responseType = 'blob';
			xhr.send();
			//var blob = new Blob([xhr.response], {type: 'image/jpeg'});
			//console.log(blob);
		}
	}
}, false);