# jQuery Sticker #

The jQuery Sticker plugin allows you to create elements that "stick" to the top of the page (or a specified offset) when the user scrolls down the page. You can also make the element's bottom sticky, so that instead of overlapping an element below it, its bottom sticks to that element's top.

## Options ##

* yOffset (integer): the vertical point in pixels at which the element should be fixed (default is 0, the top of the page)
* stopper (element or integer): the point at which the element should stick its bottom
* throttle (integer): the number of milliseconds to wait during window scroll before re-calculating positioning info

## Dependencies ##

* [jQuery][http://jquery.com] 1.4+
* "Cowboy" Ben Alman's [jQuery throttle / debounce] (https://github.com/cowboy/jquery-throttle-debounce)

## Usage ##

Include jquery.sticker.min.js, like so:

	<script src="js/jquery.sticker.js"></script>

Call the plugin on the set of elements which you'd like to make sticky:

	$('.sticky').sticker();

Done! The above will make all elements with the "sticky" class stick to the top of the page when the user scrolls down.

Here's another call with all of the options specified:

	$('.sticky').sticker({
		yOffset: 40,
		stopper: '.footer',
		throttle: 15
	});

The above will stick the elements in place starting at 40 pixels below the top of the document. It will prevent the sticky element from overlapping the element with the "footer" class by making its bottom stick to the top of the footer when the user scrolls down far enough. The calculations necessary for the conditional positioning of the sticky elements will happen every 15 milliseconds as the user is scrolling.