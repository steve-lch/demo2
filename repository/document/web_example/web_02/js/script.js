$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
	  loop: true,
	  items: 1,
	  center: true,
	  nav: true,
	  responsive:{
		  600:{
			  item: 1,
		  }
	  }
  });
});

$(function () {
	$(".sm-search-caller").click(function(e){
   		$("#search-form").fadeIn();
     	e.stopPropagation();
	});

$("#search-form").click(function(e){
    e.stopPropagation();
});

$(document).click(function(){
    $("#search-form").fadeOut();
	});
});

$('.dropdown-toggle').click(function(e) {
  if ($(document).width() > 768) {
    e.preventDefault();

    var url = $(this).attr('href');

       
    if (url !== '#') {
    
      window.location.href = url;
    }

  }
});