
jQuery(document).ready(function() {
    pseudoSelectBox();
    navbarBehavior();

    //On scroll event
    jQuery(window).on('scroll',function(){
        //Only for touch devices (detected with head.js)
        if(jQuery('html').hasClass('touch')){
            //Add/remove class to selected element in viewport
            jQuery('.hoverable').removeClass('viewed');
            jQuery('.hoverable:in-viewport').addClass('viewed');
        }
    });
});

jQuery(window).load(function(){

});

jQuery(window).resize(function(){

});
