
jQuery(document).ready(function() {
    checkboxBehavior();
    selectFormReplacer();
    inputMinimalRequirements();
    //checkAndToggle('4', 'select-video_privacy', 'passwords');
    if(jQuery('.select-inner.select-video_privacy li[data-value="4"]').hasClass('active')){
        jQuery('.passwords').show(300);
    }

    //Display passwords fields if privacy 'private' is set
    jQuery('.select-inner.select-video_privacy li').on('click', function (){
        var cur = jQuery(this).attr('data-value');
        if(cur == '4'){
            jQuery('.passwords').show(300);
        }else{
            jQuery('.passwords').hide(300);
        }
    });

    //Remove upload failure blocks
    jQuery('.hoverable .btn.dismiss').on('click', function(){
        jQuery(this).closest('.hoverable').hide(50);
    });

    //On scroll event
    jQuery(window).on('scroll',function(){
        //Only for touch devices (detected with head.js)
        if(jQuery('html').hasClass('touch')){
            //Add/remove class to selected element in viewport
            jQuery('.hoverable').removeClass('viewed');
            jQuery('.hoverable:in-viewport').addClass('viewed');
        }
    });

    //Modal tabs
    jQuery('.tabs a').on('click',function(e){
        e.preventDefault();
        var contentID = jQuery(this).parent().attr('data-target');
        var targetID = jQuery(this).attr('data-target');
        jQuery(this).parent().find('a').removeClass('active');
        jQuery(this).addClass('active');
        jQuery(contentID+'>div').addClass('none');
        jQuery(targetID).removeClass('none');
    });

    //Avoid bad characters
    jQuery('.bootstrap-tagsinput input').keydown(function(e) {
        var k = String.fromCharCode(e.which);
        if (!k.match(/[0-9a-zA-Z\r]/g) && e.which !== 37 && e.which !== 38 && e.which !== 39 && e.which !== 40 && e.which !== 8){
            e.preventDefault();
        }else{
            if (e.which >= 48 && e.which <= 57){
                e.preventDefault();
            }
        }
    });

    //No paste
    jQuery('.bootstrap-tagsinput input').on('paste',function(e) {
        e.preventDefault();
    });
});
jQuery(window).load(function(){
})
jQuery(window).resize(function(){
});
