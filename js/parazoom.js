(function(jQuery){
    jQuery.fn.parazoom = function(options) {
        //Variables
        var dataHeight,
            dataWidth,
            dataBackgroundImage,
            dataPosition,
            dataPaddingTop,
            dataPaddingLeft,
            dataPaddingRight,
            dataFinalWidth,
            dataImg,
            dataLargeImg,
            dataFirstImg,
            dataFirstLink,
            dataScale,
            dataOverflow,
            dataTransitionTime,
            dataTransitionTimeLeave,
            dataOpacity,
            dataOpacityHover,
            dataCursor,
            dataLink,
            result,
            targetID,
            dataIndex,
            i=1,

            //Defaults parameters
            defaults = {
                    scale: '1.2',
                    transitionTime: '0.3s',
                    transitionTimeLeave: '1s',
                    opacity: '1',
                    opacityHover: '1',
                    overflow: 'hidden',
                    cursor: 'default',
                    useBackgroundImage: true,
                    useImageAttribute: true,
                    useFirstLink: true
            },
            test,

            //Style that will be injected in the <head>
            style = '<style>.prz-container{position:absolute;z-index:-1}.prz-overlay{position:absolute;width:100%;height:100%;top:0;left:0;background-position:center;background-size:cover;background-repeat:no-repeat}.prz-detector-container{position:relative;height:0;z-index:9900}.prz-detector{position:absolute;z-index:9999;width:100%}</style>';

        //If options are passed, use options values
        if(options !== undefined){
            if(options.scale)               { defaults.scale = options.scale }
            if(options.transitionTime)      { defaults.transitionTime = options.transitionTime }
            if(options.transitionTimeLeave) { defaults.transitionTimeLeave = options.transitionTimeLeave }
            if(options.opacity)             { defaults.opacity = options.opacity }
            if(options.opacityHover)        { defaults.opacityHover = options.opacityHover }
            if(options.overflow)            { defaults.overflow = options.overflow }
            if(options.cursor)              { defaults.cursor = options.cursor }
            if(options.useImageAttribute)   { defaults.useImageAttribute = options.useImageAttribute }
            if(options.useBackgroundImage)  { defaults.useBackgroundImage = options.useBackgroundImage }
            if(options.useFirstLink)        { defaults.useFirstLink = options.useFirstLink }
        }

        //Include common Parazoom styles
        jQuery('head').append(style);

        //For each Parazoom block
        this
            //Wrap the target container between the prz-container and the prz-detector
            .each(function(){

                //Has a background image?
                //If yes, use it if default settings useBackgroundImage is set to true
                dataBackgroundImage = jQuery(this).css('background-image');
                if(dataBackgroundImage !== 'none' && defaults.useBackgroundImage == true){
                    dataBackgroundImage = dataBackgroundImage.split('(');
                    dataBackgroundImage[1] = dataBackgroundImage[1].replace(/\(|\"|\'|\)/g,"");
                    dataImg = dataBackgroundImage[1];
                }else{
                    dataImg = '';
                }

                //Has a custom data attribute data-prz-img?
                //If yes, use it if default settings useImageAttribute is set to true
                if(defaults.useImageAttribute == true){
                    if(jQuery(this).attr('data-prz-img') !== undefined){
                        dataImg = jQuery(this).attr('data-prz-img');
                    }
                }

                //If there is at least an image to apply the effect
                if(dataImg !== undefined && dataImg !== ''){
                    //Get custom transition time. If any, use is for this block
                    dataTransitionTime = jQuery(this).attr('data-prz-transition-time');
                    if(dataTransitionTime === undefined){ dataTransitionTime = defaults.transitionTime };

                    //Get custom opacity. If any, use is for this block
                    dataOpacity = jQuery(this).attr('data-prz-opacity');
                    if(dataOpacity === undefined){ dataOpacity = defaults.opacity };

                    //Get custom overflow. If any, use is for this block
                    dataOverflow = jQuery(this).attr('data-prz-overflow');
                    if(dataOverflow === undefined){ dataOverflow = defaults.overflow };

                    //Get custom cursor. If any, use is for this block
                    dataCursor = jQuery(this).attr('data-prz-cursor');
                    if(dataCursor === undefined){ dataCursor = defaults.cursor };

                    //Initialize index to assign an unique ID that will be used to match mouse detectors / user content / parazoom containers
                    dataIndex = i;
                    jQuery(this).attr('data-prz-id', dataIndex);
                    i++;

                    //Get user content data required to build a parazoom container (under user content) and detector (above user content)
                    dataHeight = jQuery(this).outerHeight();
                    dataWidth = jQuery(this).outerWidth();
                    dataPosition = jQuery(this).offset();
                    dataPaddingTop = parseInt(jQuery(this).css('padding-top'));
                    dataPaddingRight = parseInt(jQuery(this).css('padding-right'));
                    dataPaddingLeft = parseInt(jQuery(this).css('padding-left'));
                    dataFinalWidth = dataWidth+dataPaddingLeft+dataPaddingRight;
                    //For each user content block, add a custom parazoom container just before </body> tag
                    jQuery('body')
                        .append('<div class="prz-container" data-prz-id="'+dataIndex+'" style="top:'+dataPosition.top+'px; left:'+dataPosition.left+'px; width:'+dataWidth+'px; height:'+dataHeight+'px; overflow:'+dataOverflow+'; opacity:'+dataOpacity+'"><div class="prz-overlay" data-prz-img="'+dataImg+'" data-prz-id="'+dataIndex+'" style="background-image:url('+dataImg+'); transition-property:transform,opacity; transition-duration: '+dataTransitionTime+'"></div></div>');
                    //Mouse detector
                    //To avoid loosing the mouse position over the user content block, we place a <div> that hovers the user content
                    jQuery(this)
                        .prepend('<div class="prz-detector-container" data-prz-id="'+dataIndex+'" style="top:-'+dataPaddingTop+'px; left:-'+dataPaddingLeft+'px; width:'+dataFinalWidth+'px"><div class="prz-detector" data-prz-id="'+dataIndex+'" style="height:'+dataHeight+'px"></div></div>')
                        //To let the Parazoom container appear, we need to be sure that there is no background color, nor background image
                        .css({
                            backgroundColor:'transparent',
                            backgroundImage: 'none',
                            //Cursor CSS property
                            cursor: dataCursor
                        });
                    //When all done, add prz-set CSS class to the user content element
                    jQuery(this).addClass('prz-set');

                }
            })

            //When user clicks, we add an event
            .on('click',function(){
                // Create the event.
                var event = document.createEvent('Event');
                // Define that the event name is 'build'.
                event.initEvent('przClick', true, true);
                // Listen for the event.
                this.addEventListener('przClick', function (e) {
                  // e.target matches elem
                }, false);
                // target can be any Element or other EventTarget.
                this.dispatchEvent(event);
            })

            //On the event przClick
            .on('przClick', function(e){
                //If a function is passed through options arguments
                if(options.onClick !== undefined){
                    options.onClick();
                }
                //Get optional link data attribute
                dataLink = jQuery(this).attr('data-prz-link');
                //If set, use it in priority
                if(dataLink !== undefined){
                    window.location.href = dataLink;
                //If not
                }else{
                    //User content has a link and useFirstLink set to 'true'?
                    dataFirstLink = jQuery(this).find('a').eq(0).attr('href');
                    if(dataFirstLink !== undefined && defaults.useFirstLink == true){
                        window.location.href = dataFirstLink;
                    }
                }

            })

            .on('mouseenter', function(e){
                if(jQuery(this).hasClass('prz-set')) {
                    dataWidth = jQuery(this).outerWidth();
                    dataHeight = jQuery(this).outerHeight();
                    dataScale = jQuery(this).attr('data-prz-scale');
                    if(dataScale === undefined){ dataScale = defaults.scale; }

                    dataOpacity = jQuery(this).attr('data-prz-opacity');
                    if(dataOpacity === undefined){ dataOpacity = defaults.opacity; }

                    dataOpacityHover = jQuery(this).attr('data-prz-opacity-hover');
                    if(dataOpacityHover === undefined){ dataOpacityHover = defaults.opacityHover; }

                    dataTransitionTime = jQuery(this).attr('data-prz-transition-time');
                    if(dataTransitionTime === undefined){ dataTransitionTime = defaults.dataTransitionTime; }

                    dataCursor = jQuery(this).attr('data-prz-cursor');
                    if(dataCursor === undefined){ dataCursor = defaults.cursor; }

                    // dataImg = jQuery(this).attr('data-prz-img');
                    dataLargeImg = jQuery(this).attr('data-prz-large-img');
                    targetID = jQuery(this).attr('data-prz-id');
                    var jQtarget = jQuery('.prz-overlay[data-prz-id="'+targetID+'"]');

                    if(dataLargeImg !== undefined){
                        //Time you wait for the large img
                        var jQcurrentNode = jQuery(this);
                        jQcurrentNode.css({cursor:'wait'});
                        var img = $('<img src="'+dataLargeImg+'">');
                        img.on('load',function(){
                            //Large image is loaded
                            jQtarget
                                .css({
                                    backgroundImage: 'url('+dataLargeImg+')'
                                })
                            jQcurrentNode.css({cursor:dataCursor});
                        });
                    }
                    jQtarget.css({
                        transform: 'scale('+dataScale+')',
                        opacity: dataOpacityHover,
                        transitionDuration: dataTransitionTime
                    });

                }
            })

            .on('mousemove', function(e){
                targetID = jQuery(this).attr('data-prz-id');
                if(dataImg !== undefined) {
                    jQuery('.prz-overlay[data-prz-id="'+targetID+'"]').css({
                        transformOrigin: (100 * e.offsetX / dataWidth)+'% '+(100 * e.offsetY / dataHeight)+'% 0px'
                    });
                }
            })

            .on('mouseleave', function(e){
                targetID = jQuery(this).attr('data-prz-id');
                dataTransitionTimeLeave = jQuery(this).attr('data-prz-transition-time-leave');
                if(dataTransitionTimeLeave === undefined){ dataTransitionTimeLeave = defaults.dataTransitionTimeLeave; }
                var jQtarget = jQuery('.prz-overlay[data-prz-id="'+targetID+'"]');
                if(dataLargeImg!==undefined){
                    var dataSourceImg = jQtarget.attr('data-prz-img');
                    jQtarget.css({
                        backgroundImage: 'url('+dataSourceImg+')'
                    });
                }
                // console.log(dataImg);
                jQtarget.css({
                    transform: 'scale(1)',
                    opacity: dataOpacity,
                    transitionDuration: dataTransitionTimeLeave
                });
            });


            jQuery(window).on('resize', function(){
                jQuery('.prz-set').each(function(){
                    dataHeight = jQuery(this).outerHeight();
                    dataWidth = jQuery(this).outerWidth();
                    dataPosition = jQuery(this).offset();
                    dataIndex = jQuery(this).attr('data-prz-id');
                    dataPaddingTop = parseInt(jQuery(this).css('padding-top'));
                    dataPaddingRight = parseInt(jQuery(this).css('padding-right'));
                    dataPaddingLeft = parseInt(jQuery(this).css('padding-left'));
                    dataFinalWidth = dataWidth + dataPaddingLeft + dataPaddingRight;
                    jQuery('.prz-container[data-prz-id="'+dataIndex+'"]').css({
                        'top': dataPosition.top+'px',
                        'left': dataPosition.left+'px',
                        'width': dataWidth+'px',
                        'height': dataHeight+'px'
                    });
                    jQuery('.prz-detector-container[data-prz-id="'+dataIndex+'"]').css({
                        'top': '-'+dataPaddingTop+'px',
                        'left': '-'+dataPaddingLeft+'px',
                        'width': dataFinalWidth +'px'
                    });
                    jQuery('.prz-detector[data-prz-id="'+dataIndex+'"]').css({
                        height: dataHeight+'px'
                    });
                })
            });
    };

}(jQuery));
