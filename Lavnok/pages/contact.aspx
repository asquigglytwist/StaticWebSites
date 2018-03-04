<%@ Page Language="C#" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Net.Mail" %>

<!DOCTYPE html>

<script runat="server">
    const string sTagRootNode = "contacts", sTagEntryNode = "contact";
    const string sTagName = "name", sTagType = "type", sTagHiringFor = "hiringfor", sTagBudget = "budget", sTagTimeLine = "timeline", sTagDesc = "desc";
    const string sAtrEMail = "email";
    const string sAtrOrg = "org", sAtrSite = "site", sAtrPhone = "phone";

    const string sFNUName = "txtUName", sFNEMail = "txtEMail", sFNDesc = "txaDesc";
    const string sFNSite = "txtSite", sFNOrg = "txtOrg", sFNPhone = "txtPhone";
    const string sFNHFWeb = "chkHFWeb", sFNHFBrand = "chkHFBrand", sFNHFAndroid = "chkHFAndroid", sFNHFDesk = "chkHFDesk";
    const string sFNPTNew = "chkPTNew", sFNPTRedesign = "chkPTRedesign", sFNPTAddition = "chkPTAddition";
    const string sFNBudget = "rdoBudget", sTimeLineFieldName = "rdoTimeLine";
    
    string[] sReqFields = { sFNUName, sFNEMail, sFNDesc };
    string[] sHFFields = { sFNHFWeb, sFNHFBrand, sFNHFAndroid, sFNHFDesk };
    string[] sPTFields = { sFNPTNew, sFNPTRedesign, sFNPTAddition };
    string[] sDefFields = { sFNBudget, sTimeLineFieldName };
    string[] sOptFields = { sFNPhone, sFNOrg, sFNSite };
    string[] sMarkers = new string[] { "__%7c%7c__" };
    string[] sKnownOrgNames = { "google", "lavnok", "microsoft", "yahoo", "bing", "github" };
    private bool ValidateSiteURL(string sSiteURL)
    {
        Uri uriSiteURL = new Uri(Uri.UnescapeDataString(sSiteURL));
        string sHostName = uriSiteURL.Host.ToLower();
        if (Array.IndexOf(sKnownOrgNames, sHostName) > -1)
            return false;
        return true;
    }
    private bool ValidateOrgName(string sOrgName)
    {
        sOrgName = sOrgName.ToLower();
        if (Array.IndexOf(sKnownOrgNames, sOrgName) > -1)
            return false;
        return true;
    }
    private bool ValidatePhoneNum(string sPhoneNum)
    {
        return true;
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string sSentValues = Request.Form.ToString();
        string[] keys = sSentValues.Split(sMarkers, StringSplitOptions.None);
        int i = 0, iKeysLen = (keys.Length - 1);
        if (iKeysLen < 2)
        {
            GenericMsg.Visible = true;
            Result.Visible = false;
            return;
        }
        Result.Visible = true;
        GenericMsg.Visible = false;
        string sTimeStamp = DateTime.Now.ToBinary().ToString();
        try
        {
            SmtpClient smtpClient = new SmtpClient("_-$Do not mention the file name here.$-_");

            smtpClient.Credentials = new System.Net.NetworkCredential("_-$Do not mention the file name here.$-_", "_-$Do not mention the file name here.$-_");
            //smtpClient.UseDefaultCredentials = true;
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            //smtpClient.EnableSsl = true;
            MailMessage mail = new MailMessage();

            //Setting From , To and CC
            mail.From = new MailAddress("_-$Do not mention the file name here.$-_", "_-$Do not mention the file name here.$-_");
            mail.To.Add(new MailAddress("_-$Do not mention the file name here.$-_"));
            mail.IsBodyHtml = true;
            mail.Subject = "Form Submission";
            mail.Body = "Form Submission - " + sTimeStamp + "<br />" + sSentValues;
            smtpClient.Send(mail);
        }
        catch (Exception ex)
        {
        }
        System.Collections.Generic.Dictionary<string, string> dyReq = new System.Collections.Generic.Dictionary<string, string>(sReqFields.Length);
        System.Collections.Generic.Dictionary<string, string> dyHF = new System.Collections.Generic.Dictionary<string, string>(sHFFields.Length);
        System.Collections.Generic.Dictionary<string, string> dyPT = new System.Collections.Generic.Dictionary<string, string>(sPTFields.Length);
        System.Collections.Generic.Dictionary<string, string> dyDef = new System.Collections.Generic.Dictionary<string, string>(sDefFields.Length);
        System.Collections.Generic.Dictionary<string, string> dyOpt = new System.Collections.Generic.Dictionary<string, string>(sOptFields.Length);
        bool bValidOptFldData = false, bAtleastOneHF = false, bAtleastOnePT = false;
        for (i = 0; i < iKeysLen; i += 2)
        {
            bValidOptFldData = false;
            string sKey = keys[i].Trim(), sVal = keys[i + 1].Trim();
            if (string.IsNullOrEmpty(sKey) || string.IsNullOrEmpty(sVal))
                continue;
            if (Array.IndexOf(sReqFields, sKey) > -1)
                dyReq.Add(sKey, sVal);
            else if (Array.IndexOf(sHFFields, sKey) > -1)
            {
                bAtleastOneHF = true;
                dyHF.Add(sKey, sVal);
            }
            else if (Array.IndexOf(sPTFields, sKey) > -1)
            {
                bAtleastOnePT = true;
                dyPT.Add(sKey, sVal);
            }
            else if (Array.IndexOf(sDefFields, sKey) > -1)
                dyDef.Add(sKey, sVal);
            else if (Array.IndexOf(sOptFields, sKey) > -1)
            {
                if (sFNSite == sKey)
                    bValidOptFldData = ValidateSiteURL(sVal);
                else if (sFNOrg == sKey)
                    bValidOptFldData = ValidateOrgName(sVal);
                else if (sFNPhone == sKey)
                    bValidOptFldData = ValidatePhoneNum(sVal);
                if (bValidOptFldData)
                    dyOpt.Add(sKey, sVal);
            }
        }
        
        /* Bail-Out if any of these conditions fail; No point in going further*/
        if (dyReq.Count < sReqFields.Length)
        {
            Result.InnerHtml = "Incomplete Data:&nbsp;&nbsp;Please fill in all the 'Required' fields.";
            return;
        }
        if (dyHF.Count < 1)
        {
            Result.InnerHtml = "Incomplete Data:&nbsp;&nbsp;Please mention at-least one 'Hiring For'.";
            return;
        }
        if (dyPT.Count < 1)
        {
            Result.InnerHtml = "Incomplete Data:&nbsp;&nbsp;Please mention at-least one 'Project Type'.";
            return;
        }
        if (!(bAtleastOneHF && bAtleastOnePT))
        {
            Result.InnerHtml = "Incomplete Data:&nbsp;&nbsp;Please mention at-least one 'Hiring For' &amp; 'Project Type'.";
            return;
        }
        
        bool bSaveFile = false;
        string xmlPath = MapPath("_-$Do not mention the file name here.$-_");
        XmlDocument doc = new XmlDocument();
        XmlNode contactNode = CreateContactNode(doc, dyReq, dyHF, dyPT, dyDef, dyOpt);
        //Check if the file already exists or not
        if (System.IO.File.Exists(xmlPath))
        {
            doc.Load(xmlPath);
            XmlNode rootNode = doc.SelectSingleNode(sTagRootNode);
            if (contactNode != null)
            {
                rootNode.AppendChild(contactNode);
                bSaveFile = true;
            }
        }
        else
        {
            XmlNode declarationNode = doc.CreateXmlDeclaration("1.0", "", "");
            doc.AppendChild(declarationNode);
            XmlNode comment = doc.CreateComment("This file information about people who've contacted Lavnok");
            doc.AppendChild(comment);
            XmlNode rootNode = doc.CreateElement(sTagRootNode);
            if (contactNode != null)
            {
                rootNode.AppendChild(contactNode);
                doc.AppendChild(rootNode);
                bSaveFile = true;
            }
        }
        if (bSaveFile)
        {
            try
            {
                doc.Save(xmlPath);
                Result.InnerHtml = "Success:&nbsp;&nbsp;Thank you for showing interest in us.&nbsp;&nbsp;Fluffy will definitely get in touch with you.";
            }
            catch (Exception ex)
            {
                Result.InnerHtml = "Error:&nbsp;&nbsp;An unexpected error occured; Can you try submitting again? If problem persists, please send a mail to contact [at] &lt;this domain&gt; [dot] com";
            }
        }
    }

    XmlNode CreateContactNode(XmlDocument doc, System.Collections.Generic.Dictionary<string, string> dyReq,
        System.Collections.Generic.Dictionary<string, string> dyHF, System.Collections.Generic.Dictionary<string, string> dyPT,
        System.Collections.Generic.Dictionary<string, string> dyDef, System.Collections.Generic.Dictionary<string, string> dyOpt)
    {
        XmlNode ndNewContact = doc.CreateElement(sTagEntryNode), ndUName = doc.CreateElement(sTagName), ndDesc = doc.CreateElement(sTagDesc),
            ndProjType = doc.CreateElement(sTagType), ndHiringFor = doc.CreateElement(sTagHiringFor),
            ndBudget = doc.CreateElement(sTagBudget), ndTimeLine = doc.CreateElement(sTagTimeLine);
        XmlAttribute atrEMail = doc.CreateAttribute(sAtrEMail);
        string sEMail = "", sUName = "", sDesc = "";
        if ((dyReq.TryGetValue(sFNEMail, out sEMail)) && (dyReq.TryGetValue(sFNUName, out sUName)) && (dyReq.TryGetValue(sFNDesc, out sDesc)))
        {
            atrEMail.Value = sEMail;
            ndUName.InnerText = sUName;
            ndDesc.InnerText = sDesc;
            ndNewContact.Attributes.Append(atrEMail);
            ndNewContact.AppendChild(ndUName);
            ndNewContact.AppendChild(ndDesc);
        }
        else
            return null;
        //string sHFSerialized = string.Join(";", dyHF.Select(x => x.Value + ",").ToArray());
        string sHFSerialized = GetDictionaryValuesAsString(dyHF), sPTSerialized = GetDictionaryValuesAsString(dyPT);
        if (!string.IsNullOrEmpty(sHFSerialized))
        {
            ndHiringFor.InnerText = sHFSerialized;
            ndNewContact.AppendChild(ndHiringFor);
        }
        else
            return null;
        if (!string.IsNullOrEmpty(sPTSerialized))
        {
            ndProjType.InnerText = sPTSerialized;
            ndNewContact.AppendChild(ndProjType);
        }
        else
            return null;
        /* Optional Fields */
        XmlAttribute atrOrg = doc.CreateAttribute(sAtrOrg), atrSite = doc.CreateAttribute(sAtrSite), atrPhone = doc.CreateAttribute(sAtrPhone);
        string sOrg = "", sSite = "", sPhoneNum = "";
        if (dyOpt.TryGetValue(sFNOrg, out sOrg))
        {
            atrOrg.Value = sOrg;
            ndNewContact.Attributes.Append(atrOrg);
        }
        if (dyOpt.TryGetValue(sFNSite, out sSite))
        {
            atrSite.Value = sSite;
            ndNewContact.Attributes.Append(atrSite);
        }
        if (dyOpt.TryGetValue(sFNPhone, out sPhoneNum))
        {
            atrPhone.Value = sPhoneNum;
            ndNewContact.Attributes.Append(atrPhone);
        }
        return ndNewContact;
    }
    
    string GetDictionaryValuesAsString(System.Collections.Generic.Dictionary<string,string> dyToSerialize)
    {
        if (dyToSerialize.Count < 1)
            return string.Empty;
        StringBuilder sbTemp = new StringBuilder();
        foreach (string sVal in dyToSerialize.Values)
        {
            sbTemp.Append(sVal);
            sbTemp.Append(",");
        }
        return sbTemp.ToString();
    }
</script>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <meta name="robots" content="noindex, follow" />
    <title>Lavnok - [Contact Us / Hire Us]</title>
</head>
<body>
    <div runat="server" id="Result">
   </div>
    <div runat="server" id="GenericMsg">
        <div>Thank you for choosing us.</div>
        <div>Please use our <a href="/#Contact">Contact Form</a> to contact / hire us.</div>
    </div>
</body>
</html>