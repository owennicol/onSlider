(function ($) {


	$.fn.onSlider = function (options) {

		var defaults = {
			speed: 2000,
			pause: 1000,
			transition: 'fade'
		},
			options = $.extend({}, defaults, options);

		var arrayOfImages = [];

		this.each(function () {
			
			var $this = $(this);

			
			arrayOfImages.push($this.find('img').attr('src'));
			
			console.log(arrayOfImages);

			$this.wrap('<div class="slider-wrap" />');

			if (options.pause <= options.speed) {
				options.pause = options.speed + 100;
			}

			$this.css({
				width: '99999px',
				position: 'relative',
				padding: 0
			});

			if (options.transition === 'slide') {
				$this.children().css({
					float: 'left',
					listStyle: 'none'
				});

				$('.slider-wrap').css({
					width: $this.children().width(),
					overflow: 'hidden'
				});

				slide();
			} //end slide if

			if (options.transition === 'fade') {
				$this.children().css({
					width: $this.children().width(),
					position: 'absolute',
					left: 0
				});

				for (var i = $this.children().length - 1, y = 0; i >= 0; i--, y++) {
					$this.children().eq(y).css({
						zIndex: i + 99999
					});
				}

				fade();


			} // end fade if

			function fade() {
				setInterval(function () {
					$this.children(':first').animate({
						'opacity': 0
					}, options.speed, function () {
						$this
							.children(':first')
							.css({
							'opacity': 1
						})
							.css({
							'zIndex': $this.children(':last').css('zIndex') - 1
						})
							.appendTo($this);
					});
				}, options.pause);
			} //end fade


			function slide() {
				setInterval(function () {
					$this.animate({
						'left': '-' + $this.parent().width()
					}, options.speed, function () {
						$this
							.css('left', 0)
							.children(':first')
							.appendTo($this);
					});
				}, options.pause);
			} //end slide

		});
		
		preload(arrayOfImages);
		
		function preload(arrayOfImages) {
			$(arrayOfImages).each(function () {
				$('<img/>')[0].src = this;
			});
		}
		
	

		return this;

	};


})(jQuery);