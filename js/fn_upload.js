
//Resolution detection
var videoRes = document.createElement("video");
videoRes.addEventListener("loadedmetadata", loadedMetaData);

function loadedMetaData()
{
    if ( videoRes.videoWidth < 2880 || videoRes.videoHeight < 1440 ) {
        // error message
        // jQuery('#phase1-drag-drop-error span:nth-child(2)').html( document.getElementById('upload.error.wrong_res').innerHTML );
        // document.getElementById('upload_error_vid_w').innerHTML = videoRes.videoWidth;
        // document.getElementById('upload_error_vid_h').innerHTML = videoRes.videoHeight;
        // jQuery('#phase1-drag-drop-error').removeClass('none');
        // jQuery('#phase1-drag-drop').addClass('none');
        //
        // resetToPhase1();
        console.log('resolution not enough');
        return false;
    }
}

//Upload steps
//Initial step
var currentStep = 1;
var steps = function(id) {
    //An argument is defined
    if(id !== undefined){
        //Get the value of the video title input
        var titleContent = jQuery('#input_video_title').val();
        //Get the value of the video description textarea
        var descriptionContent = jQuery('#input_video_description').val();
        //Get the value of the video category select
        var categoryContent = jQuery('#video_category').val();
        //Get the value of the video privacy select
        var privacyContent = jQuery('#video_privacy').val();
        //Apply video title to the preview container
        jQuery('.editor .preview h1').text(titleContent);
        //Apply video desctipion to the preview container
        jQuery('.editor .preview p').text(descriptionContent);
        //Adjust opacity on #KolorEyesPlayerEdit
        if(currentStep == 2){
            jQuery('#KolorEyesPlayerEdit').addClass('full');
        }else{
            jQuery('#KolorEyesPlayerEdit').removeClass('full');
        }
        //If id argument =='next', manage next step jump
        if(id == 'next'){
            //If at least step 2 and title + description inputs are NOT entered
            if((currentStep > 1) && (titleContent.length < 1 || categoryContent.length < 1 || privacyContent.length < 1)){
                jQuery('#error-modal')
                    .modal('show')
                    .find('p').text('At least one field is missing and must be completed')
                    .find('h1').text('Oops');
            //If at least step 2 and title + description input are entered
            }else{
                //If 'describe your moment' is valid, enable 'orientation' and 'thumbnail' buttons
                if(currentStep > 1){
                    jQuery('.btn-tabulation[data-target]').removeAttr('disabled');
                }
                //Prepare next step
                var nextStep = currentStep+1;
                var targetID = nextStep.toString();
                //Go to next step
                steps('s'+targetID);
            }
        //If id argument !='next', go to a specific step
        }else{
            //Want to go to a particular step, but we check if:
            //  - Video title and description are entered
            //  - The current step

            //Get steps with the step id
            var jQtargets = jQuery('[data-steps~="'+id+'"]');
            //If there are targets steps
            if(jQtargets.length > 0) {
                //Check current step and requirements
                if((currentStep > 1) && (titleContent.length < 1 || categoryContent.length < 1 || privacyContent.length < 1)){
                    //You have asked for a step but your video title and description are not valid
                    jQuery('#error-modal')
                        .modal('show')
                        .find('p').text('At least one field is missing and must be completed')
                        .find('h1').text('Oops');
                    //Then Disable inelligible buttons
                    jQuery('.btn-tabulation[data-target="s3"],.btn-tabulation[data-target="s4"]').attr('disabled','');
                //Valid current step and requirements
                }else{

                    //Hide all steps
                    jQuery('[data-steps]').hide();
                    //Show only current step
                    jQtargets.show();
                    //Match tabulation buttons to the current step
                    jQuery('.btn-tabulation[data-target]').removeClass('active');
                    jQuery('.btn-tabulation[data-target="'+id+'"]').addClass('active');
                    //Special case for final preview
                    // if(currentStep == 4){
                    //
                    //     jQuery('.btn-tabulation[data-target="s4"]').addClass('active');
                    // }
                    //Update the current step as a number
                    id = id.replace('s','');
                    id = parseFloat(id);
                    currentStep = id;
                }
            //No steps detected,
            }else{
                return false;
            }
        }
    //No argument
    }else{
        //Then initialize
        jQuery('[data-steps~="s'+currentStep.toString()+'"]').show();
    }
}

jQuery(document).ready(function() {

    /**
    * Upload process
    */
    var uploadProcessSource = jQuery('.upload-process');
    var step1 = uploadProcessSource.find('.step-1');
    var step2 = uploadProcessSource.find('.step-2');
    var notificationBar = uploadProcessSource.find('.notification-bar');

    //Add a listener on the btn-file
    jQuery(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    //File selected
    jQuery('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        //File already selected but re open the select file and user cancels the operation. Then return to start
        if(numFiles==0){
            // step2.removeClass('opened');
            // step1.addClass('opened');
            return;
        }

        //Extensions allowed
        var exts = '.mp4';

        //Extension of the selected file
        var lastFour = label.substr(label.length -4);
        lastFour = lastFour.toLowerCase();

        //If file extension check is OK
        if(exts.indexOf(lastFour)>-1){
            steps('next');
            // //Switch to step 2
            // step1.removeClass('opened');
            // step2.addClass('opened');
            // //Close notification bar
            // notificationBar.removeClass('opened danger warning success');
            // //File name
            // uploadProcessSource.find('.filename').text(label);
        //If file extension is wrong
        }else{
            alert('no good file');
            // notificationBar.addClass('opened danger');
            // notificationBar.find('p').html(upload_process_warning_wrong_extension+': <strong>'+exts+'</strong>');
            // step2.removeClass('opened');
            // step1.addClass('opened');
        }
    });

    //Click to close the notification bar
    // notificationBar.find('button').on('click', function(e){
    //     e.preventDefault();
    //     notificationBar.removeClass('opened danger warning success');
    // });
    //
    // //Click on remove already selected file
    // uploadProcessSource.find('.btn-file .remove').on('click', function(){
    //     step2.removeClass('opened');
    //     step1.addClass('opened');
    // });



    checkboxBehavior();
    selectFormReplacer();

    //Initialize upload steps
    steps();


    //Click on a tabulation button
    jQuery('.btn-tabulation[data-target]').on('click', function(e){
        e.preventDefault();
        steps(jQuery(this).attr('data-target'));
        jQuery('input#get-preview')
            .prop('checked', false)
            .closest('.form-checkbox').removeClass('checked');
    });
    //Click on the special button 'final-preview'
    jQuery('#final-preview').on('click', function(e){

        if(jQuery(this).find('input').prop('checked')){
            steps('next');
        }else{
            steps('s4');
        }
        jQuery('.btn-tabulation[data-target="s4"]').addClass('active');
    });
    //Click on a element with data-target="next" attribute
    jQuery('[data-target="next"]').on('click', function(e){
        e.preventDefault();
        //Special exception for final preview
        if(currentStep < 4){
            steps('next');
            // jQuery('input#get-preview')
            //     .prop('checked', true)
            //     .closest('.form-checkbox').addClass('checked');
        }
        //Redirection if step 5
        if(currentStep == 5){
            window.location.replace("upload-success.html");
        }
    });

    //Display passwords fields if privacy 'private' is set
    if(jQuery('.select-inner.select-video_privacy li[data-value="4"]').hasClass('active')){
        jQuery('.passwords').show(300);
    }else{
        jQuery('.passwords').hide();
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

    ////File type check
    jQuery('form input.dragdrop').on('change', function(event) {
        console.log('file loaded');

        // Filename path
        jQuery('#video_filename').val( event.currentTarget.value );

        var file = this.files[0];

        if ( file.type.match("video/*") ) {
            var fileURL = window.URL.createObjectURL(file);
        } else {
            // jQuery('#phase1-drag-drop-error span:nth-child(2)').html( document.getElementById('upload.error.no_mp4').innerHTML + file.type );
            // jQuery('#phase1-drag-drop-error').removeClass('none');
            // jQuery('#phase1-drag-drop').addClass('none');
            //
            // resetToPhase1();

            console.log('not a video');
            return false;
        }

        videoRes.src = fileURL;
        // then waiting for the videoRes metadata listener to be caught, needs to be asynchronous
        // should be rather quick
    });


});
jQuery(window).load(function(){

})
jQuery(window).resize(function(){

});
