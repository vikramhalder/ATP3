function getAfter(str) {
    return str.split('-')[1];
}
function popupNotiClose(val)
{
	window.location.reload();
}

function popupNotiCloseF(val)
{
	vikID(val).style.display = 'none'; 
}

function vikParam(val)
{
	var url_string = window.location.href;
	var url = new URL(url_string);
	return url.searchParams.get(val);
}

function redirect(val)
{
	 window.location.href=val;
}

function crURL()
{
	 return window.location.href;
}

 function vikID(val)
 {
 	return document.getElementById(val);
 }

 function vikCLASS(val)
 {
 	return document.getElementsByClassName(val);
 }
  
 function active(val)
 {
 	var xx='';
	if(val==0)
	{
		xx = xx +'Panding';
	}
	else if(val==1)
	{
		xx = xx +'Active';
	}

	else if(val==10)
	{
		xx = xx +'Inactive';
	}
	return xx;
 }
 
function chRep(str,val,replaceValue)
{ 
    var res = str.split(val).join(replaceValue);
   
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}