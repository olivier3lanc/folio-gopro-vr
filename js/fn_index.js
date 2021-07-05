/*
* Function to check if there is sufficient place for the slider thumbnails
*/
var landingSectionHeight = function(){
    //Position from top for the play button of the active slide
    var playButtonTopPos = jQuery('.owl-item.active .btn-play').offset().top;
    //Height of the play button of the active slide
    var playButtonHeight = jQuery('.owl-item.active .btn-play').height();
    //Play button height
    var playButtonOffset = playButtonTopPos+playButtonHeight;
    //Position from top for the toggle show/hide thumbnails button
    var toggleThumbnailsButtonTopPos = jQuery('#toggle-slider-thumbnails-button').offset().top;
    //Difference of top position between play button (bottom) and toggle show/hide thumbnails button (top)
    var difference = toggleThumbnailsButtonTopPos - playButtonOffset;
    //Check the difference and apply z-index and opacity according
    jQuery('.slider-thumbnails').css({zIndex:'9',opacity:'1'});
    if(difference < 55){
        jQuery('.slider-thumbnails img').css({maxHeight:'80px'});
        // jQuery('.slider-thumbnails').css({zIndex:'9',opacity:'1'});
    }else{
        // jQuery('.slider-thumbnails').css({zIndex:'9',opacity:'1'});
        jQuery('.slider-thumbnails img').css({maxHeight:'100%'});
    }

}

/*
* Load large background image only on the active slide
* This avoids loading non visible slide images
*/
var lazyLoadBg = function(){
    //Get the large image URL into the custom html5 attribute (data-src) in the active slide <img>
    var imgUrl = jQuery('.owl-item.active img').attr('data-bg');
    //Apply it as background image in the slide container
    jQuery('.owl-item.active .container-slide .image').css({backgroundImage:'url('+imgUrl+')'});
}




jQuery(document).ready(function() {
    //Navbar
    navbarBehavior();
    pseudoSelectBox();



    //Home page slider
    jQuery("#homepage-slider").owlCarousel({
        singleItem: true,
        addClassActive: true,
        navigation: true,
        navigationText : ["",""],
        rewindNav: false,
        pagination:true,
        afterInit: function(){
            lazyLoadBg();
        },
        afterMove: function(){
            // landingSectionHeight();
            lazyLoadBg();
        }
    });

    //Home page slider thumbnails
    // jQuery("#homepage-slider-thumbnails").owlCarousel({
    //     itemsDesktop:[1400,5],
    //     itemsDesktopSmall:[1200,4],
    //     itemsTablet:[992,3],
    //     itemsMobile:[768,2],
    //     navigation: true,
    //     rewindNav: true,
    //     navigationText : ["",""]
    // });

    //Load Owl Carousel slider methods
    var owl = jQuery("#homepage-slider").data('owlCarousel');

    //Thumbnail navigation: Go to the slide on thumbnail click
    jQuery('.slider-thumbnails a.link-slider-thumb').on('click', function(e){
        e.preventDefault();
        //a.link-slider-thumb must have an incremental index contained into a html5 custom attribute
        //For example for n slides, needs <a class="link-slider-thumb" data-index="0" to <a class="link-slider-thumb" data-index="n-1"
        var index = jQuery(this).attr('data-index');
        owl.goTo(index);
    });

    //Toggle slider thumbnails button
    jQuery('#toggle-slider-thumbnails-button').on('click', function(e){
        e.preventDefault();
        var theSource = jQuery(this).closest('.slider-thumbnails');
        if(theSource.hasClass('closed')){
            theSource.removeClass('closed');
            jQuery(this).children('span').toggle();
        }else{
            theSource.addClass('closed');
            jQuery(this).children('span').toggle();
        }
    });



});
jQuery(window).load(function(){
    // landingSectionHeight();
})
jQuery(window).resize(function(){
    // landingSectionHeight();
});
