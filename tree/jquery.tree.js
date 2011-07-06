/**
 * jQuery Tree plugin
 *
 * @author	Dave Widmer (dwidmer@bgsu.edu)
 */
(function($){
	/**
	 * The +/- tree for lists.
	 */
	var tree = (function(){
		// The default options
		var defaults = {
			'handle': "h3",
			'content': "div",
			'collapsedClass': "tree-collapsed",
			'expandedClass': "tree-expanded",
			'animation':false,
			'animationSpeed':"normal"
		};

		// The current options
		var opts = {};

		/**
		 * Initializes the tree.
		 *
		 * @param	options	The user options for the tree
		 */
		var init = function(options){
			opts = $.extend({}, defaults, options);

			return $(this).each(function(index, element){
				setupList(element);
			});
		};

		/**
		 * Setup the list.
		 *
		 * @param	list	The Ul or OL to setup as a tree.
		 */
		var setupList = function(list){
			$(list).each(function(index, ele){
				// Loop through and find all of the "handles"
				$(ele).find(opts.handle).each(function(i, h){
					$(h).addClass('tree-handle');
					h.content = $(h).siblings(opts.content)[0];
					$(h.content).addClass(opts.collapsedClass);
					$(h).click(function(e){
						e.preventDefault();
						$(this).toggleClass(opts.expandedClass);

						if (opts.animation === false){
							// No animation
							$(this.content).toggleClass(opts.collapsedClass);
						} else {
							// Throw some interactivity in there!!
							switch (opts.animation){
								case "slide":
									$(this.content).slideToggle(opts.animationSpeed).toggleClass(opts.collapsedClass);
									break;
								case "fade":
									$(this.content).fadeToggle(opts.animationSpeed).toggleClass(opts.collapsedClass);
									break;
								default:
									// Just change the class
									$(this.content).toggleClass(opts.collapsedClass);
							}
						}
					});
				});
			});
		};

		// Return the public properties/methods...
		return {
			'init': init
		};
	})();

	// Activate the plugin
	$.fn.tree = tree.init;
})(jQuery);
