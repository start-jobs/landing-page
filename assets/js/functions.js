$(function(){

	/* Call the OWL */

	if($('.hero-slider .owl-carousel').length) {
		$('.hero-slider .owl-carousel').owlCarousel({
			margin: 0,
			items: 1,
			dots: true,
			nav: false
		});
	}

	if($('.products-carousel .owl-carousel').length) {
		$('.products-carousel .owl-carousel').owlCarousel({
			margin: 10,
			items: 4,
			dots: false,
			nav: true,
			loop: true,
			responsive : {
				0: {
					items: 1
				},

				576: {
					items: 2
				},

				992: {
					items: 3
				},

				1200: {
					items: 4
				}
			}
		});
	}

	if($('.posts-carousel .owl-carousel').length) {
		$('.posts-carousel .owl-carousel').owlCarousel({
			margin: 0,
			items: 2,
			dots: false,
			nav: true,
			loop: true,
			responsive : {
				0: {
					items: 1
				},

				768: {
					items: 2
				}
			}
		});
	}
	
	/* Mobile header menu */

 	$('#main-header .menu-toggle').on('click', function() {
 		$(this).toggleClass('opened');
 		$('#main-header').toggleClass('mobile-nav-opened');
 		
 		if($(this).hasClass('opened')) {
			$('#nav-overlay').addClass('active');
 			$('#main-header .nav-holder').animate({ right: 0 }, 250);

		} else {
			$('#nav-overlay, #main-header .nav-holder').removeClass('active');
 			$('#main-header .nav-holder').animate({ right:'-100%' }, 200);
		}
 				
 		return false;
 	});


 	$(document).on('click', '#main-header .nav-holder .close-menu, #nav-overlay', function(){
 		$('#main-header').removeClass('mobile-nav-opened');
 		$('#main-header .menu-toggle').removeClass('opened');
		$('#nav-overlay').removeClass('active');
		$('#main-header .nav-holder').animate({right:'-100%' }, 200);	

		return false;
	});

	/* Map filter */

	$('.show-on-map').on('click', function(){
		var lat = $(this).data('lat');
		var lng = $(this).data('lng');
		var logo = $(this).data('logo');

		var markers2 = [
			{
			  coords:{lat: lat, lng: lng},
			  shopLogo: logo
			}
		];

		initMap(showOnMap = 1, markers2, lat, lng);

		return false;
	});

	$('.map-filter form').on('submit', function() {
		var shopsCoords = $(this).find('select').val();

		if(shopsCoords != '') {
			shopsCoordsArray = shopsCoords.split(',');
			shopsCoordsArray.pop();
			
			var shopSizeRegular = false;
			var shopSizeMini = false;

			var centerLat;
			var centerLng;


			$(this).find('input[type="checkbox"]').each(function(){
				if($(this).prop('checked')) {
					if($(this).val() == 'regular') {
						shopSizeRegular = true;
					} else if($(this).val() == 'mini') {
						shopSizeMini = true;
					}
				}
			});

			
			var markers2 = [];
			
			for(var i = 0; i < shopsCoordsArray.length; i++){

				var splitedArray = shopsCoordsArray[i].split('|');
				var shopSizeSplited = splitedArray[3];

				centerLat = parseFloat(splitedArray[0], 10);
				centerLng = parseFloat(splitedArray[1], 10);


				if(shopSizeMini == true && shopSizeRegular == false) {
					if(shopSizeSplited == 'mini') {
						var lat = parseFloat(splitedArray[0], 10);
						var lng = parseFloat(splitedArray[1], 10);
						var logo = 'assets/img/'+splitedArray[2];

						markers2.push({
							coords:{lat:lat, lng:lng},
							shopLogo: logo
						});
					}
				} else if(shopSizeMini == false && shopSizeRegular == true) {
					
					if(shopSizeSplited == 'regular') {
						var lat = parseFloat(splitedArray[0], 10);
						var lng = parseFloat(splitedArray[1], 10);
						var logo = 'assets/img/'+splitedArray[2];

						markers2.push({
							coords:{lat:lat, lng:lng},
							shopLogo: logo
						});
					}
					
				} else {
					var lat = parseFloat(splitedArray[0], 10);
					var lng = parseFloat(splitedArray[1], 10);
					var logo = 'assets/img/'+splitedArray[2];

					markers2.push({
						coords:{lat:lat, lng:lng},
						shopLogo: logo
					});
				}
			}
	
			initMap(showOnMap = 1, markers2, centerLat, centerLng);
		}

		return false;
	});
});