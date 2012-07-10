/*!
 * jQuery Sticker - v0.1 - 7/10/2012
 * https://github.com/chrisfranson/jquery-sticker
 * 
 * Copyright (c) 2012 Chris Franson
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
	
	var methods = {
		
		init: function(options) {
			
			var settings = {
				yOffset: 0,
				throttle: 10,
				stopper: false
			};
			
			return this.each(function() {
				
				if (options) $.extend(settings, options);
				
				var $sticker = $(this),
				
					// Make a new copy of settings for this sticker element only
					stickerSettings = $.extend({}, settings);

				// Calculate the window.scrollTop() value for which to fix the sticker
				stickerSettings.scrollThreshold = (stickerSettings.yOffset * -1) + $sticker.offset().top - parseInt($sticker.css('margin-top'), 10);
				
				// Create an invisible placeholder to preserve the page's layout when we switch
				// the sticker's position to 'fixed'
				$sticker.data('placeholder', $('<div>')
					// Set layout CSS to be the same as the original, but make it invisible
					.css({
						position: $sticker.css('position'),
						marginLeft: $sticker.css('marginLeft'),
						marginRight: $sticker.css('marginRight'),
						marginTop: $sticker.css('marginTop'),
						'float': $sticker.css('float'),
						visibility: 'hidden'
					})
					.width($sticker.outerWidth())
					.height($sticker.outerHeight())
					.hide()
				);
				
				// Add the hidden element to the DOM right now
				$sticker.data('placeholder').insertBefore($sticker);
				
				// Remember some layout CSS for when we switch the position back to the original position
				$sticker.data('originalLayout', {
					position: $sticker.css('position'),
					top: $sticker.css('top'),
					left: $sticker.offset().left - parseInt($sticker.css('margin-left'), 10)
				})

				// If a stopper (element or integer) is provided, we have to do some funky stuff in order to
				// butt the bottom of the sticker up against the top of the stopper. This is because
				// we don't know if the sticker's parents have a position other than static.
				if (settings.stopper) {

					// Calculate the window.scrollTop() value for which to make the sticker's bottom
					// butt up against the top of the stopper
					stickerSettings.stopperTop = ($.isNumeric(settings.stopper)) ? settings.stopper : $(settings.stopper).offset().top;
					
					stickerSettings.stopperTop -= (stickerSettings.yOffset
												   + $sticker.outerHeight()
						 						   + parseInt($sticker.css('margin-top'), 10)
						 						   + parseInt($sticker.css('margin-bottom'), 10)
												  );
				}

				// Whenever the user scrolls, check to see how the window's scroll position should affect
				// the sticker's position, and update it's position/offset accordingly
				$(window).scroll(

					// settings.throttle allows the user to specify how CPU intensive this effect should be
					$.throttle(settings.throttle, function() {

						// y = the current scroll position of the window
						var y = $(this).scrollTop();

						// If the user has scrolled below the threshold for stickiness
						if (y >= stickerSettings.scrollThreshold) {

							// If a stopper is specified and the user has scrolled to the point where
							// the bottom of the sticker would overlap the top of the stopper
							if (settings.stopper && y >= stickerSettings.stopperTop) {

								// Set the sticker's position to absolute, and its left and top to the proper values
								$sticker
									.css({
										position: 'absolute'
									})
									.offset({
										top: stickerSettings.yOffset + stickerSettings.stopperTop + parseInt($sticker.css('margin-bottom')),
										left: $sticker.data('originalLayout').left + $sticker.css('margin-left')
									});

							}
							
							// If no stopper was specified, or if the user hasn't scrolled to the point
							// where the sticker would overlap the stopper
							else {
								
								// Set the sticker's position to fixed, and its left and top to the proper values
								$sticker.css({
									position: 'fixed',
									left: $sticker.data('originalLayout').left,
									top: stickerSettings.yOffset
								});

								// Show the placeholder so that the sticker's parents don't change their width or height
								$sticker.data('placeholder').show();
							}
						}
						
						// If the user has scrolled above the threshold for stickiness
						else {

							// Set the sticker's CSS back to its original values for position and top
							var originalLayout = $sticker.data('originalLayout')
							$sticker.css('position', originalLayout.position);
							$sticker.css('top', originalLayout.top);
							
							// Hide the placeholder now that the sticker has its original position
							$sticker.data('placeholder').hide();

						}
					})
				);

			});
			
		} // init method

	};

	// Create the jQuery plugin
	$.fn.sticker = function(method) {
		if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
		else $.error('jQuery.sticker doesn\'t have a "' + method + '" method');
	};

})(jQuery);
