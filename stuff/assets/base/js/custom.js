$(document).ready(function() {

    $(".navigate").click(function(e) {
        e.preventDefault();
        var divname =$(this).data("divname");
        $('.navigateDiv').hide();
        $('.'+divname).show();
        $('.team').toggle();
        $("html, body").animate({ scrollTop: 0 }, "slow");

        
    return false;
    });
    

    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
      });

      $(".backbtn").click(function(e) {
        e.preventDefault();
        var divname =$(this).data("divname");
        $('.navigateDiv').toggle();
        $('.team').toggle();

        var $container = $("html,body");
        var $scrollTo = $('.vf_team');

        $container.animate({scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},300);
    return false;
    });
    
        
    
});

// $(document).ready(function(){
//     if(window.location.href.indexOf('index') > -1) // or 0 
//     window.location.href = window.location.href.replace('index', ''); 
//  });