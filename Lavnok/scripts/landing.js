var L = L || {};

L.sBlogURL = undefined;
L.sFeedURL = undefined;
L.asKnownOrgNames = ["google", "Lavnok", "microsoft", "yahoo", "bing", "github"];
// L.asKnownProfanity = ["fuck", "suck", "shit",
                      // "slut", "bitch", "whore", "asshole",
                      // "porn", "porno", "pornography"];

/*
GitHub Activity
*/
L.fnGitHubActivity = function (sUserName, iNumReposToList, sDOMEltId) {
    if ((!sUserName) || (!sUserName.trim().length))
        sUserName = 'ASquigglyTwist';
    if ((!iNumReposToList) || (iNumReposToList < 1))
        iNumReposToList = 2;
    if ((!sDOMEltId) || (!sDOMEltId.trim().length))
        sDOMEltId = 'GHActivity';
    var xhr = new XMLHttpRequest(), ndGHActivity = document.getElementById(sDOMEltId);
    xhr.onreadystatechange = function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            var data = JSON.parse(xhr.response), ndRepos = [];
            data.sort(function (a, b) { return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(); });
            for (var i = 0; (i < iNumReposToList && i < data.length); i++) {
                ndGHActivity.innerHTML += '<p class=\"leftIndent\"><a href=\"' + data[i].html_url + '\">' + data[i].name + ' - ' + data[i].description + '</a></p><p class=\"leftIndent\">Last Updated:&nbsp;&nbsp;' + data[i].pushed_at + '</p>';
            }
        }
    };
    xhr.open("GET", "https://api.github.com/users/" + sUserName + "/repos", true);
    xhr.send();
};

// /*
// WordPress feeds
// */
// L.fnFetchLatestPosts = function (sUrl, sFeedUrl) {
    // if ((!sUrl) || (!sUrl.trim().length))
        // L.sBlogURL = 'https://lavnok.wordpress.com';
    // else
        // L.sBlogURL = sUrl;
    // if ((!sFeedUrl) || (!sFeedUrl.trim().length))
        // L.sFeedURL = '/feed/atom/';
    // else
        // L.sFeedURL = sFeedUrl;
    // google.load("feeds", "1");
    // google.setOnLoadCallback(L.fnProcessLatestPosts);
// };

// L.fnProcessLatestPosts = function () {
    // var feed = new google.feeds.Feed(L.sBlogURL + L.sFeedURL);
    // feed.setNumEntries(2);
    // feed.load(function (result) {
        // if (!result.error) {
            // var container = document.getElementById("WPFeed");
            // for (var i = 0; i < result.feed.entries.length; i++) {
                // container.innerHTML += '<p class=\"leftIndent\"><a href=\"' + result.feed.entries[i].link + '\">' + result.feed.entries[i].title + '</a></p><p class=\"leftIndent\">Last Updated:&nbsp;&nbsp;' + result.feed.entries[i].publishedDate + '</p>'; ;
            // }
        // }
    // });
// };

var iMarginCorrection = 140, iFullHTMLHeight = document.documentElement.clientHeight - iMarginCorrection, iHalfHTMLHeight = iFullHTMLHeight / 2;

var AllNavItems = [], AllNodes = [];
window.onload = function () {
    if (!AllNavItems.length) {
        AllNavItems = document.getElementById('NavBar').children;
    }
    if (!AllNodes.length) {
        AllNodes.push(document.getElementById('Home'));
        AllNodes.push(document.getElementById('About'));
        AllNodes.push(document.getElementById('Work'));
        AllNodes.push(document.getElementById('Contact'));
        for (var i = 0; i < AllNodes.length; i++)
            AllNodes[i].sIDWithHash = ("#" + AllNodes[i].id);
    }
    window.onscroll = function (evt) {
        var iElID = -1, iClosestVis = iFullHTMLHeight;
        iElID = 0;
        for (var i = 0; i < AllNodes.length; i++) {
            AllNavItems[i].classList.remove('currentPage');
            var rctCurBounds = AllNodes[i].getBoundingClientRect(), iCurTop = rctCurBounds.top - iMarginCorrection, iCurBottom = rctCurBounds.bottom, iTemp = 0;
            if (iCurTop > iHalfHTMLHeight || iCurBottom < iMarginCorrection)
                continue;
            if (iCurTop < iHalfHTMLHeight && iCurBottom >= iHalfHTMLHeight)
                iElID = i;
        }
        AllNavItems[iElID].classList.add('currentPage');
        history.pushState(null, null, AllNodes[iElID].sIDWithHash);
        if (iElID != 0)
            AllNavItems[0].classList.remove('currentPage');
    };
    document.getElementById('frmContact').onsubmit = L.fnSubmitFormData;
    window.onscroll();
};

// L.fnSubmitFormData = function (evt) {
    // evt.preventDefault();
    // var ndResponse = document.getElementById("Response");
    // ndResponse.style.display = "block";
    // var sSeparator = "__||__";
    // var asContactFieldNames = ["txtUName", "txtEMail", "txtPhone", "txtOrg", "rdoBudget", "rdoTimeLine", "txtSite", "txaDesc"];
    // var aFieldValidators = [L.fnJustValidate, L.fnJustValidate, L.fnJustValidate, L.fnValidateOrg, undefined, undefined, L.fnValidateSite, L.fnValidateDesc];
    // var data = "", frmContact = document.forms[0];
    // for (var i = 0; i < asContactFieldNames.length; i++) {
        // var sVal = frmContact[asContactFieldNames[i]].value;
        // sVal = (aFieldValidators[i] ? (aFieldValidators[i](sVal) ? sVal : '') : sVal);
        // data += (asContactFieldNames[i] + sSeparator + sVal + sSeparator);
    // }
    // var asHFCheckBoxes = ["chkHFWeb", "chkHFBrand", "chkHFAndroid", "chkHFDesk"];
    // var bCheckBoxChecked = false, bAtLeastOneCheckBoxChecked = false;
    // for (var i = 0; i < asHFCheckBoxes.length; i++) {
        // bCheckBoxChecked = frmContact[asHFCheckBoxes[i]].checked;
        // bAtLeastOneCheckBoxChecked = (bAtLeastOneCheckBoxChecked || bCheckBoxChecked);
        // data += (asHFCheckBoxes[i] + sSeparator + (bCheckBoxChecked ? frmContact[asHFCheckBoxes[i]].value : "") + sSeparator);
    // }
    // if (!bAtLeastOneCheckBoxChecked) {
        // //TODO: Indicate that there was an error by either an alert / flashing the container in Red / ...
        // ndResponse.innerHTML = "Atleast one checkbox of 'Hiring For' has to be checked."
        // return;
    // }

    // var asPTCheckBoxes = ["chkPTNew", "chkPTRedesign", "chkPTAddition"];
    // bCheckBoxChecked = false;
    // bAtLeastOneCheckBoxChecked = false;
    // for (var i = 0; i < asPTCheckBoxes.length; i++) {
        // bCheckBoxChecked = frmContact[asPTCheckBoxes[i]].checked;
        // bAtLeastOneCheckBoxChecked = (bAtLeastOneCheckBoxChecked || bCheckBoxChecked);
        // data += (asPTCheckBoxes[i] + sSeparator + (bCheckBoxChecked ? frmContact[asPTCheckBoxes[i]].value : "") + sSeparator);
    // }
    // if (!bAtLeastOneCheckBoxChecked) {
        // //TODO: Indicate that there was an error by either an alert / flashing the container in Red / ...
        // ndResponse.innerHTML = "Atleast one checkbox of Project Type has to be checked."
        // return;
    // }
    // document.getElementById('AllFormFields').disabled = true;
    // /*console.log(data);*/
    // var request = new XMLHttpRequest();
    // request.open('POST', '/pages/contact.aspx', true);
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // request.onreadystatechange = function () {
        // if (request.readyState == 4 && request.status == 200) {
            // /*Handle form response here.*/
            // //frmContact.hidden = true;
            // //frmContact.reset();
            // ndResponse.innerHTML = L.fnExtractHTMLFromResponse(request.responseText);
        // }
    // };
    // request.send(data);
// };
// L.fnExtractHTMLFromResponse = function (sResponse) {
    // var iStart = sResponse.indexOf('<body') + 6, iEnd = sResponse.indexOf('</body>');
    // iStart = sResponse.indexOf('<div', iStart) - 4;
    // if (iStart > sResponse.length || iStart < 0 || iEnd > sResponse.length)
        // return "";
    // console.log(sResponse.substring(iStart, iEnd));
    // return sResponse.substring(iStart, iEnd);
// };
// L.fnJustValidate = function (sValue) {
    // if (!sValue)
        // return false;
    // sValue = sValue.trim();
    // if ((!sValue.length) || (sValue.length < 3) || (L.asKnownOrgNames.indexOf(sValue) > -1))
        // return false;
    // return true;
// };
// L.fnValidateName = function (sName) {
    // return true;
// };
// L.fnValidateEMail = function (sEMail) {
    // return true;
// };
// L.fnValidatePhone = function (sPhone) {
    // return true;
// };
// L.fnValidateOrg = function (sOrg) {
    // // More validation to be added.
    // return L.fnJustValidate(sOrg);
// };
// L.fnValidateSite = function (sSite) {
    // if (!L.fnJustValidate(sSite))
        // return false;
    // var matches = sSite.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i), domain = matches && matches[1];
    // if ((!domain) || (domain.length) || (L.asKnownOrgNames.indexOf(domain) > -1))
        // return false;
    // for (var i = 0, iKONLen = L.asKnownOrgNames.length; i < iKONLen; i++) {
        // if (domain.indexOf(L.asKnownOrgNames[i]) > -1)
            // return false;
    // }
    // return true;
// };
// L.fnValidateDesc = function (sDesc) {
    // if (!L.fnJustValidate(sDesc))
        // return false;
    // for (var i = 0, iKPWLen = L.asKnownProfanity.length; i < iKPWLen; i++) {
        // if(sDesc.indexOf(L.asKnownProfanity[i]) > -1)
            // return false;
    // }
    // return true;
// };