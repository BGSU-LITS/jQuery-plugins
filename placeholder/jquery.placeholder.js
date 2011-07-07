/**
 * jQuery Placeholder plugin
 *
 * @author	Dave Widmer (dwidmer@bgsu.edu)
 */
(function($){
	// Only run this if native support doesn't exist
	if ( ! ('placeholder' in document.createElement('input'))){
		var forms = [],
			inputs = [];

		// Initialization
		$(document).ready(function(){
			$('input[placeholder],textarea[placeholder]').each(function(i, ele){
				inputs.push(ele);

				var f = $(ele).parents('form')[0];
				if ($.inArray(f, forms) === -1){
					forms.push(f);
				}
			});

			setupInputs();
			setupForms();
		});

		// Get the inputs ready
		var setupInputs = function(){
			$(inputs).each(function(i, ele){
				$(ele).focus(function(){
					if (ele.value === ele.placeholder){
						ele.value = "";
						$(ele).removeClass('placeholder');
					}
				}).blur(function(){
					if (ele.value === ""){
						ele.value = ele.placeholder;
						$(ele).addClass('placeholder');
					}
				}).blur();
			});
		};

		// Get the forms ready
		var setupForms = function(){
			$(forms).each(function(i, f){
				f.placeholders = $('input[placeholder],textarea[placeholder]');

				// Make sure we clear out the values for the placeholders only...
				$(f).submit(function(e){
					$(f.placeholders).each(function(i, ele){
						if (ele.value === ele.placeholder){
							ele.value = "";
						}
					});

					return true; // actually submit the form
				});
			});
		};
	}
})(jQuery);
