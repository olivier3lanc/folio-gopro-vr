// videoplayer.js allégé pour l'iframe (videoplayer.js non appelé dans l'iframe)

//@todo: cette fonction est double dans le videoplayer.js egalement, voir pour éviter les doublons
function getMobileUri(keyCode)
{
    if(KolorEyes.environment.browserName === "chrome" && KolorEyes.environment.browserMajor >= 25)
        strVideo = "intent://scan/#Intent;scheme=koloreyes360videoplayer;package=fi.finwe.koloreyesandroid;S.fi.finwe.koloreyesandroid.EXTRA_MESSAGE=" + keyCode + ";end";
    else
        strVideo = "koloreyes360videoplayer://video=" + keyCode;

    return strVideo;
}

/**
 *
 * @param infoMessage
 * @param keUri
 * @param keTitle
 * @param keMessage
 * @param playUri
 * @param playMessage
 * @param mobileType
 */
function activateMobileDeviceMessage(infoMessage, keUri, keTitle, keMessage, playUri, playMessage, mobileType)
{
    var container = jQuery('#KolorEyesVideo');
    container.html("<div id='deviceAlertInfo'>" + infoMessage + " <div class='pdtop20'></div> <a href='" + keUri + "' title='" + keTitle + "' class='btn btn-primary' target='_blank'><span class='glyphicon glyphicon-download-alt pdright5'></span> " + keMessage + " <span class='icon-" + mobileType + " pdleft5'></span></a> <a href='" + playUri + "' title='' class='btn btn-default'><span class='icon-play2'></span> " + playMessage + "</a></div>");
}

/**
 * Increment the view count. Function obfuscated on purpose (should be named addOneViewVideo)
 * @param target_url
 */
function aOV(target_url)
{
    jQuery.ajax({
        url: target_url,
        type: "POST",
        data: {},
        dataType: 'json'
    });
}

/**
 * Set cookie value (used currently for setting a new video quality)
 * @param target_url
 * @param index
 */
function cVQ(target_url, index) {
    target_url = target_url.replace("_value_", index);
    jQuery.ajax({
        url: target_url,
        type: "POST",
        data: {},
        dataType: 'json'
    });
}

jQuery(window).load(function()
{
    // Affichage de la preview si navigateur mobile
    if ( KolorEyes.environment.isMobile === true )
    {
        var style = document.createElement('link');
        style.href = "/bundles/kolorcore/css/custom.css";
        style.rel = "stylesheet";
        style.type = "text/css";
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(style, firstScript);

        var style = document.createElement('link');
        style.href = "/bundles/kolorcore/css/icomoon.css";
        style.rel = "stylesheet";
        style.type = "text/css";
        firstScript.parentNode.insertBefore(style, firstScript);

        var style = document.createElement('link');
        style.href = "//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css";
        style.rel = "stylesheet";
        style.type = "text/css";
        firstScript.parentNode.insertBefore(style, firstScript);
    
    }

});