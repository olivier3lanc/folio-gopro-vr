/*
* Parallax
*/

//CSS class of the source block, parent of the parallax block
var theSourceBlockCSSClass = '.hoverable',
    //CSS class of the overlay into which to apply the parallax
    theTargetBlockCSSClass = '.overlay',
    jQsource = jQuery(theSourceBlockCSSClass),
    theHeight = jQsource.eq(1).outerHeight(),
    theWidth = jQsource.eq(1).outerWidth(),
    theHalfHeight = theHeight / 2,
    theHalfWidth = theWidth / 2,
    theOffset = 2,
    theY,theX,resultY,resultY,offsetX,offsetY;

//Parallax function
//@param float mousex: Mouse X position in the thumbnail block
//@param float mousey: Mouse Y position in the thumbnail block
//@return an abject with x and y coefficient from the center of the thumbnail block
var parallaxValues = function(mousex,mousey){
    var resultX, resultY, offsetY, offsetX;
    resultY = mousey - theHalfHeight;
    resultX = mousex - theHalfWidth;
    offsetY = theOffset * (resultY / theHalfHeight);
    offsetX = theOffset * (resultX / theHalfWidth);
    return {x:offsetX, y:offsetY};
}


jQuery(document).ready(function() {

    /**
    * Parallax
    */
    //Only for desktop
    if(jQuery('html').hasClass('desktop')){

        //Duplicate parallax overlay for smoother transitions
        jQuery(theSourceBlockCSSClass).each(function(){
            jQuery(this).find(theTargetBlockCSSClass).clone().appendTo(this);
        });

        //On mouse enter
        jQsource.on('mouseenter',function(e){
            jQuery(this).find(theTargetBlockCSSClass).eq(1).addClass('active');
        });

        //On mouse move
        jQsource.on('mousemove',function(e){
            //Result object with coefficents X and Y to apply
            var result = parallaxValues(e.offsetX, e.offsetY);
            // var coef = result.x * 2;





            //Temp the thumbnail block
            jQuery(this).find(theTargetBlockCSSClass).eq(0).css({
                // transform: 'rotateY('+ coef + 'deg)',
                // margin: '0',
                transform: 'translate3d('+result.x+'px,'+result.y+'px,0px) ',
                transition: 'opacity 0.3s'
            });
            // console.log('tiltx:'+tiltx+' -- tilty:'+tilty+' -- radius:'+radius+' -- degree:'+degree)
        });

        //On mouse leave
        jQsource.on('mouseleave',function(e){
            jQuery(this).find(theTargetBlockCSSClass).eq(0).css({
                transform: 'translate3d(0px,0px,0px)',
                transition: 'transform 0.8s'
            });
            jQuery(this).find(theTargetBlockCSSClass).eq(1).removeClass('active');
        });
    }

    /************** Cursor Transform Rotation Logo **************/
    //TO TEST
        // var $one = $('.logo,.shadow'),
        //     $two = $('.logo, .shadow'),
        //     browserPrefix = "",
        //     usrAg = navigator.userAgent;
        // if(usrAg.indexOf("Chrome") > -1 || usrAg.indexOf("Safari") > -1) {
        //     browserPrefix = "-webkit-";
        // } else if (usrAg.indexOf("Opera") > -1) {
        //     browserPrefix = "-o";
        // } else if (usrAg.indexOf("Firefox") > -1) {
        //     browserPrefix = "-moz-";
        // } else if (usrAg.indexOf("MSIE") > -1) {
        //     browserPrefix = "-ms-";
        // }
        //
        // $(document).mousemove(function (event) {
        //     var cx = Math.ceil(window.innerWidth / 2.0),
        //         cy = Math.ceil(window.innerHeight / 2.0),
        //         dx = event.pageX - cx,
        //         dy = event.pageY - cy,
        //         tiltx = (dy / cy),
        //         tilty = - (dx / cx),
        //         radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2)),
        //         degree = (radius * 20);
        //
        //     $one.css(browserPrefix + 'transform', 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
        //     $two.css(browserPrefix + 'transform', 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
        //
        // });
});

jQuery(window).load(function(){

});

jQuery(window).resize(function(){
    //When window is resize, the thumbnail block size changes
    theHeight = jQsource.eq(0).outerHeight();
    theWidth = jQsource.eq(0).outerWidth();
    theHalfHeight = theHeight / 2;
    theHalfWidth = theWidth / 2;
});
