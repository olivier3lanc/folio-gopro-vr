
jQuery(document).ready(function() {
    // checkboxBehavior();
    jQuery('#patate-button').on('click', function(e){
        e.preventDefault();
        jQuery('#share-zone').toggleClass('opened');
    });
    // jQuery('#link-start-at').on('click', function(e){
    //     e.preventDefault();
    // });
    jQuery('#check-start-here').on('click', function(){
        var theParent = jQuery(this).parent();
        if(theParent.hasClass('checked')){
            theParent.removeClass('checked');
            jQuery(this).attr('checked', false);
            jQuery('#link-start-at').prop('disabled', true);
        }else{
            theParent.addClass('checked');
            jQuery(this).attr('checked', true);
            jQuery('#link-start-at').prop('disabled', false);
        }

    });
});
