/**
* GoPro Header
*
*/
var GoProHeader = function(){

    jQuery('.gpl-toggle-click').on('click', function(e){
        e.preventDefault();
        var targetID = jQuery(this).attr('data-target');
        if(jQuery('#'+targetID).hasClass('gpl-show')){
            jQuery('#'+targetID).removeClass('gpl-show');
        }else{
            jQuery('nav div').removeClass('gpl-show');
            jQuery('#'+targetID).addClass('gpl-show');
        }
    });

    jQuery('.gpl-js-close').on('click', function(e){
        e.preventDefault();
        var targetID = jQuery(this).attr('data-target');
        jQuery('#'+targetID).removeClass('gpl-show');
    });

    //Add full opacity to the header when scroll exceeds an amount
    jQuery(window).scroll(function(event){
        // if(jQuery('html').hasClass('desktop')){
        //
        // }
        var amount = jQuery(window).scrollTop();
        var jQsource = jQuery('#marketing-nav');
        if(amount>10){
            jQsource.addClass('scrolled');
        }else{
            jQsource.removeClass('scrolled');
        }
    });
}

//100% content overlay
var sumoContent = function(){
    jQuery('#gpl-search-link, #gpl-search-link-mobile').on('click', function(e){
        e.preventDefault();
        //Enable sumo overlay only if we are not on the search result page
        if(jQuery('.section.small-header #search_query_string').length==0){
            jQuery('nav div').removeClass('gpl-show');
            var allSectionsExceptSumo = jQuery('.section:not(.sumo)');
            var sumoSections = jQuery('.section.sumo');
            if(allSectionsExceptSumo.hasClass('blur')){
                allSectionsExceptSumo.removeClass('blur');
            }else{
                allSectionsExceptSumo.addClass('blur');
                jQuery('.sumo #search_query_string').focus();
            }
            if(sumoSections.hasClass('opened')){
                sumoSections.removeClass('opened');
                jQuery('#gpl-search-link, #gpl-search-link-mobile').removeClass('active');
                jQuery('.gpl-marketing-main-links .previous_active').each(function() {
                    jQuery(this).removeClass('previous_active');
                    jQuery(this).addClass('active');
                });
            }else{
                sumoSections.addClass('opened');
                jQuery('.gpl-marketing-main-links .active').each(function() {
                    jQuery(this).removeClass('active');
                    jQuery(this).addClass('previous_active');
                });
                jQuery('#gpl-search-link, #gpl-search-link-mobile').addClass('active');
            }
        }
    });

    jQuery('.section.sumo .overlay').on('click', function(){
        jQuery('.section.sumo').removeClass('opened');
        jQuery('#gpl-search-link, #gpl-search-link-mobile').removeClass('active');
        jQuery('.section').removeClass('blur');
        jQuery('.gpl-marketing-main-links .previous_active').each(function() {
            jQuery(this).removeClass('previous_active');
            jQuery(this).addClass('active');
        });
    });
}

//When user leaves an input, check if the field is empty or not
var inputMinimalRequirements = function(){
    jQuery('input').on('blur', function(){
        var val = jQuery(this).val();
        var jQsource = jQuery(this).parent();
        if(jQsource.hasClass('input-group')){
            //If empty, display the tooltip
            if(val==''){
                jQsource.addClass('feedback has-error');
                jQsource.find('.input-group-addon').removeClass('none');
                jQsource.find('[data-toggle="tooltip"]').tooltip('show');
            //If not empty, remove tooltip
            }else{
                jQsource.removeClass('feedback has-error');
                jQsource.find('.input-group-addon').addClass('none');
                jQsource.find('[data-toggle="tooltip"]').tooltip('hide');
            }
        }
    });
}



/*
* Select form replacer
* A better looking select form
*/
var selectFormReplacer = function(){
    //Hide default select form
    jQuery('select').css('display', 'none');

    //Wrap each select form into a custom wrapper div
    jQuery('select').each(function(){
        //Optional ID
        var theID = jQuery(this).attr('id');
        //Get style
        var theStyle = jQuery(this).attr('data-style-class');
        //If not set, apply a default style
        if(theStyle == undefined){ theStyle = 'stroke-light'};
        //Default text when no category is set
        var defaultText = jQuery(this).attr('data-text');
        //Get the value of a potential selected item
        var selectedOptionVal = jQuery(this).find('option:selected').val();
        var finalText;
        //Check if there is a category assigned
        if(selectedOptionVal !== ''){
            //If there is already a user selection, value is not empty, then use the selected <option> text
            finalText = jQuery(this).find('option:selected').text();
        }else{
            //If value='' it means there is no category chosen by the user, then display the default text
            finalText = defaultText;
        }

        //Insert the pseudo select box
        jQuery(this).wrap('<div class="select-wrapper '+theStyle+'"></div>');
        jQuery(this).parent().append('<ul class="select-inner select-'+theID+'"></ul>');
        //Place the current chosen category into the button or the default text that ask the user to choose one
        jQuery(this).parent().prepend('<span class="title-label">'+finalText+'<span class="icon-select-arrows"></span></span>');

        //Copy and paste each select option value into a custom html5 <li> attribute
        jQuery(this).children().each(function(){
            var opttext = jQuery(this).text();
            var optval = jQuery(this).val();
            jQuery(this).closest('.select-wrapper').children('.select-inner').append('<li data-value="' + optval + '">' + opttext + '</li>');
        });

        //Adapt the position of the opened select menu when the category is already selected
        //If there is already a user selection, position the pseudo select properly when user click on the button that opens the pseudo select
        if(selectedOptionVal !== ''){
            var theBox = jQuery(this).parent().find('ul.select-inner');
            var selectedOptionIndex = jQuery(this).find('option:selected').index();
            //Get the height of a single element of the wrapper
            theBox.find('li').eq(selectedOptionIndex).addClass('active');
            //Get the height of a single element of the wrapper
            var theElementHeight = theBox.find('li').eq(1).outerHeight();
            //Get the position of the active element
            var positionTop = theBox.find('li.active').position().top;
            //Adapt the top position of the opened wrapper according to the selected item
            theBox.css({marginTop:-positionTop-theElementHeight-20+'px'});
        }
    });

    //Click to make a choice
    jQuery('.select-inner li').on('click', function (){
        var cur = jQuery(this).attr('data-value');
        var theWrapper = jQuery(this).closest('.select-wrapper');
        jQuery(this).closest('.select-inner').find('li').removeClass();
        jQuery(this).addClass('active');
        theWrapper.find('span.title-label').html(jQuery(this).text()+' <span class="icon-select-arrows"></span></span>');
        theWrapper.find('select').children().removeAttr('selected');
        theWrapper.find('select').children('[value="'+cur+'"]').attr('selected','selected');
        theWrapper.find('.select-inner').removeClass('opened');
        theWrapper.parent().find('.notification-bar').addClass('none');
        //console.log(jQuery(this).closest('.select-wrapper').find('select').children('[value="'+cur+'"]').text());
    });

    //Click on the pseudo select zone button
    jQuery('.title-label').on('click', function (){
        //close any pseudo select already opened
        jQuery('.select-inner.opened').removeClass('opened');
        var source = jQuery(this).parent();
        var theBox = source.find('ul.select-inner');
        //Get the height of a single element of the wrapper
        var theElementHeight = theBox.find('li').eq(1).outerHeight();
        var positionTop;
        //Get the top position of the wrapper
        if(source.find('li.active').length !== 0)
            positionTop = source.find('li.active').position().top;
        else
            positionTop = 0;
        //Adapt the top position of the opened wrapper according to the selected item
        theBox.css({marginTop:-positionTop-theElementHeight-20+'px'});
        source.find('ul.select-inner').addClass('opened');
    });

    //Click on the pseudo select zone button
    // jQuery('.title-label').on('focus', function (){
    //     alert('focus')
    // });

    //When click outside pseudo select menu, close all pseudo select menus
    jQuery(document).on('click', function (e) {
        if (jQuery(e.target).closest(".select-wrapper").length === 0) {
            jQuery('body').find('ul.select-inner').removeClass('opened');
        }
    });
}


/*
* Pseudo select box
* This is a link stack that emulates the select form replacer
*/
var pseudoSelectBox = function(){
    jQuery('.pseudo-select').each(function(){
        var currentText = jQuery(this).find('li a.active').text();
        jQuery(this).find('.title-label').append(currentText);
    });
    jQuery('.pseudo-select .title-label').on('click', function (){
        var theSource = jQuery(this).closest('.pseudo-select');
        var theSourceHeight = theSource.height();
        var theBox = jQuery(this).parent().find('ul.select-inner');
        if(theSource.hasClass('no-positioning')){
            theBox.toggleClass('opened');
            theBox.css({marginTop:-theSourceHeight+'px'});
        }else{
            //Get the height of a single element of the wrapper
            var theElementHeight = theBox.find('li').eq(0).outerHeight();
            var positionTop;
            //Get the top position of the wrapper
            if(theBox.find('li a.active').length !== 0){
                positionTop = theBox.find('li a.active').parent().position().top;
            }else{
                positionTop = 0;
            }
            //Adapt the top position of the opened wrapper according to the selected item
            theBox.css({marginTop:-positionTop-theElementHeight-25+'px'});
            theBox.toggleClass('opened');
        }
    });

    //When click outside pseudo select menu, close all pseudo select menus
    jQuery(document).on('click', function (e) {
        if (jQuery(e.target).closest(".select-wrapper").length === 0) {
            jQuery('body').find('ul.select-inner').removeClass('opened');
        }
    });
}

/*
* Checkbox behavior
* Toggles class 'checked' for '.form-checkbox' checkboxes
*/
var checkboxBehavior = function(){
    jQuery('.form-checkbox input').on('click', function(){
        var theParent = jQuery(this).closest('div');
        if(theParent.hasClass('checked')){
            theParent.removeClass('checked');
            jQuery(this).attr('checked', false);
        }else{
            theParent.addClass('checked');
            jQuery(this).attr('checked', true);
        }
    });
}


/*
* Navbar behavior
*
*
*/
var navbarBehavior = function(){
    var lastScrollTop = 0;
    jQuery(window).scroll(function(event){
       var st = jQuery(this).scrollTop();
       if (st > lastScrollTop){
            // downscroll code
            jQuery('header').removeClass('opened');
       } else {
            // upscroll code
            jQuery('header').addClass('opened');
       }
       lastScrollTop = st;
    });
    jQuery('header').on('mouseenter', function(){
        jQuery(this).addClass('opened');
    });
}



/*
* CSS class detector
* Listen to the @sourceID if it has the @cssClass in the class attribute
* If yes, executes the function ifDo to the @targetID element
* If not, executes the function elseDo to the @targetID element
* Example:
* listenToThisClassAndTrig(sourceID, targetID, class to detect from sourceID, action name if OK, action name if not OK)
*/
var listenToThisClassAndTrig = function(sourceID, targetID, cssClass, ifDo, elseDo){
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            //If the sourceID element has the CSS class @cssClass, executes ifDo(targetID)
            if(jQuery('#'+sourceID).hasClass(cssClass))
                eval(ifDo+'("'+targetID+'")');
            //If not, executes elseDo(targetID)
            else
                eval(elseDo+'("'+targetID+'")');
        });
    });

    var source = document.getElementById(sourceID);
    observer.observe(source, { attributes : true, attributeFilter : ['class'] });


}


/*
* Basic functions for listenToThisClassAndTrig
*/
var hideSourceID = function(ID){
    jQuery('#'+ID).hide(100);
}
var showSourceID = function(ID){
    jQuery('#'+ID).show(800);
}
var showAndScrollToTargetID = function(ID) {
    jQuery('#'+ID).show(300);
    jQuery('html, body').animate({
        scrollTop: jQuery('#'+ID).offset().top - 200
    }, 300);
}

/**
* Notification bar close
*/
var dismissNotification = function(){
    jQuery('.notification-bar>button').on('click', function(e){
        e.preventDefault();
        jQuery(this).parent().hide(50);
    });
}



/**
* Executes on all pages
*/
jQuery(document).ready(function(){
    dismissNotification();
    GoProHeader();
    sumoContent();
})
