$(document).ready(function () {
    const socket = io();

    $(".navigate").click(function (e) {
        e.preventDefault();
        var divname = $(this).data("divname");
        $('.navigateDiv').hide();
        $('.' + divname).show();
        $('.team').toggle();
        $("html, body").animate({ scrollTop: 0 }, "slow");


        return false;
    });


    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    $(".backbtn").click(function (e) {
        e.preventDefault();
        var divname = $(this).data("divname");
        $('.navigateDiv').toggle();
        $('.team').toggle();

        var $container = $("html,body");
        var $scrollTo = $('.vf_team');

        $container.animate({ scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0 }, 300);
        return false;
    });


    $('.vic_volunteer_form_submit').submit(function (e) {
        e.preventDefault();

        $('.vic_volunteer_form_submit_btn', this).html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');

        setTimeout(() => {
            socket.emit('volunteer', {
                nameFirst: $('.nameFirst').val(),
                nameLast: $('.nameLast').val(),
                email: $('.email').val(),
                phone: $('.phone').val(),
                whatsapp: $('.whatsapp').val(),
                addressl1: $('.addressl1').val(),
                state: $('.state').val(),
                country: $('.country').val(),
                gender: $('.gender').val(),
                age: $('.age').val(),
                social_media: $('.social_media').val(),
                occupation: $("input[name='occupation']:checked").val(),
                job_title: $('.job_title').val(),
                job_desc: $('.job_desc').val(),
                reason: $('.reason').val(),
                support: $('.support').val(),
                question: $('.question').val(),
                event: $("input:checkbox[name='event']:checked").val(),
                fundraising: $("input:checkbox[name='fundraising']:checked").val(),
                socialMedia: $("input:checkbox[name='socialMedia']:checked").val(),
                volunteer: $("input:checkbox[name='volunteer']:checked").val(),
                globalImageHolder: globalImageHolder
            });
        }, 500);

        //Get response
        socket.on('_volunteer', (data) => {
            if (data.type == 'error') {
                $('.vic-alert').html(`
                    <div class=" alert alert-danger  alert-dismissible fade show col-12" role="alert"> ${data.message} 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                $('.vic-alert').html(`
                <div class=" alert alert-success alert-dismissible fade show col-12" role="alert"> ${data.message} 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
            globalImageHolder =[];
            $('.volunteer, .nameFirst, .nameLast, .email, .phone, .whatsapp, .addressl1, .state, .country, .gender, .age, .social_media, .job_title, .job_desc, .reason, .support, .question').val('');
            $('.occupation, .event, .fundraising, .socialMedia, .volunteer').prop('checked', false);
            $('.vic_volunteer_form_submit_btn').html('Submit Form <span class="mbrib-chat mbr-iconfont mbr-iconfont-btn"></span>');
            }
        });
    });


    //Display image on select
    $('.vic_upload_image_source').change(function(event){
        //Get image element into target variable
        let target = document.getElementById('vic_image_upload');
        //Initiate file reader
        let reader = new FileReader();
        //Read file using the targeted event to be display in the image tag
        reader.readAsDataURL(event.target.files[0]);
        //Load read data into the src of the image tag
        reader.onload = function(e) {
            target.src = this.result;
        }
        convertImageForUpload(event);
    });

    //Function to convert image for upload
    let globalImageHolder = [];
    function convertImageForUpload(event) {
        let reader = new FileReader();
        let slice = event.target.files[0].slice(0, event.target.files[0].size);
        reader.readAsArrayBuffer(slice);
        reader.onload = function() {
            globalImageHolder.push({
                name: event.target.files[0].name, 
                type: event.target.files[0].type, 
                size: event.target.files[0].size, 
                data: reader.result 
            });
        }
    }
});