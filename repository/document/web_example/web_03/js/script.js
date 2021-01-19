window.onload = function() {
	$(".loading-screen").fadeOut(2000);
};

$(document).ready(function () {
  var mySwiper = new Swiper ('.swiper-container', {
    slidesPerView: 'auto',
	spaceBetween: 10,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	}
  });
});