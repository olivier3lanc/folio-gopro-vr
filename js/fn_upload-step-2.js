jQuery(document).ready(function() {
    checkboxBehavior();
    selectFormReplacer();
    inputMinimalRequirements();



    //Display passwords fields if privacy 'private' is set
    if(jQuery('.select-inner.select-video_privacy li[data-value="4"]').hasClass('active')){
        jQuery('.passwords').show(300);
    }

    //If "private privacy" is selected, show password fields, otherwise hide
    jQuery('.select-inner.select-video_privacy li').on('click', function (){
        var cur = jQuery(this).attr('data-value');
        if(cur == '4'){
            jQuery('.passwords').show(300);
        }else{
            jQuery('.passwords').hide(300);
        }
    });


});
jQuery(window).load(function(){

})
jQuery(window).resize(function(){

});
