/**
 * jQuery Tree plugin
 * v0.1.1
 *
 * @author	Dave Widmer (dwidmer@bgsu.edu)
 */
var tree = (function(){
	// The default options
	var defaults = {
		'handle': "h3",
		'content': "div",
		'handleClass': "tree-handle",
		'collapsedClass': "tree-collapsed",
		'expandedClass': "tree-expanded",
		'animation':false,
		'animationSpeed':"normal"
	}

	// The current options
	opts = {},

	// A list of the clickable handles in the tree.
	handles = [],

	/**
	 * Initializes the tree.
	 *
	 * @param	options	The user options for the tree
	 */
	init = function(options){
		opts = $.extend({}, defaults, options);

		return $(this).each(function(index, element){
			setupList(element);
		});
	},

	/**
	 * Setup the list.
	 *
	 * @param	list	The Ul or OL to setup as a tree.
	 */
	setupList = function(list){
		$(list).each(function(index, ele){
			// Loop through and find all of the "handles"
			$(ele).find(opts.handle).each(function(i, h){
				handles.push(h);

				$(h).addClass(opts.handleClass);
				h.content = $(h).siblings(opts.content)[0];
				$(h.content).addClass(opts.collapsedClass);
				$(h).click(function(e){
					e.preventDefault();
					$(this).toggleClass(opts.expandedClass);

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
				});
			});
		});
	},

	/**
	 * Unifys the tree on the screen. (open or closed...)
	 *
	 * @param	val	boolean if they should be open or closed
	 */
	unify = function(val){
		for (var i = 0, len = handles.length; i < len; i += 1){
			if ($(handles[i]).hasClass(opts.expandedClass) === val){
				$(handles[i]).click();
			}
		}
	},

	/**
	 * Opens (expands) the tree.
	 */
	expandAll = function(){
		unify(false);
	},

	/**
	 * Closes (collapses) the tree.
	 */
	collapseAll = function(){
		unify(true);
	};

	// Return the public properties/methods...
	return {
		'init': init,
		'expandAll': expandAll,
		'collapseAll': collapseAll
	};
})();

// Activate the plugin
(function($){
	$.fn.tree = tree.init;
})(jQuery);
