/**
 *
 * WARNING : If this file is modified, please synchronize the environment detection of the player too !
 *
 */


//First creation of the namespace KolorEyes
if(typeof KolorEyes === "undefined") KolorEyes = {};

//Auto executable function
//This should be one of the first function to be triggered on load
KolorEyes.env = (function()
{
    //Description of the returned object
    var result =
    {
        OS: null,
        browserMajor: null,
        browserName: null,
        browserVersion: null,
        context: null,
        isMobile: null,
        mobileType: null,
        webGL: null
    };

    //Browser name & version
    var N = navigator.appName, ua = navigator.userAgent, tem;

    //Exception for facebook, the regexp in the else statement crashes facebook browser ...
    if ( ua.match(/FB/i) )
    {
        result.browserName = "facebook";
    }
    else
    {
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*(\.?\d+(\.\d+)*)/i);
        if(M[1].toLowerCase() === 'trident'){
            M[1] = 'msie'; //Rename Trident to MSIE
            M[2] = ua.match(/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i)[1]; //Get version for MSIE > 11.0
        }
        if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion,'-?'];

        result.browserName = M[0].toLowerCase();
        result.browserVersion = M[1];
        result.browserMajor = parseInt(result.browserVersion);
    }

    //OS name
    if (navigator.appVersion.indexOf("Win")!=-1) result.OS = "windows";
    else if (navigator.appVersion.indexOf("Mac")!=-1) result.OS = "macos";
    else if (navigator.appVersion.indexOf("X11")!=-1) result.OS = "unix";
    else if (navigator.appVersion.indexOf("Linux")!=-1) result.OS = "linux";

    //WebGL detection
    result.webGL = false;

    if (window.WebGLRenderingContext && result.browserName != 'msie' && result.browserName != 'safari')
    {
        var contextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
        var context = null;
        var canvas = document.createElement('canvas');

        for (var i=0, ii=contextNames.length; i < ii; ++i)
        {
            try {
                context = canvas.getContext(contextNames[i]);
            }
            catch(e) {}

            if(context)
            {
                result.webGL = true;
                break;
            }

            context = null;
            canvas = null;
        }
    }

    //Device type
    result.isMobile = false;
    result.mobileType = null;

    // the order is important here, do not change it without all the user-agents to hand
    if ( ua.match(/IEMobile/i) ) result.mobileType = "windows";
    else if ( ua.match(/BB(\d{2,})/i) || ua.match(/BlackBerry/i) ) result.mobileType = "blackberry";
    else if ( ua.match(/Android/i) ) result.mobileType = "android";
    else if ( ua.match(/iPhone|iPad|iPod/i) ) result.mobileType = "ios";
    else if ( ua.match(/Opera Mini/i) ) result.mobileType = "opera";

    result.isMobile = (result.mobileType !== null);

    //Android version detection
    if(result.mobileType == "android")
    {
        result.androidVersion = null;
        var match = ua.match(/Android\s([0-9\.]*)/);
        if(match) result.androidVersion = parseFloat(match[1]);
    }


    result['context'] = "browser";

    return result;

})();

KolorEyes['env'] = KolorEyes.env;
KolorEyes['environment'] = KolorEyes.env;